import { useState } from "react";

const readCartFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem("cart");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [cart, setCart] = useState(readCartFromStorage);

  // إضافة منتج إلى السلة
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      let newCart;
      
      if (existing) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }

      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // تحديث كمية منتج
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // تفريغ السلة
  const clearCart = () => {
    setCart([]);
    window.localStorage.removeItem("cart");
  };

  // حساب عدد العناصر الكلي
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // حساب السعر الكلي
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // التحقق من وجود منتج في السلة
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // الحصول على كمية منتج معين
  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
  };
};