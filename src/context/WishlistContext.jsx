import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // حالة المفضلة بالذاكرة فقط (In-Memory)
  const [wishlist, setWishlist] = useState([]);

  // إضافة منتج إلى المفضلة
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  // إزالة منتج من المفضلة
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // التحقق من وجود منتج في المفضلة
  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // تبديل حالة المنتج (إضافة / إزالة)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false; // تم الإزالة
    } else {
      addToWishlist(product);
      return true; // تم الإضافة
    }
  };

  // تفريغ المفضلة بالكامل
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// الـ Hook المخصص للاستخدام المباشر في المكونات
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};