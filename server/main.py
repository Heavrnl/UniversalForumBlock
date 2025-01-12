from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import uuid
from typing import Dict, Any, List
from pathlib import Path
import time
from asyncio import wait_for, TimeoutError
import uvicorn

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

api_key_header = APIKeyHeader(name="X-API-Key")

# 配置文件根目录
CONFIG_ROOT = "user_configs"
ADMIN_FILE = "admin/admin_key.txt"

# 存储活跃的WebSocket连接
active_connections: Dict[str, List[WebSocket]] = {}


def ensure_config_dir():
    """确保配置目录存在"""
    Path(CONFIG_ROOT).mkdir(exist_ok=True)
    Path("admin").mkdir(exist_ok=True)


def get_admin_key() -> str:
    """获取管理员密钥"""
    admin_key_path = Path(ADMIN_FILE)
    if admin_key_path.exists():
        return admin_key_path.read_text().strip()
    return ""


def init_admin() -> str:
    """初始化管理员账户"""
    admin_key = str(uuid.uuid4())
    # 写入admin key
    admin_key_path = Path(ADMIN_FILE)
    admin_key_path.write_text(admin_key)
    
    # 在user_configs中创建admin的配置目录
    admin_config_dir = Path(CONFIG_ROOT) / admin_key
    admin_config_dir.mkdir(exist_ok=True)
    
    # 创建空的配置文件
    config_path = admin_config_dir / "config.json"
    config_path.write_text("{}")
    
    return admin_key


def get_user_config_path(user_id: str) -> Path:
    """获取用户配置文件路径"""
    return Path(CONFIG_ROOT) / user_id / "config.json"


async def verify_api_key(api_key: str = Depends(api_key_header)):
    """验证API密钥"""
    if not api_key:
        raise HTTPException(status_code=401, detail="API key is required")

    # 验证用户目录是否存在
    user_dir = Path(CONFIG_ROOT) / api_key
    if not user_dir.exists() and api_key != get_admin_key():
        raise HTTPException(status_code=401, detail="Invalid API key")
    return api_key


async def verify_ws_token(token: str) -> str:
    """验证WebSocket连接的token"""
    if not token:
        raise WebSocketDisconnect(code=1008, reason="Token is required")

    user_dir = Path(CONFIG_ROOT) / token
    if not user_dir.exists() and token != get_admin_key():
        raise WebSocketDisconnect(code=1008, reason="Invalid token")
    return token


@app.on_event("startup")
async def startup_event():
    """服务启动时的初始化"""
    ensure_config_dir()
    
    # 检查admin是否存在
    admin_key = get_admin_key()
    if not admin_key:
        # 如果admin不存在，创建新的admin
        admin_key = init_admin()
        print(f"admin key: {admin_key}")
    else:
        # 确保admin的配置目录存在
        admin_config_dir = Path(CONFIG_ROOT) / admin_key
        if not admin_config_dir.exists():
            admin_config_dir.mkdir(exist_ok=True)
            config_path = admin_config_dir / "config.json"
            config_path.write_text("{}")


