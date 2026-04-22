import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ModalProvider } from './context/ModalContext' // 1. Import ModalProvider mới tạo
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bao bọc ModalProvider ở lớp ngoài cùng hoặc bên trong CartProvider đều được */}
    <ModalProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ModalProvider>
  </React.StrictMode>,
)