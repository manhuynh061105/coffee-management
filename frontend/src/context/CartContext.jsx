import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../configs/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  const getUserIdFromStorage = () => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    const user = JSON.parse(userData);
    return user._id || user.id;
  };

  useEffect(() => {
    const checkAuth = () => {
      const currentId = getUserIdFromStorage();
      if (currentId !== userId) {
        setUserId(currentId);
        if (!currentId) setCart([]);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const loadCartData = async () => {
      const currentId = getUserIdFromStorage();
      if (!currentId) return;

      const localData = localStorage.getItem(`cart_${currentId}`);
      if (localData) setCart(JSON.parse(localData));

      try {
        const res = await api.get(`/cart/${currentId}`);
        if (res.data.success && res.data.data?.items) {
          const serverItems = res.data.data.items;
          if (serverItems.length > 0) {
            setCart(serverItems);
            localStorage.setItem(
              `cart_${currentId}`,
              JSON.stringify(serverItems),
            );
          }
        }
      } catch (error) {
        console.error("❌ Lỗi load cart từ server:", error.message);
      }
    };

    loadCartData();
  }, [userId]);

  const syncCartWithServer = async (newCart) => {
    const currentId = getUserIdFromStorage();
    if (!currentId) return;

    try {
      await api.post("/cart", {
        userId: currentId,
        items: newCart,
      });
    } catch (error) {
      console.error("❌ Lỗi API Sync:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const currentId = getUserIdFromStorage();
    if (currentId) {
      localStorage.setItem(`cart_${currentId}`, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const currentId = getUserIdFromStorage();
    if (!currentId) {
      alert("Vui lòng đăng nhập để mua hàng!");
      return;
    }

    setCart((prevCart) => {
      let updatedCart;
      const isExist = prevCart.find((item) => item._id === product._id);
      if (isExist) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item._id === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item) => item !== null);

      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    const currentId = getUserIdFromStorage();

    setCart([]);

    if (currentId) {
      localStorage.removeItem(`cart_${currentId}`);

      try {
        await api.post("/cart", {
          userId: currentId,
          items: [],
        });
        console.log("✅ Đã clear giỏ hàng thành công!");
      } catch (error) {
        console.error("❌ Lỗi clear giỏ hàng server:", error.message);
      }
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
