// ==UserScript==
// @name         通用论坛屏蔽插件
// @name:en      Universal Forum Block
// @namespace    https://github.com/Heavrnl/UniversalForumBlock
// @version      1.2.0
// @description  通用的论坛贴子/用户屏蔽工具
// @description:en  Universal forum post/user blocking tool
// @author       Heavrnl
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPCEtLSBGaWx0ZXIgTGluZXMgLS0+DQogICAgPGcgc3Ryb2tlPSIjMjE5NmYzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+DQogICAgICAgIDxsaW5lIHgxPSI4IiB5MT0iMTAiIHgyPSIyNCIgeTI9IjEwIiBvcGFjaXR5PSIwLjE1Ii8+DQogICAgICAgIDxsaW5lIHgxPSI2IiB5MT0iMTYiIHgyPSIyNiIgeTI9IjE2IiBvcGFjaXR5PSIwLjE1Ii8+DQogICAgICAgIDxsaW5lIHgxPSI4IiB5MT0iMjIiIHgyPSIyNCIgeTI9IjIyIiBvcGFjaXR5PSIwLjE1Ii8+DQogICAgPC9nPg0KICAgIA0KICAgIDwhLS0gQmxvY2sgU3ltYm9sIC0tPg0KICAgIDxnIHN0cm9rZT0iIzIxOTZmMyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiPg0KICAgICAgICA8bGluZSB4MT0iMTAiIHkxPSIxNiIgeDI9IjIyIiB5Mj0iMTYiIHRyYW5zZm9ybT0icm90YXRlKDQ1IDE2IDE2KSIvPg0KICAgICAgICA8bGluZSB4MT0iMTAiIHkxPSIxNiIgeDI9IjIyIiB5Mj0iMTYiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxNiAxNikiLz4NCiAgICA8L2c+DQo8L3N2Zz4g
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      *
// @license       MIT
// ==/UserScript==
(function() {
    'use strict';
    if (window.top !== window.self) {
        return; 
    } 
    let panelVisible = true;
    GM_registerMenuCommand("显示/隐藏面板", function() {
        panelVisible = !panelVisible;
        const panel = document.getElementById('forum-filter-panel');
        if (panel) {
            panel.style.display = panelVisible ? 'block' : 'none';
        }
        GM_setValue('panelVisible', panelVisible);
    });
    panelVisible = GM_getValue('panelVisible', true);
    GM_addStyle(` #forum-filter-panel { position: fixed; bottom: 0; z-index: 9999; background: #fff; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 0 10px rgba(0,0,0,0.1); font-family: Arial, sans-serif; transition: all 0.3s ease; width: 400px; user-select: none; transform: translateY(calc(100% - 25px)); } #forum-filter-panel:not(.click-mode):hover, #forum-filter-panel:not(.click-mode):focus-within { transform: translateY(0); width: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 290 : 400; max-width: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? Math.min(290, window.innerWidth * 0.9) : undefined; } #forum-filter-panel.click-mode.expanded { transform: translateY(0) !important; width: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 290 : 400; max-width: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? Math.min(290, window.innerWidth * 0.9) : undefined; } #forum-filter-panel.click-mode:not(.expanded), #forum-filter-panel:not(.click-mode):not(:hover):not(:focus-within) { width: 50px; max-width: 200px; min-width: 30px; } #forum-filter-panel:not(.click-mode):hover .panel-content, #forum-filter-panel:not(.click-mode):focus-within .panel-content, #forum-filter-panel.click-mode.expanded .panel-content { opacity: 1; visibility: visible; pointer-events: auto; } #forum-filter-panel:not(.click-mode):not(:hover):not(:focus-within) .panel-content, #forum-filter-panel.click-mode:not(.expanded) .panel-content { opacity: 0; visibility: hidden; pointer-events: none; } .panel-settings-btn { display: flex !important; align-items: center !important; justify-content: center !important; padding: 6px 10px !important; background: #2196F3 !important; color: white !important; border: none !important; border-radius: 4px !important; cursor: pointer !important; font-size: 13px !important; font-weight: 500 !important; transition: all 0.2s ease !important; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important; text-decoration: none !important; user-select: none !important; position: absolute !important; top: 10px !important; right: 10px !important; } .panel-settings-btn:hover { background: #1976D2 !important; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) !important; transform: translateY(-1px) !important; } .panel-settings-btn:active { background: #1565C0 !important; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important; transform: translateY(0) !important; } .panel-settings-btn::before { margin-right: 6px !important; font-size: 16px !important; } .panel-content { padding: 10px 15px; padding-top: 30px !important; max-height: 600px; overflow-y: auto; background: #fff; border-radius: 4px; transition: opacity 0.2s ease, visibility 0.2s ease; position: relative; } .array-editor-toggle { width: 100%; padding: 6px; background: white; border: none; border-radius: 3px; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; color: #000; font-weight: 600; font-size: 14px; font:bold 14px Arial, sans-serif !important; } .domain-enabled-label { font-size: 14px !important; color: #333 !important; display: flex !important; align-items: center !important; } .domain-enabled-label #domain-enabled { font-size: 14px !important; color: #333 !important; margin-right: 6px !important; } .array-editor-toggle:hover { background: #eee; } #forum-filter-panel .config-section-toggle.collapsed { margin: 3px; padding: 4px 8px; border: none; background: #f9f9f9; cursor: pointer; width: calc(100% - 6px); text-align: left; } #forum-filter-panel .config-section-toggle.collapsed:hover { background: #e5e5e5; } .panel-tab { box-sizing: content-box !important; padding: 3px; background: #f5f5f5; border-bottom: 1px solid #ddd; cursor: pointer; display: flex; justify-content: center; align-items: center; font-size: 14px; height: 14px; white-space: nowrap; overflow: hidden; } .panel-tab:hover { background: #e8e8e8; } #forum-filter-panel label { display: block; margin: 5px 0; } #forum-filter-settings { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.2); z-index: 10000; display: none; min-width: 300px; max-width: 90%; max-height: 90vh; overflow-y: auto; } #forum-filter-settings.visible { display: block; animation: fadeIn 0.3s ease; } @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -48%); } to { opacity: 1; transform: translate(-50%, -50%); } } #forum-filter-settings h3 { margin: 0 0 20px 0; padding-bottom: 15px; border-bottom: 2px solid #f0f0f0; color: #333; font-size: 18px; font-weight: 600; text-align: center; } #forum-filter-settings .setting-group { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px; transition: all 0.2s ease; } #forum-filter-settings .setting-group:hover { background: #f0f2f5; } #forum-filter-settings .setting-group label { display: block; margin-bottom: 8px; color: #444; font-weight: 600; font-size: 14px; } #forum-filter-settings select { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; color: #333; background: #fff; cursor: pointer; transition: all 0.2s ease; } #forum-filter-settings select:hover { border-color: #2196F3; } #forum-filter-settings select:focus { border-color: #2196F3; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1); outline: none; } #forum-filter-settings input[type="range"] { -webkit-appearance: none; width: 100%; height: 4px; background: #ddd; border-radius: 2px; outline: none; margin: 15px 0; padding: 0; position: relative; } #forum-filter-settings .position-value, #forum-filter-settings .collapsed-width-value, #forum-filter-settings .expanded-width-value { text-align: center; font-size: 13px; color: #666; margin-top: 5px; } #forum-filter-settings .buttons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; } #forum-filter-settings .buttons button { padding: 8px 20px; border: none; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; } #forum-filter-settings .buttons button#settings-cancel { background: #f5f5f5; color: #666; } #forum-filter-settings .buttons button#settings-cancel:hover { background: #e0e0e0; color: #333; } #forum-filter-settings .buttons button#settings-save { background: #2196F3; color: white; } #forum-filter-settings .buttons button#settings-save:hover { background: #1976D2; } #settings-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 9999; display: none; animation: fadeOverlay 0.3s ease; } @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } } #forum-filter-settings input[type="range"] { -webkit-appearance: none; width: 100%; height: 4px; background: #ddd; border-radius: 2px; outline: none; margin: 15px 0; } #forum-filter-settings input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #2196F3; border-radius: 50%; cursor: pointer; transition: all 0.2s ease; margin-top: -7px; } #forum-filter-settings input[type="range"]::-webkit-slider-thumb:hover { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: #2196F3; border: none; border-radius: 50%; cursor: pointer; transition: all 0.2s ease; } #forum-filter-settings input[type="range"]::-moz-range-thumb:hover { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]::-ms-thumb { width: 18px; height: 18px; background: #2196F3; border: none; border-radius: 50%; cursor: pointer; transition: all 0.2s ease; margin-top: 0; } #forum-filter-settings input[type="range"]::-ms-thumb:hover { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; background: #ddd; border-radius: 2px; cursor: pointer; border: none; } #forum-filter-settings input[type="range"]::-moz-range-track { width: 100%; height: 4px; background: #ddd; border-radius: 2px; cursor: pointer; border: none; } #forum-filter-settings input[type="range"]::-ms-track { width: 100%; height: 4px; background: transparent; border-color: transparent; color: transparent; cursor: pointer; } #forum-filter-settings input[type="range"]::-ms-fill-lower { background: #2196F3; border-radius: 2px; border: none; } #forum-filter-settings input[type="range"]:hover::-webkit-slider-thumb { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]:active::-webkit-slider-thumb { transform: scale(1.2); } #forum-filter-settings input[type="range"]:hover::-moz-range-thumb { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]:active::-moz-range-thumb { transform: scale(1.2); } #forum-filter-settings input[type="range"]:hover::-ms-thumb { background: #1976D2; transform: scale(1.1); } #forum-filter-settings input[type="range"]:active::-ms-thumb { transform: scale(1.2); } #forum-filter-settings input[type="range"]::-ms-fill-upper { background: #ddd; border-radius: 2px; border: none; } .domain-info { margin-bottom: 15px !important; padding: 12px !important; border-bottom: 1px solid #eee !important; background: #f8f9fa !important; border-radius: 4px !important; position: relative !important; text-align: left !important; } .domain-info h4 { margin: 0 0 8px 0 !important; color: #333 !important; font-size: 14px !important; font-weight: 600 !important; } .domain-info .page-type { margin-bottom: 10px !important; font-size: 13px !important; color: #666 !important; } .domain-info #page-type-value { font-weight: 600 !important; color: #2196F3 !important; } .domain-enable-row { display: flex !important; align-items: center !important; gap: 8px !important; padding: 8px 12px !important; background: #f8f9fa !important; border-radius: 4px !important; margin: 10px 0 !important; border: 1px solid #e0e0e0 !important; transition: all 0.2s ease !important; } .domain-enable-row:hover { background: #f0f2f5 !important; border-color: #2196F3 !important; } #domain-enabled { position: relative !important; width: 16px !important; height: 16px !important; margin: 0 !important; padding: 0 !important; cursor: pointer !important; -webkit-appearance: none !important; -moz-appearance: none !important; appearance: none !important; border: 2px solid #ccc !important; border-radius: 3px !important; background: white !important; transition: all 0.2s ease-in-out !important; vertical-align: middle !important; } #domain-enabled:checked { background: #2196F3 !important; border-color: #2196F3 !important; } #domain-enabled:checked::after { content: '' !important; position: absolute !important; left: 4px !important; top: 1px !important; width: 4px !important; height: 8px !important; border: solid white !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important; } #domain-enabled:hover { border-color: #2196F3 !important; } #domain-enabled:focus { outline: none !important; box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2) !important; } #domain-enabled + label { margin: 0 !important; padding: 0 !important; cursor: pointer !important; user-select: none !important; font-size: 14px !important; color: #333 !important; line-height: 16px !important; display: inline-flex !important; align-items: center !important; } .domain-info .domain-enable-row label { flex: 1 !important; display: flex !important; align-items: center !important; margin: 0 !important; font-size: 13px !important; color: #333 !important; cursor: pointer !important; user-select: none !important; position: relative !important; padding-left: 32px !important; min-height: 24px !important; line-height: 24px !important; font-weight: 600 !important; } .domain-info .domain-enable-row input[type="checkbox"] { position: absolute !important; opacity: 0 !important; cursor: pointer !important; height: 0 !important; width: 0 !important; } .domain-info .domain-enable-row label:before { content: '' !important; position: absolute !important; left: 0 !important; top: 50% !important; transform: translateY(-50%) !important; width: 22px !important; height: 22px !important; border: 2px solid #ccc !important; border-radius: 4px !important; background-color: #fff !important; transition: all 0.2s ease-in-out !important; box-sizing: border-box !important; } .domain-info .domain-enable-row label:after { content: '' !important; position: absolute !important; left: 7px !important; top: 50% !important; transform: translateY(-65%) rotate(45deg) !important; width: 8px !important; height: 12px !important; border: solid white !important; border-width: 0 2px 2px 0 !important; opacity: 0 !important; transition: all 0.2s ease-in-out !important; } .domain-info .domain-enable-row input[type="checkbox"]:checked + label:before { background-color: #4CAF50 !important; border-color: #4CAF50 !important; } .domain-info .domain-enable-row input[type="checkbox"]:checked + label:after { opacity: 1 !important; } .domain-info .domain-enable-row input[type="checkbox"]:focus + label:before { box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2) !important; } .domain-info .domain-enable-row label:hover:before { border-color: #4CAF50 !important; } .config-section,.config-section-toggle.collapsed { margin: 8px 0; padding: 6px; background: #f9f9f9; border-radius: 4px; border: 1px solid #eee; overflow: hidden !important; } .config-section > * { max-width: 100% !important; box-sizing: border-box !important; overflow-x: hidden !important; } .array-editor > * { max-width: 100% !important; box-sizing: border-box !important; overflow-x: hidden !important; } .button-group > * { max-width: 100% !important; box-sizing: border-box !important; overflow-x: hidden !important; } .config-section[data-section="global"] { border-left: 4px solid #2196F3; } .config-section[data-section="keywords"] { border-left: 4px solid #4CAF50; } .config-section[data-section="usernames"] { border-left: 4px solid #FF9800; } .config-section[data-section="url"] { border-left: 4px solid #9C27B0; } .config-section[data-section="xpath"] { border-left: 4px solid #E91E63; } .config-section[data-section="sync"] { border-left: 4px solid #00BCD4; } .config-section[data-section="global"] .array-item { border-left-color: #2196F3 !important; } .config-section[data-section="keywords"] .array-item { border-left-color: #4CAF50 !important; } .config-section[data-section="usernames"] .array-item { border-left-color: #FF9800 !important; } .config-section[data-section="url"] .array-item { border-left-color: #9C27B0 !important; } .config-section[data-section="global"] .array-editor-toggle { color: #1565C0; } .config-section[data-section="keywords"] .array-editor-toggle { color: #2E7D32; } .config-section[data-section="usernames"] .array-editor-toggle { color: #E65100; } .config-section[data-section="url"] .array-editor-toggle { color: #6A1B9A; } .config-section[data-section="xpath"] .array-editor-toggle { color: #C2185B; } .config-section[data-section="global"] .config-section-toggle { background: #E3F2FD; color: #1565C0; } .config-section[data-section="keywords"] .config-section-toggle { background: #E8F5E9; color: #2E7D32; } .config-section[data-section="usernames"] .config-section-toggle { background: #FFF3E0; color: #E65100; } .config-section[data-section="url"] .config-section-toggle { background: #F3E5F5; color: #6A1B9A; } .config-section[data-section="xpath"] .config-section-toggle { background: #FCE4EC; color: #C2185B; } .config-section[data-section="sync"] .config-section-toggle { background: #E0F7FA; color: #0097A7; } .config-section-content { max-width: 100% !important; transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 300px; opacity: 1; overflow-y: auto; padding: 8px; margin-top: 5px; background: #fff; border-radius: 4px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); } .checkbox-row { display: flex !important; justify-content: space-between !important; margin-bottom: 8px !important; gap: 10px !important; } .checkbox-row label { flex: 1 !important; display: flex !important; align-items: center !important; margin: 0 !important; font-size: 13px !important; color: #333 !important; cursor: pointer !important; user-select: none !important; position: relative !important; padding-left: 28px !important; min-height: 20px !important; line-height: 20px !important; } .checkbox-row label,.domain-enabled-label{ font-weight: unset !important; } .domain-info input[type="checkbox"]{ visibility: visible !important; } .domain-info input[type="checkbox"]:checked::after{ content: '' !important; position: absolute !important; left: 5px !important; top: 1px !important; width: 4px !important; height: 8px !important; border: solid white !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important; background-color: transparent !important; } .domain-info input[type="checkbox"]::after{ border: solid transparent !important; } .checkbox-row input[type="checkbox"] { padding: 0 !important; position: absolute !important; left: 0 !important; top: 50% !important; transform: translateY(-50%) !important; margin: 0 !important; width: 18px !important; height: 18px !important; cursor: pointer !important; opacity: 1 !important; z-index: 1 !important; border: 2px solid #ccc !important; border-radius: 3px !important; background-color: #fff !important; transition: all 0.2s ease-in-out !important; visibility: visible !important; } .checkbox-row input[type="checkbox"]::after { content: '' !important; border: solid transparent !important; } .checkbox-row input[type="checkbox"]:checked::after{ background-color: transparent !important; } .checkbox-row input[type="checkbox"]:hover { border-color: #2196F3 !important; } .checkbox-row input[type="checkbox"]:focus { box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2) !important; outline: none !important; } .checkbox-row label:before { content: '' !important; position: absolute !important; left: 0 !important; top: 50% !important; transform: translateY(-50%) !important; width: 18px !important; height: 18px !important; border: 2px solid #ccc !important; border-radius: 3px !important; background-color: #fff !important; transition: all 0.2s ease-in-out !important; box-sizing: border-box !important; } .checkbox-row label:after { content: '' !important; position: absolute !important; left: 6px !important; top: 50% !important; transform: translateY(-50%) rotate(45deg) !important; width: 6px !important; height: 10px !important; border: solid white !important; border-width: 0 2px 2px 0 !important; opacity: 0 !important; transition: all 0.2s ease-in-out !important; } .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #2196F3 !important; border-color: #2196F3 !important; } .checkbox-row input[type="checkbox"]:checked + label:after { opacity: 1 !important; } .checkbox-row input[type="checkbox"]:focus + label:before { box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2) !important; } .checkbox-row label:hover:before { border-color: #2196F3 !important; } .config-section[data-section="global"] .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #2196F3 !important; border-color: #2196F3 !important; } .config-section[data-section="keywords"] .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #4CAF50 !important; border-color: #4CAF50 !important; } .config-section[data-section="usernames"] .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #FF9800 !important; border-color: #FF9800 !important; } .config-section[data-section="url"] .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #9C27B0 !important; border-color: #9C27B0 !important; } .config-section[data-section="xpath"] .checkbox-row input[type="checkbox"]:checked + label:before { background-color: #E91E63 !important; border-color: #E91E63 !important; } .button-group { margin-top: 15px !important; text-align: center !important; padding: 8px 0 !important; border-top: 1px solid #eee !important; display: flex !important; flex-direction: column !important; gap: 8px !important; width: 100% !important; } .button-group button { width: 100% !important; align-items: center !important; text-align: center !important; justify-content: center !important; padding: 8px 15px !important; font-size: 13px !important; border: none !important; border-radius: 4px !important; cursor: pointer !important; background: #f5f5f5 !important; transition: background 0.2s !important; } .button-group button:hover { background: #e0e0e0 !important; } .button-group button#save-domain-config { background: #4CAF50 !important; color: white !important; } .button-group button#save-domain-config:hover { background: #45a049 !important; } .button-group button#delete-domain-config { background: #ff4444 !important; color: white !important; } .button-group button#delete-domain-config:hover { background: #ff3333 !important; } .button-group button#export-config { background: #2196F3 !important; color: white !important; } .button-group button#export-config:hover { background: #1e88e5 !important; } .button-group button#import-config, .button-group button#import-domain-config { background: #FF9800 !important; color: white !important; } .button-group button#import-config:hover, .button-group button#import-domain-config:hover { background: #f57c00 !important; } .panel-content::-webkit-scrollbar { width: 8px; } .panel-content::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; } .panel-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; } .panel-content::-webkit-scrollbar-thumb:hover { background: #aaa; } .array-editor { margin: 4px 0; border: 1px solid #eee; border-radius: 4px; padding: 6px; background: #fff; } .config-section[data-section="global"] .array-editor { border-width: 2px; border-color: #2196F3; } .config-section[data-section="keywords"] .array-editor { border-width: 2px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); } .config-section[data-section="usernames"] .array-editor { border-width: 2px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); } .config-section[data-section="url"] .array-editor { border-width: 2px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); } .config-section[data-section="xpath"] .array-editor { border-width: 2px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); } #add-global-url, #apply-global-apply { margin-top: 3px !important; height: 33px !important; background: white; color: #333; border: 1px solid #ddd; border-bottom-width: 3px; padding: 6px 12px; transition: all 0.2s ease; border-radius: 6px; font-size: 13px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); cursor: pointer; outline: none; border-bottom-color: #2196F3; line-height: 1.4 !important; font: 13px/1.4 Arial, sans-serif !important; } #add-global-url:hover, #apply-global-apply:hover { background: #f5f5f5; transform: translateY(-1px); } #add-global-url:active, #apply-global-apply:active { transform: translateY(1px); border-bottom-width: 2px; } .array-editor-header { display: flex !important; gap: 4px !important; margin-bottom: 6px !important; align-items: center !important; flex-wrap: wrap !important; } .array-editor-header input[type="text"] { min-width: 10px !important; padding: 6px 8px !important; border: 1px solid #ddd !important; border-radius: 3px !important; font-size: 13px !important; height: 28px !important; box-sizing: border-box !important; } .array-editor-search-input { width: 100% !important; margin: 4px 0 !important; background: #f5f5f5 !important; } .array-editor .button-group-inline  button { background: white; color: #333; border: 1px solid #ddd; border-bottom-width: 3px; padding: 6px 12px; transition: all 0.2s ease; border-radius: 6px; font-size: 13px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); cursor: pointer; outline: none; white-space: normal; word-break: break-word; line-height: 1.4 !important; font: 13px/1.4 Arial, sans-serif !important; } .config-section[data-section="global"] .array-editor .button-group-inline  button { border-bottom-color: #42A5F5; } .config-section[data-section="global"] .array-editor .button-group-inline  button:hover { border-bottom-color: #1E88E5; } .config-section[data-section="keywords"] .array-editor .button-group-inline  button { border-bottom-color: #66BB6A; } .config-section[data-section="keywords"] .array-editor .button-group-inline  button:hover { border-bottom-color: #43A047; } .config-section[data-section="usernames"] .array-editor .button-group-inline  button { border-bottom-color: #FB8C00; } .config-section[data-section="usernames"] .array-editor .button-group-inline  button:hover { border-bottom-color: #F57C00; } .config-section[data-section="url"] .array-editor .button-group-inline  button { border-bottom-color: #AB47BC; } .config-section[data-section="url"] .array-editor .button-group-inline  button:hover { border-bottom-color: #8E24AA; } .config-section[data-section="xpath"] .array-editor .button-group-inline  button { border-bottom-color: #EC407A; } .config-section[data-section="xpath"] .array-editor .button-group-inline  button:hover { border-bottom-color: #D81B60; } .array-editor .button-group-inline  button:hover { background: #f5f5f5; transform: translateY(-1px); } .array-editor .button-group-inline  button:active { transform: translateY(1px); border-bottom-width: 2px; } .array-editor-list { max-height: 200px; overflow-y: auto; border: 1px solid #eee; border-radius: 3px; background: #fff; margin: 4px 0; padding: 4px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); } .array-editor-list:empty { padding: 8px; text-align: center; color: #999; } .array-editor-list:empty::after { font-size: 12px; content: attr(data-empty); } .array-item:hover { background: #f1f3f5 !important; } .array-item span { flex: 1 !important; font-size: 13px !important; color: #495057 !important; line-height: 1.4 !important; margin-right: 8px !important; word-break: break-all !important; user-select: text !important; cursor: text !important; } .array-item button { width: 18px !important; height: 18px !important; min-width: 18px !important; padding: 0 !important; border: none !important; border-radius: 3px !important; background: transparent !important; color: #adb5bd !important; font-size: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; transition: all 0.2s !important; opacity: 0 !important; user-select: none !important; } .array-item:hover button { opacity: 1 !important; color: #495057 !important; } .array-item button:hover { background: #e9ecef !important; color: #212529 !important; } mark { background: #e9ecef; color: #495057; padding: 0 2px; border-radius: 2px; font-weight: 500; } .array-editor-list::-webkit-scrollbar { width: 6px; height: 6px; } .array-editor-list::-webkit-scrollbar-track { background: #f8f9fa; border-radius: 3px; } .array-editor-list::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 3px; transition: background 0.2s; } .array-editor-list::-webkit-scrollbar-thumb:hover { background: #adb5bd; } .array-editor-list::-webkit-scrollbar-corner { background: #f8f9fa; } .array-editor-count { background: #999; color: white; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: normal; line-height: 1.4 !important; } .array-editor-content { display: none; } .array-editor-content.expanded { display: block; } .array-editor .array-item { display: flex !important; align-items: center !important; padding: 8px !important; margin: 2px 0 !important; background: #f5f5f5 !important; border-radius: 3px !important; width: auto !important; border-left: 4px solid transparent !important; } .array-editor .array-item span { flex: 1 !important; margin-right: 10px !important; word-break: break-all !important; padding-right: 10px !important; line-height: 1.4 !important; text-align: left !important; } .array-editor .array-item button { padding: 0 !important; width: 20px !important; height: 20px !important; line-height: 1 !important; background: rgba(0, 0, 0, 0.6) !important; color: white !important; border: none !important; border-radius: 50% !important; cursor: pointer !important; font-size: 14px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; min-width: 20px !important; max-width: 20px !important; margin: 0 !important; flex-shrink: 0 !important; float: none !important; line-height: 0 !important; padding-bottom: 2px !important; } .array-editor .array-item button:hover { background: #000000 !important; } .checkbox-row { display: flex; justify-content: space-between; margin-bottom: 5px; } .checkbox-row label { flex: 1; margin-right: 10px; white-space: nowrap; } .checkbox-row label:last-child { margin-right: 0; } .config-group { margin: 5px 0; padding: 0; } .config-section-toggle { width: 100%; padding: 8px 12px; background: #f5f5f5; border: none; border-radius: 4px; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 700; color: #333; font-size: 14px; font: bold 14px/1.4 Arial, sans-serif !important; } .config-section-toggle:hover { background: #e8e8e8; } .config-section-indicator { transition: transform 0.3s ease; } .config-section-toggle.collapsed .config-section-indicator { transform: rotate(-90deg); } .config-section-content { max-width: 100% !important; transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 300px; opacity: 1; overflow-y: auto; padding-right: 8px; } .config-section-content::-webkit-scrollbar { width: 6px; } .config-section-content::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; } .config-section-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; } .config-section-content::-webkit-scrollbar-thumb:hover { background: #aaa; } .config-section-toggle.collapsed + .config-section-content { max-width: 100% !important; max-height: 0; opacity: 0; margin: 0; padding: 0; overflow: hidden; } #save-domain-config { background: #4CAF50 !important; color: white !important; border: none !important; border-radius: 3px !important; } #save-domain-config:hover { background: #45a049 !important; } .array-editor { margin: 4px 0; border: 1px solid #ddd; border-radius: 4px; padding: 6px; background: #fff; } .array-editor-search-input { width: 100% !important; flex: 1 1 auto !important; text-align: center !important; margin: 5px 0 !important; } .array-editor-search-input::placeholder { text-align: center !important; } .array-editor-linkimport-input { flex: 1 1 50px !important; min-width: 10px !important; margin: 4px !important; padding: 6px 12px !important; border: 1px solid #e0e0e0 !important; border-radius: 4px !important; height: 32px !important; font-size: 14px !important; box-sizing: border-box !important; transition: all 0.2s ease !important; background-color: #fafafa !important; color: #333 !important; } .array-editor-linkimport-input:hover { border-color: #bdbdbd !important; background-color: #fff !important; } .array-editor-linkimport-input:focus { border-color: #2196F3 !important; background-color: #fff !important; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1) !important; outline: none !important; } .array-editor-additem-input,.global-url-input-row input,.array-editor-additem-input-regex { flex: 1 1 50px !important; min-width: 10px !important; margin: 4px !important; padding: 6px 12px !important; border: 1px solid #e0e0e0 !important; border-radius: 4px !important; height: 32px !important; font-size: 14px !important; box-sizing: border-box !important; transition: all 0.2s ease !important; background-color: #fafafa !important; color: #333 !important; } .array-editor-additem-input:hover ,.global-url-input-row input:hover ,.array-editor-additem-input-regex:hover{ border-color: #bdbdbd !important; background-color: #fff !important; } .array-editor-additem-input:focus ,.global-url-input-row input:focus ,.array-editor-additem-input-regex:focus { border-color: #2196F3 !important; background-color: #fff !important; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1) !important; outline: none !important; } .array-editor-search-input { flex: 1 1 50px !important; min-width: 10px !important; margin: 4px !important; padding: 6px 12px !important; border: 1px solid #e0e0e0 !important; border-radius: 4px !important; height: 25px !important; font-size: 14px !important; box-sizing: border-box !important; transition: all 0.2s ease !important; background-color: #fafafa !important; color: #333 !important; align-items: center !important; } .array-editor-search-input:hover { border-color: #bdbdbd !important; background-color: #fff !important; } .array-editor-search-input:focus { border-color: #2196F3 !important; background-color: #fff !important; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1) !important; outline: none !important; } .button-group-inline { display: flex !important; flex-wrap: wrap !important; gap: 2px !important; margin-left: auto !important; } .checkbox-row label:hover:before { border-color: #2196F3 !important; } .global-url-section { margin-top: 10px !important; background: #f8f9fa !important; border-radius: 4px !important; padding: 8px !important; } .global-url-input-row { display: flex !important; gap: 8px !important; margin-bottom: 8px !important; } .global-url-input-row input { flex: 1 !important; padding: 6px 12px !important; border: 1px solid #ddd !important; border-radius: 4px !important; font-size: 13px !important; } .global-url-input-row input:hover { border-color: #bdbdbd !important; background-color: #fff !important; } .global-url-input-row input:focus { border-color: #2196F3 !important; background-color: #fff !important; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1) !important; outline: none !important; } .global-url-list { max-height: 200px !important; overflow-y: auto !important; margin-top: 8px !important; } .global-url-item { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 6px 8px !important; background: white !important; border-radius: 4px !important; margin-bottom: 4px !important; border: 1px solid #eee !important; } .global-url-item span { flex: 1 !important; margin-right: 8px !important; font-size: 13px !important; word-break: break-all !important; } .global-url-item button { width: 20px !important; height: 20px !important; min-width: 20px !important; padding: 0 !important; background: rgba(0, 0, 0, 0.6) !important; color: white !important; border: none !important; border-radius: 50% !important; cursor: pointer !important; font-size: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; transition: background 0.2s !important; } .global-url-item button:hover { background: rgba(0, 0, 0, 0.8) !important; } #time-interval { padding: 6px 8px !important; border: 1px solid #e0e0e0 !important; border-radius: 4px !important; height: 32px !important; font-size: 14px !important; background-color: #fafafa !important; color: #333 !important; cursor: pointer !important; transition: all 0.2s ease !important; box-sizing: border-box !important; display: inline-flex !important; align-items: center !important; vertical-align: middle !important; margin: 0 !important; min-width: 70px !important; width: auto !important; } #time-interval:hover { border-color: #bdbdbd !important; background-color: #fff !important; } #time-interval:focus { border-color: #2196F3 !important; background-color: #fff !important; box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1) !important; outline: none !important; } .global-url-input-row { display: flex !important; gap: 8px !important; margin-bottom: 8px !important; align-items: center !important; } .global-url-input-row input, .global-url-input-row select, .global-url-input-row button { margin: 0 !important; height: 32px !important; box-sizing: border-box !important; } .external-links{ align-items: flex-start !important; } .global-url-input-row button{ white-space: nowrap !important; } .config-section[data-section="sync"] input { display: block !important; width: 100% !important; margin-bottom: 8px !important; padding: 6px 12px !important; border: 1px solid #ddd !important; border-radius: 4px !important; height: 32px !important; box-sizing: border-box !important; } .config-section[data-section="sync"] .config-section-content button { display: block !important; width: 100% !important; margin-bottom: 8px !important; padding: 6px 12px !important; border: 1px solid #ddd !important; border-radius: 4px !important; background-color: #fff !important; cursor: pointer !important; transition: all 0.2s !important; } .config-section[data-section="sync"] button:hover { background-color: #f5f5f5 !important; } #sync-delete { color: #ff4444 !important; border-color: #ff4444 !important; } #sync-delete:hover { background-color: #fff5f5 !important; } #sync-status { margin-top: 8px !important; padding: 8px !important; border-radius: 4px !important; background-color: #f5f5f5 !important; min-height: 20px !important; } `);
    const LANGUAGE_TEMPLATES = { 'zh-CN': { 'settings_title': '面板设置', 'settings_language': '语言', 'settings_expand_mode': '展开方式', 'settings_expand_hover': '悬停展开', 'settings_expand_click': '点击展开', 'settings_block_button_mode': '屏蔽按钮显示方式', 'settings_block_hover': '悬停显示', 'settings_block_always': '总是显示', 'settings_horizontal_position': '水平位置', 'settings_collapsed_width': '收起宽度', 'settings_expanded_width': '展开宽度', 'settings_cancel': '取消', 'settings_save': '保存', 'panel_top_title': '通用论坛屏蔽', 'panel_top_current_domain': '当前域名：', 'panel_top_page_type': '当前页面类型：', 'panel_top_page_type_main': '主页', 'panel_top_page_type_sub': '分页', 'panel_top_page_type_content': '内容页', 'panel_top_page_type_unknown': '未匹配页面类型', 'panel_top_enable_domain': '启用此域名配置', 'panel_top_settings': '设置', 'panel_top_settings_title': '面板设置', 'panel_top_settings_button': '⚙ 设置', 'global_config_title': '全局配置', 'global_config_keywords': '全局关键词', 'global_config_usernames': '全局用户名', 'global_config_share_keywords': '主页/内容页共享关键词', 'global_config_share_usernames': '主页/内容页共享用户名', 'global_config_linkimport_input_placeholder': '输入配置链接', 'global_config_add_global_url': '添加', 'global_config_apply_global_apply': '应用', 'keywords_config_title': '关键词配置', 'keywords_config_keywords_list_title': '关键词列表', 'keywords_config_keywords_regex_title': '关键词正则表达式', 'usernames_config_title': '用户名配置', 'usernames_config_usernames_list_title': '用户名列表', 'usernames_config_usernames_regex_title': '用户名正则表达式', 'url_patterns_title': 'URL 匹配模式', 'url_patterns_main_page_url_patterns_title': '主页URL模式', 'url_patterns_sub_page_url_patterns_title': '分页URL模式', 'url_patterns_content_page_url_patterns_title': '内容页URL模式', 'xpath_config_title': 'XPath 配置', 'xpath_config_main_and_sub_page_keywords_title': '主页/分页标题XPath', 'xpath_config_main_and_sub_page_usernames_title': '主页/分页用户XPath', 'xpath_config_content_page_keywords_title': '内容页关键词XPath', 'xpath_config_content_page_usernames_title': '内容页用户XPath', 'sync_config_title': '云端同步', 'sync_config_server_url': '服务器地址', 'sync_config_user_key': '用户密钥', 'sync_config_apply': '同步', 'sync_config_delete': '删除云端配置', 'sync_panel_status_connect_failed': '连接失败: ', 'sync_panel_status_connect_error': '连接错误: ', 'sync_panel_status_connect_success': '连接成功', 'sync_panel_status_sync_failed': '同步失败: ', 'sync_panel_status_input_error': '请先设置服务器地址和用户密钥', 'sync_panel_status_delete_success': '删除云端配置成功', 'sync_panel_status_delete_failed': '删除云端配置失败: ', 'sync_panel_status_delete_confirm': '确定要删除云端配置吗？此操作不可恢复。', 'sync_panel_status_connect_server_success': '已连接到云端', 'sync_panel_status_client_to_server_success': '本地配置已保存至云端！', 'sync_panel_status_config_updated': '已同步云端配置', 'sync_panel_status_config_conflict_1': '检测到配置冲突!', 'sync_panel_status_config_conflict_2': '云端配置时间: ', 'sync_panel_status_config_conflict_3': '本地配置时间: ', 'sync_panel_status_config_conflict_4': '是否使用云端配置? (点击确定使用云端配置，点击取消使用本地配置)', 'sync_panel_status_config_conflict_cloud_newer': '云端配置较新', 'sync_panel_status_config_conflict_local_newer': '本地配置较新', 'sync_panel_status_disconnect': '连接已断开，尝试重新连接...', 'array_editor_add_item_input_placeholder': '请输入', 'array_editor_add_item_input_placeholder_regex': '请输入正则表达式', 'array_editor_add_item': '添加', 'array_editor_add_item_title': '添加新项目', 'array_editor_clear_allitem': '清空', 'array_editor_clear_allitem_title': '清空列表', 'array_editor_search_input_placeholder': '搜索...', 'array_editor_list_empty_placeholder': '暂无数据', 'array_editor_linkimport_input_placeholder': '请输入链接', 'array_editor_linkimport_input_button': '链接导入', 'array_editor_linkimport_input_button_title': '从链接导入列表', 'array_editor_fileimport_input_button': '文件导入', 'array_editor_fileimport_input_button_title': '从文件导入列表', 'array_editor_export_button': '导出', 'array_editor_export_button_title': '导出列表到文件', 'panel_bottom_export_button': '导出配置', 'panel_bottom_export_button': '导出配置', 'panel_bottom_import_button': '导入配置', 'panel_bottom_delete_button': '删除当前域名配置', 'panel_bottom_save_button': '保存', 'alert_delete_confirm': '确定要删除吗？此操作不可恢复。', 'alert_clear_confirm': '确定要清空整个列表吗？此操作不可恢复。', 'alert_invalid_file': '请选择有效的配置文件', 'alert_import_error': '导入配置失败', 'alert_list_empty': '列表已经是空的了', 'alert_url_exists': '该URL已存在！', 'alert_enter_url': '请输入有效的链接', 'block_button_title': '屏蔽用户: ' }, 'en-US': { 'settings_title': 'Panel Settings', 'settings_language': 'Language', 'settings_expand_mode': 'Expand Mode', 'settings_expand_hover': 'Expand on Hover', 'settings_expand_click': 'Expand on Click', 'settings_block_button_mode': 'Block Button Display Mode', 'settings_block_hover': 'Show on Hover', 'settings_block_always': 'Always Show', 'settings_horizontal_position': 'Horizontal Position', 'settings_collapsed_width': 'Collapsed Width', 'settings_expanded_width': 'Expanded Width', 'settings_cancel': 'Cancel', 'settings_save': 'Save', 'panel_top_title': 'Universal Forum Filter', 'panel_top_current_domain': 'Current Domain: ', 'panel_top_page_type': 'Current Page Type: ', 'panel_top_page_type_main': 'Main Page', 'panel_top_page_type_sub': 'Sub Page', 'panel_top_page_type_content': 'Content Page', 'panel_top_page_type_unknown': 'Unknown Page Type', 'panel_top_enable_domain': 'Enable Domain Config', 'panel_top_settings': 'Settings', 'panel_top_settings_title': 'Panel Settings', 'panel_top_settings_button': '⚙ Settings', 'global_config_title': 'Global Configuration', 'global_config_keywords': 'Global Keywords', 'global_config_usernames': 'Global Usernames', 'global_config_share_keywords': 'Main/Content Page Shared Keywords', 'global_config_share_usernames': 'Main/Content Page Shared Usernames', 'global_config_linkimport_input_placeholder': 'Enter config link', 'global_config_add_global_url': 'Add', 'global_config_apply_global_apply': 'Apply', 'keywords_config_title': 'Keywords Configuration', 'keywords_config_keywords_list_title': 'Keywords List', 'keywords_config_keywords_regex_title': 'Keywords Regex', 'usernames_config_title': 'Usernames Configuration', 'usernames_config_usernames_list_title': 'Usernames List', 'usernames_config_usernames_regex_title': 'Usernames Regex', 'url_patterns_title': 'URL Patterns', 'url_patterns_main_page_url_patterns_title': 'Main Page URL Patterns', 'url_patterns_sub_page_url_patterns_title': 'Sub Page URL Patterns', 'url_patterns_content_page_url_patterns_title': 'Content Page URL Patterns', 'xpath_config_title': 'XPath Configuration', 'xpath_config_main_and_sub_page_keywords_title': 'Main/Sub Page Title XPath', 'xpath_config_main_and_sub_page_usernames_title': 'Main/Sub Page User XPath', 'xpath_config_content_page_keywords_title': 'Content Page Keywords XPath', 'xpath_config_content_page_usernames_title': 'Content Page User XPath', 'sync_config_title': 'Cloud Sync', 'sync_config_server_url': 'Server URL', 'sync_config_user_key': 'User Key', 'sync_config_apply': 'Sync', 'sync_config_delete': 'Delete Cloud Config', 'sync_panel_status_connect_failed': 'Connection Failed: ', 'sync_panel_status_connect_error': 'Connection Error: ', 'sync_panel_status_connect_success': 'Connected Successfully', 'sync_panel_status_sync_failed': 'Sync Failed: ', 'sync_panel_status_input_error': 'Please set server URL and user key first', 'sync_panel_status_delete_success': 'Cloud config deleted successfully', 'sync_panel_status_delete_failed': 'Failed to delete cloud config: ', 'sync_panel_status_delete_confirm': 'Are you sure you want to delete cloud config? This action cannot be undone.', 'sync_panel_status_connect_server_success': 'Connected to cloud', 'sync_panel_status_client_to_server_success': 'Local config saved to cloud!', 'sync_panel_status_config_updated': 'Cloud config synced', 'sync_panel_status_config_conflict_1': 'Config conflict detected!', 'sync_panel_status_config_conflict_2': 'Cloud config time: ', 'sync_panel_status_config_conflict_3': 'Local config time: ', 'sync_panel_status_config_conflict_4': 'Use cloud config? (Click OK to use cloud config, Cancel to use local config)', 'sync_panel_status_config_conflict_cloud_newer': 'Cloud config is newer', 'sync_panel_status_config_conflict_local_newer': 'Local config is newer', 'sync_panel_status_disconnect': 'Disconnected, attempting to reconnect...', 'array_editor_add_item_input_placeholder': 'Please enter', 'array_editor_add_item_input_placeholder_regex': 'Please enter regex', 'array_editor_add_item': 'Add', 'array_editor_add_item_title': 'Add New Item', 'array_editor_clear_allitem': 'Clear All', 'array_editor_clear_allitem_title': 'Clear List', 'array_editor_search_input_placeholder': 'Search...', 'array_editor_list_empty_placeholder': 'No Data', 'array_editor_linkimport_input_placeholder': 'Enter link', 'array_editor_linkimport_input_button': 'Import from Link', 'array_editor_linkimport_input_button_title': 'Import from Link', 'array_editor_fileimport_input_button': 'Import from File', 'array_editor_fileimport_input_button_title': 'Import from File', 'array_editor_export_button': 'Export', 'array_editor_export_button_title': 'Export List to File', 'panel_bottom_export_button': 'Export Config', 'panel_bottom_import_button': 'Import Config', 'panel_bottom_delete_button': 'Delete Current Domain Config', 'panel_bottom_save_button': 'Save', 'alert_delete_confirm': 'Are you sure you want to delete? This action cannot be undone.', 'alert_clear_confirm': 'Are you sure you want to clear the entire list? This action cannot be undone.', 'alert_invalid_file': 'Please select a valid configuration file', 'alert_import_error': 'Failed to import configuration', 'alert_list_empty': 'The list is already empty', 'alert_url_exists': 'This URL already exists!', 'alert_enter_url': 'Please enter a valid link', 'block_button_title': 'Block User: ' }, 'ja-JP': { 'settings_title': 'パネル設定', 'settings_language': '言語', 'settings_expand_mode': '展開モード', 'settings_expand_hover': 'ホバーで展開', 'settings_expand_click': 'クリックで展開', 'settings_block_button_mode': 'ブロックボタン表示モード', 'settings_block_hover': 'ホバーで表示', 'settings_block_always': '常に表示', 'settings_horizontal_position': '水平位置', 'settings_collapsed_width': '折りたたみ幅', 'settings_expanded_width': '展開幅', 'settings_cancel': 'キャンセル', 'settings_save': '保存', 'panel_top_title': '汎用フォーラムフィルター', 'panel_top_current_domain': '現在のドメイン：', 'panel_top_page_type': '現在のページタイプ：', 'panel_top_page_type_main': 'メインページ', 'panel_top_page_type_sub': 'サブページ', 'panel_top_page_type_content': 'コンテンツページ', 'panel_top_page_type_unknown': '不明なページタイプ', 'panel_top_enable_domain': 'このドメイン設定を有効にする', 'panel_top_settings': '設定', 'panel_top_settings_title': 'パネル設定', 'panel_top_settings_button': '⚙ 設定', 'global_config_title': 'グローバル設定', 'global_config_keywords': 'グローバルキーワード', 'global_config_usernames': 'グローバルユーザー名', 'global_config_share_keywords': 'メイン/コンテンツページ共有キーワード', 'global_config_share_usernames': 'メイン/コンテンツページ共有ユーザー名', 'global_config_linkimport_input_placeholder': '設定リンクを入力', 'global_config_add_global_url': '追加', 'global_config_apply_global_apply': '適用', 'keywords_config_title': 'キーワード設定', 'keywords_config_keywords_list_title': 'キーワードリスト', 'keywords_config_keywords_regex_title': 'キーワード正規表現', 'usernames_config_title': 'ユーザー名設定', 'usernames_config_usernames_list_title': 'ユーザー名リスト', 'usernames_config_usernames_regex_title': 'ユーザー名正規表現', 'url_patterns_title': 'URLパターン', 'url_patterns_main_page_url_patterns_title': 'メインページURLパターン', 'url_patterns_sub_page_url_patterns_title': 'サブページURLパターン', 'url_patterns_content_page_url_patterns_title': 'コンテンツページURLパターン', 'xpath_config_title': 'XPath設定', 'xpath_config_main_and_sub_page_keywords_title': 'メイン/サブページタイトルXPath', 'xpath_config_main_and_sub_page_usernames_title': 'メイン/サブページユーザーXPath', 'xpath_config_content_page_keywords_title': 'コンテンツページキーワードXPath', 'xpath_config_content_page_usernames_title': 'コンテンツページユーザーXPath', 'sync_config_title': 'クラウド同期', 'sync_config_server_url': 'サーバーアドレス', 'sync_config_user_key': 'ユーザーキー', 'sync_config_apply': '同期', 'sync_config_delete': 'クラウド設定を削除', 'sync_panel_status_connect_failed': '接続失敗: ', 'sync_panel_status_connect_error': '接続エラー: ', 'sync_panel_status_connect_success': '接続成功', 'sync_panel_status_sync_failed': '同期失敗: ', 'sync_panel_status_input_error': 'サーバーアドレスとユーザーキーを設定してください', 'sync_panel_status_delete_success': 'クラウド設定の削除に成功しました', 'sync_panel_status_delete_failed': 'クラウド設定の削除に失敗しました: ', 'sync_panel_status_delete_confirm': 'クラウド設定を削除してもよろしいですか？この操作は元に戻せません。', 'sync_panel_status_connect_server_success': 'クラウドに接続しました', 'sync_panel_status_client_to_server_success': 'ローカル設定をクラウドに保存しました！', 'sync_panel_status_config_updated': 'クラウド設定を同期しました', 'sync_panel_status_config_conflict_1': '設定の競合を検出しました！', 'sync_panel_status_config_conflict_2': 'クラウド設定の時刻: ', 'sync_panel_status_config_conflict_3': 'ローカル設定の時刻: ', 'sync_panel_status_config_conflict_4': 'クラウド設定を使用しますか？（OKでクラウド設定を使用、キャンセルでローカル設定を使用）', 'sync_panel_status_config_conflict_cloud_newer': 'クラウド設定の方が新しいです', 'sync_panel_status_config_conflict_local_newer': 'ローカル設定の方が新しいです', 'sync_panel_status_disconnect': '接続が切断されました。再接続を試みています...', 'array_editor_add_item_input_placeholder': '入力してください', 'array_editor_add_item_input_placeholder_regex': '正規表現を入力', 'array_editor_add_item': '追加', 'array_editor_add_item_title': '新規項目追加', 'array_editor_clear_allitem': 'すべてクリア', 'array_editor_clear_allitem_title': 'リストをクリア', 'array_editor_search_input_placeholder': '検索...', 'array_editor_list_empty_placeholder': 'データなし', 'array_editor_linkimport_input_placeholder': 'リンクを入力', 'array_editor_linkimport_input_button': 'リンクからインポート', 'array_editor_linkimport_input_button_title': 'リンクからインポート', 'array_editor_fileimport_input_button': 'ファイルからインポート', 'array_editor_fileimport_input_button_title': 'ファイルからインポート', 'array_editor_export_button': 'エクスポート', 'array_editor_export_button_title': 'リストをファイルにエクスポート', 'panel_bottom_export_button': '設定をエクスポート', 'panel_bottom_import_button': '設定をインポート', 'panel_bottom_delete_button': '現在のドメイン設定を削除', 'panel_bottom_save_button': '保存', 'alert_delete_confirm': '本当に削除しますか？この操作は元に戻せません。', 'alert_clear_confirm': '本当にリスト全体をクリアしますか？この操作は元に戻せません。', 'alert_invalid_file': '有効な設定ファイルを選択してください', 'alert_import_error': '設定のインポートに失敗しました', 'alert_list_empty': 'リストは既に空です', 'alert_url_exists': 'このURLは既に存在します！', 'alert_enter_url': '有効なリンクを入力してください', 'block_button_title': 'ユーザーをブロック: ' }, 'ko-KR': { 'settings_title': '패널 설정', 'settings_language': '언어', 'settings_expand_mode': '확장 모드', 'settings_expand_hover': '호버 시 확장', 'settings_expand_click': '클릭 시 확장', 'settings_block_button_mode': '차단 버튼 표시 모드', 'settings_block_hover': '호버 시 표시', 'settings_block_always': '항상 표시', 'settings_horizontal_position': '수평 위치', 'settings_collapsed_width': '축소 너비', 'settings_expanded_width': '확장 너비', 'settings_cancel': '취소', 'settings_save': '저장', 'panel_top_title': '범용 포럼 필터', 'panel_top_current_domain': '현재 도메인: ', 'panel_top_page_type': '현재 페이지 유형: ', 'panel_top_page_type_main': '메인 페이지', 'panel_top_page_type_sub': '서브 페이지', 'panel_top_page_type_content': '콘텐츠 페이지', 'panel_top_page_type_unknown': '알 수 없는 페이지 유형', 'panel_top_enable_domain': '이 도메인 설정 활성화', 'panel_top_settings': '설정', 'panel_top_settings_title': '패널 설정', 'panel_top_settings_button': '⚙ 설정', 'global_config_title': '전역 설정', 'global_config_keywords': '전역 키워드', 'global_config_usernames': '전역 사용자 이름', 'global_config_share_keywords': '메인/콘텐츠 페이지 공유 키워드', 'global_config_share_usernames': '메인/콘텐츠 페이지 공유 사용자 이름', 'global_config_linkimport_input_placeholder': '설정 링크 입력', 'global_config_add_global_url': '추가', 'global_config_apply_global_apply': '적용', 'keywords_config_title': '키워드 설정', 'keywords_config_keywords_list_title': '키워드 목록', 'keywords_config_keywords_regex_title': '키워드 정규식', 'usernames_config_title': '사용자 이름 설정', 'usernames_config_usernames_list_title': '사용자 이름 목록', 'usernames_config_usernames_regex_title': '사용자 이름 정규식', 'url_patterns_title': 'URL 패턴', 'url_patterns_main_page_url_patterns_title': '메인 페이지 URL 패턴', 'url_patterns_sub_page_url_patterns_title': '서브 페이지 URL 패턴', 'url_patterns_content_page_url_patterns_title': '콘텐츠 페이지 URL 패턴', 'xpath_config_title': 'XPath 설정', 'xpath_config_main_and_sub_page_keywords_title': '메인/서브 페이지 제목 XPath', 'xpath_config_main_and_sub_page_usernames_title': '메인/서브 페이지 사용자 XPath', 'xpath_config_content_page_keywords_title': '콘텐츠 페이지 키워드 XPath', 'xpath_config_content_page_usernames_title': '콘텐츠 페이지 사용자 XPath', 'sync_config_title': '클라우드 동기화', 'sync_config_server_url': '서버 주소', 'sync_config_user_key': '사용자 키', 'sync_config_apply': '동기화', 'sync_config_delete': '클라우드 설정 삭제', 'sync_panel_status_connect_failed': '연결 실패: ', 'sync_panel_status_connect_error': '연결 오류: ', 'sync_panel_status_connect_success': '연결 성공', 'sync_panel_status_sync_failed': '동기화 실패: ', 'sync_panel_status_input_error': '서버 주소와 사용자 키를 먼저 설정하세요', 'sync_panel_status_delete_success': '클라우드 설정 삭제 성공', 'sync_panel_status_delete_failed': '클라우드 설정 삭제 실패: ', 'sync_panel_status_delete_confirm': '클라우드 설정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.', 'sync_panel_status_connect_server_success': '클라우드에 연결됨', 'sync_panel_status_client_to_server_success': '로컬 설정이 클라우드에 저장되었습니다!', 'sync_panel_status_config_updated': '클라우드 설정이 동기화되었습니다', 'sync_panel_status_config_conflict_1': '설정 충돌이 감지되었습니다!', 'sync_panel_status_config_conflict_2': '클라우드 설정 시간: ', 'sync_panel_status_config_conflict_3': '로컬 설정 시간: ', 'sync_panel_status_config_conflict_4': '클라우드 설정을 사용하시겠습니까? (확인을 클릭하여 클라우드 설정 사용, 취소를 클릭하여 로컬 설정 사용)', 'sync_panel_status_config_conflict_cloud_newer': '클라우드 설정이 더 최신입니다', 'sync_panel_status_config_conflict_local_newer': '로컬 설정이 더 최신입니다', 'sync_panel_status_disconnect': '연결이 끊어졌습니다. 다시 연결을 시도합니다...', 'array_editor_add_item_input_placeholder': '입력하세요', 'array_editor_add_item_input_placeholder_regex': '정규식 입력', 'array_editor_add_item': '추가', 'array_editor_add_item_title': '새 항목 추가', 'array_editor_clear_allitem': '모두 지우기', 'array_editor_clear_allitem_title': '목록 지우기', 'array_editor_search_input_placeholder': '검색...', 'array_editor_list_empty_placeholder': '데이터 없음', 'array_editor_linkimport_input_placeholder': '링크 입력', 'array_editor_linkimport_input_button': '링크에서 가져오기', 'array_editor_linkimport_input_button_title': '링크에서 가져오기', 'array_editor_fileimport_input_button': '파일에서 가져오기', 'array_editor_fileimport_input_button_title': '파일에서 가져오기', 'array_editor_export_button': '내보내기', 'array_editor_export_button_title': '목록을 파일로 내보내기', 'panel_bottom_export_button': '설정 내보내기', 'panel_bottom_import_button': '설정 가져오기', 'panel_bottom_delete_button': '현재 도메인 설정 삭제', 'panel_bottom_save_button': '저장', 'alert_delete_confirm': '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.', 'alert_clear_confirm': '정말로 전체 목록을 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.', 'alert_invalid_file': '유효한 설정 파일을 선택하세요', 'alert_import_error': '설정 가져오기 실패', 'alert_list_empty': '목록이 이미 비어 있습니다', 'alert_url_exists': '이 URL이 이미 존재합니다!', 'alert_enter_url': '유효한 링크를 입력하세요', 'block_button_title': '사용자 차단: ' }, 'ru-RU': { 'settings_title': 'Настройки панели', 'settings_language': 'Язык', 'settings_expand_mode': 'Режим развертывания', 'settings_expand_hover': 'Развернуть при наведении', 'settings_expand_click': 'Развернуть при клике', 'settings_block_button_mode': 'Режим отображения кнопки блокировки', 'settings_block_hover': 'Показать при наведении', 'settings_block_always': 'Показывать всегда', 'settings_horizontal_position': 'Горизонтальное положение', 'settings_collapsed_width': 'Ширина в свернутом виде', 'settings_expanded_width': 'Ширина в развернутом виде', 'settings_cancel': 'Отмена', 'settings_save': 'Сохранить', 'panel_top_title': 'Универсальный фильтр форума', 'panel_top_current_domain': 'Текущий домен: ', 'panel_top_page_type': 'Тип текущей страницы: ', 'panel_top_page_type_main': 'Главная страница', 'panel_top_page_type_sub': 'Подстраница', 'panel_top_page_type_content': 'Страница контента', 'panel_top_page_type_unknown': 'Неизвестный тип страницы', 'panel_top_enable_domain': 'Включить настройки домена', 'panel_top_settings': 'Настройки', 'panel_top_settings_title': 'Настройки панели', 'panel_top_settings_button': '⚙ Настройки', 'global_config_title': 'Глобальные настройки', 'global_config_keywords': 'Глобальные ключевые слова', 'global_config_usernames': 'Глобальные имена пользователей', 'global_config_share_keywords': 'Общие ключевые слова главной/контентной страницы', 'global_config_share_usernames': 'Общие имена пользователей главной/контентной страницы', 'global_config_linkimport_input_placeholder': 'Введите ссылку конфигурации', 'global_config_add_global_url': 'Добавить', 'global_config_apply_global_apply': 'Применить', 'keywords_config_title': 'Настройки ключевых слов', 'keywords_config_keywords_list_title': 'Список ключевых слов', 'keywords_config_keywords_regex_title': 'Регулярные выражения ключевых слов', 'usernames_config_title': 'Настройки имен пользователей', 'usernames_config_usernames_list_title': 'Список имен пользователей', 'usernames_config_usernames_regex_title': 'Регулярные выражения имен пользователей', 'url_patterns_title': 'Шаблоны URL', 'url_patterns_main_page_url_patterns_title': 'Шаблоны URL главной страницы', 'url_patterns_sub_page_url_patterns_title': 'Шаблоны URL подстраниц', 'url_patterns_content_page_url_patterns_title': 'Шаблоны URL страниц контента', 'xpath_config_title': 'Настройки XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath заголовков главной/подстраниц', 'xpath_config_main_and_sub_page_usernames_title': 'XPath пользователей главной/подстраниц', 'xpath_config_content_page_keywords_title': 'XPath ключевых слов страницы контента', 'xpath_config_content_page_usernames_title': 'XPath пользователей страницы контента', 'sync_config_title': 'Облачная синхронизация', 'sync_config_server_url': 'Адрес сервера', 'sync_config_user_key': 'Ключ пользователя', 'sync_config_apply': 'Синхронизировать', 'sync_config_delete': 'Удалить облачную конфигурацию', 'sync_panel_status_connect_failed': 'Ошибка подключения: ', 'sync_panel_status_connect_error': 'Ошибка соединения: ', 'sync_panel_status_connect_success': 'Подключение успешно', 'sync_panel_status_sync_failed': 'Ошибка синхронизации: ', 'sync_panel_status_input_error': 'Пожалуйста, сначала установите адрес сервера и ключ пользователя', 'sync_panel_status_delete_success': 'Облачная конфигурация успешно удалена', 'sync_panel_status_delete_failed': 'Не удалось удалить облачную конфигурацию: ', 'sync_panel_status_delete_confirm': 'Вы уверены, что хотите удалить облачную конфигурацию? Это действие нельзя отменить.', 'sync_panel_status_connect_server_success': 'Подключено к облаку', 'sync_panel_status_client_to_server_success': 'Локальная конфигурация сохранена в облаке!', 'sync_panel_status_config_updated': 'Облачная конфигурация синхронизирована', 'sync_panel_status_config_conflict_1': 'Обнаружен конфликт конфигурации!', 'sync_panel_status_config_conflict_2': 'Время облачной конфигурации: ', 'sync_panel_status_config_conflict_3': 'Время локальной конфигурации: ', 'sync_panel_status_config_conflict_4': 'Использовать облачную конфигурацию? (Нажмите OK для использования облачной конфигурации, Отмена для использования локальной)', 'sync_panel_status_config_conflict_cloud_newer': 'Облачная конфигурация новее', 'sync_panel_status_config_conflict_local_newer': 'Локальная конфигурация новее', 'sync_panel_status_disconnect': 'Соединение потеряно, попытка переподключения...', 'array_editor_add_item_input_placeholder': 'Введите значение', 'array_editor_add_item_input_placeholder_regex': 'Введите регулярное выражение', 'array_editor_add_item': 'Добавить', 'array_editor_add_item_title': 'Добавить новый элемент', 'array_editor_clear_allitem': 'Очистить все', 'array_editor_clear_allitem_title': 'Очистить список', 'array_editor_search_input_placeholder': 'Поиск...', 'array_editor_list_empty_placeholder': 'Нет данных', 'array_editor_linkimport_input_placeholder': 'Введите ссылку', 'array_editor_linkimport_input_button': 'Импорт из ссылки', 'array_editor_linkimport_input_button_title': 'Импорт из ссылки', 'array_editor_fileimport_input_button': 'Импорт из файла', 'array_editor_fileimport_input_button_title': 'Импорт из файла', 'array_editor_export_button': 'Экспорт', 'array_editor_export_button_title': 'Экспорт списка в файл', 'panel_bottom_export_button': 'Экспорт настроек', 'panel_bottom_import_button': 'Импорт настроек', 'panel_bottom_delete_button': 'Удалить настройки текущего домена', 'panel_bottom_save_button': 'Сохранить', 'alert_delete_confirm': 'Вы уверены, что хотите удалить? Это действие нельзя отменить.', 'alert_clear_confirm': 'Вы уверены, что хотите очистить весь список? Это действие нельзя отменить.', 'alert_invalid_file': 'Пожалуйста, выберите действительный файл конфигурации', 'alert_import_error': 'Не удалось импортировать настройки', 'alert_list_empty': 'Список уже пуст', 'alert_url_exists': 'Этот URL уже существует!', 'alert_enter_url': 'Пожалуйста, введите действительную ссылку', 'block_button_title': 'Заблокировать пользователя: ' }, 'fr-FR': { 'settings_title': 'Paramètres du panneau', 'settings_language': 'Langue', 'settings_expand_mode': "Mode d'expansion", 'settings_expand_hover': 'Développer au survol', 'settings_expand_click': 'Développer au clic', 'settings_block_button_mode': 'Mode du bouton de blocage', 'settings_block_hover': 'Afficher au survol', 'settings_block_always': 'Toujours afficher', 'settings_horizontal_position': 'Position horizontale', 'settings_collapsed_width': 'Largeur réduite', 'settings_expanded_width': 'Largeur développée', 'settings_cancel': 'Annuler', 'settings_save': 'Enregistrer', 'panel_top_title': 'Filtre de forum universel', 'panel_top_current_domain': 'Domaine actuel : ', 'panel_top_page_type': 'Type de page actuel : ', 'panel_top_page_type_main': 'Page principale', 'panel_top_page_type_sub': 'Sous-page', 'panel_top_page_type_content': 'Page de contenu', 'panel_top_page_type_unknown': 'Type de page inconnu', 'panel_top_enable_domain': 'Activer la configuration du domaine', 'panel_top_settings': 'Paramètres', 'panel_top_settings_title': 'Paramètres du panneau', 'panel_top_settings_button': '⚙ Paramètres', 'global_config_title': 'Configuration globale', 'global_config_keywords': 'Mots-clés globaux', 'global_config_usernames': "Noms d'utilisateur globaux", 'global_config_share_keywords': 'Mots-clés partagés principale/contenu', 'global_config_share_usernames': "Noms d'utilisateur partagés principale/contenu", 'global_config_linkimport_input_placeholder': 'Entrez le lien de configuration', 'global_config_add_global_url': 'Ajouter', 'global_config_apply_global_apply': 'Appliquer', 'keywords_config_title': 'Configuration des mots-clés', 'keywords_config_keywords_list_title': 'Liste des mots-clés', 'keywords_config_keywords_regex_title': 'Expressions régulières des mots-clés', 'usernames_config_title': "Configuration des noms d'utilisateur", 'usernames_config_usernames_list_title': "Liste des noms d'utilisateur", 'usernames_config_usernames_regex_title': "Expressions régulières des noms d'utilisateur", 'url_patterns_title': 'Modèles URL', 'url_patterns_main_page_url_patterns_title': 'Modèles URL page principale', 'url_patterns_sub_page_url_patterns_title': 'Modèles URL sous-pages', 'url_patterns_content_page_url_patterns_title': 'Modèles URL pages de contenu', 'xpath_config_title': 'Configuration XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath titre principale/sous-pages', 'xpath_config_main_and_sub_page_usernames_title': 'XPath utilisateur principale/sous-pages', 'xpath_config_content_page_keywords_title': 'XPath mots-clés page de contenu', 'xpath_config_content_page_usernames_title': 'XPath utilisateur page de contenu', 'sync_config_title': 'Synchronisation cloud', 'sync_config_server_url': 'Adresse du serveur', 'sync_config_user_key': 'Clé utilisateur', 'sync_config_apply': 'Synchroniser', 'sync_config_delete': 'Supprimer la configuration cloud', 'sync_panel_status_connect_failed': 'Échec de la connexion : ', 'sync_panel_status_connect_error': 'Erreur de connexion : ', 'sync_panel_status_connect_success': 'Connexion réussie', 'sync_panel_status_sync_failed': 'Échec de la synchronisation : ', 'sync_panel_status_input_error': "Veuillez d'abord configurer l'adresse du serveur et la clé utilisateur", 'sync_panel_status_delete_success': 'Configuration cloud supprimée avec succès', 'sync_panel_status_delete_failed': 'Échec de la suppression de la configuration cloud : ', 'sync_panel_status_delete_confirm': 'Êtes-vous sûr de vouloir supprimer la configuration cloud ? Cette action est irréversible.', 'sync_panel_status_connect_server_success': 'Connecté au cloud', 'sync_panel_status_client_to_server_success': 'Configuration locale sauvegardée dans le cloud !', 'sync_panel_status_config_updated': 'Configuration cloud synchronisée', 'sync_panel_status_config_conflict_1': 'Conflit de configuration détecté !', 'sync_panel_status_config_conflict_2': 'Date de la configuration cloud : ', 'sync_panel_status_config_conflict_3': 'Date de la configuration locale : ', 'sync_panel_status_config_conflict_4': 'Utiliser la configuration cloud ? (Cliquez OK pour utiliser la configuration cloud, Annuler pour utiliser la configuration locale)', 'sync_panel_status_config_conflict_cloud_newer': 'La configuration cloud est plus récente', 'sync_panel_status_config_conflict_local_newer': 'La configuration locale est plus récente', 'sync_panel_status_disconnect': 'Connexion perdue, tentative de reconnexion...', 'array_editor_add_item_input_placeholder': 'Entrez une valeur', 'array_editor_add_item_input_placeholder_regex': 'Entrez une expression régulière', 'array_editor_add_item': 'Ajouter', 'array_editor_add_item_title': 'Ajouter un nouvel élément', 'array_editor_clear_allitem': 'Tout effacer', 'array_editor_clear_allitem_title': 'Effacer la liste', 'array_editor_search_input_placeholder': 'Rechercher...', 'array_editor_list_empty_placeholder': 'Aucune donnée', 'array_editor_linkimport_input_placeholder': 'Entrez un lien', 'array_editor_linkimport_input_button': 'Importer depuis un lien', 'array_editor_linkimport_input_button_title': 'Importer depuis un lien', 'array_editor_fileimport_input_button': 'Importer depuis un fichier', 'array_editor_fileimport_input_button_title': 'Importer depuis un fichier', 'array_editor_export_button': 'Exporter', 'array_editor_export_button_title': 'Exporter la liste vers un fichier', 'panel_bottom_export_button': 'Exporter la configuration', 'panel_bottom_import_button': 'Importer la configuration', 'panel_bottom_delete_button': 'Supprimer la configuration du domaine', 'panel_bottom_save_button': 'Enregistrer', 'alert_delete_confirm': 'Êtes-vous sûr de vouloir supprimer ? Cette action est irréversible.', 'alert_clear_confirm': 'Êtes-vous sûr de vouloir effacer toute la liste ? Cette action est irréversible.', 'alert_invalid_file': 'Veuillez sélectionner un fichier de configuration valide', 'alert_import_error': "Échec de l'importation de la configuration", 'alert_list_empty': 'La liste est déjà vide', 'alert_url_exists': 'Cette URL existe déjà !', 'alert_enter_url': 'Veuillez entrer un lien valide', 'block_button_title': 'Bloquer l\'utilisateur: ' }, 'de-DE': { 'settings_title': 'Panel-Einstellungen', 'settings_language': 'Sprache', 'settings_expand_mode': 'Erweiterungsmodus', 'settings_expand_hover': 'Beim Hover erweitern', 'settings_expand_click': 'Beim Klick erweitern', 'settings_block_button_mode': 'Blockierknopf-Anzeigemodus', 'settings_block_hover': 'Beim Hover anzeigen', 'settings_block_always': 'Immer anzeigen', 'settings_horizontal_position': 'Horizontale Position', 'settings_collapsed_width': 'Eingeklappte Breite', 'settings_expanded_width': 'Ausgeklappte Breite', 'settings_cancel': 'Abbrechen', 'settings_save': 'Speichern', 'panel_top_title': 'Universeller Forum-Filter', 'panel_top_current_domain': 'Aktuelle Domain: ', 'panel_top_page_type': 'Aktueller Seitentyp: ', 'panel_top_page_type_main': 'Hauptseite', 'panel_top_page_type_sub': 'Unterseite', 'panel_top_page_type_content': 'Inhaltsseite', 'panel_top_page_type_unknown': 'Unbekannter Seitentyp', 'panel_top_enable_domain': 'Domain-Konfiguration aktivieren', 'panel_top_settings': 'Einstellungen', 'panel_top_settings_title': 'Panel-Einstellungen', 'panel_top_settings_button': '⚙ Einstellungen', 'global_config_title': 'Globale Konfiguration', 'global_config_keywords': 'Globale Schlüsselwörter', 'global_config_usernames': 'Globale Benutzernamen', 'global_config_share_keywords': 'Geteilte Schlüsselwörter Haupt/Inhalt', 'global_config_share_usernames': 'Geteilte Benutzernamen Haupt/Inhalt', 'global_config_linkimport_input_placeholder': 'Konfigurationslink eingeben', 'global_config_add_global_url': 'Hinzufügen', 'global_config_apply_global_apply': 'Anwenden', 'keywords_config_title': 'Schlüsselwort-Konfiguration', 'keywords_config_keywords_list_title': 'Schlüsselwörterliste', 'keywords_config_keywords_regex_title': 'Schlüsselwörter-Regex', 'usernames_config_title': 'Benutzernamen-Konfiguration', 'usernames_config_usernames_list_title': 'Benutzernamen-Liste', 'usernames_config_usernames_regex_title': 'Benutzernamen-Regex', 'url_patterns_title': 'URL-Muster', 'url_patterns_main_page_url_patterns_title': 'Hauptseiten-URL-Muster', 'url_patterns_sub_page_url_patterns_title': 'Unterseiten-URL-Muster', 'url_patterns_content_page_url_patterns_title': 'Inhaltsseiten-URL-Muster', 'xpath_config_title': 'XPath-Konfiguration', 'xpath_config_main_and_sub_page_keywords_title': 'Haupt/Unterseiten-Titel-XPath', 'xpath_config_main_and_sub_page_usernames_title': 'Haupt/Unterseiten-Benutzer-XPath', 'xpath_config_content_page_keywords_title': 'Inhaltsseiten-Schlüsselwörter-XPath', 'xpath_config_content_page_usernames_title': 'Inhaltsseiten-Benutzer-XPath', 'sync_config_title': 'Cloud-Synchronisation', 'sync_config_server_url': 'Server-Adresse', 'sync_config_user_key': 'Benutzerschlüssel', 'sync_config_apply': 'Synchronisieren', 'sync_config_delete': 'Cloud-Konfiguration löschen', 'sync_panel_status_connect_failed': 'Verbindung fehlgeschlagen: ', 'sync_panel_status_connect_error': 'Verbindungsfehler: ', 'sync_panel_status_connect_success': 'Verbindung erfolgreich', 'sync_panel_status_sync_failed': 'Synchronisation fehlgeschlagen: ', 'sync_panel_status_input_error': 'Bitte geben Sie zuerst Server-Adresse und Benutzerschlüssel ein', 'sync_panel_status_delete_success': 'Cloud-Konfiguration erfolgreich gelöscht', 'sync_panel_status_delete_failed': 'Löschen der Cloud-Konfiguration fehlgeschlagen: ', 'sync_panel_status_delete_confirm': 'Sind Sie sicher, dass Sie die Cloud-Konfiguration löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.', 'sync_panel_status_connect_server_success': 'Mit Cloud verbunden', 'sync_panel_status_client_to_server_success': 'Lokale Konfiguration wurde in der Cloud gespeichert!', 'sync_panel_status_config_updated': 'Cloud-Konfiguration synchronisiert', 'sync_panel_status_config_conflict_1': 'Konfigurationskonflikt erkannt!', 'sync_panel_status_config_conflict_2': 'Cloud-Konfiguration Zeit: ', 'sync_panel_status_config_conflict_3': 'Lokale Konfiguration Zeit: ', 'sync_panel_status_config_conflict_4': 'Cloud-Konfiguration verwenden? (OK für Cloud-Konfiguration, Abbrechen für lokale Konfiguration)', 'sync_panel_status_config_conflict_cloud_newer': 'Cloud-Konfiguration ist neuer', 'sync_panel_status_config_conflict_local_newer': 'Lokale Konfiguration ist neuer', 'sync_panel_status_disconnect': 'Verbindung getrennt, versuche neu zu verbinden...', 'array_editor_add_item_input_placeholder': 'Wert eingeben', 'array_editor_add_item_input_placeholder_regex': 'Regulären Ausdruck eingeben', 'array_editor_add_item': 'Hinzufügen', 'array_editor_add_item_title': 'Neues Element hinzufügen', 'array_editor_clear_allitem': 'Alles löschen', 'array_editor_clear_allitem_title': 'Liste löschen', 'array_editor_search_input_placeholder': 'Suchen...', 'array_editor_list_empty_placeholder': 'Keine Daten', 'array_editor_linkimport_input_placeholder': 'Link eingeben', 'array_editor_linkimport_input_button': 'Von Link importieren', 'array_editor_linkimport_input_button_title': 'Von Link importieren', 'array_editor_fileimport_input_button': 'Aus Datei importieren', 'array_editor_fileimport_input_button_title': 'Aus Datei importieren', 'array_editor_export_button': 'Exportieren', 'array_editor_export_button_title': 'Liste in Datei exportieren', 'panel_bottom_export_button': 'Konfiguration exportieren', 'panel_bottom_import_button': 'Konfiguration importieren', 'panel_bottom_delete_button': 'Aktuelle Domain-Konfiguration löschen', 'panel_bottom_save_button': 'Speichern', 'alert_delete_confirm': 'Sind Sie sicher, dass Sie löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.', 'alert_clear_confirm': 'Sind Sie sicher, dass Sie die gesamte Liste löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.', 'alert_invalid_file': 'Bitte wählen Sie eine gültige Konfigurationsdatei', 'alert_import_error': 'Fehler beim Importieren der Konfiguration', 'alert_list_empty': 'Die Liste ist bereits leer', 'alert_url_exists': 'Diese URL existiert bereits!', 'alert_enter_url': 'Bitte geben Sie einen gültigen Link ein', 'block_button_title': 'Benutzer blockieren: ' }, 'it-IT': { 'settings_title': 'Impostazioni pannello', 'settings_language': 'Lingua', 'settings_expand_mode': 'Modalità espansione', 'settings_expand_hover': 'Espandi al passaggio', 'settings_expand_click': 'Espandi al clic', 'settings_block_button_mode': 'Modalità pulsante blocco', 'settings_block_hover': 'Mostra al passaggio', 'settings_block_always': 'Mostra sempre', 'settings_horizontal_position': 'Posizione orizzontale', 'settings_collapsed_width': 'Larghezza chiusa', 'settings_expanded_width': 'Larghezza aperta', 'settings_cancel': 'Annulla', 'settings_save': 'Salva', 'panel_top_title': 'Filtro forum universale', 'panel_top_current_domain': 'Dominio attuale: ', 'panel_top_page_type': 'Tipo pagina attuale: ', 'panel_top_page_type_main': 'Pagina principale', 'panel_top_page_type_sub': 'Sottopagina', 'panel_top_page_type_content': 'Pagina contenuto', 'panel_top_page_type_unknown': 'Tipo pagina sconosciuto', 'panel_top_enable_domain': 'Attiva configurazione dominio', 'panel_top_settings': 'Impostazioni', 'panel_top_settings_title': 'Impostazioni pannello', 'panel_top_settings_button': '⚙ Impostazioni', 'global_config_title': 'Configurazione globale', 'global_config_keywords': 'Parole chiave globali', 'global_config_usernames': 'Nomi utente globali', 'global_config_share_keywords': 'Parole chiave condivise principale/contenuto', 'global_config_share_usernames': 'Nomi utente condivisi principale/contenuto', 'global_config_linkimport_input_placeholder': 'Inserisci link configurazione', 'global_config_add_global_url': 'Aggiungi', 'global_config_apply_global_apply': 'Applica', 'keywords_config_title': 'Configurazione parole chiave', 'keywords_config_keywords_list_title': 'Lista parole chiave', 'keywords_config_keywords_regex_title': 'Regex parole chiave', 'usernames_config_title': 'Configurazione nomi utente', 'usernames_config_usernames_list_title': 'Lista nomi utente', 'usernames_config_usernames_regex_title': 'Regex nomi utente', 'url_patterns_title': 'Pattern URL', 'url_patterns_main_page_url_patterns_title': 'Pattern URL pagina principale', 'url_patterns_sub_page_url_patterns_title': 'Pattern URL sottopagine', 'url_patterns_content_page_url_patterns_title': 'Pattern URL pagine contenuto', 'xpath_config_title': 'Configurazione XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath titolo principale/sottopagine', 'xpath_config_main_and_sub_page_usernames_title': 'XPath utente principale/sottopagine', 'xpath_config_content_page_keywords_title': 'XPath parole chiave pagina contenuto', 'xpath_config_content_page_usernames_title': 'XPath utente pagina contenuto', 'sync_config_title': 'Sincronizzazione cloud', 'sync_config_server_url': 'Indirizzo server', 'sync_config_user_key': 'Chiave utente', 'sync_config_apply': 'Sincronizza', 'sync_config_delete': 'Elimina configurazione cloud', 'sync_panel_status_connect_failed': 'Connessione fallita: ', 'sync_panel_status_connect_error': 'Errore di connessione: ', 'sync_panel_status_connect_success': 'Connessione riuscita', 'sync_panel_status_sync_failed': 'Sincronizzazione fallita: ', 'sync_panel_status_input_error': 'Inserisci prima indirizzo server e chiave utente', 'sync_panel_status_delete_success': 'Configurazione cloud eliminata con successo', 'sync_panel_status_delete_failed': 'Eliminazione configurazione cloud fallita: ', 'sync_panel_status_delete_confirm': 'Sei sicuro di voler eliminare la configurazione cloud? Questa azione non può essere annullata.', 'sync_panel_status_connect_server_success': 'Connesso al cloud', 'sync_panel_status_client_to_server_success': 'Configurazione locale salvata nel cloud!', 'sync_panel_status_config_updated': 'Configurazione cloud sincronizzata', 'sync_panel_status_config_conflict_1': 'Rilevato conflitto di configurazione!', 'sync_panel_status_config_conflict_2': 'Data configurazione cloud: ', 'sync_panel_status_config_conflict_3': 'Data configurazione locale: ', 'sync_panel_status_config_conflict_4': 'Usare la configurazione cloud? (OK per usare cloud, Annulla per usare locale)', 'sync_panel_status_config_conflict_cloud_newer': 'La configurazione cloud è più recente', 'sync_panel_status_config_conflict_local_newer': 'La configurazione locale è più recente', 'sync_panel_status_disconnect': 'Connessione persa, tentativo di riconnessione...', 'array_editor_add_item_input_placeholder': 'Inserisci valore', 'array_editor_add_item_input_placeholder_regex': 'Inserisci espressione regolare', 'array_editor_add_item': 'Aggiungi', 'array_editor_add_item_title': 'Aggiungi nuovo elemento', 'array_editor_clear_allitem': 'Cancella tutto', 'array_editor_clear_allitem_title': 'Cancella lista', 'array_editor_search_input_placeholder': 'Cerca...', 'array_editor_list_empty_placeholder': 'Nessun dato', 'array_editor_linkimport_input_placeholder': 'Inserisci link', 'array_editor_linkimport_input_button': 'Importa da link', 'array_editor_linkimport_input_button_title': 'Importa da link', 'array_editor_fileimport_input_button': 'Importa da file', 'array_editor_fileimport_input_button_title': 'Importa da file', 'array_editor_export_button': 'Esporta', 'array_editor_export_button_title': 'Esporta lista in file', 'panel_bottom_export_button': 'Esporta configurazione', 'panel_bottom_import_button': 'Importa configurazione', 'panel_bottom_delete_button': 'Elimina configurazione dominio attuale', 'panel_bottom_save_button': 'Salva', 'alert_delete_confirm': 'Sei sicuro di voler eliminare? Questa azione non può essere annullata.', 'alert_clear_confirm': 'Sei sicuro di voler cancellare tutta la lista? Questa azione non può essere annullata.', 'alert_invalid_file': 'Seleziona un file di configurazione valido', 'alert_import_error': 'Impossibile importare la configurazione', 'alert_list_empty': 'La lista è già vuota', 'alert_url_exists': 'Questo URL esiste già!', 'alert_enter_url': 'Inserisci un link valido', 'block_button_title': 'Blocca utente: ' }, 'th-TH': { 'settings_title': 'ตั้งค่าแผง', 'settings_language': 'ภาษา', 'settings_expand_mode': 'โหมดขยาย', 'settings_expand_hover': 'ขยายเมื่อชี้', 'settings_expand_click': 'ขยายเมื่อคลิก', 'settings_block_button_mode': 'โหมดแสดงปุ่มบล็อก', 'settings_block_hover': 'แสดงเมื่อชี้', 'settings_block_always': 'แสดงตลอด', 'settings_horizontal_position': 'ตำแหน่งแนวนอน', 'settings_collapsed_width': 'ความกว้างเมื่อยุบ', 'settings_expanded_width': 'ความกว้างเมื่อขยาย', 'settings_cancel': 'ยกเลิก', 'settings_save': 'บันทึก', 'panel_top_title': 'ตัวกรองฟอรัมสากล', 'panel_top_current_domain': 'โดเมนปัจจุบัน: ', 'panel_top_page_type': 'ประเภทหน้าปัจจุบัน: ', 'panel_top_page_type_main': 'หน้าหลัก', 'panel_top_page_type_sub': 'หน้าย่อย', 'panel_top_page_type_content': 'หน้าเนื้อหา', 'panel_top_page_type_unknown': 'ไม่ทราบประเภทหน้า', 'panel_top_enable_domain': 'เปิดใช้งานการตั้งค่าโดเมนนี้', 'panel_top_settings': 'ตั้งค่า', 'panel_top_settings_title': 'ตั้งค่าแผง', 'panel_top_settings_button': '⚙ ตั้งค่า', 'global_config_title': 'การตั้งค่าทั่วไป', 'global_config_keywords': 'คำสำคัญทั่วไป', 'global_config_usernames': 'ชื่อผู้ใช้ทั่วไป', 'global_config_share_keywords': 'คำสำคัญร่วมหน้าหลัก/เนื้อหา', 'global_config_share_usernames': 'ชื่อผู้ใช้ร่วมหน้าหลัก/เนื้อหา', 'global_config_linkimport_input_placeholder': 'ป้อนลิงก์การตั้งค่า', 'global_config_add_global_url': 'เพิ่ม', 'global_config_apply_global_apply': 'นำไปใช้', 'keywords_config_title': 'การตั้งค่าคำสำคัญ', 'keywords_config_keywords_list_title': 'รายการคำสำคัญ', 'keywords_config_keywords_regex_title': 'Regex คำสำคัญ', 'usernames_config_title': 'การตั้งค่าชื่อผู้ใช้', 'usernames_config_usernames_list_title': 'รายการชื่อผู้ใช้', 'usernames_config_usernames_regex_title': 'Regex ชื่อผู้ใช้', 'url_patterns_title': 'รูปแบบ URL', 'url_patterns_main_page_url_patterns_title': 'รูปแบบ URL หน้าหลัก', 'url_patterns_sub_page_url_patterns_title': 'รูปแบบ URL หน้าย่อย', 'url_patterns_content_page_url_patterns_title': 'รูปแบบ URL หน้าเนื้อหา', 'xpath_config_title': 'การตั้งค่า XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath หัวข้อหน้าหลัก/ย่อย', 'xpath_config_main_and_sub_page_usernames_title': 'XPath ผู้ใช้หน้าหลัก/ย่อย', 'xpath_config_content_page_keywords_title': 'XPath คำสำคัญหน้าเนื้อหา', 'xpath_config_content_page_usernames_title': 'XPath ผู้ใช้หน้าเนื้อหา', 'sync_config_title': 'การซิงค์คลาวด์', 'sync_config_server_url': 'ที่อยู่เซิร์ฟเวอร์', 'sync_config_user_key': 'คีย์ผู้ใช้', 'sync_config_apply': 'ซิงค์', 'sync_config_delete': 'ลบการตั้งค่าคลาวด์', 'sync_panel_status_connect_failed': 'การเชื่อมต่อล้มเหลว: ', 'sync_panel_status_connect_error': 'ข้อผิดพลาดในการเชื่อมต่อ: ', 'sync_panel_status_connect_success': 'เชื่อมต่อสำเร็จ', 'sync_panel_status_sync_failed': 'การซิงค์ล้มเหลว: ', 'sync_panel_status_input_error': 'กรุณาตั้งค่าที่อยู่เซิร์ฟเวอร์และคีย์ผู้ใช้ก่อน', 'sync_panel_status_delete_success': 'ลบการตั้งค่าคลาวด์สำเร็จ', 'sync_panel_status_delete_failed': 'ลบการตั้งค่าคลาวด์ล้มเหลว: ', 'sync_panel_status_delete_confirm': 'คุณแน่ใจหรือไม่ที่จะลบการตั้งค่าคลาวด์? การดำเนินการนี้ไม่สามารถย้อนกลับได้', 'sync_panel_status_connect_server_success': 'เชื่อมต่อกับคลาวด์แล้ว', 'sync_panel_status_client_to_server_success': 'บันทึกการตั้งค่าในเครื่องไปยังคลาวด์แล้ว!', 'sync_panel_status_config_updated': 'ซิงค์การตั้งค่าคลาวด์แล้ว', 'sync_panel_status_config_conflict_1': 'ตรวจพบการตั้งค่าที่ขัดแย้ง!', 'sync_panel_status_config_conflict_2': 'เวลาการตั้งค่าคลาวด์: ', 'sync_panel_status_config_conflict_3': 'เวลาการตั้งค่าในเครื่อง: ', 'sync_panel_status_config_conflict_4': 'ต้องการใช้การตั้งค่าคลาวด์หรือไม่? (กด OK เพื่อใช้การตั้งค่าคลาวด์, กด Cancel เพื่อใช้การตั้งค่าในเครื่อง)', 'sync_panel_status_config_conflict_cloud_newer': 'การตั้งค่าคลาวด์ใหม่กว่า', 'sync_panel_status_config_conflict_local_newer': 'การตั้งค่าในเครื่องใหม่กว่า', 'sync_panel_status_disconnect': 'การเชื่อมต่อขาดหาย กำลังพยายามเชื่อมต่อใหม่...', 'array_editor_add_item_input_placeholder': 'กรุณาป้อน', 'array_editor_add_item_input_placeholder_regex': 'กรุณาป้อน regex', 'array_editor_add_item': 'เพิ่ม', 'array_editor_add_item_title': 'เพิ่มรายการใหม่', 'array_editor_clear_allitem': 'ล้าง', 'array_editor_clear_allitem_title': 'ล้างรายการ', 'array_editor_search_input_placeholder': 'ค้นหา...', 'array_editor_list_empty_placeholder': 'ไม่มีข้อมูล', 'array_editor_linkimport_input_placeholder': 'กรุณาป้อนลิงก์', 'array_editor_linkimport_input_button': 'นำเข้าจากลิงก์', 'array_editor_linkimport_input_button_title': 'นำเข้ารายการจากลิงก์', 'array_editor_fileimport_input_button': 'นำเข้าจากไฟล์', 'array_editor_fileimport_input_button_title': 'นำเข้ารายการจากไฟล์', 'array_editor_export_button': 'ส่งออก', 'array_editor_export_button_title': 'ส่งออกรายการไปยังไฟล์', 'panel_bottom_export_button': 'ส่งออกการตั้งค่า', 'panel_bottom_import_button': 'นำเข้าการตั้งค่า', 'panel_bottom_delete_button': 'ลบการตั้งค่าโดเมนปัจจุบัน', 'panel_bottom_save_button': 'บันทึก', 'alert_delete_confirm': 'คุณแน่ใจหรือไม่ที่จะลบ? การดำเนินการนี้ไม่สามารถย้อนกลับได้', 'alert_clear_confirm': 'คุณแน่ใจหรือไม่ที่จะล้างรายการทั้งหมด? การดำเนินการนี้ไม่สามารถย้อนกลับได้', 'alert_invalid_file': 'กรุณาเลือกไฟล์การตั้งค่าที่ถูกต้อง', 'alert_import_error': 'นำเข้าการตั้งค่าล้มเหลว', 'alert_list_empty': 'รายการว่างเปล่าแล้ว', 'alert_url_exists': 'URL นี้มีอยู่แล้ว!', 'alert_enter_url': 'กรุณาป้อนลิงก์ที่ถูกต้อง', 'block_button_title': 'บล็อกผู้ใช้: ' }, 'es-ES': { 'settings_title': 'Configuración del Panel', 'settings_language': 'Idioma', 'settings_expand_mode': 'Modo de Expansión', 'settings_expand_hover': 'Expandir al Pasar', 'settings_expand_click': 'Expandir al Hacer Clic', 'settings_block_button_mode': 'Modo de Visualización del Botón de Bloqueo', 'settings_block_hover': 'Mostrar al Pasar', 'settings_block_always': 'Mostrar Siempre', 'settings_horizontal_position': 'Posición Horizontal', 'settings_collapsed_width': 'Ancho Contraído', 'settings_expanded_width': 'Ancho Expandido', 'settings_cancel': 'Cancelar', 'settings_save': 'Guardar', 'panel_top_title': 'Filtro Universal de Foros', 'panel_top_current_domain': 'Dominio Actual: ', 'panel_top_page_type': 'Tipo de Página Actual: ', 'panel_top_page_type_main': 'Página Principal', 'panel_top_page_type_sub': 'Subpágina', 'panel_top_page_type_content': 'Página de Contenido', 'panel_top_page_type_unknown': 'Tipo de Página Desconocido', 'panel_top_enable_domain': 'Habilitar Configuración de Dominio', 'panel_top_settings': 'Configuración', 'panel_top_settings_title': 'Configuración del Panel', 'panel_top_settings_button': '⚙ Configuración', 'global_config_title': 'Configuración Global', 'global_config_keywords': 'Palabras Clave Globales', 'global_config_usernames': 'Nombres de Usuario Globales', 'global_config_share_keywords': 'Palabras Clave Compartidas Principal/Contenido', 'global_config_share_usernames': 'Nombres de Usuario Compartidos Principal/Contenido', 'global_config_linkimport_input_placeholder': 'Introducir enlace de configuración', 'global_config_add_global_url': 'Añadir', 'global_config_apply_global_apply': 'Aplicar', 'keywords_config_title': 'Configuración de Palabras Clave', 'keywords_config_keywords_list_title': 'Lista de Palabras Clave', 'keywords_config_keywords_regex_title': 'Regex de Palabras Clave', 'usernames_config_title': 'Configuración de Nombres de Usuario', 'usernames_config_usernames_list_title': 'Lista de Nombres de Usuario', 'usernames_config_usernames_regex_title': 'Regex de Nombres de Usuario', 'url_patterns_title': 'Patrones de URL', 'url_patterns_main_page_url_patterns_title': 'Patrones URL de Página Principal', 'url_patterns_sub_page_url_patterns_title': 'Patrones URL de Subpágina', 'url_patterns_content_page_url_patterns_title': 'Patrones URL de Página de Contenido', 'xpath_config_title': 'Configuración XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath de Título Principal/Subpágina', 'xpath_config_main_and_sub_page_usernames_title': 'XPath de Usuario Principal/Subpágina', 'xpath_config_content_page_keywords_title': 'XPath de Palabras Clave de Contenido', 'xpath_config_content_page_usernames_title': 'XPath de Usuario de Contenido', 'sync_config_title': 'Sincronización en la Nube', 'sync_config_server_url': 'Dirección del Servidor', 'sync_config_user_key': 'Clave de Usuario', 'sync_config_apply': 'Sincronizar', 'sync_config_delete': 'Eliminar Configuración en la Nube', 'sync_panel_status_connect_failed': 'Error de conexión: ', 'sync_panel_status_connect_error': 'Error de conexión: ', 'sync_panel_status_connect_success': 'Conexión exitosa', 'sync_panel_status_sync_failed': 'Error de sincronización: ', 'sync_panel_status_input_error': 'Por favor, configure primero la dirección del servidor y la clave de usuario', 'sync_panel_status_delete_success': 'Configuración en la nube eliminada con éxito', 'sync_panel_status_delete_failed': 'Error al eliminar la configuración en la nube: ', 'sync_panel_status_delete_confirm': '¿Está seguro de que desea eliminar la configuración en la nube? Esta acción no se puede deshacer.', 'sync_panel_status_connect_server_success': 'Conectado a la nube', 'sync_panel_status_client_to_server_success': '¡Configuración local guardada en la nube!', 'sync_panel_status_config_updated': 'Configuración en la nube sincronizada', 'sync_panel_status_config_conflict_1': '¡Se detectó un conflicto de configuración!', 'sync_panel_status_config_conflict_2': 'Hora de configuración en la nube: ', 'sync_panel_status_config_conflict_3': 'Hora de configuración local: ', 'sync_panel_status_config_conflict_4': '¿Usar configuración en la nube? (Aceptar para usar la configuración en la nube, Cancelar para usar la configuración local)', 'sync_panel_status_config_conflict_cloud_newer': 'La configuración en la nube es más reciente', 'sync_panel_status_config_conflict_local_newer': 'La configuración local es más reciente', 'sync_panel_status_disconnect': 'Conexión perdida, intentando reconectar...', 'array_editor_add_item_input_placeholder': 'Por favor, introduce', 'array_editor_add_item_input_placeholder_regex': 'Por favor, introduce regex', 'array_editor_add_item': 'Añadir', 'array_editor_add_item_title': 'Añadir Nuevo Elemento', 'array_editor_clear_allitem': 'Limpiar', 'array_editor_clear_allitem_title': 'Limpiar Lista', 'array_editor_search_input_placeholder': 'Buscar...', 'array_editor_list_empty_placeholder': 'Sin Datos', 'array_editor_linkimport_input_placeholder': 'Por favor, introduce el enlace', 'array_editor_linkimport_input_button': 'Importar desde Enlace', 'array_editor_linkimport_input_button_title': 'Importar Lista desde Enlace', 'array_editor_fileimport_input_button': 'Importar desde Archivo', 'array_editor_fileimport_input_button_title': 'Importar Lista desde Archivo', 'array_editor_export_button': 'Exportar', 'array_editor_export_button_title': 'Exportar Lista a Archivo', 'panel_bottom_export_button': 'Exportar Configuración', 'panel_bottom_import_button': 'Importar Configuración', 'panel_bottom_delete_button': 'Eliminar Configuración de Dominio Actual', 'panel_bottom_save_button': 'Guardar', 'alert_delete_confirm': '¿Estás seguro de que quieres eliminar? Esta acción no se puede deshacer.', 'alert_clear_confirm': '¿Estás seguro de que quieres limpiar toda la lista? Esta acción no se puede deshacer.', 'alert_invalid_file': 'Por favor, selecciona un archivo de configuración válido', 'alert_import_error': 'Error al importar configuración', 'alert_list_empty': 'La lista ya está vacía', 'alert_url_exists': '¡Esta URL ya existe!', 'alert_enter_url': 'Por favor, introduce un enlace válido', 'block_button_title': 'Bloquear Usuario: ' }, 'pt-PT': { 'settings_title': 'Configurações do Painel', 'settings_language': 'Idioma', 'settings_expand_mode': 'Modo de Expansão', 'settings_expand_hover': 'Expandir ao Passar', 'settings_expand_click': 'Expandir ao Clicar', 'settings_block_button_mode': 'Modo de Exibição do Botão de Bloqueio', 'settings_block_hover': 'Mostrar ao Passar', 'settings_block_always': 'Mostrar Sempre', 'settings_horizontal_position': 'Posição Horizontal', 'settings_collapsed_width': 'Largura Recolhida', 'settings_expanded_width': 'Largura Expandida', 'settings_cancel': 'Cancelar', 'settings_save': 'Salvar', 'panel_top_title': 'Filtro Universal de Fóruns', 'panel_top_current_domain': 'Domínio Atual: ', 'panel_top_page_type': 'Tipo de Página Atual: ', 'panel_top_page_type_main': 'Página Principal', 'panel_top_page_type_sub': 'Subpágina', 'panel_top_page_type_content': 'Página de Conteúdo', 'panel_top_page_type_unknown': 'Tipo de Página Desconhecido', 'panel_top_enable_domain': 'Ativar Configuração do Domínio', 'panel_top_settings': 'Configurações', 'panel_top_settings_title': 'Configurações do Painel', 'panel_top_settings_button': '⚙ Configurações', 'global_config_title': 'Configuração Global', 'global_config_keywords': 'Palavras-chave Globais', 'global_config_usernames': 'Nomes de Usuário Globais', 'global_config_share_keywords': 'Palavras-chave Compartilhadas Principal/Conteúdo', 'global_config_share_usernames': 'Nomes de Usuário Compartilhados Principal/Conteúdo', 'global_config_linkimport_input_placeholder': 'Inserir link de configuração', 'global_config_add_global_url': 'Adicionar', 'global_config_apply_global_apply': 'Aplicar', 'keywords_config_title': 'Configuração de Palavras-chave', 'keywords_config_keywords_list_title': 'Lista de Palavras-chave', 'keywords_config_keywords_regex_title': 'Regex de Palavras-chave', 'usernames_config_title': 'Configuração de Nomes de Usuário', 'usernames_config_usernames_list_title': 'Lista de Nomes de Usuário', 'usernames_config_usernames_regex_title': 'Regex de Nomes de Usuário', 'url_patterns_title': 'Padrões de URL', 'url_patterns_main_page_url_patterns_title': 'Padrões URL da Página Principal', 'url_patterns_sub_page_url_patterns_title': 'Padrões URL da Subpágina', 'url_patterns_content_page_url_patterns_title': 'Padrões URL da Página de Conteúdo', 'xpath_config_title': 'Configuração XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath do Título Principal/Subpágina', 'xpath_config_main_and_sub_page_usernames_title': 'XPath do Usuário Principal/Subpágina', 'xpath_config_content_page_keywords_title': 'XPath de Palavras-chave do Conteúdo', 'xpath_config_content_page_usernames_title': 'XPath do Usuário do Conteúdo', 'sync_config_title': 'Sincronização na Nuvem', 'sync_config_server_url': 'Endereço do Servidor', 'sync_config_user_key': 'Chave do Usuário', 'sync_config_apply': 'Sincronizar', 'sync_config_delete': 'Excluir Configuração da Nuvem', 'sync_panel_status_connect_failed': 'Falha na conexão: ', 'sync_panel_status_connect_error': 'Erro de conexão: ', 'sync_panel_status_connect_success': 'Conexão bem-sucedida', 'sync_panel_status_sync_failed': 'Falha na sincronização: ', 'sync_panel_status_input_error': 'Por favor, defina primeiro o endereço do servidor e a chave do usuário', 'sync_panel_status_delete_success': 'Configuração da nuvem excluída com sucesso', 'sync_panel_status_delete_failed': 'Falha ao excluir configuração da nuvem: ', 'sync_panel_status_delete_confirm': 'Tem certeza que deseja excluir a configuração da nuvem? Esta ação não pode ser desfeita.', 'sync_panel_status_connect_server_success': 'Conectado à nuvem', 'sync_panel_status_client_to_server_success': 'Configuração local salva na nuvem!', 'sync_panel_status_config_updated': 'Configuração da nuvem sincronizada', 'sync_panel_status_config_conflict_1': 'Detectado conflito de configuração!', 'sync_panel_status_config_conflict_2': 'Hora da configuração na nuvem: ', 'sync_panel_status_config_conflict_3': 'Hora da configuração local: ', 'sync_panel_status_config_conflict_4': 'Usar configuração da nuvem? (OK para usar configuração da nuvem, Cancelar para usar configuração local)', 'sync_panel_status_config_conflict_cloud_newer': 'Configuração da nuvem é mais recente', 'sync_panel_status_config_conflict_local_newer': 'Configuração local é mais recente', 'sync_panel_status_disconnect': 'Conexão perdida, tentando reconectar...', 'array_editor_add_item_input_placeholder': 'Por favor, insira', 'array_editor_add_item_input_placeholder_regex': 'Por favor, insira regex', 'array_editor_add_item': 'Adicionar', 'array_editor_add_item_title': 'Adicionar Novo Item', 'array_editor_clear_allitem': 'Limpar', 'array_editor_clear_allitem_title': 'Limpar Lista', 'array_editor_search_input_placeholder': 'Pesquisar...', 'array_editor_list_empty_placeholder': 'Sem Dados', 'array_editor_linkimport_input_placeholder': 'Por favor, insira o link', 'array_editor_linkimport_input_button': 'Importar do Link', 'array_editor_linkimport_input_button_title': 'Importar Lista do Link', 'array_editor_fileimport_input_button': 'Importar do Arquivo', 'array_editor_fileimport_input_button_title': 'Importar Lista do Arquivo', 'array_editor_export_button': 'Exportar', 'array_editor_export_button_title': 'Exportar Lista para Arquivo', 'panel_bottom_export_button': 'Exportar Configuração', 'panel_bottom_import_button': 'Importar Configuração', 'panel_bottom_delete_button': 'Excluir Configuração do Domínio Atual', 'panel_bottom_save_button': 'Salvar', 'alert_delete_confirm': 'Tem certeza que deseja excluir? Esta ação não pode ser desfeita.', 'alert_clear_confirm': 'Tem certeza que deseja limpar toda a lista? Esta ação não pode ser desfeita.', 'alert_invalid_file': 'Por favor, selecione um arquivo de configuração válido', 'alert_import_error': 'Falha ao importar configuração', 'alert_list_empty': 'A lista já está vazia', 'alert_url_exists': 'Esta URL já existe!', 'alert_enter_url': 'Por favor, insira um link válido', 'block_button_title': 'Bloquear Usuário: ' }, 'hi-IN': { 'settings_title': 'पैनल सेटिंग्स', 'settings_language': 'भाषा', 'settings_expand_mode': 'विस्तार मोड', 'settings_expand_hover': 'होवर पर विस्तार', 'settings_expand_click': 'क्लिक पर विस्तार', 'settings_block_button_mode': 'ब्लॉक बटन प्रदर्शन मोड', 'settings_block_hover': 'होवर पर दिखाएं', 'settings_block_always': 'हमेशा दिखाएं', 'settings_horizontal_position': 'क्षैतिज स्थिति', 'settings_collapsed_width': 'संकुचित चौड़ाई', 'settings_expanded_width': 'विस्तारित चौड़ाई', 'settings_cancel': 'रद्द करें', 'settings_save': 'सहेजें', 'panel_top_title': 'यूनिवर्सल फोरम फिल्टर', 'panel_top_current_domain': 'वर्तमान डोमेन: ', 'panel_top_page_type': 'वर्तमान पृष्ठ प्रकार: ', 'panel_top_page_type_main': 'मुख्य पृष्ठ', 'panel_top_page_type_sub': 'उप पृष्ठ', 'panel_top_page_type_content': 'सामग्री पृष्ठ', 'panel_top_page_type_unknown': 'अज्ञात पृष्ठ प्रकार', 'panel_top_enable_domain': 'डोमेन कॉन्फ़िगरेशन सक्षम करें', 'panel_top_settings': 'सेटिंग्स', 'panel_top_settings_title': 'पैनल सेटिंग्स', 'panel_top_settings_button': '⚙ सेटिंग्स', 'global_config_title': 'वैश्विक कॉन्फ़िगरेशन', 'global_config_keywords': 'वैश्विक कीवर्ड', 'global_config_usernames': 'वैश्विक उपयोगकर्ता नाम', 'global_config_share_keywords': 'मुख्य/सामग्री पृष्ठ साझा कीवर्ड', 'global_config_share_usernames': 'मुख्य/सामग्री पृष्ठ साझा उपयोगकर्ता नाम', 'global_config_linkimport_input_placeholder': 'कॉन्फ़िग लिंक दर्ज करें', 'global_config_add_global_url': 'जोड़ें', 'global_config_apply_global_apply': 'लागू करें', 'keywords_config_title': 'कीवर्ड कॉन्फ़िगरेशन', 'keywords_config_keywords_list_title': 'कीवर्ड सूची', 'keywords_config_keywords_regex_title': 'कीवर्ड रेगेक्स', 'usernames_config_title': 'उपयोगकर्ता नाम कॉन्फ़िगरेशन', 'usernames_config_usernames_list_title': 'उपयोगकर्ता नाम सूची', 'usernames_config_usernames_regex_title': 'उपयोगकर्ता नाम रेगेक्स', 'url_patterns_title': 'URL पैटर्न', 'url_patterns_main_page_url_patterns_title': 'मुख्य पृष्ठ URL पैटर्न', 'url_patterns_sub_page_url_patterns_title': 'उप पृष्ठ URL पैटर्न', 'url_patterns_content_page_url_patterns_title': 'सामग्री पृष्ठ URL पैटर्न', 'xpath_config_title': 'XPath कॉन्फ़िगरेशन', 'xpath_config_main_and_sub_page_keywords_title': 'मुख्य/उप पृष्ठ शीर्षक XPath', 'xpath_config_main_and_sub_page_usernames_title': 'मुख्य/उप पृष्ठ उपयोगकर्ता XPath', 'xpath_config_content_page_keywords_title': 'सामग्री पृष्ठ कीवर्ड XPath', 'xpath_config_content_page_usernames_title': 'सामग्री पृष्ठ उपयोगकर्ता XPath', 'sync_config_title': 'क्लाउड सिंक', 'sync_config_server_url': 'सर्वर पता', 'sync_config_user_key': 'उपयोगकर्ता कुंजी', 'sync_config_apply': 'सिंक करें', 'sync_config_delete': 'क्लाउड कॉन्फ़िग हटाएं', 'sync_panel_status_connect_failed': 'कनेक्शन विफल: ', 'sync_panel_status_connect_error': 'कनेक्शन त्रुटि: ', 'sync_panel_status_connect_success': 'कनेक्शन सफल', 'sync_panel_status_sync_failed': 'सिंक विफल: ', 'sync_panel_status_input_error': 'कृपया पहले सर्वर पता और उपयोगकर्ता कुंजी सेट करें', 'sync_panel_status_delete_success': 'क्लाउड कॉन्फ़िग सफलतापूर्वक हटाया गया', 'sync_panel_status_delete_failed': 'क्लाउड कॉन्फ़िग हटाने में विफल: ', 'sync_panel_status_delete_confirm': 'क्या आप वाकई क्लाउड कॉन्फ़िग हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।', 'sync_panel_status_connect_server_success': 'क्लाउड से कनेक्ट हो गया', 'sync_panel_status_client_to_server_success': 'स्थानीय कॉन्फ़िग क्लाउड में सहेजा गया!', 'sync_panel_status_config_updated': 'क्लाउड कॉन्फ़िग सिंक हो गया', 'sync_panel_status_config_conflict_1': 'कॉन्फ़िग विरोध का पता चला!', 'sync_panel_status_config_conflict_2': 'क्लाउड कॉन्फ़िग समय: ', 'sync_panel_status_config_conflict_3': 'स्थानीय कॉन्फ़िग समय: ', 'sync_panel_status_config_conflict_4': 'क्या क्लाउड कॉन्फ़िग का उपयोग करें? (क्लाउड कॉन्फ़िग के लिए OK, स्थानीय कॉन्फ़िग के लिए रद्द करें)', 'sync_panel_status_config_conflict_cloud_newer': 'क्लाउड कॉन्फ़िग नया है', 'sync_panel_status_config_conflict_local_newer': 'स्थानीय कॉन्फ़िग नया है', 'sync_panel_status_disconnect': 'कनेक्शन टूट गया, पुनः कनेक्ट करने का प्रयास कर रहा है...', 'array_editor_add_item_input_placeholder': 'कृपया दर्ज करें', 'array_editor_add_item_input_placeholder_regex': 'कृपया रेगेक्स दर्ज करें', 'array_editor_add_item': 'जोड़ें', 'array_editor_add_item_title': 'नई आइटम जोड़ें', 'array_editor_clear_allitem': 'साफ़ करें', 'array_editor_clear_allitem_title': 'सूची साफ़ करें', 'array_editor_search_input_placeholder': 'खोजें...', 'array_editor_list_empty_placeholder': 'कोई डेटा नहीं', 'array_editor_linkimport_input_placeholder': 'लिंक दर्ज करें', 'array_editor_linkimport_input_button': 'लिंक से आयात', 'array_editor_linkimport_input_button_title': 'लिंक से सूची आयात करें', 'array_editor_fileimport_input_button': 'फ़ाइल से आयात', 'array_editor_fileimport_input_button_title': 'फ़ाइल से सूची आयात करें', 'array_editor_export_button': 'निर्यात', 'array_editor_export_button_title': 'सूची को फ़ाइल में निर्यात करें', 'panel_bottom_export_button': 'कॉन्फ़िग निर्यात करें', 'panel_bottom_import_button': 'कॉन्फ़िग आयात करें', 'panel_bottom_delete_button': 'वर्तमान डोमेन कॉन्फ़िग हटाएं', 'panel_bottom_save_button': 'सहेजें', 'alert_delete_confirm': 'क्या आप वाकई हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।', 'alert_clear_confirm': 'क्या आप वाकई पूरी सूची साफ़ करना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।', 'alert_invalid_file': 'कृपया वैध कॉन्फ़िग फ़ाइल चुनें', 'alert_import_error': 'कॉन्फ़िग आयात विफल', 'alert_list_empty': 'सूची पहले से ही खाली है', 'alert_url_exists': 'यह URL पहले से मौजूद है!', 'alert_enter_url': 'कृपया वैध लिंक दर्ज करें', 'block_button_title': 'उपयोगकर्ता को ब्लॉक करें: ' }, 'id-ID': { 'settings_title': 'Pengaturan Panel', 'settings_language': 'Bahasa', 'settings_expand_mode': 'Mode Ekspansi', 'settings_expand_hover': 'Ekspansi saat Hover', 'settings_expand_click': 'Ekspansi saat Klik', 'settings_block_button_mode': 'Mode Tampilan Tombol Blokir', 'settings_block_hover': 'Tampilkan saat Hover', 'settings_block_always': 'Selalu Tampilkan', 'settings_horizontal_position': 'Posisi Horizontal', 'settings_collapsed_width': 'Lebar Terlipat', 'settings_expanded_width': 'Lebar Terekspansi', 'settings_cancel': 'Batal', 'settings_save': 'Simpan', 'panel_top_title': 'Filter Forum Universal', 'panel_top_current_domain': 'Domain Saat Ini: ', 'panel_top_page_type': 'Tipe Halaman Saat Ini: ', 'panel_top_page_type_main': 'Halaman Utama', 'panel_top_page_type_sub': 'Halaman Sub', 'panel_top_page_type_content': 'Halaman Konten', 'panel_top_page_type_unknown': 'Tipe Halaman Tidak Dikenal', 'panel_top_enable_domain': 'Aktifkan Konfigurasi Domain', 'panel_top_settings': 'Pengaturan', 'panel_top_settings_title': 'Pengaturan Panel', 'panel_top_settings_button': '⚙ Pengaturan', 'global_config_title': 'Konfigurasi Global', 'global_config_keywords': 'Kata Kunci Global', 'global_config_usernames': 'Nama Pengguna Global', 'global_config_share_keywords': 'Kata Kunci Bersama Halaman Utama/Konten', 'global_config_share_usernames': 'Nama Pengguna Bersama Halaman Utama/Konten', 'global_config_linkimport_input_placeholder': 'Masukkan tautan konfigurasi', 'global_config_add_global_url': 'Tambah', 'global_config_apply_global_apply': 'Terapkan', 'keywords_config_title': 'Konfigurasi Kata Kunci', 'keywords_config_keywords_list_title': 'Daftar Kata Kunci', 'keywords_config_keywords_regex_title': 'Regex Kata Kunci', 'usernames_config_title': 'Konfigurasi Nama Pengguna', 'usernames_config_usernames_list_title': 'Daftar Nama Pengguna', 'usernames_config_usernames_regex_title': 'Regex Nama Pengguna', 'url_patterns_title': 'Pola URL', 'url_patterns_main_page_url_patterns_title': 'Pola URL Halaman Utama', 'url_patterns_sub_page_url_patterns_title': 'Pola URL Halaman Sub', 'url_patterns_content_page_url_patterns_title': 'Pola URL Halaman Konten', 'xpath_config_title': 'Konfigurasi XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath Judul Halaman Utama/Sub', 'xpath_config_main_and_sub_page_usernames_title': 'XPath Pengguna Halaman Utama/Sub', 'xpath_config_content_page_keywords_title': 'XPath Kata Kunci Halaman Konten', 'xpath_config_content_page_usernames_title': 'XPath Pengguna Halaman Konten', 'sync_config_title': 'Sinkronisasi Cloud', 'sync_config_server_url': 'Alamat Server', 'sync_config_user_key': 'Kunci Pengguna', 'sync_config_apply': 'Sinkronkan', 'sync_config_delete': 'Hapus Konfigurasi Cloud', 'sync_panel_status_connect_failed': 'Gagal terhubung: ', 'sync_panel_status_connect_error': 'Error koneksi: ', 'sync_panel_status_connect_success': 'Berhasil terhubung', 'sync_panel_status_sync_failed': 'Sinkronisasi gagal: ', 'sync_panel_status_input_error': 'Harap atur alamat server dan kunci pengguna terlebih dahulu', 'sync_panel_status_delete_success': 'Berhasil menghapus konfigurasi cloud', 'sync_panel_status_delete_failed': 'Gagal menghapus konfigurasi cloud: ', 'sync_panel_status_delete_confirm': 'Apakah Anda yakin ingin menghapus konfigurasi cloud? Tindakan ini tidak dapat dibatalkan.', 'sync_panel_status_connect_server_success': 'Terhubung ke cloud', 'sync_panel_status_client_to_server_success': 'Konfigurasi lokal telah disimpan ke cloud!', 'sync_panel_status_config_updated': 'Konfigurasi cloud telah disinkronkan', 'sync_panel_status_config_conflict_1': 'Terdeteksi konflik konfigurasi!', 'sync_panel_status_config_conflict_2': 'Waktu konfigurasi cloud: ', 'sync_panel_status_config_conflict_3': 'Waktu konfigurasi lokal: ', 'sync_panel_status_config_conflict_4': 'Gunakan konfigurasi cloud? (Klik OK untuk menggunakan konfigurasi cloud, Batal untuk menggunakan konfigurasi lokal)', 'sync_panel_status_config_conflict_cloud_newer': 'Konfigurasi cloud lebih baru', 'sync_panel_status_config_conflict_local_newer': 'Konfigurasi lokal lebih baru', 'sync_panel_status_disconnect': 'Koneksi terputus, mencoba menghubungkan kembali...', 'array_editor_add_item_input_placeholder': 'Silakan masukkan', 'array_editor_add_item_input_placeholder_regex': 'Silakan masukkan regex', 'array_editor_add_item': 'Tambah', 'array_editor_add_item_title': 'Tambah Item Baru', 'array_editor_clear_allitem': 'Bersihkan', 'array_editor_clear_allitem_title': 'Bersihkan Daftar', 'array_editor_search_input_placeholder': 'Cari...', 'array_editor_list_empty_placeholder': 'Tidak Ada Data', 'array_editor_linkimport_input_placeholder': 'Masukkan tautan', 'array_editor_linkimport_input_button': 'Impor dari Tautan', 'array_editor_linkimport_input_button_title': 'Impor Daftar dari Tautan', 'array_editor_fileimport_input_button': 'Impor dari File', 'array_editor_fileimport_input_button_title': 'Impor Daftar dari File', 'array_editor_export_button': 'Ekspor', 'array_editor_export_button_title': 'Ekspor Daftar ke File', 'panel_bottom_export_button': 'Ekspor Konfigurasi', 'panel_bottom_import_button': 'Impor Konfigurasi', 'panel_bottom_delete_button': 'Hapus Konfigurasi Domain Saat Ini', 'panel_bottom_save_button': 'Simpan', 'alert_delete_confirm': 'Anda yakin ingin menghapus? Tindakan ini tidak dapat dibatalkan.', 'alert_clear_confirm': 'Anda yakin ingin membersihkan seluruh daftar? Tindakan ini tidak dapat dibatalkan.', 'alert_invalid_file': 'Silakan pilih file konfigurasi yang valid', 'alert_import_error': 'Gagal mengimpor konfigurasi', 'alert_list_empty': 'Daftar sudah kosong', 'alert_url_exists': 'URL ini sudah ada!', 'alert_enter_url': 'Silakan masukkan tautan yang valid', 'block_button_title': 'Blokir Pengguna: ' }, 'vi-VN': { 'settings_title': 'Cài đặt Panel', 'settings_language': 'Ngôn ngữ', 'settings_expand_mode': 'Chế độ Mở rộng', 'settings_expand_hover': 'Mở rộng khi Di chuột', 'settings_expand_click': 'Mở rộng khi Nhấp chuột', 'settings_block_button_mode': 'Chế độ Hiển thị Nút Chặn', 'settings_block_hover': 'Hiển thị khi Di chuột', 'settings_block_always': 'Luôn Hiển thị', 'settings_horizontal_position': 'Vị trí Ngang', 'settings_collapsed_width': 'Độ rộng Thu gọn', 'settings_expanded_width': 'Độ rộng Mở rộng', 'settings_cancel': 'Hủy', 'settings_save': 'Lưu', 'panel_top_title': 'Bộ lọc Diễn đàn Phổ thông', 'panel_top_current_domain': 'Tên miền Hiện tại: ', 'panel_top_page_type': 'Loại Trang Hiện tại: ', 'panel_top_page_type_main': 'Trang Chính', 'panel_top_page_type_sub': 'Trang Phụ', 'panel_top_page_type_content': 'Trang Nội dung', 'panel_top_page_type_unknown': 'Loại Trang Không xác định', 'panel_top_enable_domain': 'Bật Cấu hình Tên miền', 'panel_top_settings': 'Cài đặt', 'panel_top_settings_title': 'Cài đặt Panel', 'panel_top_settings_button': '⚙ Cài đặt', 'global_config_title': 'Cấu hình Toàn cục', 'global_config_keywords': 'Từ khóa Toàn cục', 'global_config_usernames': 'Tên người dùng Toàn cục', 'global_config_share_keywords': 'Từ khóa Chung Trang Chính/Nội dung', 'global_config_share_usernames': 'Tên người dùng Chung Trang Chính/Nội dung', 'global_config_linkimport_input_placeholder': 'Nhập liên kết cấu hình', 'global_config_add_global_url': 'Thêm', 'global_config_apply_global_apply': 'Áp dụng', 'keywords_config_title': 'Cấu hình Từ khóa', 'keywords_config_keywords_list_title': 'Danh sách Từ khóa', 'keywords_config_keywords_regex_title': 'Regex Từ khóa', 'usernames_config_title': 'Cấu hình Tên người dùng', 'usernames_config_usernames_list_title': 'Danh sách Tên người dùng', 'usernames_config_usernames_regex_title': 'Regex Tên người dùng', 'url_patterns_title': 'Mẫu URL', 'url_patterns_main_page_url_patterns_title': 'Mẫu URL Trang Chính', 'url_patterns_sub_page_url_patterns_title': 'Mẫu URL Trang Phụ', 'url_patterns_content_page_url_patterns_title': 'Mẫu URL Trang Nội dung', 'xpath_config_title': 'Cấu hình XPath', 'xpath_config_main_and_sub_page_keywords_title': 'XPath Tiêu đề Trang Chính/Phụ', 'xpath_config_main_and_sub_page_usernames_title': 'XPath Người dùng Trang Chính/Phụ', 'xpath_config_content_page_keywords_title': 'XPath Từ khóa Trang Nội dung', 'xpath_config_content_page_usernames_title': 'XPath Người dùng Trang Nội dung', 'sync_config_title': 'Đồng bộ hóa Đám mây', 'sync_config_server_url': 'Địa chỉ Máy chủ', 'sync_config_user_key': 'Khóa Người dùng', 'sync_config_apply': 'Đồng bộ', 'sync_config_delete': 'Xóa Cấu hình Đám mây', 'sync_panel_status_connect_failed': 'Kết nối thất bại: ', 'sync_panel_status_connect_error': 'Lỗi kết nối: ', 'sync_panel_status_connect_success': 'Kết nối thành công', 'sync_panel_status_sync_failed': 'Đồng bộ thất bại: ', 'sync_panel_status_input_error': 'Vui lòng thiết lập địa chỉ máy chủ và khóa người dùng trước', 'sync_panel_status_delete_success': 'Xóa cấu hình đám mây thành công', 'sync_panel_status_delete_failed': 'Xóa cấu hình đám mây thất bại: ', 'sync_panel_status_delete_confirm': 'Bạn có chắc muốn xóa cấu hình đám mây? Hành động này không thể hoàn tác.', 'sync_panel_status_connect_server_success': 'Đã kết nối tới đám mây', 'sync_panel_status_client_to_server_success': 'Cấu hình cục bộ đã được lưu lên đám mây!', 'sync_panel_status_config_updated': 'Đã đồng bộ cấu hình đám mây', 'sync_panel_status_config_conflict_1': 'Phát hiện xung đột cấu hình!', 'sync_panel_status_config_conflict_2': 'Thời gian cấu hình đám mây: ', 'sync_panel_status_config_conflict_3': 'Thời gian cấu hình cục bộ: ', 'sync_panel_status_config_conflict_4': 'Sử dụng cấu hình đám mây? (Nhấn OK để dùng cấu hình đám mây, Hủy để dùng cấu hình cục bộ)', 'sync_panel_status_config_conflict_cloud_newer': 'Cấu hình đám mây mới hơn', 'sync_panel_status_config_conflict_local_newer': 'Cấu hình cục bộ mới hơn', 'sync_panel_status_disconnect': 'Mất kết nối, đang thử kết nối lại...', 'array_editor_add_item_input_placeholder': 'Vui lòng nhập', 'array_editor_add_item_input_placeholder_regex': 'Vui lòng nhập regex', 'array_editor_add_item': 'Thêm', 'array_editor_add_item_title': 'Thêm Mục mới', 'array_editor_clear_allitem': 'Xóa tất cả', 'array_editor_clear_allitem_title': 'Xóa Danh sách', 'array_editor_search_input_placeholder': 'Tìm kiếm...', 'array_editor_list_empty_placeholder': 'Không có Dữ liệu', 'array_editor_linkimport_input_placeholder': 'Nhập liên kết', 'array_editor_linkimport_input_button': 'Nhập từ Liên kết', 'array_editor_linkimport_input_button_title': 'Nhập Danh sách từ Liên kết', 'array_editor_fileimport_input_button': 'Nhập từ Tệp', 'array_editor_fileimport_input_button_title': 'Nhập Danh sách từ Tệp', 'array_editor_export_button': 'Xuất', 'array_editor_export_button_title': 'Xuất Danh sách ra Tệp', 'panel_bottom_export_button': 'Xuất Cấu hình', 'panel_bottom_import_button': 'Nhập Cấu hình', 'panel_bottom_delete_button': 'Xóa Cấu hình Tên miền Hiện tại', 'panel_bottom_save_button': 'Lưu', 'alert_delete_confirm': 'Bạn có chắc muốn xóa? Hành động này không thể hoàn tác.', 'alert_clear_confirm': 'Bạn có chắc muốn xóa toàn bộ danh sách? Hành động này không thể hoàn tác.', 'alert_invalid_file': 'Vui lòng chọn tệp cấu hình hợp lệ', 'alert_import_error': 'Nhập cấu hình thất bại', 'alert_list_empty': 'Danh sách đã trống', 'alert_url_exists': 'URL này đã tồn tại!', 'alert_enter_url': 'Vui lòng nhập liên kết hợp lệ', 'block_button_title': 'Chặn Người dùng: ' } }
    let GLOBAL_CONFIG = {
        "GLOBAL_KEYWORDS": false,
        "GLOBAL_USERNAMES": false,
        "SHOW_BLOCK_BUTTON": "hover",
        "TIME_INTERVAL": 30,
        "LANGUAGE": navigator.language,
        "SHOW_WORD_SEGMENTATION": false,
        "GLOBAL_CONFIG_URL": [],
        "CONFIG_SECTION_COLLAPSED":{
            "global_SECTION_COLLAPSED": true,
            "keywords_SECTION_COLLAPSED": true,
            "usernames_SECTION_COLLAPSED": true,
            "url_SECTION_COLLAPSED": true,
            "xpath_SECTION_COLLAPSED": true,
            "sync_SECTION_COLLAPSED": true,
        },
        "EDITOR_STATES": {
            "keywords": false,
            "keywords_regex": false,
            "usernames": false,
            "usernames_regex": false,
            "mainpage_url_patterns": false,
            "subpage_url_patterns": false,
            "contentpage_url_patterns": false,
            "main_and_sub_page_title_xpath": false,
            "main_and_sub_page_user_xpath": false,
            "contentpage_title_xpath": false,
            "contentpage_user_xpath": false
        },
        "SYNC_CONFIG": {
            "server_url": "",
            "user_key": "",
            "lastSyncTime": 0
        }
    }
    const SAMPLE_TEMPLATE = {
        "domain": "",
        "enabled": true,
        "compatibilityMode": false,
        "mainPageUrlPatterns": [],
        "subPageUrlPatterns": [],
        "contentPageUrlPatterns": [],
        "shareKeywordsAcrossPages": false,
        "shareUsernamesAcrossPages": true,
        "mainAndSubPageKeywords": {
            "whitelistMode": false,
            "xpath": [],
            "keywords": [],
            "regexPatterns": []
        },
        "mainAndSubPageUserKeywords": {
            "whitelistMode": false,
            "xpath": [],
            "keywords": [],
            "regexPatterns": []
        },
        "contentPageKeywords": {
            "whitelistMode": false,
            "xpath": [],
            "keywords": [],
            "regexPatterns": []
        },
        "contentPageUserKeywords": {
            "whitelistMode": false,
            "xpath": [],
            "keywords": [],
            "regexPatterns": []
        }
    }
    const FORUM_TEMPLATES = {
        discuz: {
            detect: () => {
                return document.querySelector('meta[name="generator"][content*="Discuz"]') !== null ||
                       document.querySelector('script[src*="discuz"]') !== null ||
                       document.querySelector('a[href*="discuz.vip"]') !== null;
            },
            config: {
                "mainPageUrlPatterns": ['/forum-.*$','/forum\\.php\\?mod=forumdisplay.*'],
                "contentPageUrlPatterns": ['/thread-.*$','/forum\\.php\\?mod=viewthread.*'],
                "mainAndSubPageKeywords": {
                    "xpath": ['//tbody//a[@class="s xst"]/text()','//li/a/text()']
                },
                "mainAndSubPageUserKeywords": {
                    "xpath": ['//tbody//td[@class="by"]//a/text()','//li//span[@class="by"]/text()']
                },
                "contentPageKeywords": {
                    "xpath": ['//div[@id]//td[@class="t_f"]/text()','//div[@class="plc cl"]//div[@class="message"]/text()']
                },
                "contentPageUserKeywords": {
                    "xpath": ['//div[@id]//tbody//a[@class="xw1"]/text()','//div[@class="plc cl"]//a[@class="blue"]/text()']
                }
            }
        },
        discourse: {
            detect: () => {
                return document.querySelector('meta[name="generator"][content*="Discourse"]') !== null ||
                       document.querySelector('script[src*="discourse"]') !== null ||
                       document.querySelector('a[href*="discourse.org"]') !== null ||
                       document.body.classList.contains('discourse');
            },
            config: {
                "mainPageUrlPatterns": ['^/$','/c/','/hot','^/top(?!\\w)','/latest','/tags',],
                "contentPageUrlPatterns": ['/t'],
                "mainAndSubPageKeywords": {
                    "xpath": ['//tr[@data-topic-id]//a[@role="heading"]//span/text()']
                },
                "mainAndSubPageUserKeywords": {
                    "xpath": ['//tr[@data-topic-id]//td[@class="posters topic-list-data"]//a[@data-user-card]/@data-user-card']
                },
                "contentPageKeywords": {
                    "xpath": ['//div//article[@role="region"]//p[@dir="auto"]/text()']
                },
                "contentPageUserKeywords": {
                    "xpath": ['//div//article[@role="region"]//div[@role="heading"]//a[@data-user-card]/@data-user-card']
                }
            }
        }
    };
    const DEFAULT_CONFIG = [
        {
            "domain": "nodeseek.com",
            "mainPageUrlPatterns": ['^/$','^/categories/[^/]+/?$','^/search.*','^/\\?sortBy.*','^/award.*'],
            "subPageUrlPatterns": ['/page*'],
            "contentPageUrlPatterns": ['/post*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//li[@class="post-list-item"]//div[@class="post-title"]//a/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//li[@class="post-list-item"]//div[@class="post-info"]//a/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//li[@class="content-item"]//article[@class="post-content"]//p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//li[@class="content-item"]//a[@class="author-name"]/text()']
            }
        },
        {
            "domain": "nodeloc.com",
            "mainPageUrlPatterns": ['^/$','^/t/.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/d/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//li//h2[@class="DiscussionListItem-title"]/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//li//a[@class="DiscussionListItem-author"]/split(" ",0,data-original-title)']
            },
            "contentPageKeywords": {
                "xpath": ['//div[@class="PostStream-item"]//div[@class="Post-body"]//p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//div[@class="PostStream-item"]//li[@class="item-user"]//span/text()']
            }
        },
        {
            "domain": "bbs.nga.cn",
            "mainPageUrlPatterns": ['^/thread.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/read.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//tbody//a[@class="topic"]/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//tbody//a[@class="author"]/split(" ",1,title)']
            },
            "contentPageKeywords": {
                "xpath": ['//tbody//span[contains(@class,"postcontent")]/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//tbody//a[contains(@class,"userlink")]/split(=,-1,href)']
            }
        },
        {
            "domain": "tieba.baidu.com",
            "mainPageUrlPatterns": ['^/f\\?kw=.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/p/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//li//div[@class="threadlist_title pull_left j_th_tit "]//a[@class="j_th_tit "]/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//li//span[@class="frs-author-name-wrap"]//a[contains(@class,"frs-author-name")]/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//div//div[@class="d_post_content_main "]//div[@class="d_post_content j_d_post_content "]/text()',
                            '//li//span[@class="lzl_content_main"]/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//div//div[@class="d_author"]//a[@alog-group="p_author"]/text()',
                            '//li//a[@alog-group="p_author"]/text()']
            }
        },
        {
            "domain": "v2ex.com",
            "mainPageUrlPatterns": ['^/$','^/\\?tab=.*','^/recent.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/t/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//div[@class="cell item"]//span[@class="item_title"]/a/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//div[@class="cell item"]//span[@class="topic_info"]//strong//a/text()','//div[@class="cell item"]//strong/a/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//div[@class="cell"]//div[@class="reply_content"]/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//div[@class="cell"]//strong/a/text()']
            }
        },
        {
            "domain": "zhihu.com",
            "mainPageUrlPatterns": ['^/$','^/hot.*','^/follow.*','^/zvideo.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/question/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//div[@class="Card TopstoryItem TopstoryItem-isRecommend"]//a[@data-za-detail-view-element_name="Title"]/text()',
                            '//section[@class="HotItem"]//h2[@class="HotItem-title"]/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//div[@class="Card TopstoryItem TopstoryItem-isRecommend"]//a[@class="UserLink-link"]/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//div[@class="List-item"]//div[@class="RichContent-inner"]//span/p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//div[@class="List-item"]//a[@class="UserLink-link"]/text()']
            }
        },
        {
            "domain": "douban.com",
            "mainPageUrlPatterns": ['^/group/explore.*','^/group/\\d+/.*'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/group/topic/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//div[@class="channel-item"]//div[@class="bd"]//h3//a/text()',
                            '//tr//td[@class="title"]//a/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//tr//td[@nowrap]//a/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//li//div[@class="reply-content"]//p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//li//h4//a/text()']
            }
        },
        {
            "domain": "lowendtalk.com",
            "mainPageUrlPatterns": ['^/$','^/categories/[^/]+/$'],
            "subPageUrlPatterns": ['/discussions/p*','^/categories/[^/]+/?$'],
            "contentPageUrlPatterns": ['^/discussion/\\d+/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//li//div[@class="Title"]//a/text()']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": ['//li//span[contains(@class,"DiscussionAuthor")]//a/text()']
            },
            "contentPageKeywords": {
                "xpath": ['//li//div[@class="Item-Body"]//p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//li//a[@class="Username"]/text()']
            }
        },
        {
            "domain": "reddit.com",
            "mainPageUrlPatterns": ['^/$','feed=home','^/r/[^/]+/$'],
            "subPageUrlPatterns": [],
            "contentPageUrlPatterns": ['^/r/.*/comments/.*'],
            "mainAndSubPageKeywords": {
                "xpath": ['//article[@aria-label]/@aria-label']
            },
            "mainAndSubPageUserKeywords": {
                "xpath": []
            },
            "contentPageKeywords": {
                "xpath": ['//shreddit-comment//div[@slot="comment"]//p/text()']
            },
            "contentPageUserKeywords": {
                "xpath": ['//shreddit-comment//faceplate-tracker[@source="post_detail"]//a/text()']
            }
        }
    ]
    let wsConnection = null;
    function loadUserConfig() {
        try {
            let userConfig = GM_getValue('userConfig');
            let globalConfig = GM_getValue('globalConfig');
            if(globalConfig){
                const parsedConfig = JSON.parse(globalConfig);
                for (const key in parsedConfig) {
                    if (key in GLOBAL_CONFIG) {
                        GLOBAL_CONFIG[key] = parsedConfig[key];
                    }
                }
            }else{
                GM_setValue('globalConfig', JSON.stringify(GLOBAL_CONFIG));
            }
            if (userConfig) {
                userConfig = JSON.parse(userConfig);
            }
            if (!userConfig || !Array.isArray(userConfig)) {
                userConfig = [];
            }
            let isNewConfig = false;
            DEFAULT_CONFIG.forEach(defaultItem => {
                if (defaultItem.domain === 'hostloc.com') {
                }
                const existingConfig = userConfig.find(config => config.domain === defaultItem.domain);
                if (!existingConfig) {
                    const newConfig = structuredClone(SAMPLE_TEMPLATE);
                    Object.assign(newConfig, defaultItem);
                    userConfig.push(newConfig);
                    isNewConfig = true;
                    if (defaultItem.domain === 'hostloc.com') {
                    }
                }
            });
            if (isNewConfig) {
                saveUserConfig(userConfig);
            }
            return userConfig;
        } catch (error) {
            console.error('加载配置失败:', error);
            return DEFAULT_CONFIG;
        }
    }
    let isFirstLoad = true;
    let userConfig = loadUserConfig();
    function saveUserConfig(config) {
        try {
            GM_setValue('userConfig', JSON.stringify(config));
            if(isFirstLoad){
                isFirstLoad = false;
            }else{
                updateUserConfig();
            }
        } catch (error) {
            console.error('保存配置失败:', error);
        }
    }
    function saveGlobalConfig() {
        try {
            GM_setValue('globalConfig', JSON.stringify(GLOBAL_CONFIG));
        } catch (error) {
            console.error('保存全局配置失败:', error);
        }
    }
    function updateUserConfig(){
        userConfig = loadUserConfig();
    }
    function getDomainConfig(domain) {
        const config = userConfig.find(c => c.domain === domain);
        if (!config) {
            for (const [framework, template] of Object.entries(FORUM_TEMPLATES)) {
                if (template.detect()) {
                    const newConfig = structuredClone(SAMPLE_TEMPLATE);
                    Object.assign(newConfig, template.config);
                    newConfig.domain = domain;
                    newConfig.enabled = true;
                    userConfig.push(newConfig);
                    saveUserConfig(userConfig);
                    return newConfig;
                }
            }
        }
        return config;
    }
    function addDomainConfig(configData) {
        if (!configData || !configData.domain) {
            console.error('添加配置失败: domain 是必填字段');
            return {
                success: false,
                message: 'domain 是必填字段'
            };
        }
        const existingConfig = getDomainConfig(configData.domain);
        if (existingConfig) {
            console.error('添加配置失败: 已存在相同domain的配置');
            return {
                success: false,
                message: '已存在相同domain的配置'
            };
        }
        const newConfig = JSON.parse(JSON.stringify(SAMPLE_TEMPLATE));
        Object.assign(newConfig, configData);
        userConfig.push(newConfig);
        saveUserConfig(userConfig);
        return {
            success: true,
            message: '配置添加成功',
            config: newConfig
        };
    }
    function removeDomainConfig(domain){
        userConfig = userConfig.filter(config => config.domain !== domain);
        saveUserConfig(userConfig);
        return {
            success: true,
            message: '配置删除成功',
            config: userConfig
        };
    }
    function updateDomainConfigOverride(domain, configData){
        const index = userConfig.findIndex(config => config.domain === domain);
        if (index !== -1) {
            userConfig[index] = configData;
            saveUserConfig(userConfig);
            return {
                success: true,
                message: '配置更新成功',
                config: userConfig[index]
            };
        }
    }
    function updateDomainConfig(domain, configData) {
        const index = userConfig.findIndex(config => config.domain === domain);
        if (index !== -1) {
            const existingConfig = JSON.parse(JSON.stringify(userConfig[index]));
            for (const key in configData) {
                if (Array.isArray(configData[key])) {
                    existingConfig[key] = [...new Set([
                        ...(existingConfig[key] || []),
                        ...configData[key]
                    ])];
                } else if (typeof configData[key] === 'object' && configData[key] !== null) {
                    existingConfig[key] = existingConfig[key] || {};
                    for (const subKey in configData[key]) {
                        if (Array.isArray(configData[key][subKey])) {
                            existingConfig[key][subKey] = [...new Set([
                                ...(existingConfig[key][subKey] || []),
                                ...configData[key][subKey]
                            ])];
                        } else {
                            existingConfig[key][subKey] = configData[key][subKey];
                        }
                    }
                } else {
                    existingConfig[key] = configData[key];
                }
            }
            userConfig[index] = existingConfig;
            saveUserConfig(userConfig);
            return {
                success: true,
                message: '配置更新成功',
                config: userConfig[index]
            };
        }
        return {
            success: false,
            message: '未找到指定域名的配置',
            config: null
        };
    }
    function validateXPathRelationship(parentXPath, childXPath) {
        const cleanChildXPath = childXPath.replace(/^\/+/, '');
        const cleanParentXPath = parentXPath.replace(/\/+$/, '');
        const combinedXPath = `${cleanParentXPath}//${cleanChildXPath}`;
        const result = document.evaluate(
            combinedXPath,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        const matchCount = result.snapshotLength;
        return {
            isValid: matchCount > 0,
            matchCount: matchCount,
            elements: Array.from({length: matchCount}, (_, i) => result.snapshotItem(i)),
            combinedXPath: combinedXPath
        };
    }
    //获取数组中的元素，支持负索引。
    function getArrayElement(array, index) {
        if (!Array.isArray(array)) {
            throw new Error("第一个参数必须是数组。");
        }
        const numericIndex = Number(index);
        if (isNaN(numericIndex)) {
            throw new Error("索引必须是有效的数字或数字字符串。");
        }
        const adjustedIndex = numericIndex < 0 ? array.length + numericIndex : numericIndex;
        if (adjustedIndex < 0 || adjustedIndex >= array.length) {
            throw new RangeError("索引超出范围。");
        }
        return array[adjustedIndex];
    }
    function getElementsByText(xpath, searchText, useRegex = false, whitelistMode = false) {
        let isSplit = false;
        let split_char;
        let split_get_target_char_index;
        let isAttrSplit = false;
        let attrSplitAttr_attrname;
        //如果有自定义方法split，则使用自定义方法split
        if(xpath.includes('/split')){
            const args_str = xpath.split('/split')[1];
            xpath = xpath.split('/split')[0];
            const regex = /\(([^)]+)\)/;
            const match = args_str.match(regex);
            if (match) {
                const params = match[1].split(',').map(param => param.trim().replace(/^['"]|['"]$/g, ''));
                if(params.length == 3){
                    split_char = params[0];
                    split_get_target_char_index = params[1];
                    attrSplitAttr_attrname = params[2];
                    isAttrSplit = true;
                    isSplit = true;
                }
            }
        }
        const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        if (result.snapshotLength === 0) {
            return [];
        }
        const elements = [];
        const searchPattern = useRegex ? new RegExp(searchText, 'i') : (searchText ? searchText.toLowerCase() : null);
        for (let i = 0; i < result.snapshotLength; i++) {
            const element = result.snapshotItem(i);
            if (!searchText) {
                elements.push(element);
                continue;
            }
            let elementText;
            let isMatch;
            if(isSplit){
                if(isAttrSplit){
                    let args_array = element.getAttribute(attrSplitAttr_attrname).split(split_char);
                    //支持负索引
                    elementText = getArrayElement(args_array, split_get_target_char_index);
                    isMatch = useRegex ?
                    searchPattern.test(elementText) :
                    elementText.toLowerCase().includes(searchPattern);
                }
            }
            else{
                elementText = element.textContent.trim();
                isMatch = useRegex ?
                    searchPattern.test(elementText) :
                    elementText.toLowerCase().includes(searchPattern);
            }
            if (whitelistMode ? !isMatch : isMatch) {
                elements.push(element);
            }
        }
        return elements;
    }
    function extractStrings(input) {
        const result = [];
        let temp = '';
        for (let i = 0; i < input.length; i++) {
            if (input[i] === '/') {
                if (temp) {
                    result.push(temp);
                    temp = '';
                }
                continue;
            }
            temp += input[i];
        }
        if (temp) result.push(temp);
        return result;
    }
    function findTargetAncestor(xpath, element) {
        let cleanXPath = xpath;
        if (!xpath.endsWith('/text()')) {
            cleanXPath = xpath.replace(/\/text\(\)$/, '');
        }
        if (cleanXPath.includes('/@')) {
            cleanXPath = cleanXPath.split('/@')[0];
        }
        const xpathParts = extractStrings(cleanXPath);
        if (xpathParts.length > 2) {
            let elementNode = element;
            if (element.nodeType === Node.TEXT_NODE) {
                elementNode = element.parentElement;
            } else if (element.nodeType === Node.ATTRIBUTE_NODE) {
                elementNode = element.ownerElement;
            }
            const intermediateSelector = parseXPathPart(xpathParts[1]);
            const intermediateElement = elementNode.closest(intermediateSelector);
            if (intermediateElement) {
                const rootSelector = parseXPathPart(xpathParts[0]);
                let targetElement = intermediateElement.closest(rootSelector);
                if (targetElement === intermediateElement) {
                    targetElement = intermediateElement.parentElement.closest(rootSelector);
                }
                return {
                    targetElement,
                    firstElementInXPath: xpathParts[0]
                };
            }
        }
        const firstElementMatch = xpath.match(/\/+([a-zA-Z0-9_-]+(?:\[[^\]]+\])?)/)?.[1];
        if (!firstElementMatch) {
            return {
                targetElement: element,
                firstElementInXPath: null
            };
        }
        let [elementType, attributeSelector] = firstElementMatch.includes('[') ?
            firstElementMatch.split('[') :
            [firstElementMatch, null];
        const cleanAttributeSelector = attributeSelector?.replace(']', '');
        let elementNode = element;
        if (element.nodeType === Node.TEXT_NODE) {
            elementNode = element.parentElement;
        } else if (element.nodeType === Node.ATTRIBUTE_NODE) {
            elementNode = element.ownerElement;
        }
        const cssSelector = cleanAttributeSelector ?
            `${elementType}[${cleanAttributeSelector.replace('@', '')}]` :
            elementType;
        const targetElement = elementType && elementNode ?
            elementNode.closest(cssSelector) :
            elementNode;
        return {
            targetElement,
            firstElementInXPath: firstElementMatch
        };
    }
    function parseXPathPart(xpathPart) {
        const elementMatch = xpathPart.match(/([a-zA-Z0-9_-]+)(?:\[(.*?)\])?/);
        if (!elementMatch) return xpathPart;
        const [, tag, attribute] = elementMatch;
        if (!attribute) return tag;
        const attrMatch = attribute.match(/@([a-zA-Z0-9_-]+)(?:=['"]([^'"]+)['"])?/);
        if (!attrMatch) return tag;
        const [, attrName, attrValue] = attrMatch;
        return attrValue ?
            `${tag}[${attrName}="${attrValue}"]` :
            `${tag}[${attrName}]`;
    }
    function compatibilityRemovalHandler(element) {
        //TODO:通用兼容模式，未完成
        const clearNodes = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = '';
                return;
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node !== element && node.nodeName === element.nodeName) {
                    return;
                }
                const urlAttributes = ['href', 'src', 'data-src', 'data-original', 'background', 'poster'];
                urlAttributes.forEach(attr => {
                    if (node.hasAttribute(attr)) {
                        node.removeAttribute(attr);
                    }
                });
                if (node.nodeName === 'IMG') {
                    while (node.attributes.length > 0) {
                        node.removeAttribute(node.attributes[0].name);
                    }
                }
            }
            Array.from(node.childNodes).forEach(child => {
                clearNodes(child);
            });
        };
        clearNodes(element);
    }
    function removeElementsByText(xpath, searchText, useRegex = false, whitelistMode = false) {
        let xpath_before = xpath;
        if (xpath.endsWith('text()')) {
            xpath = xpath.replace(/\/text\(\)$/, '');
        }
        const elements = getElementsByText(xpath, searchText, useRegex, whitelistMode);
        if (elements.length === 0) {
            return;
        }
        elements.forEach((element, index) => {
            const { targetElement, firstElementInXPath } = findTargetAncestor(xpath, element);
            const currentConfig = getDomainConfig(getCurrentDomain());
            const isContentPage = currentConfig.contentPageUrlPatterns
                .some(pattern => new RegExp(pattern).test(getSplitUrl()));
            if(isContentPage && getCurrentDomain().includes('reddit.com')){
                compatibilityRemovalHandler(targetElement);
            }
            else{
                targetElement.parentNode?.removeChild(targetElement);
            }
        });
    }
    function removeOverflowHidden(element) {
        let currentElement = element;
        let upCount = 0;
        while (currentElement && upCount < 3) {
            const computedStyle = window.getComputedStyle(currentElement);
            if (computedStyle.overflow === 'hidden') {
                currentElement.style.overflow = 'visible';
            } else {
            }
            currentElement = currentElement.parentElement;
            upCount++;
        }
        function processChildren(el, depth) {
            if (!el || depth > 3) return;
            const children = el.children;
            for (const child of children) {
                const computedStyle = window.getComputedStyle(child);
                if (computedStyle.overflow === 'hidden') {
                    child.style.overflow = 'visible';
                } else {
                }
                processChildren(child, depth + 1);
            }
        }
        processChildren(element, 1);
    }
    let PANEL_SETTINGS = GM_getValue('panelSettings', {
        offset: 2,
        expandMode: 'click',
        collapsedWidth: 70,
        expandedWidth: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 290 : 400,
        showBlockButton: 'hover'
    });
    function addBlockButtonsToUsernames(xpath, isContentPage) {
        if (!xpath) return;
        let attributeXpath = xpath;
        let attributeElements;
        let attr;
        let isAttribute = false;
        let isSplit = false;
        let split_Xpath;
        let split_char;
        let split_get_target_char_index;
        let attrSplitElements;
        let attrSplitAttr_attrname;
        let isAttrSplit = false;
        let textSplitElements;
        let isTextSplit = false;
        //两种情况，第一种是用户名在属性里，例如：username="用户名 2024-01-01"
        //第二种是用户名在文本里，例如：<div>用户名 2024-01-01</div>
        //自定义split方法处理这两种情况
        //两种参数的情况就是用户名在文本里，第一个参数是分隔符，第二个参数是目标字符的索引，还没实现
        //三种参数的情况就是用户名在属性里，第一个参数是分隔符，第二个参数是目标字符的索引，第三个参数是属性名
        if (xpath.includes('/split')) {
            isSplit = true;
            const args_str = xpath.split('/split')[1];
            const regex = /\(([^)]+)\)/;
            const match = args_str.match(regex);
            if (match) {
                isSplit = true;
                split_Xpath = xpath.split('/split')[0];
                const params = match[1].split(',').map(param => param.trim().replace(/^['"]|['"]$/g, ''));
                if(params.length >= 2){
                    split_char = params[0];
                    split_get_target_char_index = params[1];
                    if(params.length == 2){
                        //TODO: 处理两个参数的情况
                        isTextSplit = true;
                    }
                    if(params.length == 3){
                        attrSplitAttr_attrname = params[2];
                        attrSplitElements = document.evaluate(split_Xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        isAttrSplit = true;
                        xpath = split_Xpath;
                    }
                }
            }
        }
        if (attributeXpath.includes('/@') && isSplit == false) {
            attr = attributeXpath.split('/@')[1];
            attributeXpath = attributeXpath.split('/@')[0];
            attributeElements = document.evaluate(attributeXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            isAttribute = true;
        }
        const elements = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        const elementsArray = [];
        if (isAttribute && isSplit == false) {
            for (let i = 0; i < attributeElements.snapshotLength; i++) {
                elementsArray.push(attributeElements.snapshotItem(i));
            }
        }
        else if(isAttrSplit){
            for (let i = 0; i < attrSplitElements.snapshotLength; i++) {
                elementsArray.push(attrSplitElements.snapshotItem(i));
            }
        }
        else{
            for (let i = 0; i < elements.snapshotLength; i++) {
                elementsArray.push(elements.snapshotItem(i));
                }
        }
        elementsArray.forEach((element, index) => {
            let username;
            if(isAttribute && isSplit == false){
                username = element.getAttribute(attr);
            }
            else if(isAttrSplit){
                let args_array = element.getAttribute(attrSplitAttr_attrname).split(split_char);
                username = getArrayElement(args_array, split_get_target_char_index);
            }
            else{
                username = element.textContent.trim();
            }
            const { targetElement } = findTargetAncestor(xpath, element);
            if (targetElement) {
                removeOverflowHidden(element.parentNode);
                const existingButton = targetElement.querySelector('.block-user-btn');
                if (existingButton) {
                    return;
                }
                try {
                    const blockButton = document.createElement('div');
                    blockButton.className = 'block-user-btn';
                    blockButton.setAttribute('data-username', username);
                    blockButton.textContent = '×';
                    blockButton.title = setTextfromTemplate('block_button_title') + `${username}`;
                    blockButton.style.cssText = `
                        display: ${PANEL_SETTINGS.showBlockButton === 'always' ? 'inline-flex' : 'none'};
                        align-items: center !important;
                        justify-content: center !important;
                        margin-left: 5px !important;
                        padding: 0 !important;
                        width: 1.2em !important;
                        height: 1.2em !important;
                        background: rgba(0, 0, 0, 0.6) !important;
                        color: #fff !important;
                        border-radius: 4px !important;
                        cursor: pointer !important;
                        z-index: 9999 !important;
                        transition: all 0.3s !important;
                        user-select: none !important;
                        font-size: inherit !important;
                        line-height: 1 !important;
                        vertical-align: middle !important;
                        text-align: center !important;
                        position: relative !important;
                    `;
                    const wrapper = document.createElement('span');
                    wrapper.style.cssText = `
                        display: inline-flex;
                        align-items: center;
                        position: relative;
                    `;
                    if (element.parentNode) {
                        element.parentNode.insertBefore(wrapper, element);
                        wrapper.appendChild(element);
                        wrapper.appendChild(blockButton);
                        blockButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const username = blockButton.getAttribute('data-username');
                            const currentConfig = getDomainConfig(getCurrentDomain());
                            if (currentConfig) {
                                const configKey = isContentPage ? 'contentPageUserKeywords' : 'mainAndSubPageUserKeywords';
                                if (!currentConfig[configKey].keywords) {
                                    currentConfig[configKey].keywords = [];
                                }
                                if (!currentConfig[configKey].keywords.includes(username)) {
                                    currentConfig[configKey].keywords.push(username);
                                    updateDomainConfig(getCurrentDomain(), currentConfig);
                                    debouncedHandleElements();
                                    updatePanelContent();
                                } else {
                                }
                            }
                        });
                        const textSpan = document.createElement('span');
                        textSpan.textContent = '×';
                        textSpan.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            line-height: 0;
                        `;
                        blockButton.textContent = '';
                        blockButton.appendChild(textSpan);
                        if (PANEL_SETTINGS.showBlockButton === 'hover') {
                            wrapper.addEventListener('mouseenter', () => {
                                blockButton.style.display = 'inline-flex';
                            });
                            wrapper.addEventListener('mouseleave', () => {
                                blockButton.style.display = 'none';
                            });
                        }
                        blockButton.addEventListener('mouseenter', () => {
                            blockButton.style.background = 'rgba(0, 0, 0, 0.8)';
                        });
                        blockButton.addEventListener('mouseleave', () => {
                            blockButton.style.background = 'rgba(0, 0, 0, 0.6)';
                        });
                    } else {
                        console.warn(`无法为用户名 ${username} 添加屏蔽按钮：父元素不存在`);
                    }
                } catch (error) {
                    console.warn(`为用户名 ${username} 添加屏蔽按钮时发生错误:`, error);
                }
            }
        });
    }
    function getCurrentDomain(){
        const currentUrl = new URL(window.location.href);
        const baseDomain = currentUrl.hostname.replace(/^www\./, '');
        return baseDomain;
    }
    function removeCSS(cssSelector, attribute = null, value = null) {
        try {
            if (typeof cssSelector !== 'string') {
                console.error('cssSelector必须是字符串格式');
                return;
            }
            const elements = document.querySelectorAll(cssSelector);
            if (elements.length === 0) {
                return;
            }
            elements.forEach(element => {
                if (attribute) {
                    if (value) {
                        if (element.style[attribute] === value) {
                            element.style[attribute] = '';
                        }
                    } else {
                        element.style[attribute] = '';
                    }
                } else {
                    element.removeAttribute('style');
                    if (cssSelector.startsWith('.')) {
                        const className = cssSelector.substring(1);
                        element.classList.remove(className);
                    }
                }
            });
            Array.from(document.styleSheets).forEach(styleSheet => {
                try {
                    const rules = styleSheet.cssRules || styleSheet.rules;
                    for (let i = rules.length - 1; i >= 0; i--) {
                        if (rules[i].selectorText === cssSelector) {
                            styleSheet.deleteRule(i);
                        }
                    }
                } catch (e) {
                }
            });
        } catch (error) {
            console.error('移除CSS时发生错误:', error);
        }
    }
    function removeWebsiteCSS() {
        if(getCurrentDomain().includes('v2ex.com')){
            removeCSS('.collapsed', 'display', 'none');
        }
    }
    function handleElements() {
        debouncedRemoveWebsiteCSS();
        const currentConfig = getDomainConfig(getCurrentDomain());
        if (currentConfig && currentConfig.enabled) {
            const isMainOrSubPage = [...currentConfig.mainPageUrlPatterns, ...currentConfig.subPageUrlPatterns]
                .some(pattern => new RegExp(pattern).test(getSplitUrl()));
            const isContentPage = currentConfig.contentPageUrlPatterns
                .some(pattern => new RegExp(pattern).test(getSplitUrl()));
            let keywords = [];
            let keywords_regex = [];
            let usernames = [];
            let usernames_regex = [];
            if (GLOBAL_CONFIG.GLOBAL_KEYWORDS) {
                keywords = [...new Set(
                    userConfig.reduce((acc, config) => [
                        ...acc,
                        ...(config.mainAndSubPageKeywords?.keywords || []),
                        ...(config.contentPageKeywords?.keywords || [])
                    ], [])
                )];
                keywords_regex = [...new Set(
                    userConfig.reduce((acc, config) => [
                        ...acc,
                        ...(config.mainAndSubPageKeywords?.regexPatterns || []),
                        ...(config.contentPageKeywords?.regexPatterns || [])
                    ], [])
                )];
            } else if (currentConfig.shareKeywordsAcrossPages) {
                keywords = [...new Set([
                    ...(currentConfig.mainAndSubPageKeywords?.keywords || []),
                    ...(currentConfig.contentPageKeywords?.keywords || [])
                ])];
                keywords_regex = [...new Set([
                    ...(currentConfig.mainAndSubPageKeywords?.regexPatterns || []),
                    ...(currentConfig.contentPageKeywords?.regexPatterns || [])
                ])];
            } else {
                if (isMainOrSubPage) {
                    keywords = currentConfig.mainAndSubPageKeywords?.keywords || [];
                    keywords_regex = currentConfig.mainAndSubPageKeywords?.regexPatterns || [];
                } else if (isContentPage) {
                    keywords = currentConfig.contentPageKeywords?.keywords || [];
                    keywords_regex = currentConfig.contentPageKeywords?.regexPatterns || [];
                }
            }
            if (GLOBAL_CONFIG.GLOBAL_USERNAMES) {
                usernames = [...new Set(
                    userConfig.reduce((acc, config) => [
                        ...acc,
                        ...(config.mainAndSubPageUserKeywords?.keywords || []),
                        ...(config.contentPageUserKeywords?.keywords || [])
                    ], [])
                )];
                usernames_regex = [...new Set(
                    userConfig.reduce((acc, config) => [
                        ...acc,
                        ...(config.mainAndSubPageUserKeywords?.regexPatterns || []),
                        ...(config.contentPageUserKeywords?.regexPatterns || [])
                    ], [])
                )];
            } else if (currentConfig.shareUsernamesAcrossPages) {
                usernames = [...new Set([
                    ...(currentConfig.mainAndSubPageUserKeywords?.keywords || []),
                    ...(currentConfig.contentPageUserKeywords?.keywords || [])
                ])];
                usernames_regex = [...new Set([
                    ...(currentConfig.mainAndSubPageUserKeywords?.regexPatterns || []),
                    ...(currentConfig.contentPageUserKeywords?.regexPatterns || [])
                ])];
            } else {
                if (isMainOrSubPage) {
                    usernames = currentConfig.mainAndSubPageUserKeywords?.keywords || [];
                    usernames_regex = currentConfig.mainAndSubPageUserKeywords?.regexPatterns || [];
                } else if (isContentPage) {
                    usernames = currentConfig.contentPageUserKeywords?.keywords || [];
                    usernames_regex = currentConfig.contentPageUserKeywords?.regexPatterns || [];
                }
            }
            if (isMainOrSubPage) {
                if (currentConfig.mainAndSubPageKeywords?.xpath?.length > 0) {
                    currentConfig.mainAndSubPageKeywords.xpath.forEach(xpath => {
                        if (keywords?.length > 0) {
                            keywords.forEach(keyword => {
                                removeElementsByText(xpath, keyword, false);
                            });
                        }
                        if (keywords_regex?.length > 0) {
                            keywords_regex.forEach(pattern => {
                                removeElementsByText(xpath, pattern, true);
                            });
                        }
                    });
                }
                if (currentConfig.mainAndSubPageUserKeywords?.xpath?.length > 0) {
                    currentConfig.mainAndSubPageUserKeywords.xpath.forEach(xpath => {
                        addBlockButtonsToUsernames(xpath, false);
                        if (usernames?.length > 0) {
                            usernames.forEach(keyword => {
                                removeElementsByText(xpath, keyword, false);
                            });
                        }
                        if (usernames_regex?.length > 0) {
                            usernames_regex.forEach(pattern => {
                                removeElementsByText(xpath, pattern, true);
                            });
                        }
                    });
                }
            }
            if (isContentPage) {
                if (currentConfig.contentPageKeywords?.xpath?.length > 0) {
                    currentConfig.contentPageKeywords.xpath.forEach(xpath => {
                        if (keywords?.length > 0) {
                            keywords.forEach(keyword => {
                                removeElementsByText(xpath, keyword, false);
                            });
                        }
                        if (keywords_regex?.length > 0) {
                            keywords_regex.forEach(pattern => {
                                removeElementsByText(xpath, pattern, true);
                            });
                        }
                    });
                }
                if (currentConfig.contentPageUserKeywords?.xpath?.length > 0) {
                    currentConfig.contentPageUserKeywords.xpath.forEach(xpath => {
                        addBlockButtonsToUsernames(xpath, true);
                        if (usernames?.length > 0) {
                            usernames.forEach(keyword => {
                                removeElementsByText(xpath, keyword, false);
                            });
                        }
                        if (usernames_regex?.length > 0) {
                            usernames_regex.forEach(pattern => {
                                removeElementsByText(xpath, pattern, true);
                            });
                        }
                    });
                }
            }
        }
    }
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    const debouncedHandleElements = debounce(handleElements, 100);
    const debouncedRemoveWebsiteCSS = debounce(removeWebsiteCSS, 100);
    function getPageType() {
        const currentConfig = getDomainConfig(getCurrentDomain());
        if (!currentConfig) return 'unknown';
        const isMainPage = currentConfig.mainPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        const isSubPage = currentConfig.subPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        const isContentPage = currentConfig.contentPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        if (isMainPage) return 'main';
        if (isSubPage) return 'sub';
        if (isContentPage) return 'content';
        return 'unknown';
    }
    function updatePanelContent() {
        const panel = document.getElementById('forum-filter-panel');
        if (!panel) return;
        const currentConfig = getDomainConfig(getCurrentDomain()) || SAMPLE_TEMPLATE;
        const isMainPage = currentConfig.mainPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        const isSubPage = currentConfig.subPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        const isContentPage = currentConfig.contentPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
        let pageType = setTextfromTemplate('panel_top_page_type_unknown');
        if (isMainPage) pageType = setTextfromTemplate('panel_top_page_type_main');
        else if (isSubPage) pageType = setTextfromTemplate('panel_top_page_type_sub');
        else if (isContentPage) pageType = setTextfromTemplate('panel_top_page_type_content');
        panel.querySelector('#page-type-value').textContent = pageType;
        panel.querySelector('#domain-info-text').textContent = setTextfromTemplate('panel_top_current_domain');
        panel.querySelector('#domain-info-value').textContent = getCurrentDomain();
        panel.querySelector('#domain-enabled').checked = currentConfig.enabled;
        panel.querySelector('#global-keywords').checked = GLOBAL_CONFIG.GLOBAL_KEYWORDS;
        panel.querySelector('#global-usernames').checked = GLOBAL_CONFIG.GLOBAL_USERNAMES;
        panel.querySelector('#share-keywords').checked = currentConfig.shareKeywordsAcrossPages;
        panel.querySelector('#share-usernames').checked = currentConfig.shareUsernamesAcrossPages;
        const mainPatternsEditor = createArrayEditor(
            setTextfromTemplate('url_patterns_main_page_url_patterns_title'),
            currentConfig.mainPageUrlPatterns || [],
            (item) => {
                if (!currentConfig.mainPageUrlPatterns) {
                    currentConfig.mainPageUrlPatterns = [];
                }
                currentConfig.mainPageUrlPatterns.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.mainPageUrlPatterns.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'main-patterns-editor',
            true
        );
        const subPatternsEditor = createArrayEditor(
            setTextfromTemplate('url_patterns_sub_page_url_patterns_title'),
            currentConfig.subPageUrlPatterns || [],
            (item) => {
                if (!currentConfig.subPageUrlPatterns) {
                    currentConfig.subPageUrlPatterns = [];
                }
                currentConfig.subPageUrlPatterns.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.subPageUrlPatterns.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'sub-patterns-editor',
            true
        );
        const contentPatternsEditor = createArrayEditor(
            setTextfromTemplate('url_patterns_content_page_url_patterns_title'),
            currentConfig.contentPageUrlPatterns || [],
            (item) => {
                if (!currentConfig.contentPageUrlPatterns) {
                    currentConfig.contentPageUrlPatterns = [];
                }
                currentConfig.contentPageUrlPatterns.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.contentPageUrlPatterns.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'content-patterns-editor',
            true
        );
        const mainPatternsContainer = panel.querySelector('#main-patterns-editor');
        const subPatternsContainer = panel.querySelector('#sub-patterns-editor');
        const contentPatternsContainer = panel.querySelector('#content-patterns-editor');
        mainPatternsContainer.innerHTML = '';
        subPatternsContainer.innerHTML = '';
        contentPatternsContainer.innerHTML = '';
        mainPatternsContainer.appendChild(mainPatternsEditor);
        subPatternsContainer.appendChild(subPatternsEditor);
        contentPatternsContainer.appendChild(contentPatternsEditor);
        const mainTitleXPathEditor = createArrayEditor(
            setTextfromTemplate('xpath_config_main_and_sub_page_keywords_title'),
            currentConfig.mainAndSubPageKeywords?.xpath || [],
            (item) => {
                if (!currentConfig.mainAndSubPageKeywords) {
                    currentConfig.mainAndSubPageKeywords = { xpath: [] };
                }
                if (!currentConfig.mainAndSubPageKeywords.xpath) {
                    currentConfig.mainAndSubPageKeywords.xpath = [];
                }
                currentConfig.mainAndSubPageKeywords.xpath.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.mainAndSubPageKeywords.xpath.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'title-xpath-editor'
        );
        const mainUserXPathEditor = createArrayEditor(
            setTextfromTemplate('xpath_config_main_and_sub_page_usernames_title'),
            currentConfig.mainAndSubPageUserKeywords?.xpath || [],
            (item) => {
                if (!currentConfig.mainAndSubPageUserKeywords) {
                    currentConfig.mainAndSubPageUserKeywords = { xpath: [] };
                }
                if (!currentConfig.mainAndSubPageUserKeywords.xpath) {
                    currentConfig.mainAndSubPageUserKeywords.xpath = [];
                }
                currentConfig.mainAndSubPageUserKeywords.xpath.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.mainAndSubPageUserKeywords.xpath.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'user-xpath-editor'
        );
        const contentTitleXPathEditor = createArrayEditor(
            setTextfromTemplate('xpath_config_content_page_keywords_title'),
            currentConfig.contentPageKeywords?.xpath || [],
            (item) => {
                if (!currentConfig.contentPageKeywords) {
                    currentConfig.contentPageKeywords = { xpath: [] };
                }
                if (!currentConfig.contentPageKeywords.xpath) {
                    currentConfig.contentPageKeywords.xpath = [];
                }
                currentConfig.contentPageKeywords.xpath.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.contentPageKeywords.xpath.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'content-title-xpath-editor'
        );
        const contentUserXPathEditor = createArrayEditor(
            setTextfromTemplate('xpath_config_content_page_usernames_title'),
            currentConfig.contentPageUserKeywords?.xpath || [],
            (item) => {
                if (!currentConfig.contentPageUserKeywords) {
                    currentConfig.contentPageUserKeywords = { xpath: [] };
                }
                if (!currentConfig.contentPageUserKeywords.xpath) {
                    currentConfig.contentPageUserKeywords.xpath = [];
                }
                currentConfig.contentPageUserKeywords.xpath.push(item);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            (index) => {
                currentConfig.contentPageUserKeywords.xpath.splice(index, 1);
                saveUserConfig(userConfig);
                debouncedHandleElements();
            },
            'content-user-xpath-editor'
        );
        const mainTitleXPathContainer = panel.querySelector('#main-title-xpath-editor');
        const mainUserXPathContainer = panel.querySelector('#main-user-xpath-editor');
        const contentTitleXPathContainer = panel.querySelector('#content-title-xpath-editor');
        const contentUserXPathContainer = panel.querySelector('#content-user-xpath-editor');
        mainTitleXPathContainer.innerHTML = '';
        mainUserXPathContainer.innerHTML = '';
        contentTitleXPathContainer.innerHTML = '';
        contentUserXPathContainer.innerHTML = '';
        mainTitleXPathContainer.appendChild(mainTitleXPathEditor);
        mainUserXPathContainer.appendChild(mainUserXPathEditor);
        contentTitleXPathContainer.appendChild(contentTitleXPathEditor);
        contentUserXPathContainer.appendChild(contentUserXPathEditor);
        const keywordsContainer = panel.querySelector('#keywords-container');
        const usernamesContainer = panel.querySelector('#usernames-container');
        keywordsContainer.innerHTML = '';
        usernamesContainer.innerHTML = '';
        if (isMainPage || isSubPage) {
            if (currentConfig.mainAndSubPageKeywords) {
                const mainPageKeywords = createArrayEditor(
                    setTextfromTemplate('keywords_config_keywords_list_title'),
                    currentConfig.mainAndSubPageKeywords.keywords || [],
                    (item) => {
                        if (!currentConfig.mainAndSubPageKeywords.keywords) {
                            currentConfig.mainAndSubPageKeywords.keywords = [];
                        }
                        currentConfig.mainAndSubPageKeywords.keywords.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.mainAndSubPageKeywords.keywords.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-keywords-list'
                );
                keywordsContainer.appendChild(mainPageKeywords);
                const mainPageKeywordsRegex = createArrayEditor(
                    setTextfromTemplate('keywords_config_keywords_regex_title'),
                    currentConfig.mainAndSubPageKeywords.regexPatterns || [],
                    (item) => {
                        if (!currentConfig.mainAndSubPageKeywords.regexPatterns) {
                            currentConfig.mainAndSubPageKeywords.regexPatterns = [];
                        }
                        currentConfig.mainAndSubPageKeywords.regexPatterns.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.mainAndSubPageKeywords.regexPatterns.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-keywords-regex',
                    true
                );
                keywordsContainer.appendChild(mainPageKeywordsRegex);
            }
            if (currentConfig.mainAndSubPageUserKeywords) {
                const mainPageUsernames = createArrayEditor(
                    setTextfromTemplate('usernames_config_usernames_list_title'),
                    currentConfig.mainAndSubPageUserKeywords.keywords || [],
                    (item) => {
                        if (!currentConfig.mainAndSubPageUserKeywords.keywords) {
                            currentConfig.mainAndSubPageUserKeywords.keywords = [];
                        }
                        currentConfig.mainAndSubPageUserKeywords.keywords.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.mainAndSubPageUserKeywords.keywords.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-usernames-list'
                );
                usernamesContainer.appendChild(mainPageUsernames);
                const mainPageUsernamesRegex = createArrayEditor(
                    setTextfromTemplate('usernames_config_usernames_regex_title'),
                    currentConfig.mainAndSubPageUserKeywords.regexPatterns || [],
                    (item) => {
                        if (!currentConfig.mainAndSubPageUserKeywords.regexPatterns) {
                            currentConfig.mainAndSubPageUserKeywords.regexPatterns = [];
                        }
                        currentConfig.mainAndSubPageUserKeywords.regexPatterns.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.mainAndSubPageUserKeywords.regexPatterns.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-usernames-regex',
                    true
                );
                usernamesContainer.appendChild(mainPageUsernamesRegex);
            }
        } else if (isContentPage) {
            if (currentConfig.contentPageKeywords) {
                const contentPageKeywords = createArrayEditor(
                    setTextfromTemplate('keywords_config_keywords_list_title'),
                    currentConfig.contentPageKeywords.keywords || [],
                    (item) => {
                        if (!currentConfig.contentPageKeywords.keywords) {
                            currentConfig.contentPageKeywords.keywords = [];
                        }
                        currentConfig.contentPageKeywords.keywords.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.contentPageKeywords.keywords.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-keywords-list'
                );
                keywordsContainer.appendChild(contentPageKeywords);
                const contentPageKeywordsRegex = createArrayEditor(
                    setTextfromTemplate('keywords_config_keywords_regex_title'),
                    currentConfig.contentPageKeywords.regexPatterns || [],
                    (item) => {
                        if (!currentConfig.contentPageKeywords.regexPatterns) {
                            currentConfig.contentPageKeywords.regexPatterns = [];
                        }
                        currentConfig.contentPageKeywords.regexPatterns.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.contentPageKeywords.regexPatterns.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-keywords-regex',
                    true
                );
                keywordsContainer.appendChild(contentPageKeywordsRegex);
            }
            if (currentConfig.contentPageUserKeywords) {
                const contentPageUsernames = createArrayEditor(
                    setTextfromTemplate('usernames_config_usernames_list_title'),
                    currentConfig.contentPageUserKeywords.keywords || [],
                    (item) => {
                        if (!currentConfig.contentPageUserKeywords.keywords) {
                            currentConfig.contentPageUserKeywords.keywords = [];
                        }
                        currentConfig.contentPageUserKeywords.keywords.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.contentPageUserKeywords.keywords.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-usernames-list'
                );
                usernamesContainer.appendChild(contentPageUsernames);
                const contentPageUsernamesRegex = createArrayEditor(
                    setTextfromTemplate('usernames_config_usernames_regex_title'),
                    currentConfig.contentPageUserKeywords.regexPatterns || [],
                    (item) => {
                        if (!currentConfig.contentPageUserKeywords.regexPatterns) {
                            currentConfig.contentPageUserKeywords.regexPatterns = [];
                        }
                        currentConfig.contentPageUserKeywords.regexPatterns.push(item);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    (index) => {
                        currentConfig.contentPageUserKeywords.regexPatterns.splice(index, 1);
                        saveUserConfig(userConfig);
                        debouncedHandleElements();
                    },
                    'array-editor-usernames-regex',
                    true
                );
                usernamesContainer.appendChild(contentPageUsernamesRegex);
            }
        } else {
            keywordsContainer.innerHTML = '<div style="padding: 10px; color: #666;">请先配置并匹配页面类型</div>';
            usernamesContainer.innerHTML = '<div style="padding: 10px; color: #666;">请先配置并匹配页面类型</div>';
        }
        ['global', 'keywords', 'usernames', 'url', 'xpath', 'sync'].forEach(section => {
            const toggle = panel.querySelector(`[data-section="${section}"]`);
            const isCollapsed = GLOBAL_CONFIG.CONFIG_SECTION_COLLAPSED[`${section}_SECTION_COLLAPSED`];
            toggle.classList[isCollapsed ? 'add' : 'remove']('collapsed');
        });
        function updateGlobalUrlList() {
            const listContainer = panel.querySelector('.global-url-list');
            listContainer.innerHTML = '';
            GLOBAL_CONFIG.GLOBAL_CONFIG_URL.forEach((url, index) => {
                const item = document.createElement('div');
                item.className = 'global-url-item';
                item.innerHTML = `
                    <span>${url}</span>
                    <button title="删除">×</button>
                `;
                item.querySelector('button').addEventListener('click', () => {
                    GLOBAL_CONFIG.GLOBAL_CONFIG_URL.splice(index, 1);
                    updateGlobalUrlList();
                });
                listContainer.appendChild(item);
                saveGlobalConfig();
            });
        }
        panel.querySelector('#add-global-url').addEventListener('click', function() {
            const input = panel.querySelector('#global-url-input');
            const url = input.value.trim();
            if (url) {
                if (!GLOBAL_CONFIG.GLOBAL_CONFIG_URL.includes(url)) {
                    GLOBAL_CONFIG.GLOBAL_CONFIG_URL.push(url);
                    input.value = '';
                    updateGlobalUrlList();
                } else {
                    alert(setTextfromTemplate('alert_url_exists'));
                }
            }
        });
        panel.querySelector('#apply-global-apply').addEventListener('click', function() {
            downloadAndApplyConfig();
        });
        panel.querySelector('#global-url-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                panel.querySelector('#add-global-url').click();
            }
        });
        updateGlobalUrlList();
        const timeIntervalSelect = panel.querySelector('#time-interval');
        timeIntervalSelect.value = GLOBAL_CONFIG.TIME_INTERVAL || '30';
        timeIntervalSelect.addEventListener('change', function() {
            const oldInterval = GLOBAL_CONFIG.TIME_INTERVAL;
            GLOBAL_CONFIG.TIME_INTERVAL = parseInt(this.value);
            GM_setValue('LAST_UPDATE_TIME', Date.now());
            saveConfig();
        });
    }
    function listenUrlChange(callback) {
        let lastUrl = window.location.href;
        const handleUrlChange = (type) => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                callback();
                updatePanelContent();
            }
        };
        window.addEventListener('popstate', () => {
            handleUrlChange('popstate');
        });
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            handleUrlChange('pushState');
        };
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            handleUrlChange('replaceState');
        };
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            handleElements();
            listenUrlChange(debouncedHandleElements);
        });
    } else {
        handleElements();
        listenUrlChange(debouncedHandleElements);
    }
    const observer = new MutationObserver((mutations) => {
        debouncedHandleElements();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    function exportDomainConfig(domain){
        const configResult = getDomainConfig(domain);
        if (!configResult.success) {
            return configResult;
        }
        try {
            const exportData = {
                exportTime: new Date().toISOString(),
                version: GM_info.script.version,
                config: configResult.config
            };
            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `${domain}.json`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadUrl);
            return {
                success: true,
                message: '配置导出成功',
                config: configResult.config
            };
        } catch (error) {
            console.error('导出配置失败:', error);
            return {
                success: false,
                message: `导出配置失败: ${error.message}`,
                config: null
            };
        }
    }
    function importDomainConfig(file) {
        return new Promise((resolve, reject) => {
            if (!file || !(file instanceof File)) {
                resolve({
                    success: false,
                    message: '请选择有效的配置文件',
                    config: null
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const importData = JSON.parse(event.target.result);
                    if (!importData.config || !importData.config.domain) {
                        resolve({
                            success: false,
                            message: '无效的配置文件格式',
                            config: null
                        });
                        return;
                    }
                    const existingConfig = getDomainConfig(importData.config.domain);
                    if (existingConfig) {
                        const updateResult = updateDomainConfig(importData.config.domain, importData.config);
                        resolve({
                            success: true,
                            message: '配置已更新',
                            config: updateResult.config
                        });
                    } else {
                        const addResult = addDomainConfig(importData.config);
                        resolve({
                            success: true,
                            message: '配置已导入',
                            config: addResult.config
                        });
                    }
                } catch (error) {
                    console.error('导入配置失败:', error);
                    resolve({
                        success: false,
                        message: `导入配置失败: ${error.message}`,
                        config: null
                    });
                }
            };
            reader.onerror = () => {
                resolve({
                    success: false,
                    message: '读取文件失败',
                    config: null
                });
            };
            reader.readAsText(file);
        });
    }
    function importDomainConfigFromFile() {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (event) => {
                const file = event.target.files[0];
                const result = await importDomainConfig(file);
                resolve(result);
            };
            input.click();
        });
    }
    function exportUserConfig() {
        try {
            const exportData = {
                globalConfig: GLOBAL_CONFIG,
                userConfig: userConfig
            };
            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `universal-forum-block-config-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadUrl);
            return {
                success: true,
                message: '配置导出成功',
                config: exportData
            };
        } catch (error) {
            console.error('导出配置失败:', error);
            return {
                success: false,
                message: `导出配置失败: ${error.message}`,
                config: null
            };
        }
    }
    function importUserConfig(file) {
        return new Promise((resolve, reject) => {
            if (!file || !(file instanceof File)) {
                resolve({
                    success: false,
                    message: '请选择有效的配置文件',
                    config: null
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const importData = JSON.parse(event.target.result);
                    const configCopy = JSON.parse(JSON.stringify(importData));
                    saveConfig(configCopy);
                } catch (error) {
                    console.error('导入配置失败:', error);
                    resolve({
                        success: false,
                        message: `导入配置失败: ${error.message}`,
                        config: null
                    });
                }
            };
            reader.onerror = () => {
                resolve({
                    success: false,
                    message: '读取文件失败',
                    config: null
                });
            };
            reader.readAsText(file);
        });
    }
    function importUserConfigFromFile() {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (event) => {
                const file = event.target.files[0];
                const result = await importUserConfig(file);
                resolve(result);
            };
            input.click();
        });
    }
    function savePanelSettings() {
        GM_setValue('panelSettings', PANEL_SETTINGS);
        applyPanelSettings();
        debouncedHandleElements();
    }
    function applyPanelSettings() {
        const panel = document.getElementById('forum-filter-panel');
        if (!panel) return;
        panel.style.left = PANEL_SETTINGS.offset + '%';
        if (PANEL_SETTINGS.expandMode === 'click') {
            panel.classList.add('click-mode');
        } else {
            panel.classList.remove('click-mode');
            panel.classList.remove('expanded');
        }
        const currentConfig = getDomainConfig(getCurrentDomain());
        const isContentPage = currentConfig?.contentPageUrlPatterns?.some(pattern =>
            new RegExp(pattern).test(getSplitUrl())
        );
        const blockButtons = document.querySelectorAll('.block-user-btn');
        blockButtons.forEach(button => {
            const wrapper = button.parentElement;
            const newWrapper = wrapper.cloneNode(true);
            wrapper.parentNode.replaceChild(newWrapper, wrapper);
            const newButton = newWrapper.querySelector('.block-user-btn');
            newButton.style.display = PANEL_SETTINGS.showBlockButton === 'always' ? 'inline-flex' : 'none';
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const username = newButton.getAttribute('data-username');
                const currentConfig = getDomainConfig(getCurrentDomain());
                if (currentConfig) {
                    const configKey = isContentPage ? 'contentPageUserKeywords' : 'mainAndSubPageUserKeywords';
                    if (!currentConfig[configKey].keywords) {
                        currentConfig[configKey].keywords = [];
                    }
                    if (!currentConfig[configKey].keywords.includes(username)) {
                        currentConfig[configKey].keywords.push(username);
                        updateDomainConfig(getCurrentDomain(), currentConfig);
                        debouncedHandleElements();
                        updatePanelContent();
                    }
                }
            });
            if (PANEL_SETTINGS.showBlockButton === 'hover') {
                newWrapper.addEventListener('mouseenter', () => {
                    newButton.style.display = 'inline-flex';
                });
                newWrapper.addEventListener('mouseleave', () => {
                    newButton.style.display = 'none';
                });
            }
            newButton.addEventListener('mouseenter', () => {
                newButton.style.background = 'rgba(0, 0, 0, 0.8)';
            });
            newButton.addEventListener('mouseleave', () => {
                newButton.style.background = 'rgba(0, 0, 0, 0.6)';
            });
        });
        const style = document.createElement('style');
        style.id = 'forum-filter-dynamic-style';
        style.textContent = `
            #forum-filter-panel.click-mode:not(.expanded),
            #forum-filter-panel:not(.click-mode):not(:hover):not(:focus-within) {
                width: ${PANEL_SETTINGS.collapsedWidth}px;
            }
            #forum-filter-panel:not(.click-mode):hover,
            #forum-filter-panel:not(.click-mode):focus-within,
            #forum-filter-panel.click-mode.expanded {
                width: ${PANEL_SETTINGS.expandedWidth}px !important;
            }
        `;
        const oldStyle = document.getElementById('forum-filter-dynamic-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        document.head.appendChild(style);
    }
    function createSettingsPanel() {
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'forum-filter-settings';
        settingsPanel.innerHTML = `
            <h3 id="js-settings-title">面板设置</h3>
            <!-- 添加语言选择下拉框 -->
            <div class="setting-group">
                <label for="language-select">语言</label>
                <select id="language-select">
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                    <option value="ko-KR">한국어</option>
                    <option value="ru-RU">Русский</option>
                    <option value="fr-FR">Français</option>
                    <option value="de-DE">Deutsch</option>
                    <option value="it-IT">Italiano</option>
                    <option value="hi-IN">हिन्दी</option>
                    <option value="id-ID">Bahasa Indonesia</option>
                    <option value="vi-VN">Tiếng Việt</option>
                    <option value="th-TH">ไทย</option>
                    <option value="es-ES">Español</option>
                    <option value="pt-PT">Português</option>
                </select>
            </div>
            <div class="setting-group">
                <label>展开方式</label>
                <select id="expand-mode">
                    <option value="hover" ${PANEL_SETTINGS.expandMode === 'hover' ? 'selected' : ''}>悬停展开</option>
                    <option value="click" ${PANEL_SETTINGS.expandMode === 'click' ? 'selected' : ''}>点击展开</option>
                </select>
            </div>
            <div class="setting-group">
                <label>屏蔽按钮显示方式</label>
                <select id="show-block-button">
                    <option value="hover" ${PANEL_SETTINGS.showBlockButton === 'hover' ? 'selected' : ''}>悬停显示</option>
                    <option value="always" ${PANEL_SETTINGS.showBlockButton === 'always' ? 'selected' : ''}>总是显示</option>
                </select>
            </div>
            <div class="setting-group">
                <label>水平位置</label>
                <input type="range" id="position-offset" min="0" max="90" value="${PANEL_SETTINGS.offset}">
                <div class="position-value">${PANEL_SETTINGS.offset}%</div>
            </div>
            <div class="setting-group">
                <label>收起宽度</label>
                <input type="range" id="collapsed-width" min="30" max="200" step="10" value="${PANEL_SETTINGS.collapsedWidth}">
                <div class="collapsed-width-value">${PANEL_SETTINGS.collapsedWidth}px</div>
            </div>
            <div class="setting-group">
                <label>展开宽度</label>
                <input type="range" id="expanded-width" min="100" max="${/Mobile|Android|iPhone/i.test(navigator.userAgent) ? 400 : 1000}" step="10" value="${PANEL_SETTINGS.expandedWidth}">
                <div class="expanded-width-value">${PANEL_SETTINGS.expandedWidth}px</div>
            </div>
            <div class="buttons">
                <button id="settings-cancel">取消</button>
                <button id="settings-save">保存</button>
            </div>
        `;
        settingsPanel.querySelector('#js-settings-title').textContent = setTextfromTemplate('settings_title');
        settingsPanel.querySelector('label[for="language-select"]').textContent = setTextfromTemplate('settings_language');
        const expandModeLabel = settingsPanel.querySelector('#expand-mode').previousElementSibling;
        expandModeLabel.textContent = setTextfromTemplate('settings_expand_mode');
        const expandModeOptions = settingsPanel.querySelectorAll('#expand-mode option');
        expandModeOptions[0].textContent = setTextfromTemplate('settings_expand_hover');
        expandModeOptions[1].textContent = setTextfromTemplate('settings_expand_click');
        const blockButtonLabel = settingsPanel.querySelector('#show-block-button').previousElementSibling;
        blockButtonLabel.textContent = setTextfromTemplate('settings_block_button_mode');
        const blockButtonOptions = settingsPanel.querySelectorAll('#show-block-button option');
        blockButtonOptions[0].textContent = setTextfromTemplate('settings_block_hover');
        blockButtonOptions[1].textContent = setTextfromTemplate('settings_block_always');
        const horizontalPositionLabel = settingsPanel.querySelector('#position-offset').previousElementSibling;
        horizontalPositionLabel.textContent = setTextfromTemplate('settings_horizontal_position');
        const collapsedWidthLabel = settingsPanel.querySelector('#collapsed-width').previousElementSibling;
        collapsedWidthLabel.textContent = setTextfromTemplate('settings_collapsed_width');
        const expandedWidthLabel = settingsPanel.querySelector('#expanded-width').previousElementSibling;
        expandedWidthLabel.textContent = setTextfromTemplate('settings_expanded_width');
        settingsPanel.querySelector('#settings-cancel').textContent = setTextfromTemplate('settings_cancel');
        settingsPanel.querySelector('#settings-save').textContent = setTextfromTemplate('settings_save');
        const overlay = document.createElement('div');
        overlay.id = 'settings-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: none;
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function() {
            settingsPanel.classList.remove('visible');
            overlay.style.display = 'none';
        });
        document.body.appendChild(settingsPanel);
        const previewSettings = () => {
            const tempSettings = {
                expandMode: document.getElementById('expand-mode').value,
                showBlockButton: document.getElementById('show-block-button').value,
                offset: parseInt(document.getElementById('position-offset').value),
                collapsedWidth: parseInt(document.getElementById('collapsed-width').value),
                expandedWidth: parseInt(document.getElementById('expanded-width').value)
            };
            Object.assign(PANEL_SETTINGS, tempSettings);
            applyPanelSettings();
        };
        document.getElementById('expand-mode').addEventListener('change', previewSettings);
        document.getElementById('show-block-button').addEventListener('change', previewSettings);
        document.getElementById('position-offset').addEventListener('input', function(e) {
            document.querySelector('.position-value').textContent = e.target.value + '%';
            previewSettings();
        });
        document.getElementById('collapsed-width').addEventListener('input', function(e) {
            document.querySelector('.collapsed-width-value').textContent = e.target.value + 'px';
            previewSettings();
        });
        document.getElementById('expanded-width').addEventListener('input', function(e) {
            document.querySelector('.expanded-width-value').textContent = e.target.value + 'px';
            previewSettings();
        });
        document.getElementById('settings-save').addEventListener('click', function() {
            savePanelSettings();
            settingsPanel.classList.remove('visible');
            overlay.style.display = 'none';
        });
        document.getElementById('settings-cancel').addEventListener('click', function() {
            PANEL_SETTINGS = GM_getValue('panelSettings', {
                offset: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 0 : 10,
                expandMode: 'hover',
                collapsedWidth: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 30 : 70,
                expandedWidth: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 290 : 400
            });
            applyPanelSettings();
            settingsPanel.classList.remove('visible');
            overlay.style.display = 'none';
        });
        const languageSelect = document.getElementById('language-select');
        languageSelect.value = GLOBAL_CONFIG.LANGUAGE || 'zh-CN';
        languageSelect.addEventListener('change', function(e) {
            const newLanguage = e.target.value;
            setLanguage(newLanguage);
        });
        return settingsPanel;
    }
    function encodeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#39;');
    }
    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'forum-filter-panel';
        panel.style.display = panelVisible ? 'block' : 'none';
        panel.innerHTML = `
            <div class="panel-tab">⚙</div>
            <div class="panel-content">
                <div class="external-links" style="position: absolute; top: 10px; left: 18px; display: flex; gap: 8px;">
                </div>
                <div class="external-links" style="position: absolute; top: 10px; right: 18px; display: flex; gap: 8px;">
                    <a href="https://ko-fi.com/0heavrnl" class="external-link" title="Ko-fi" target="_blank" style="color: #333 !important; text-decoration: none !important; display: flex; align-items: center;">
                        <svg width="14" height="14" viewBox="0 0 24 24" style="vertical-align: text-bottom;">
                            <path fill="currentColor" d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
                        </svg>
                    </a>
                    <a href="https://github.com/Heavrnl/UniversalForumBlock" class="external-link" title="GitHub" target="_blank" style="color: #333 !important; text-decoration: none !important; display: flex; align-items: center;">
                        <svg height="14" width="14" viewBox="0 0 16 16" style="vertical-align: text-bottom;">
                            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </a>
                    <a href="https://greasyfork.org/scripts/522871-%E9%80%9A%E7%94%A8%E8%AE%BA%E5%9D%9B%E5%B1%8F%E8%94%BD%E6%8F%92%E4%BB%B6" class="external-link" title="GreasyFork" target="_blank" style="color: #333 !important; text-decoration: none !important; display: flex; align-items: center;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOUlEQVR4AYTRAaaEUBgF4MmMCqVSiiAE2kO0sUCbCBiBdtAOWsAADFGqUCQlYdB5lSlv3qvm53Bzu191uuyMPsWd8pzyemdeu8vel7mbpgmapjGtj3LfPUkQxGO+wTAMZFmG2+12hjz+PXkKoigCRVHQdX0HOX4T3bIsaJoGRVEQx/GGpGn6DVk6cQVBQFVVUFUVsiwjSRJcr1c4joOiKECS5BHgXt4Ng2XZDRFFEXmeY50gCI6A+ezym7AiZVnCtm38Hs/zjoDXB7AibdtiHMcNmFGGYQ6B598NjuMQhiF830dd1wvWNA3mrvY+wT1pGTzPo+/7Bem6brkmCOKjRH0KziJJEoZh2JCfIXlHGSUh4cAgG8GGfP78GRwmxcXFWJP0BUzNmGFTVlYGSlwYSRndJURnJoqzMwAArDfg4/66PAAAAABJRU5ErkJggg==" height="14" width="14" style="vertical-align: text-bottom;">
                    </a>
                    <a class="external-link" style="color: #333 !important; text-decoration: none !important; display: flex; align-items: center;">
                            <span style="margin-left: 3px; font-size: 12px;">v1.2.0</span>
                    </a>
                </div>
                <div class="domain-info">
                    <h4><span id="domain-info-text">当前域名: </span><span id="domain-info-value"></span></h4>
                    <div class="page-type"><span id="page-type-text">当前页面类型: </span><span id="page-type-value"></span></div>
                    <button class="panel-settings-btn" title="面板设置">⚙ 设置</button>
                    <label class="domain-enabled-label">
                        <input type="checkbox" id="domain-enabled">
                        <span id="domain-enabled-text">启用此域名配置</span>
                    </label>
                </div>
                <div class="config-section" data-section="global">
                    <button class="config-section-toggle" data-section="global">
                        <span id="global-config-title">全局配置</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <div class="config-group">
                            <div class="checkbox-row">
                                <label>
                                    <input type="checkbox" id="global-keywords">
                                    全局关键词
                                </label>
                                <label>
                                    <input type="checkbox" id="global-usernames">
                                    全局用户名
                                </label>
                            </div>
                            <div class="checkbox-row">
                                <label>
                                    <input type="checkbox" id="share-keywords">
                                    主页/内容页共享关键词
                                </label>
                                <label>
                                    <input type="checkbox" id="share-usernames">
                                    主页/内容页共享用户名
                                </label>
                            </div>
                            <div class="global-url-section">
                                <div class="global-url-input-row">
                                    <select id="time-interval" style="margin-right: 8px;">
                                        <option value="1">1m</option>
                                        <option value="5">5m</option>
                                        <option value="10">10m</option>
                                        <option value="30">30m</option>
                                        <option value="60">1h</option>
                                        <option value="120">2h</option>
                                        <option value="300">5h</option>
                                        <option value="720">12h</option>
                                        <option value="1440">24h</option>
                                    </select>
                                    <input type="text" id="global-url-input" placeholder="输入配置链接">
                                    <button id="add-global-url">添加</button>
                                    <button id="apply-global-apply">应用</button>
                                </div>
                                <div class="global-url-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="config-section" data-section="keywords">
                    <button class="config-section-toggle" data-section="keywords">
                        <span id="keywords-config-title">关键词配置</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <div id="keywords-container"></div>
                    </div>
                </div>
                <div class="config-section" data-section="usernames">
                    <button class="config-section-toggle" data-section="usernames">
                        <span id="usernames-config-title">用户名配置</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <div id="usernames-container"></div>
                    </div>
                </div>
                <div class="config-section" data-section="url">
                    <button class="config-section-toggle" data-section="url">
                        <span id="url-config-title">URL 匹配模式</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <div class="pattern-group">
                            <div id="main-patterns-editor"></div>
                        </div>
                        <div class="pattern-group">
                            <div id="sub-patterns-editor"></div>
                        </div>
                        <div class="pattern-group">
                            <div id="content-patterns-editor"></div>
                        </div>
                    </div>
                </div>
                <div class="config-section" data-section="xpath">
                    <button class="config-section-toggle" data-section="xpath">
                        <span id="xpath-config-title">XPath 配置</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <div class="xpath-group">
                            <div id="main-title-xpath-editor"></div>
                        </div>
                        <div class="xpath-group">
                            <div id="main-user-xpath-editor"></div>
                        </div>
                        <div class="xpath-group">
                            <div id="content-title-xpath-editor"></div>
                        </div>
                        <div class="xpath-group">
                            <div id="content-user-xpath-editor"></div>
                        </div>
                    </div>
                </div>
                <div class="config-section" data-section="sync">
                    <button class="config-section-toggle" data-section="sync">
                        <span id="sync-config-title">云端同步</span>
                        <span class="config-section-indicator">▼</span>
                    </button>
                    <div class="config-section-content">
                        <input type="text" id="sync-server-url" placeholder="输入服务器地址">
                        <input type="text" id="sync-user-key" placeholder="输入用户密钥">
                        <button id="sync-apply">同步</button>
                        <button id="sync-delete">删除云端配置</button>
                        <div id="sync-status"></div>
                    </div>
                </div>
                <div class="button-group">
                    <button id="export-config">导出配置</button>
                    <button id="import-domain-config" style="display: none;">导入当前域名配置</button>
                    <button id="import-config">导入配置</button>
                    <button id="delete-domain-config" style="background: #ff4444 !important; color: white !important;">删除当前域名配置</button>
                    <button id="save-domain-config">保存</button>
                </div>
            </div>
        `;
        panel.querySelector('#page-type-text').textContent = setTextfromTemplate('panel_top_page_type');
        panel.querySelector('.panel-settings-btn').textContent = setTextfromTemplate('panel_top_settings_button');
        panel.querySelector('.panel-settings-btn').title = setTextfromTemplate('panel_top_settings_title');
        panel.querySelector('#domain-enabled-text').textContent = setTextfromTemplate('panel_top_enable_domain');
        panel.querySelector('#global-keywords').nextSibling.textContent = setTextfromTemplate('global_config_keywords');
        panel.querySelector('#global-usernames').nextSibling.textContent = setTextfromTemplate('global_config_usernames');
        panel.querySelector('#share-keywords').nextSibling.textContent = setTextfromTemplate('global_config_share_keywords');
        panel.querySelector('#share-usernames').nextSibling.textContent = setTextfromTemplate('global_config_share_usernames');
        panel.querySelector('#global-url-input').placeholder = setTextfromTemplate('global_config_linkimport_input_placeholder');
        panel.querySelector('#add-global-url').textContent = setTextfromTemplate('global_config_add_global_url');
        panel.querySelector('#apply-global-apply').textContent = setTextfromTemplate('global_config_apply_global_apply');
        panel.querySelector('#global-config-title').textContent = setTextfromTemplate('global_config_title');
        panel.querySelector('#keywords-config-title').textContent = setTextfromTemplate('keywords_config_title');
        panel.querySelector('#usernames-config-title').textContent = setTextfromTemplate('usernames_config_title');
        panel.querySelector('#url-config-title').textContent = setTextfromTemplate('url_patterns_title');
        panel.querySelector('#xpath-config-title').textContent = setTextfromTemplate('xpath_config_title');
        panel.querySelector('#export-config').textContent = setTextfromTemplate('panel_bottom_export_button');
        panel.querySelector('#import-config').textContent = setTextfromTemplate('panel_bottom_import_button');
        panel.querySelector('#delete-domain-config').textContent = setTextfromTemplate('panel_bottom_delete_button');
        panel.querySelector('#save-domain-config').textContent = setTextfromTemplate('panel_bottom_save_button');
        panel.querySelector('#sync-config-title').textContent = setTextfromTemplate('sync_config_title');
        panel.querySelector('#sync-server-url').placeholder = setTextfromTemplate('sync_config_server_url');
        panel.querySelector('#sync-user-key').placeholder = setTextfromTemplate('sync_config_user_key');
        panel.querySelector('#sync-apply').textContent = setTextfromTemplate('sync_config_apply');
        panel.querySelector('#sync-delete').textContent = setTextfromTemplate('sync_config_delete');
        ['global', 'keywords', 'usernames', 'url', 'xpath', 'sync'].forEach(section => {
            const toggle = panel.querySelector(`[data-section="${section}"]`);
            const isCollapsed = GLOBAL_CONFIG.CONFIG_SECTION_COLLAPSED[`${section}_SECTION_COLLAPSED`];
            toggle.classList[isCollapsed ? 'add' : 'remove']('collapsed');
        });
        panel.querySelector('#export-config').addEventListener('click', exportUserConfig);
        panel.querySelector('#import-config').addEventListener('click', importUserConfigFromFile);
        panel.querySelector('#import-domain-config').addEventListener('click', importCurrentDomainConfigFromFile);
        panel.querySelector('#sync-apply').addEventListener('click', handleSyncInput);
        panel.querySelector('#sync-delete').addEventListener('click', deleteCloudConfig);
        panel.querySelector('#sync-server-url').value = GLOBAL_CONFIG.SYNC_CONFIG.server_url || '';
        panel.querySelector('#sync-user-key').value = GLOBAL_CONFIG.SYNC_CONFIG.user_key || '';
        panel.querySelectorAll('.config-section-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('collapsed');
                const content = this.nextElementSibling;
                if (content && content.classList.contains('config-section-content')) {
                    if (this.classList.contains('collapsed')) {
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        content.style.margin = '0';
                        content.style.padding = '0';
                    } else {
                        content.style.maxHeight = '500px';
                        content.style.opacity = '1';
                        content.style.margin = '';
                        content.style.padding = '';
                    }
                }
                const section = this.getAttribute('data-section');
                GLOBAL_CONFIG.CONFIG_SECTION_COLLAPSED[`${section}_SECTION_COLLAPSED`] = this.classList.contains('collapsed');
                saveGlobalConfig();
            });
        });
        function restoreConfigSections() {
            panel.querySelectorAll('.config-section-toggle').forEach(toggle => {
                const section = toggle.getAttribute('data-section');
                const isCollapsed = GLOBAL_CONFIG.CONFIG_SECTION_COLLAPSED[`${section}_SECTION_COLLAPSED`];
                if (isCollapsed) {
                    toggle.classList.add('collapsed');
                    const content = toggle.nextElementSibling;
                    if (content && content.classList.contains('config-section-content')) {
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        content.style.margin = '0';
                        content.style.padding = '0';
                    }
                }
            });
        }
        document.body.appendChild(panel);
        applyPanelSettings();
        updatePanelContent();
        restoreConfigSections();
        panel.querySelector('.panel-settings-btn').addEventListener('click', function() {
            const settingsPanel = document.getElementById('forum-filter-settings');
            const overlay = document.getElementById('settings-overlay');
            if (settingsPanel && overlay) {
                settingsPanel.classList.add('visible');
                overlay.style.display = 'block';
            }
        });
        panel.querySelector('.panel-tab').addEventListener('click', function() {
            if (panel.classList.contains('click-mode')) {
                panel.classList.toggle('expanded');
            }
        });
        panel.querySelector('#save-domain-config').addEventListener('click', function() {
            saveConfig();
        });
        const globalConfigCheckboxes = [
            '#global-keywords',
            '#global-usernames',
            '#share-keywords',
            '#share-usernames',
            '#domain-enabled'
        ];
        globalConfigCheckboxes.forEach(selector => {
            panel.querySelector(selector).addEventListener('change', function() {
                GLOBAL_CONFIG.GLOBAL_KEYWORDS = panel.querySelector('#global-keywords').checked;
                GLOBAL_CONFIG.GLOBAL_USERNAMES = panel.querySelector('#global-usernames').checked;
                const currentConfig = getDomainConfig(getCurrentDomain());
                if (currentConfig) {
                    currentConfig.shareKeywordsAcrossPages = panel.querySelector('#share-keywords').checked;
                    currentConfig.shareUsernamesAcrossPages = panel.querySelector('#share-usernames').checked;
                }
                saveConfig();
            });
        });
        panel.querySelector('#delete-domain-config').addEventListener('click', function() {
            if (confirm(`确定要删除 ${getCurrentDomain()} 的配置吗？此操作不可恢复。`)) {
                removeDomainConfig(getCurrentDomain());
                updatePanelContent();
                debouncedHandleElements();
                alert('配置已删除！');
            }
        });
        return panel;
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createSettingsPanel();
            createControlPanel();
            initCloudSync();
        });
    } else {
        createSettingsPanel();
        createControlPanel();
        initCloudSync();
    }
    function getSplitUrl(){
        const currentUrl = new URL(window.location.href);
        return currentUrl.pathname + (currentUrl.search ? currentUrl.search : '');
    }
    function createArrayEditor(title, items, onAdd, onDelete,className = null,isRegex = false) {
        const container = document.createElement('div');
        container.className = 'array-editor';
        if (!Array.isArray(items)) {
            items = [];
        }
        const toggleButton = document.createElement('button');
        toggleButton.className = 'array-editor-toggle';
        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        if(className){
            titleSpan.className = className;
        }
        const countSpan = document.createElement('span');
        countSpan.className = 'array-editor-count';
        countSpan.textContent = `${items.length}`;
        toggleButton.appendChild(titleSpan);
        toggleButton.appendChild(countSpan);
        const content = document.createElement('div');
        content.className = 'array-editor-content';
        let editorType;
        const currentLanguage = GLOBAL_CONFIG.LANGUAGE || 'zh-CN';
        const templates = LANGUAGE_TEMPLATES[currentLanguage];
        if (title === templates.url_patterns_main_page_url_patterns_title) {
            editorType = 'mainpage_url_patterns';
        } else if (title === templates.url_patterns_sub_page_url_patterns_title) {
            editorType = 'subpage_url_patterns';
        } else if (title === templates.url_patterns_content_page_url_patterns_title) {
            editorType = 'contentpage_url_patterns';
        } else if (title === templates.xpath_config_main_and_sub_page_usernames_title) {
            editorType = 'main_and_sub_page_user_xpath';
        } else if (title === templates.xpath_config_main_and_sub_page_keywords_title) {
            editorType = 'main_and_sub_page_title_xpath';
        } else if (title === templates.xpath_config_content_page_usernames_title) {
            editorType = 'contentpage_user_xpath';
        } else if (title === templates.xpath_config_content_page_keywords_title) {
            editorType = 'contentpage_title_xpath';
        } else if (title === templates.keywords_config_keywords_regex_title) {
            editorType = 'keywords_regex';
        } else if (title === templates.usernames_config_usernames_regex_title) {
            editorType = 'usernames_regex';
        } else if (title === templates.usernames_config_usernames_list_title) {
            editorType = 'usernames';
        } else if (title === templates.keywords_config_keywords_list_title) {
            editorType = 'keywords';
        }
        if (GLOBAL_CONFIG.EDITOR_STATES[editorType]) {
            content.classList.add('expanded');
        }
        const header = document.createElement('div');
        const header2 = document.createElement('div');
        const header3 = document.createElement('div');
        header.className = 'array-editor-header';
        header2.className = 'array-editor-header';
        header3.className = 'array-editor-header';
        const buttonGroup1 = document.createElement('div');
        buttonGroup1.className = 'button-group-inline';
        const input = document.createElement('input');
        input.type = 'text';
        if(isRegex){
            input.placeholder = setTextfromTemplate('array_editor_add_item_input_placeholder_regex');
            input.className = 'array-editor-additem-input-regex';
        }else{
            input.placeholder = setTextfromTemplate('array_editor_add_item_input_placeholder');
            input.className = 'array-editor-additem-input';
        }
        const addButton = document.createElement('button');
        addButton.textContent = setTextfromTemplate('array_editor_add_item');
        addButton.title = setTextfromTemplate('array_editor_add_item_title');
        addButton.className = 'array-editor-add-button';
        const deleteAllButton = document.createElement('button');
        deleteAllButton.textContent = setTextfromTemplate('array_editor_clear_allitem');
        deleteAllButton.title = setTextfromTemplate('array_editor_clear_allitem_title');
        deleteAllButton.className = 'array-editor-delete-all-button';
        const buttonGroup2 = document.createElement('div');
        buttonGroup2.className = 'button-group-inline';
        const exportButton = document.createElement('button');
        exportButton.textContent = setTextfromTemplate('array_editor_export_button');
        exportButton.title = setTextfromTemplate('array_editor_export_button_title');
        exportButton.className = 'array-editor-export-button';
        const importButton = document.createElement('button');
        importButton.textContent = setTextfromTemplate('array_editor_fileimport_input_button');
        importButton.title = setTextfromTemplate('array_editor_fileimport_input_button_title');
        importButton.className = 'array-editor-import-button';
        const linkimportbutton  = document.createElement('button');
        linkimportbutton.textContent = setTextfromTemplate('array_editor_linkimport_input_button');
        linkimportbutton.title = setTextfromTemplate('array_editor_linkimport_input_button_title');
        linkimportbutton.className = 'array-editor-linkimport-button';
        const linkimportinput = document.createElement('input');
        linkimportinput.type = 'text';
        linkimportinput.placeholder = setTextfromTemplate('array_editor_linkimport_input_placeholder');
        linkimportinput.className = 'array-editor-linkimport-input';
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt';
        fileInput.style.display = 'none';
        const searchinput = document.createElement('input');
        searchinput.type = 'text';
        searchinput.placeholder = setTextfromTemplate('array_editor_search_input_placeholder');
        searchinput.className = 'array-editor-search-input';
        buttonGroup1.appendChild(addButton);
        buttonGroup1.appendChild(deleteAllButton);
        buttonGroup2.appendChild(linkimportbutton);
        buttonGroup2.appendChild(importButton);
        buttonGroup2.appendChild(exportButton);
        header.appendChild(input);
        header.appendChild(buttonGroup1);
        header2.appendChild(linkimportinput);
        header2.appendChild(buttonGroup2);
        header2.appendChild(fileInput);
        header3.appendChild(searchinput);
        const list = document.createElement('div');
        list.className = 'array-editor-list';
        list.dataset.empty = setTextfromTemplate('array_editor_list_empty_placeholder');
        const updateList = (searchText = '') => {
            list.innerHTML = '';
            const filteredItems = searchText.trim()
                ? items.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
                : items;
            filteredItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'array-item';
                let displayText = item;
                if (searchText.trim()) {
                    const regex = new RegExp(`(${searchText})`, 'gi');
                    displayText = item.replace(regex, '<mark>$1</mark>');
                }
                itemElement.innerHTML = `
                    <span>${displayText}</span>
                    <button>×</button>
                `;
                const originalIndex = items.indexOf(item);
                itemElement.querySelector('button').onclick = () => {
                    onDelete(originalIndex);
                    updateList(searchText);
                    countSpan.textContent = `${items.length}`;
                    document.querySelector('#save-domain-config').click();
                };
                list.appendChild(itemElement);
            });
            countSpan.textContent = `${items.length} ${searchText ? ` (${filteredItems.length})` : ''}`;
        };
        searchinput.addEventListener('input', (e) => {
            updateList(e.target.value);
        });
        searchinput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchinput.value = '';
                updateList('');
            }
        });
        const addNewItem = (value) => {
            if (value.trim()) {
                const newItem = value.trim();
                const isDuplicate = items.some(item =>
                    item.toLowerCase() === newItem.toLowerCase()
                );
                if (isDuplicate) {
                    return true;
                }
                onAdd(newItem);
                updateList();
                countSpan.textContent = `${items.length}`;
                document.querySelector('#save-domain-config').click();
                return true;
            }
            return false;
        };
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                if (addNewItem(input.value)) {
                    input.value = '';
                }
            }
        });
        addButton.onclick = () => {
            if (input.value.trim()) {
                if (addNewItem(input.value)) {
                    input.value = '';
                }
            }
        };
        deleteAllButton.onclick = () => {
            if (items.length === 0) {
                alert(setTextfromTemplate('alert_list_empty'));
                return;
            }
            if (confirm(setTextfromTemplate('alert_clear_confirm'))) {
                const currentConfig = getDomainConfig(getCurrentDomain());
                const isMainOrSubPage = currentConfig.mainPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl())) ||
                                       currentConfig.subPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
                const isContentPage = currentConfig.contentPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
                let targetConfig;
                if (title === setTextfromTemplate('url_patterns_main_page_url_patterns_title')) {
                    currentConfig.mainPageUrlPatterns = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('url_patterns_sub_page_url_patterns_title')) {
                    currentConfig.subPageUrlPatterns = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('url_patterns_content_page_url_patterns_title')) {
                    currentConfig.contentPageUrlPatterns = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                }
                if (title === setTextfromTemplate('xpath_config_main_and_sub_page_keywords_title')) {
                    if (!currentConfig.mainAndSubPageKeywords) {
                        currentConfig.mainAndSubPageKeywords = {};
                    }
                    currentConfig.mainAndSubPageKeywords.xpath = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('xpath_config_main_and_sub_page_usernames_title')) {
                    if (!currentConfig.mainAndSubPageUserKeywords) {
                        currentConfig.mainAndSubPageUserKeywords = {};
                    }
                    currentConfig.mainAndSubPageUserKeywords.xpath = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('xpath_config_content_page_keywords_title')) {
                    if (!currentConfig.contentPageKeywords) {
                        currentConfig.contentPageKeywords = {};
                    }
                    currentConfig.contentPageKeywords.xpath = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('xpath_config_content_page_usernames_title')) {
                    if (!currentConfig.contentPageUserKeywords) {
                        currentConfig.contentPageUserKeywords = {};
                    }
                    currentConfig.contentPageUserKeywords.xpath = [];
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                }
                if (title === setTextfromTemplate('keywords_config_keywords_list_title')) {
                    if (isMainOrSubPage) {
                        if (!currentConfig.mainAndSubPageKeywords) {
                            currentConfig.mainAndSubPageKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.mainAndSubPageKeywords.keywords = [];
                    } else if (isContentPage) {
                        if (!currentConfig.contentPageKeywords) {
                            currentConfig.contentPageKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.contentPageKeywords.keywords = [];
                    }
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('keywords_config_keywords_regex_title')) {
                    if (isMainOrSubPage) {
                        if (!currentConfig.mainAndSubPageKeywords) {
                            currentConfig.mainAndSubPageKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.mainAndSubPageKeywords.regexPatterns = [];
                    } else if (isContentPage) {
                        if (!currentConfig.contentPageKeywords) {
                            currentConfig.contentPageKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.contentPageKeywords.regexPatterns = [];
                    }
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                }
                if (title === setTextfromTemplate('usernames_config_usernames_list_title')) {
                    if (isMainOrSubPage) {
                        if (!currentConfig.mainAndSubPageUserKeywords) {
                            currentConfig.mainAndSubPageUserKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.mainAndSubPageUserKeywords.keywords = [];
                    } else if (isContentPage) {
                        if (!currentConfig.contentPageUserKeywords) {
                            currentConfig.contentPageUserKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.contentPageUserKeywords.keywords = [];
                    }
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                } else if (title === setTextfromTemplate('usernames_config_usernames_regex_title')) {
                    if (isMainOrSubPage) {
                        if (!currentConfig.mainAndSubPageUserKeywords) {
                            currentConfig.mainAndSubPageUserKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.mainAndSubPageUserKeywords.regexPatterns = [];
                    } else if (isContentPage) {
                        if (!currentConfig.contentPageUserKeywords) {
                            currentConfig.contentPageUserKeywords = { keywords: [], regexPatterns: [] };
                        }
                        currentConfig.contentPageUserKeywords.regexPatterns = [];
                    }
                    updateDomainConfig(getCurrentDomain(), currentConfig);
                    updatePanelContent();
                    debouncedHandleElements();
                    return;
                }
            }
        };
        exportButton.onclick = () => {
            const blob = new Blob([items.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        importButton.onclick = () => {
            fileInput.click();
        };
        linkimportbutton.onclick = async () => {
            const url = linkimportinput.value.trim();
            if (!url) {
                alert(setTextfromTemplate('alert_enter_url'));
                return;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                const blob = new Blob([text], { type: 'text/plain' });
                const file = new File([blob], 'imported.txt', { type: 'text/plain' });
                const event = new Event('change');
                Object.defineProperty(event, 'target', {
                    value: { files: [file] },
                    enumerable: true
                });
                fileInput.dispatchEvent(event);
                linkimportinput.value = '';
            } catch (error) {
                console.error('导入失败:', error);
            }
        };
        linkimportinput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                linkimportbutton.click();
            }
        });
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const newItems = content.split(/\r?\n/)
                .map(item => item.trim())
                .filter(item => item);
            const currentConfig = getDomainConfig(getCurrentDomain());
            let addedCount = 0;
            let duplicateCount = 0;
            if (title === setTextfromTemplate('url_patterns_main_page_url_patterns_title')) {
                newItems.forEach(item => {
                    if (!currentConfig.mainPageUrlPatterns.includes(item)) {
                        currentConfig.mainPageUrlPatterns.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('url_patterns_sub_page_url_patterns_title')) {
                newItems.forEach(item => {
                    if (!currentConfig.subPageUrlPatterns.includes(item)) {
                        currentConfig.subPageUrlPatterns.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('url_patterns_content_page_url_patterns_title')) {
                newItems.forEach(item => {
                    if (!currentConfig.contentPageUrlPatterns.includes(item)) {
                        currentConfig.contentPageUrlPatterns.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            }
            if (title === setTextfromTemplate('xpath_config_main_and_sub_page_keywords_title')) {
                if (!currentConfig.mainAndSubPageKeywords) {
                    currentConfig.mainAndSubPageKeywords = { xpath: [] };
                }
                newItems.forEach(item => {
                    if (!currentConfig.mainAndSubPageKeywords.xpath.includes(item)) {
                        currentConfig.mainAndSubPageKeywords.xpath.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('xpath_config_main_and_sub_page_usernames_title')) {
                if (!currentConfig.mainAndSubPageUserKeywords) {
                    currentConfig.mainAndSubPageUserKeywords = { xpath: [] };
                }
                newItems.forEach(item => {
                    if (!currentConfig.mainAndSubPageUserKeywords.xpath.includes(item)) {
                        currentConfig.mainAndSubPageUserKeywords.xpath.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('xpath_config_content_page_keywords_title')) {
                if (!currentConfig.contentPageKeywords) {
                    currentConfig.contentPageKeywords = { xpath: [] };
                }
                newItems.forEach(item => {
                    if (!currentConfig.contentPageKeywords.xpath.includes(item)) {
                        currentConfig.contentPageKeywords.xpath.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('xpath_config_content_page_usernames_title')) {
                if (!currentConfig.contentPageUserKeywords) {
                    currentConfig.contentPageUserKeywords = { xpath: [] };
                }
                newItems.forEach(item => {
                    if (!currentConfig.contentPageUserKeywords.xpath.includes(item)) {
                        currentConfig.contentPageUserKeywords.xpath.push(item);
                        addedCount++;
                    } else {
                        duplicateCount++;
                    }
                });
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            }
            const isMainOrSubPage = currentConfig.mainPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl())) ||
                                  currentConfig.subPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
            const isContentPage = currentConfig.contentPageUrlPatterns?.some(pattern => new RegExp(pattern).test(getSplitUrl()));
            if (title === setTextfromTemplate('keywords_config_keywords_list_title')) {
                if (isMainOrSubPage) {
                    if (!currentConfig.mainAndSubPageKeywords) {
                        currentConfig.mainAndSubPageKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.mainAndSubPageKeywords.keywords.includes(item)) {
                            currentConfig.mainAndSubPageKeywords.keywords.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                } else if (isContentPage) {
                    if (!currentConfig.contentPageKeywords) {
                        currentConfig.contentPageKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.contentPageKeywords.keywords.includes(item)) {
                            currentConfig.contentPageKeywords.keywords.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                }
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('keywords_config_keywords_regex_title')) {
                if (isMainOrSubPage) {
                    if (!currentConfig.mainAndSubPageKeywords) {
                        currentConfig.mainAndSubPageKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.mainAndSubPageKeywords.regexPatterns.includes(item)) {
                            currentConfig.mainAndSubPageKeywords.regexPatterns.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                } else if (isContentPage) {
                    if (!currentConfig.contentPageKeywords) {
                        currentConfig.contentPageKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.contentPageKeywords.regexPatterns.includes(item)) {
                            currentConfig.contentPageKeywords.regexPatterns.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                }
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            }
            if (title === setTextfromTemplate('usernames_config_usernames_list_title')) {
                if (isMainOrSubPage) {
                    if (!currentConfig.mainAndSubPageUserKeywords) {
                        currentConfig.mainAndSubPageUserKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.mainAndSubPageUserKeywords.keywords.includes(item)) {
                            currentConfig.mainAndSubPageUserKeywords.keywords.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                } else if (isContentPage) {
                    if (!currentConfig.contentPageUserKeywords) {
                        currentConfig.contentPageUserKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.contentPageUserKeywords.keywords.includes(item)) {
                            currentConfig.contentPageUserKeywords.keywords.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                }
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            } else if (title === setTextfromTemplate('usernames_config_usernames_regex_title')) {
                if (isMainOrSubPage) {
                    if (!currentConfig.mainAndSubPageUserKeywords) {
                        currentConfig.mainAndSubPageUserKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.mainAndSubPageUserKeywords.regexPatterns.includes(item)) {
                            currentConfig.mainAndSubPageUserKeywords.regexPatterns.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                } else if (isContentPage) {
                    if (!currentConfig.contentPageUserKeywords) {
                        currentConfig.contentPageUserKeywords = { keywords: [], regexPatterns: [] };
                    }
                    newItems.forEach(item => {
                        if (!currentConfig.contentPageUserKeywords.regexPatterns.includes(item)) {
                            currentConfig.contentPageUserKeywords.regexPatterns.push(item);
                            addedCount++;
                        } else {
                            duplicateCount++;
                        }
                    });
                }
                updateDomainConfig(getCurrentDomain(), currentConfig);
                updatePanelContent();
                debouncedHandleElements();
                showImportResult(addedCount, duplicateCount);
                return;
            }
        };
        reader.readAsText(file);
        fileInput.value = '';
    }
};
function showImportResult(addedCount, duplicateCount) {
    const messages = {
        'zh-CN': `导入完成：\n成功导入 ${addedCount} 项\n重复项 ${duplicateCount} 项`,
        'en-US': `Import completed:\n${addedCount} items imported successfully\n${duplicateCount} duplicate items`,
        'ja-JP': `インポート完了：\n${addedCount} 件追加\n${duplicateCount} 件重複`,
        'ko-KR': `가져오기 완료:\n${addedCount}개 항목 추가됨\n${duplicateCount}개 중복 항목`,
        'ru-RU': `Импорт завершен:\n${addedCount} элементов импортировано\n${duplicateCount} повторяющихся элементов`,
        'fr-FR': `Importation terminée :\n${addedCount} éléments importés\n${duplicateCount} éléments en double`,
        'de-DE': `Import abgeschlossen:\n${addedCount} Elemente importiert\n${duplicateCount} doppelte Elemente`,
        'it-IT': `Importazione completata:\n${addedCount} elementi importati\n${duplicateCount} elementi duplicati`,
        'hi-IN': `आयात पूर्ण:\n${addedCount} आइटम सफलतापूर्वक आयात किए गए\n${duplicateCount} डुप्लिकेट आइटम`,
        'id-ID': `Impor selesai:\n${addedCount} item berhasil diimpor\n${duplicateCount} item duplikat`,
        'vi-VN': `Nhập hoàn tất:\n${addedCount} mục đã được nhập thành công\n${duplicateCount} mục trùng lặp`,
        'th-TH': `การนำเข้าเสร็จสิ้น:\n${addedCount} รายการนำเข้าสำเร็จ\n${duplicateCount} รายการซ้ำ`,
        'es-ES': `Importación completada:\n${addedCount} elementos importados\n${duplicateCount} elementos duplicados`,
        'pt-PT': `Importação concluída:\n${addedCount} itens importados\n${duplicateCount} itens duplicados`
    };
    alert(messages[GLOBAL_CONFIG.LANGUAGE] || messages['zh-CN']);
}
        toggleButton.onclick = () => {
            content.classList.toggle('expanded');
            GLOBAL_CONFIG.EDITOR_STATES[editorType] = content.classList.contains('expanded');
            saveGlobalConfig();
        };
        content.appendChild(header);
        content.appendChild(header3);
        content.appendChild(list);
        content.appendChild(header2);
        container.appendChild(toggleButton);
        container.appendChild(content);
        updateList();
        return container;
    }
    function importCurrentDomainConfig(file) {
        return new Promise((resolve, reject) => {
            if (!file || !(file instanceof File)) {
                resolve({
                    success: false,
                    message: '请选择有效的配置文件',
                    config: null
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const importData = JSON.parse(event.target.result);
                    const currentUrl = new URL(window.location.href);
                    const currentDomain = currentUrl.hostname
                    let domainConfig = null;
                    if (importData.userConfig) {
                        domainConfig = importData.userConfig.find(config => config.domain === currentDomain);
                    } else if (importData.config && importData.config.domain === currentDomain) {
                        domainConfig = importData.config;
                    }
                    if (!domainConfig) {
                        resolve({
                            success: false,
                            message: '配置文件中未找到当前域名的配置',
                            config: null
                        });
                        return;
                    }
                    const existingConfig = getDomainConfig(currentDomain);
                    if (existingConfig) {
                        const updateResult = updateDomainConfig(currentDomain, domainConfig);
                        resolve({
                            success: true,
                            message: '当前域名配置已更新',
                            config: updateResult.config
                        });
                    } else {
                        const addResult = addDomainConfig(domainConfig);
                        resolve({
                            success: true,
                            message: '当前域名配置已导入',
                            config: addResult.config
                        });
                    }
                    updatePanelContent();
                } catch (error) {
                    console.error('导入配置失败:', error);
                    resolve({
                        success: false,
                        message: `导入配置失败: ${error.message}`,
                        config: null
                    });
                }
            };
            reader.onerror = () => {
                resolve({
                    success: false,
                    message: '读取文件失败',
                    config: null
                });
            };
            reader.readAsText(file);
        });
    }
    function importCurrentDomainConfigFromFile() {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (event) => {
                const file = event.target.files[0];
                const result = await importCurrentDomainConfig(file);
                if (!result.success) {
                } else {
                }
                resolve(result);
            };
            input.click();
        });
    }
    function checkUpdateTime() {
        const now = Date.now();
        const lastUpdate = GM_getValue('LAST_UPDATE_TIME', 0);
        const interval = (GLOBAL_CONFIG.TIME_INTERVAL || 30) * 60 * 1000;
        const timeSinceLastUpdate = now - lastUpdate;
        const timeUntilNextUpdate = interval - timeSinceLastUpdate;
        console.log(`
            当前时间: ${new Date(now).toLocaleString()}
            上次更新: ${new Date(lastUpdate).toLocaleString()}
            更新间隔: ${GLOBAL_CONFIG.TIME_INTERVAL} 分钟
            距离上次更新: ${Math.floor(timeSinceLastUpdate / 1000)} 秒
            距离下次更新: ${Math.floor(timeUntilNextUpdate / 1000)} 秒
        `);
        if (timeSinceLastUpdate >= interval) {
            downloadAndApplyConfig();
            GM_setValue('LAST_UPDATE_TIME', now);
        }
    }
    function setTextfromTemplate(args){
        const currentLanguage = GLOBAL_CONFIG.LANGUAGE || 'zh';
        return LANGUAGE_TEMPLATES[currentLanguage][args] || args;
    }
    function setLanguage(language) {
        if (!LANGUAGE_TEMPLATES[language]) {
            console.error(`Language ${language} not found in templates`);
            return;
        }
        GLOBAL_CONFIG.LANGUAGE = language;
        saveGlobalConfig();
        const templates = LANGUAGE_TEMPLATES[language];
        document.querySelector('#domain-info-text').textContent = templates.panel_top_current_domain;
        document.querySelector('#domain-info-value').textContent = getCurrentDomain();
        document.querySelector('#page-type-text').textContent = templates.panel_top_page_type;
        if(getPageType() === 'main'){
            document.querySelector('#page-type-value').textContent = templates.panel_top_page_type_main;
        }else if(getPageType() === 'sub'){
            document.querySelector('#page-type-value').textContent = templates.panel_top_page_type_sub;
        }else if(getPageType() === 'content'){
            document.querySelector('#page-type-value').textContent = templates.panel_top_page_type_content;
        }else{
            document.querySelector('#page-type-value').textContent = templates.panel_top_page_type_unknown;
        }
        document.querySelector('.panel-settings-btn').title = templates.panel_top_settings_title;
        document.querySelector('.panel-settings-btn').textContent = templates.panel_top_settings_button;
        document.querySelector('#domain-enabled-text').textContent = templates.panel_top_enable_domain;
        document.querySelectorAll('.config-section-toggle').forEach(toggle => {
            const section = toggle.getAttribute('data-section');
            const titleSpan = toggle.querySelector('span:first-child');
            switch (section) {
                case 'global':
                    titleSpan.textContent = templates.global_config_title;
                    break;
                case 'keywords':
                    titleSpan.textContent = templates.keywords_config_title;
                    break;
                case 'usernames':
                    titleSpan.textContent = templates.usernames_config_title;
                    break;
                case 'url':
                    titleSpan.textContent = templates.url_patterns_title;
                    break;
                case 'xpath':
                    titleSpan.textContent = templates.xpath_config_title;
                    break;
                case 'sync':
                    titleSpan.textContent = templates.sync_config_title;
                    break;
            }
        });
        const globalCheckboxes = document.querySelectorAll('.checkbox-row label');
        globalCheckboxes[0].textContent = templates.global_config_keywords;
        globalCheckboxes[1].textContent = templates.global_config_usernames;
        globalCheckboxes[2].textContent = templates.global_config_share_keywords;
        globalCheckboxes[3].textContent = templates.global_config_share_usernames;
        document.querySelector('#global-url-input').placeholder = templates.global_config_linkimport_input_placeholder;
        document.querySelector('#add-global-url').textContent = templates.global_config_add_global_url;
        document.querySelector('#apply-global-apply').textContent = templates.global_config_apply_global_apply;
        document.querySelectorAll('.array-editor').forEach(editor => {
            const addItemInput = editor.querySelector('.array-editor-additem-input');
            if (addItemInput) {
                addItemInput.placeholder = templates.array_editor_add_item_input_placeholder;
            }
            const addItemInputRegex = editor.querySelector('.array-editor-additem-input-regex');
            if (addItemInputRegex) {
                addItemInputRegex.placeholder = templates.array_editor_add_item_input_placeholder_regex;
            }
            const searchInput = editor.querySelector('.array-editor-search-input');
            if (searchInput) {
                searchInput.placeholder = templates.array_editor_search_input_placeholder;
            }
            const linkImportInput = editor.querySelector('.array-editor-linkimport-input');
            if (linkImportInput) {
                linkImportInput.placeholder = templates.array_editor_linkimport_input_placeholder;
            }
            const list = editor.querySelector('.array-editor-list');
            if (list) {
                list.dataset.empty = templates.array_editor_list_empty_placeholder;
            }
            const keywords_config_keywords_list_title = editor.querySelector('.array-editor-keywords-list');
            if (keywords_config_keywords_list_title) {
                keywords_config_keywords_list_title.textContent = templates.keywords_config_keywords_list_title;
            }
            const keywords_config_keywords_regex_title = editor.querySelector('.array-editor-keywords-regex');
            if (keywords_config_keywords_regex_title) {
                keywords_config_keywords_regex_title.textContent = templates.keywords_config_keywords_regex_title;
            }
            const usernames_config_usernames_list_title = editor.querySelector('.array-editor-usernames-list');
            if (usernames_config_usernames_list_title) {
                usernames_config_usernames_list_title.textContent = templates.usernames_config_usernames_list_title;
            }
            const usernames_config_usernames_regex_title = editor.querySelector('.array-editor-usernames-regex');
            if (usernames_config_usernames_regex_title) {
                usernames_config_usernames_regex_title.textContent = templates.usernames_config_usernames_regex_title;
            }
            const url_patterns_main_page_url_patterns_title = editor.querySelector('.main-patterns-editor');
            if (url_patterns_main_page_url_patterns_title) {
                url_patterns_main_page_url_patterns_title.textContent = templates.url_patterns_main_page_url_patterns_title;
            }
            const url_patterns_sub_page_url_patterns_title = editor.querySelector('.sub-patterns-editor');
            if (url_patterns_sub_page_url_patterns_title) {
                url_patterns_sub_page_url_patterns_title.textContent = templates.url_patterns_sub_page_url_patterns_title;
            }
            const url_patterns_content_page_url_patterns_title = editor.querySelector('.content-patterns-editor');
            if (url_patterns_content_page_url_patterns_title) {
                url_patterns_content_page_url_patterns_title.textContent = templates.url_patterns_content_page_url_patterns_title;
            }
            const xpath_config_main_and_sub_page_keywords_title = editor.querySelector('.title-xpath-editor');
            if (xpath_config_main_and_sub_page_keywords_title) {
                xpath_config_main_and_sub_page_keywords_title.textContent = templates.xpath_config_main_and_sub_page_keywords_title;
            }
            const xpath_config_main_and_sub_page_usernames_title = editor.querySelector('.user-xpath-editor');
            if (xpath_config_main_and_sub_page_usernames_title) {
                xpath_config_main_and_sub_page_usernames_title.textContent = templates.xpath_config_main_and_sub_page_usernames_title;
            }
            const xpath_config_content_page_keywords_title = editor.querySelector('.content-title-xpath-editor');
            if (xpath_config_content_page_keywords_title) {
                xpath_config_content_page_keywords_title.textContent = templates.xpath_config_content_page_keywords_title;
            }
            const xpath_config_content_page_usernames_title = editor.querySelector('.content-user-xpath-editor');
            if (xpath_config_content_page_usernames_title) {
                xpath_config_content_page_usernames_title.textContent = templates.xpath_config_content_page_usernames_title;
            }
            const buttons = editor.querySelectorAll('.button-group-inline button');
            buttons.forEach(button => {
                if (button.className === 'array-editor-add-button') {
                    button.textContent = templates.array_editor_add_item;
                } else if (button.className === 'array-editor-delete-all-button') {
                    button.textContent = templates.array_editor_clear_allitem;
                } else if (button.className === 'array-editor-linkimport-button') {
                    button.textContent = templates.array_editor_linkimport_input_button;
                } else if (button.className === 'array-editor-import-button') {
                    button.textContent = templates.array_editor_fileimport_input_button;
                } else if (button.className === 'array-editor-export-button') {
                    button.textContent = templates.array_editor_export_button;
                }
            });
        });
        document.querySelector('#export-config').textContent = templates.panel_bottom_export_button;
        document.querySelector('#import-config').textContent = templates.panel_bottom_import_button;
        document.querySelector('#delete-domain-config').textContent = templates.panel_bottom_delete_button;
        document.querySelector('#save-domain-config').textContent = templates.panel_bottom_save_button;
        document.querySelector('#sync-server-url').placeholder = setTextfromTemplate('sync_config_server_url');
        document.querySelector('#sync-user-key').placeholder = setTextfromTemplate('sync_config_user_key');
        document.querySelector('#sync-apply').textContent = setTextfromTemplate('sync_config_apply');
        document.querySelector('#sync-delete').textContent = setTextfromTemplate('sync_config_delete');

        document.querySelector('#js-settings-title').textContent = setTextfromTemplate('settings_title');
        document.querySelector('label[for="language-select"]').textContent = setTextfromTemplate('settings_language');
        const expandModeLabel = document.querySelector('#expand-mode').previousElementSibling;
        expandModeLabel.textContent = setTextfromTemplate('settings_expand_mode');
        const expandModeOptions = document.querySelectorAll('#expand-mode option');
        expandModeOptions[0].textContent = setTextfromTemplate('settings_expand_hover');
        expandModeOptions[1].textContent = setTextfromTemplate('settings_expand_click');
        const blockButtonLabel = document.querySelector('#show-block-button').previousElementSibling;
        blockButtonLabel.textContent = setTextfromTemplate('settings_block_button_mode');
        const blockButtonOptions = document.querySelectorAll('#show-block-button option');
        blockButtonOptions[0].textContent = setTextfromTemplate('settings_block_hover');
        blockButtonOptions[1].textContent = setTextfromTemplate('settings_block_always');
        const horizontalPositionLabel = document.querySelector('#position-offset').previousElementSibling;
        horizontalPositionLabel.textContent = setTextfromTemplate('settings_horizontal_position');
        const collapsedWidthLabel = document.querySelector('#collapsed-width').previousElementSibling;
        collapsedWidthLabel.textContent = setTextfromTemplate('settings_collapsed_width');
        const expandedWidthLabel = document.querySelector('#expanded-width').previousElementSibling;
        expandedWidthLabel.textContent = setTextfromTemplate('settings_expanded_width');
        document.querySelector('#settings-cancel').textContent = setTextfromTemplate('settings_cancel');
        document.querySelector('#settings-save').textContent = setTextfromTemplate('settings_save');
    }
    function gmFetch(url, options = {}) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url,
                method: options.method || 'GET',
                headers: options.headers || {},
                data: options.body,
                responseType: 'json',
                onload: function(response) {
                    resolve({
                        ok: response.status >= 200 && response.status < 300,
                        status: response.status,
                        statusText: response.statusText,
                        json: () => Promise.resolve(response.response),
                        text: () => Promise.resolve(response.responseText)
                    });
                },
                onerror: function(error) {
                    reject(new Error('Network error'));
                }
            });
        });
    }
    function checkSyncInput(){
        const sync_server_url = document.getElementById('sync-server-url').value;
        const sync_user_key = document.getElementById('sync-user-key').value;
        if(!sync_server_url || !sync_user_key){
            updateSyncStatus(setTextfromTemplate('sync_panel_status_input_error'), 'error');
            return false;
        }
        GLOBAL_CONFIG.SYNC_CONFIG.server_url = sync_server_url;
        GLOBAL_CONFIG.SYNC_CONFIG.user_key = sync_user_key;
        saveGlobalConfig();
        return true;
    }
async function getConfigFromServer() {
    const response = await gmFetch(`${GLOBAL_CONFIG.SYNC_CONFIG.server_url}/config`, {
        method: 'GET',
        headers: {
            'X-API-Key': GLOBAL_CONFIG.SYNC_CONFIG.user_key
        }
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
    return await response.json();
}
async function handleSyncInput() {
  let sync_server_url = document.querySelector('#sync-server-url').value
  if(sync_server_url.startsWith('http')){
    sync_server_url = sync_server_url.replace(/^https?/, 'wss');
  }else{
    sync_server_url = 'wss://' + sync_server_url;
  }
  const sync_user_key = document.querySelector('#sync-user-key').value;
  if(!sync_server_url || !sync_user_key){
    updateSyncStatus(setTextfromTemplate('sync_panel_status_input_error'), 'error');
    return false;
  }
  const response = await testConnection(sync_server_url , sync_user_key);
  if (response.success) {
    GLOBAL_CONFIG.SYNC_CONFIG.server_url = sync_server_url;
    GLOBAL_CONFIG.SYNC_CONFIG.user_key = sync_user_key;
    updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_success'), 'success');
    initWebSocket();
    return true;
  } else {
    updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_failed') + response.message, 'error');
    return false;
  }
}
async function deleteCloudConfig() {
    try {
        if (!confirm(setTextfromTemplate('sync_panel_status_delete_confirm'))) {
            return;
        }
        if (!wsConnection || wsConnection.readyState !== WebSocket.OPEN) {
            initWebSocket();
            if(wsConnection.readyState !== WebSocket.OPEN){
                throw new Error(setTextfromTemplate('sync_panel_status_connect_error'));
            }
        }
        wsConnection.send(JSON.stringify({
            type: 'delete',
            userKey: GLOBAL_CONFIG.SYNC_CONFIG.user_key
        }));
        const originalOnMessage = wsConnection.onmessage;
        wsConnection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'delete') {
                if (data.success) {
                    updateSyncStatus(setTextfromTemplate('sync_panel_status_delete_success'), 'success');
                } else {
                    updateSyncStatus(setTextfromTemplate('sync_panel_status_delete_failed') + (data.message || ''), 'error');
                }
                wsConnection.onmessage = originalOnMessage;
            } else {
                originalOnMessage(event);
            }
        };
    } catch (error) {
        updateSyncStatus(setTextfromTemplate('sync_panel_status_delete_failed') + error.message, 'error');
    }
}
        function updateSyncStatus(message, type = 'info') {
            const statusDiv = document.getElementById('sync-status');
            statusDiv.textContent = message;
            statusDiv.className = `sync-status ${type}`;
            switch(type) {
                case 'success':
                    statusDiv.style.color = '#4caf50';
                    break;
                case 'error':
                    statusDiv.style.color = '#f44336';
                    break;
                case 'warning':
                    statusDiv.style.color = '#ff9800';
                    break;
                case 'info':
                default:
                    statusDiv.style.color = '#2196f3';
                    break;
            }
        }
        function initWebSocket() {
            closeWebSocket();
            const wsUrl = GLOBAL_CONFIG.SYNC_CONFIG.server_url.startsWith('wss') ?
                GLOBAL_CONFIG.SYNC_CONFIG.server_url :
                GLOBAL_CONFIG.SYNC_CONFIG.server_url.startsWith('http') ?
                    GLOBAL_CONFIG.SYNC_CONFIG.server_url.replace(/^https?/, 'wss') :
                    'wss://' + GLOBAL_CONFIG.SYNC_CONFIG.server_url;
            wsConnection = new WebSocket(`${wsUrl}/ws/config/${GLOBAL_CONFIG.SYNC_CONFIG.user_key}`);
             const isFirstSync = GM_getValue('isFirstSync_' + GLOBAL_CONFIG.SYNC_CONFIG.user_key+'_'+GLOBAL_CONFIG.SYNC_CONFIG.server_url, true);
            wsConnection.onopen = () => {
                if(isFirstSync){
                 GM_setValue('isFirstSync_' + GLOBAL_CONFIG.SYNC_CONFIG.user_key+'_'+GLOBAL_CONFIG.SYNC_CONFIG.server_url, false);
                    GLOBAL_CONFIG.SYNC_CONFIG.lastSyncTime = Date.now();
                    wsConnection.send(JSON.stringify({
                        type: 'firstSync',
                        globalConfig: GLOBAL_CONFIG,
                        userConfig: userConfig
                    }));
                }else{
                    wsConnection.send(JSON.stringify({
                        type: 'update',
                        globalConfig: GLOBAL_CONFIG,
                        userConfig: userConfig
                    }));
                }
                updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_server_success'), 'success');
            };
            wsConnection.onmessage = (event) => {
                const data = JSON.parse(event.data);
                switch(data.type) {
                    case 'firstSync':
                        if(data.message === 'firstSync_success'){
                            updateSyncStatus(setTextfromTemplate('sync_panel_status_client_to_server_success'), 'success');
                        }
                        break;
                    case 'update':
                        if(data){
                            saveConfig(data,false,true);
                            GLOBAL_CONFIG.SYNC_CONFIG.lastSyncTime = Date.now();
                            if(data.message === 'config_updated'){
                                updateSyncStatus(setTextfromTemplate('sync_panel_status_config_updated'), 'success');
                            }
                        }
                        break;
                    case 'configConflict':
                        const useCloud = confirm(
                            setTextfromTemplate('sync_panel_status_config_conflict_1') + '\n\n' +
                            setTextfromTemplate('sync_panel_status_config_conflict_2') + data.cloudTime + '\n' +
                            setTextfromTemplate('sync_panel_status_config_conflict_3') + data.localTime + '\n\n' +
                            setTextfromTemplate('sync_panel_status_config_conflict_4') + '\n\n' +
                            (data.cloudTime > data.localTime ? setTextfromTemplate('sync_panel_status_config_conflict_cloud_newer') : setTextfromTemplate('sync_panel_status_config_conflict_local_newer'))
                        );
                        wsConnection.send(JSON.stringify({
                            type: 'resolveConflict',
                            choice: useCloud ? 'useCloud' : 'useLocal'
                        }));
                        break;
                    case 'delete':
                        if (data.success) {
                            updateSyncStatus(setTextfromTemplate('sync_panel_status_delete_success'), 'success');
                        } else {
                            updateSyncStatus(setTextfromTemplate('sync_panel_status_delete_failed') + (data.message || ''), 'error');
                        }
                        break;
                }
            };
            wsConnection.onclose = () => {
                updateSyncStatus(setTextfromTemplate('sync_panel_status_disconnect'), 'warning');
            };
            wsConnection.onerror = (error) => {
                console.error('WebSocket 错误:', error);
                updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_error'), 'error');
            };
        }
        function closeWebSocket() {
            if (wsConnection) {
                wsConnection.close();
                wsConnection = null;
            }
        }
        async function testConnection(serverUrl, userKey) {
            try {
                const wsUrl = serverUrl + '/ws/config/' + userKey;
                const ws = new WebSocket(wsUrl);
                return new Promise((resolve) => {
                    ws.onopen = () => {
                        ws.close();
                        resolve({ success: true });
                    };
                    ws.onerror = (error) => {
                        ws.close();
                        resolve({
                            success: false,
                            message: 'WebSocket连接失败'
                        });
                    };
                });
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }
    async function initCloudSync() {
        if(GLOBAL_CONFIG.SYNC_CONFIG.server_url && GLOBAL_CONFIG.SYNC_CONFIG.user_key){
        try {
            const response = await testConnection(GLOBAL_CONFIG.SYNC_CONFIG.server_url , GLOBAL_CONFIG.SYNC_CONFIG.user_key);
            if (response.success) {
                initWebSocket();
            } else {
                updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_failed') + response.message, 'error');
            }
        } catch (error) {
            updateSyncStatus(setTextfromTemplate('sync_panel_status_connect_error') + error.message, 'error');
        }
        if (GLOBAL_CONFIG.SYNC_CONFIG.server_url && GLOBAL_CONFIG.SYNC_CONFIG.user_key) {
            initWebSocket();
        }
    }
    }
    async function pushConfigUpdate() {
        try {
            if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
                GLOBAL_CONFIG.SYNC_CONFIG.lastSyncTime = Date.now();
                const configData = {
                    type: 'update',
                    globalConfig: GLOBAL_CONFIG,
                    userConfig: userConfig
                    };
                    await wsConnection.send(JSON.stringify(configData));
                } else {
                    console.warn('WebSocket未连接');
                    initWebSocket();
                }
            } catch (error) {
                console.error('同步失败:', error);
                updateSyncStatus(setTextfromTemplate('sync_panel_status_sync_failed') + error.message, 'error');
            }
    }
    function downloadAndApplyConfig(){
        const urls = GLOBAL_CONFIG.GLOBAL_CONFIG_URL;
        urls.forEach(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(`从 ${url} 下载配置失败:`, response.statusText);
                    return;
                }
                const configData = await response.json();
                saveConfig(configData, true);
            } catch (error) {
                console.error(`处理URL ${url} 时出错:`, error);
            }
        });
        GM_setValue('LAST_UPDATE_TIME', Date.now());
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            debouncedHandleElements();
            listenUrlChange(debouncedHandleElements);
            setInterval(checkUpdateTime, 60000);
        });
    } else {
        debouncedHandleElements();
        listenUrlChange(debouncedHandleElements);
        setInterval(checkUpdateTime, 60000);
    }
    function saveConfig(args_config = null,isglobalurl = false,isPushConfigUpdate = false) {
        const panel = document.getElementById('forum-filter-panel');
        if (!panel) return;
        if (args_config) {
            if(args_config.globalConfig){
                for (const key in args_config.globalConfig) {
                    if (args_config.globalConfig.hasOwnProperty(key)) {
                        if (isglobalurl && key === 'GLOBAL_CONFIG_URL') continue;
                        GLOBAL_CONFIG[key] = args_config.globalConfig[key];
                    }
                }
                saveGlobalConfig();
            }
            if(args_config.userConfig && args_config.userConfig.length > 0){
                args_config.userConfig.forEach(config => {
                const existingConfig = getDomainConfig(config.domain);
                if (existingConfig) {
                    if(isPushConfigUpdate){
                        updateDomainConfigOverride(config.domain, config);
                    }else{
                        updateDomainConfig(config.domain, config);
                    }
                } else {
                    addDomainConfig(config);
                    }
                });
            }
            if (GLOBAL_CONFIG.SYNC_CONFIG.server_url && GLOBAL_CONFIG.SYNC_CONFIG.user_key) {
                if(!isPushConfigUpdate){
                    pushConfigUpdate()
                }
            }
            saveUserConfig(userConfig);
            debouncedHandleElements();
            updatePanelContent();
            return;
        }
        const currentConfig = getDomainConfig(getCurrentDomain()) || SAMPLE_TEMPLATE;
        const config = {
            domain: getCurrentDomain(),
            enabled: panel.querySelector('#domain-enabled').checked,
            shareKeywordsAcrossPages: panel.querySelector('#share-keywords').checked,
            shareUsernamesAcrossPages: panel.querySelector('#share-usernames').checked,
            mainPageUrlPatterns: currentConfig.mainPageUrlPatterns || [],
            subPageUrlPatterns: currentConfig.subPageUrlPatterns || [],
            contentPageUrlPatterns: currentConfig.contentPageUrlPatterns || [],
            mainAndSubPageKeywords: {
                ...currentConfig.mainAndSubPageKeywords,
                xpath: currentConfig.mainAndSubPageKeywords?.xpath || []
            },
            mainAndSubPageUserKeywords: {
                ...currentConfig.mainAndSubPageUserKeywords,
                xpath: currentConfig.mainAndSubPageUserKeywords?.xpath || []
            },
            contentPageKeywords: {
                ...currentConfig.contentPageKeywords,
                xpath: currentConfig.contentPageKeywords?.xpath || []
            },
            contentPageUserKeywords: {
                ...currentConfig.contentPageUserKeywords,
                xpath: currentConfig.contentPageUserKeywords?.xpath || []
            }
        };
        saveGlobalConfig();
        const existingIndex = userConfig.findIndex(c => c.domain === getCurrentDomain());
        if (existingIndex !== -1) {
            userConfig[existingIndex] = config;
        } else {
            userConfig.push(config);
        }
        if (GLOBAL_CONFIG.SYNC_CONFIG.server_url && GLOBAL_CONFIG.SYNC_CONFIG.user_key) {
            if(!isPushConfigUpdate){
                pushConfigUpdate()
            }
        }
        saveUserConfig(userConfig);
        debouncedHandleElements();
        updatePanelContent();
        return config;
    }
})();