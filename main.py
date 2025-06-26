"""
main.py
AI Agent 問卷系統主程式
- 啟動 Flask 伺服器
- 產生生活相關問題
- 接收使用者答案
- 寫入 Google Sheet
"""

import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import openai
from google.oauth2 import service_account
from googleapiclient.discovery import build
from openai import OpenAI
import random
import time

# 載入環境變數
load_dotenv()

# 初始化 Flask 應用
app = Flask(__name__)

# 初始化 OpenAI client（新版 openai 套件 >=1.0.0）
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Google Sheet 設定
SHEET_ID = os.getenv('GOOGLE_SHEET_ID')
SERVICE_ACCOUNT_FILE = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# 啟動 Google Sheets API 服務
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
sheet_service = build('sheets', 'v4', credentials=creds)
sheet = sheet_service.spreadsheets()

# 問卷題目生成函式
# 使用 OpenAI GPT-4 產生生活相關問題
# 回傳一個問題字串
def generate_question():
    # 加入隨機元素讓每次 prompt 不同
    rand_seed = random.randint(1000, 9999)
    timestamp = int(time.time())
    prompt = f"請給我一個日常相關的問卷問題，簡短明確。亂數:{rand_seed} 時間:{timestamp}"
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[{"role": "system", "content": prompt}],
            temperature=1.1  # 提高多樣性
        )
        question = response.choices[0].message.content.strip()
        return question
    except Exception as e:
        print("OpenAI API error:", e)
        return None

# 問卷首頁：取得一個新問題
default_route = '/api/question'
@app.route(default_route, methods=['GET'])
def get_question():
    """
    產生一個生活相關的問卷問題
    Output: {"question": 問題字串}
    """
    question = generate_question()
    if not question:
        return jsonify({"error": "OpenAI API 無法取得問題，請檢查金鑰或API狀態。"}), 500
    return jsonify({"question": question})

# 提交答案：接收問題與答案並寫入 Google Sheet
@app.route('/api/answer', methods=['POST'])
def submit_answer():
    """
    接收使用者提交的問題與答案，寫入 Google Sheet
    Input: {"question": 問題, "answer": 答案}
    Output: {"status": "success"}
    """
    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')
    # 寫入 Google Sheet
    sheet.values().append(
        spreadsheetId=SHEET_ID,
        range="A:B",
        valueInputOption="RAW",
        body={"values": [[question, answer]]}
    ).execute()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    # 啟動 Flask 伺服器
    app.run(host='0.0.0.0', port=5000, debug=True) 