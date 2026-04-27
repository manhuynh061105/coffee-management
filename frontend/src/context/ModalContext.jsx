import React, { createContext, useState, useContext } from 'react';
import AddProduct from '../pages/AddProduct'; // Component này sẽ chứa logic API

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const openAddProduct = () => setIsAddProductOpen(true);
  const closeAddProduct = () => setIsAddProductOpen(false);

  // Hàm xử lý sau khi thêm thành công
  const handleSuccess = () => {
    closeAddProduct();
    // Logic load lại dữ liệu thường được xử lý thông qua props hoặc window.location.reload()
  };

  return (
    <ModalContext.Provider value={{ openAddProduct }}>
      {children}
      
      {/* Component AddProduct sẽ nhận isOpen và onClose.
        Bạn cần đảm bảo bên trong AddProduct.jsx đã sử dụng 'api' từ configs/api.js
      */}
      <AddProduct 
        isOpen={isAddProductOpen} 
        onClose={closeAddProduct} 
      />
      
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);