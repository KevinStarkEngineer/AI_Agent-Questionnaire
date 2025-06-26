# AI Agent 問卷系統 - 前端

## 專案簡介

本前端專案為 AI Agent 問卷系統的互動介面，使用 React 製作，提供使用者即時作答、送出答案並與後端 Flask API 串接。

---

## 安裝與啟動

1. 進入 frontend 目錄
   ```bash
   cd frontend
   ```
2. 安裝依賴套件
   ```bash
   npm install
   ```
3. 啟動開發伺服器
   ```bash
   npm start
   ```
   - 預設會自動開啟 http://localhost:3000
   - 所有 /api 請求會自動代理到 http://localhost:5000（Flask 後端）

---

## 使用說明

- 啟動後會自動載入 AI 產生的問卷問題
- 輸入答案並送出，系統會顯示感謝訊息
- 所有問答資料會自動寫入 Google Sheet（由後端處理）

---

## 技術棧

- React 18
- Axios
- Webpack + Babel

---

## 注意事項

- 請先啟動後端 Flask API (`python main.py`)
- 若需修改 API 端點，請調整 `frontend/webpack.config.js` 的 proxy 設定 