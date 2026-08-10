import { useState } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = window.localStorage.getItem("wishlist");
    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  // إضافة منتج إلى المفضلة
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // التأكد من عدم وجود المنتج مسبقاً
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      const newWishlist = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  // إزالة منتج من المفضلة
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((p) => p.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  // تبديل حالة المنتج (إضافة/إزالة)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  // التحقق من وجود منتج في المفضلة
  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // تفريغ المفضلة
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
};