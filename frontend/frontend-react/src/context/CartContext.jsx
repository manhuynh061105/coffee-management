import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // --- Hàm hỗ trợ lấy ID "tươi" nhất ---
  const getUserIdFromStorage = () => {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    const user = JSON.parse(userData);
    return user._id || user.id;
  };

  // 1. Theo dõi đăng nhập/đăng xuất (Auth Watcher)
  useEffect(() => {
    const checkAuth = () => {
      const currentId = getUserIdFromStorage();
      if (currentId !== userId) {
        console.log("🔄 Phát hiện thay đổi User:", currentId);
        setUserId(currentId);
        
        // Nếu Logout (currentId null), xóa sạch giỏ hàng trong State
        if (!currentId) {
          setCart([]);
        }
      }
    };

    checkAuth(); // Kiểm tra ngay khi load
    const interval = setInterval(checkAuth, 1000); // Kiểm tra mỗi giây (đề phòng login/logout không reload trang)
    return () => clearInterval(interval);
  }, [userId]);

  // 2. Load dữ liệu khi UserId thay đổi (F5 hoặc Đổi Acc)
  useEffect(() => {
    const loadCartData = async () => {
      const currentId = getUserIdFromStorage();
      if (!currentId) return;

      // Bước A: Ưu tiên lấy từ LocalStorage để hiện UI nhanh
      const localData = localStorage.getItem(`cart_${currentId}`);
      if (localData) {
        setCart(JSON.parse(localData));
      } else {
        setCart([]); // Reset giỏ nếu user mới chưa có localData
      }

      // Bước B: Đồng bộ từ Server về
      try {
        console.log(`📡 Đang kéo dữ liệu Server cho: ${currentId}`);
        const res = await axios.get(`http://localhost:3000/api/cart/${currentId}`);
        if (res.data.success && res.data.data?.items) {
          const serverItems = res.data.data.items;
          // Chỉ cập nhật nếu server có đồ, tránh ghi đè rỗng lên local
          if (serverItems.length > 0) {
            setCart(serverItems);
            localStorage.setItem(`cart_${currentId}`, JSON.stringify(serverItems));
          }
        }
      } catch (error) {
        console.error("❌ Lỗi load cart từ server:", error.message);
      }
    };

    loadCartData();
  }, [userId]);

  // 3. Hàm Sync lên Server (Dùng ID trực tiếp để tránh lỗi stale state)
  const syncCartWithServer = async (newCart) => {
    const currentId = getUserIdFromStorage();
    if (!currentId) return;

    try {
      console.log("📤 Đang lưu giỏ hàng vào DB cho user:", currentId);
      await axios.post('http://localhost:3000/api/cart', {
        userId: currentId,
        items: newCart
      });
    } catch (error) {
      console.error("❌ Lỗi API Sync:", error.response?.data || error.message);
    }
  };

  // 4. Tự động lưu LocalStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    const currentId = getUserIdFromStorage();
    if (currentId && cart.length > 0) {
      localStorage.setItem(`cart_${currentId}`, JSON.stringify(cart));
    }
  }, [cart]);

  // --- Các hàm thao tác ---
  const addToCart = (product) => {
    const currentId = getUserIdFromStorage();
    if (!currentId) {
      alert("Vui lòng đăng nhập để mua hàng!");
      return;
    }

    setCart(prevCart => {
      let updatedCart;
      const isExist = prevCart.find(item => item._id === product._id);
      if (isExist) {
        updatedCart = prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      
      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productId) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(item => item !== null);
      
      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== productId);
      syncCartWithServer(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);