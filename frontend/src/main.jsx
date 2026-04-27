import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ModalProvider } from './context/ModalContext'

// Import thư viện trước
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import CSS cá nhân cuối cùng để ưu tiên ghi đè
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ModalProvider>
  </React.StrictMode>,
)