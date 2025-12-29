import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './contexts/ToastContext'
import ToastContainer from './components/ToastContainer'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
)
