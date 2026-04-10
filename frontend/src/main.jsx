import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// --- CLEAN CONSOLE PATCH ---
// These specific warnings are from internal libraries and do not affect the app.
// We suppress them here so you have a clean experience!
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (args[0]?.includes?.('THREE.THREE.Clock: This module has been deprecated')) return;
  originalWarn(...args);
};

console.error = (...args) => {
  if (args[0]?.includes?.('Failure loading font')) return;
  originalError(...args);
};
// ----------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);