@app.websocket("/ws/config/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    """WebSocket连接处理"""
    await websocket.accept()
    try:
        # 验证 token
        user_id = await verify_ws_token(token)

        # 将连接添加到活跃连接列表
        if user_id not in active_connections:
            active_connections[user_id] = []
        active_connections[user_id].append(websocket)

        while True:
            try:
                # 接收消息
                data = await websocket.receive_json()
                print('data的数据类型:', type(data))
                if data.get("type"):
                    config_path = get_user_config_path(user_id)
                    config_path.parent.mkdir(parents=True, exist_ok=True)


                    # 处理删除请求
                    if data.get("type") == "delete":
                        try:
                            if config_path.exists():
                                config_path.unlink()  # 删除配置文件
                                
                                # 广播删除消息给该用户的所有连接
                                for conn in active_connections[user_id]:
                                    try:
                                        await conn.send_json({
                                            "type": "delete",
                                            "success": True
                                        })
                                    except Exception:
                                        continue
                            else:
                                await websocket.send_json({
                                    "type": "delete",
                                    "success": True,
                                    "message": "Config file does not exist"
                                })
                        except Exception as e:
                            await websocket.send_json({
                                "type": "delete",
                                "success": False,
                                "message": str(e)
                            })
                        continue

                    # 第一次同步 
                    if data.get("type") == "firstSync":
                        # 如果云端配置不存在，则将接收到的数据保存为配置
                        if not config_path.exists():
                            config_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
                            data["message"] = "firstSync_success"
                            await websocket.send_json(data)
                        # 如果云端配置存在，询问用户使用哪个配置
                        else:
                            cloud_config = json.loads(config_path.read_text())
                            # 获取时间戳
                            cloud_lastSyncTime = cloud_config.get("globalConfig", {}).get("SYNC_CONFIG", {}).get(
                                "lastSyncTime", 0)
                            local_lastSyncTime = data.get("globalConfig", {}).get("SYNC_CONFIG", {}).get("lastSyncTime",
                                                                                                         0)

                            await websocket.send_json({
                                "type": "configConflict",
                                "cloudTime": time.strftime("%Y-%m-%d %H:%M:%S",
                                                           time.localtime(cloud_lastSyncTime / 1000)),
                                "localTime": time.strftime("%Y-%m-%d %H:%M:%S",
                                                           time.localtime(local_lastSyncTime / 1000)),
                                "newerConfig": "cloud" if cloud_lastSyncTime > local_lastSyncTime else "local"
                            })
                            try:
                                # 设置30秒超时
                                response = await wait_for(websocket.receive_json(), timeout=30.0)
                                if response.get("type") == "resolveConflict":
                                    if response.get("choice") == "useCloud":
                                        print("使用云端配置")
                                        await websocket.send_json(cloud_config)
                                    elif response.get("choice") == "useLocal":
                                        print("使用本地配置")
                                        config_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
                                        await websocket.send_json(data)
                            except TimeoutError:
                                # 超时取消操作
                                await websocket.send_json({
                                    "type": "error",
                                    "message": "选择超时，操作已取消"
                                })
                        continue

                    # 如果云端配置不存在，则将接收到的数据保存为配置
                    if not config_path.exists():
                        config_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
                        

                    # 非第一次同步
                    if config_path.exists():
                        
                        config = json.loads(config_path.read_text())
                        # 获取时间戳
                        data_lastSyncTime = data.get("globalConfig", {}).get("SYNC_CONFIG", {}).get("lastSyncTime", 0)
                        config_lastSyncTime = config.get("globalConfig", {}).get("SYNC_CONFIG", {}).get("lastSyncTime",
                                                                                                        0)

                        print('Client lastSyncTime:', data_lastSyncTime)
                        print('Server lastSyncTime:', config_lastSyncTime)

                        if data.get("type") == "update":
                            # 比较 timestamp,如果data里的timestamp小于配置里的timestamp,则更新配置，否则把服务端的配置下发

                            # 比较时间戳
                            if data_lastSyncTime < config_lastSyncTime:
                                print("客户端配置旧")
                                print('---------------')
                                # 服务器配置更新，使用服务器配置
                                data = config
                                # 只发送给请求的连接
                                data["message"] = "config_updated"
                                await websocket.send_json(data)
                            else:
                                print("客户端配置新")
                                print('---------------')
                                # 客户端配置更新，保存新配置
                                config_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))

                                # 广播配置更新到该用户的其他连接
                                invalid_connections = []
                                for conn in active_connections[user_id]:
                                    if conn != websocket:  # 排除发起更新请求的连接
                                        try:
                                            await conn.send_json(data)
                                        except Exception:
                                            # 标记无效连接
                                            invalid_connections.append(conn)

                                # 清理无效连接
                                for conn in invalid_connections:
                                    active_connections[user_id].remove(conn)
                                if not active_connections[user_id]:
                                    del active_connections[user_id]

            except WebSocketDisconnect:
                break
            except Exception as e:
                print(f"Error handling websocket message: {e}")
                break

    finally:
        # 清理断开的 WebSocket 连接
        if user_id in active_connections:
            active_connections[user_id].remove(websocket)
            if not active_connections[user_id]:
                del active_connections[user_id]


@app.post("/users/create")
async def create_user(current_user: str = Depends(verify_api_key)):
    """创建新用户（仅管理员可用）"""
    if current_user != get_admin_key():
        raise HTTPException(status_code=403, detail="Only admin can create users")

    new_user_id = str(uuid.uuid4())
    user_dir = Path(CONFIG_ROOT) / new_user_id
    user_dir.mkdir(exist_ok=True)

    config_path = user_dir / "config.json"
    config_path.write_text("{}")

    return {"user_id": new_user_id}


@app.get("/config")
async def get_config(current_user: str = Depends(verify_api_key)):
    """获取用户配置"""
    config_path = get_user_config_path(current_user)
    if not config_path.exists():
        return {}

    return json.loads(config_path.read_text())


@app.put("/config")
async def update_config(config: Dict[str, Any], current_user: str = Depends(verify_api_key)):
    """更新用户配置"""
    config_path = get_user_config_path(current_user)
    config_path.parent.mkdir(exist_ok=True)
    config_path.write_text(json.dumps(config, ensure_ascii=False, indent=2))

    # 通过WebSocket广播配置更新
    if current_user in active_connections:
        for connection in active_connections[current_user]:
            await connection.send_json({"type": "config_updated", "data": config})

    return {"status": "success"}


@app.delete("/config")
async def delete_config(current_user: str = Depends(verify_api_key)):
    """删除用户配置"""
    config_path = get_user_config_path(current_user)
    if config_path.exists():
        config_path.unlink()

        # 通过WebSocket广播配置删除
        if current_user in active_connections:
            for connection in active_connections[current_user]:
                await connection.send_json({"type": "config_deleted"})

    return {"status": "success"}


if __name__ == "__main__":


    uvicorn.run(app, host="0.0.0.0", port=8000)
