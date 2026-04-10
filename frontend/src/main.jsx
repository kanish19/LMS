import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- CLEAN CONSOLE PATCH ---
// These specific warnings are from internal libraries and do not affect the app.
// We suppress them here so you have a clean experience!
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  const msg = args.map(String).join(' ');
  if (msg.includes('THREE.Clock') || msg.includes('deprecated')) return;
  originalWarn(...args);
};

console.error = (...args) => {
  const msg = args.map(String).join(' ');
  if (msg.includes('Failure loading font') || msg.includes('gstatic')) return;
  originalError(...args);
};
// ----------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);