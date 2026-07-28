import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e1b2e',
            color: '#e2e0f0',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#8b5cf6',
              secondary: '#1e1b2e',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e1b2e',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
