import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 問卷主題色
const PRIMARY = '#4F8EF7';
const BORDER = '#e0e0e0';
const BG = '#f9fafe';

// App 元件：問卷互動主流程
// - 載入並顯示 AI 產生的問題
// - 收集使用者答案
// - 送出答案到後端 API
// - 顯示送出成功訊息
function App() {
  // 問題狀態
  const [question, setQuestion] = useState('');
  // 使用者答案狀態
  const [answer, setAnswer] = useState('');
  // 是否已送出
  const [submitted, setSubmitted] = useState(false);
  // 載入狀態
  const [loading, setLoading] = useState(true);
  // 錯誤訊息狀態
  const [error, setError] = useState('');

  // 載入問題
  useEffect(() => {
    setLoading(true);
    axios.get('/api/question')
      .then(res => {
        setQuestion(res.data.question);
        setLoading(false);
      })
      .catch(() => {
        setError('無法載入問題，請稍後再試。');
        setLoading(false);
      });
  }, []);

  // 處理答案送出
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    try {
      await axios.post('/api/answer', { question, answer });
      setSubmitted(true);
    } catch {
      setError('送出失敗，請稍後再試。');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#fff',
        border: `1.5px solid ${BORDER}`,
        borderRadius: 16,
        boxShadow: '0 4px 24px #0001',
        maxWidth: 420,
        width: '100%',
        padding: 32,
        margin: 16,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 2,
            color: PRIMARY,
            fontFamily: 'Segoe UI, Arial, sans-serif',
          }}>AI問卷</span>
        </div>
        {loading && (
          <div style={{ textAlign: 'center', color: '#888', padding: 32 }}>
            <div className="loader" style={{ margin: '0 auto 12px', width: 32, height: 32, border: '4px solid #eee', borderTop: `4px solid ${PRIMARY}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            載入中...
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {error && (
          <div style={{ color: '#d32f2f', textAlign: 'center', marginBottom: 16 }}>{error}</div>
        )}
        {!loading && !error && submitted && (
          <div style={{ textAlign: 'center', color: PRIMARY, fontSize: 20, fontWeight: 500, padding: '32px 0' }}>
            感謝您的作答！
          </div>
        )}
        {!loading && !error && !submitted && question && (
          <form onSubmit={handleSubmit}>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 18, color: '#222', lineHeight: 1.6, textAlign: 'center' }}>
              {question}
            </div>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: `1.5px solid ${BORDER}`,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                resize: 'vertical',
                outline: 'none',
                background: '#f7faff',
                transition: 'border 0.2s',
                display: 'block',
              }}
              placeholder="請輸入您的答案..."
              required
            />
            <button
              type="submit"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: PRIMARY,
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #4f8ef71a',
                transition: 'background 0.2s',
                display: 'block',
              }}
            >送出</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App; 