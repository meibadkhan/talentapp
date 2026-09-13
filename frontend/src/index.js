import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

console.log('[index.js] Starting React app...');

const rootElement = document.getElementById('root');
console.log('[index.js] Root element:', rootElement);

if (!rootElement) {
  console.error('[index.js] CRITICAL: #root element not found in DOM!');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log('[index.js] React mounted successfully');
}
