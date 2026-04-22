import React, { createContext, useState, useContext } from 'react';
import AddProduct from '../pages/AddProduct'; // Gọi trực tiếp file AddProduct của em

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const openAddProduct = () => setIsAddProductOpen(true);
  const closeAddProduct = () => setIsAddProductOpen(false);

  // Hàm xử lý sau khi thêm thành công (đã gộp vào bên trong AddProduct ở file trước, 
  // nhưng ta có thể truyền thêm logic từ đây nếu muốn)
  const handleSuccess = () => {
    closeAddProduct();
    // window.location.reload(); // Thầy đã để logic này bên trong AddProduct.jsx rồi
  };

  return (
    <ModalContext.Provider value={{ openAddProduct }}>
      {children}
      
      {/* Sử dụng trực tiếp component AddProduct. 
        Vì trong AddProduct.jsx em đã viết logic: if (!isOpen) return null;
        nên nó sẽ chỉ hiện ra khi isAddProductOpen là true.
      */}
      <AddProduct 
        isOpen={isAddProductOpen} 
        onClose={closeAddProduct} 
      />
      
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);