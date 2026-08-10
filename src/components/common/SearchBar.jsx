import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/products";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // 1. Debounce effect لتأخير البحث 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // 2. إغلاق القائمة المنسدلة عند الضغط خارج البحث
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  });

  // التأكد من استخراج البيانات بغض النظر عن طريقة إرجاع API لها (data.products أو data.data.products)
  const results = data?.products || data?.data?.products || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xs md:max-w-sm">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="w-full px-4 py-2 pr-10 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all text-sm"
        />
        <button
          type="submit"
          className="absolute right-1 p-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-lg transition-colors flex items-center justify-center"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      <AnimatePresence>
        {isOpen && query.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl max-h-96 overflow-y-auto z-50 divide-y divide-border/40"
          >
            {isLoading ? (
              <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                Searching...
              </div>
            ) : results.length > 0 ? (
              results.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/products/${product.id}`);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <img
                    src={product.thumbnail || product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-lg border border-border/50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {product.title}
                    </p>
                    <p className="text-xs font-semibold text-amber-500 mt-0.5">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No products found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}