# AI Agent 問卷系統

## 專案簡介

**AI Agent 問卷系統**  
這是一個自動化問卷平台，AI Agent 會主動提出生活相關問題，收集使用者的回答，並將所有問答結果自動寫入 Google Sheet，方便後續分析與管理。

### 專案概述

本系統結合 AI 問答生成、前端互動介面與 Google Sheet API，實現一個全自動化的問卷收集流程。使用者只需回答 AI 提出的問題，所有資料將即時儲存於 Google Sheet，無需人工整理。

---

## 主要功能

- AI Agent 自動生成生活相關問卷題目
- 前端介面即時顯示問題並收集使用者回答
- 問題與答案自動寫入 Google Sheet
- 支援多位使用者同時填寫
- 問卷資料可即時於 Google Sheet 查看與分析

---

## 技術棧

- **前端**：React 18, Axios, Webpack, Babel
- **後端**：Python (Flask)
- **AI 問題生成**：OpenAI GPT-4 API
- **資料儲存**：Google Sheets API
- **其他**：dotenv（環境變數管理）

---

## 安裝與設定說明

### 1. 後端（Flask）

1. **Clone 專案**
   ```bash
   git clone <本專案網址>
   cd AI_Agent-Questionnaire
   ```
2. **安裝依賴套件**
   ```bash
   pip install -r requirements.txt
   ```
3. **設定環境變數**
   - 複製 `.env.example` 為 `.env`，填入下列資訊：
     ```
     OPENAI_API_KEY=你的OpenAI金鑰
     GOOGLE_SHEET_ID=你的Google Sheet ID
     GOOGLE_SERVICE_ACCOUNT_JSON=你的Google Service Account JSON路徑
     ```
4. **啟動後端服務**
   ```bash
   python main.py
   ```
   - 預設於 http://localhost:5000 提供 API 服務

### 2. 前端（React）

1. **進入 frontend 目錄**
   ```bash
   cd frontend
   ```
2. **安裝依賴套件**
   ```bash
   npm install
   ```
3. **啟動前端開發伺服器**
   ```bash
   npm start
   ```
   - 預設於 http://localhost:3000 開啟
   - 所有 `/api` 請求自動代理到 http://localhost:5000

---

## 使用說明

1. 啟動後端 Flask API (`python main.py`)，再啟動前端 React (`npm start`)
2. 使用者開啟 http://localhost:3000，系統自動載入 AI 產生的問卷問題
3. 輸入答案並送出，系統顯示感謝訊息
4. 所有問答資料自動寫入 Google Sheet（由後端處理）
5. 管理者可於 Google Sheet 即時查看所有問卷資料

---

## 最新變更

- 2025-06-20~2025-06-23
  - 建立 Python/Flask 主程式 main.py
  - 新增 requirements.txt
  - 規劃 .env.example
  - 完成 Google Sheet 與 OpenAI API 串接

- 2025-06-24~2025-06-27
  - 新增 React 前端互動介面（frontend 資料夾）
  - 完成前端互動介面
  - 完成前後端交互

---

## 貢獻指南

歡迎提出 Issue 或 Pull Request，請遵循專案程式風格與註解規範。

---

## 授權

本專案採用 MIT License。

This project is licensed under the [MIT License](./LICENSE).