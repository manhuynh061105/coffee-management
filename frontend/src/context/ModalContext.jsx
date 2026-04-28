import React, { createContext, useState, useContext } from "react";
import AddProduct from "../pages/AddProduct";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const openAddProduct = () => setIsAddProductOpen(true);
  const closeAddProduct = () => setIsAddProductOpen(false);

  const handleSuccess = () => {
    closeAddProduct();
  };

  return (
    <ModalContext.Provider value={{ openAddProduct }}>
      {children}
      <AddProduct isOpen={isAddProductOpen} onClose={closeAddProduct} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
