import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : 'guest'; // Nếu chưa login thì dùng 'guest'

  // Load giỏ hàng riêng của User khi vào trang
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  }, [userId]);

  // Lưu giỏ hàng khi có thay đổi
  useEffect(() => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart, userId]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const isExist = prevCart.find(item => item._id === product._id);
      if (isExist) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item._id === productId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);