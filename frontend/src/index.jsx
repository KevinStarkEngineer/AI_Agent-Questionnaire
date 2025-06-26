import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 掛載 App 元件到 root
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 