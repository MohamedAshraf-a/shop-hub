import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";

import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Pagination";
import ProductFiltersSidebar from "@/components/common/ProductFiltersSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDebounce } from "@/hooks/useDebounce";
import { getCategories, getProducts, searchProducts } from "@/services/products";

const PRODUCT_LIMIT = 8;
const DEFAULT_PRICE_RANGE = [0, 1000];

function MobileFilterSheet({
  openSections,
  toggleSection,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  selectedBrands,
  toggleBrand,
  deliveryOption,
  setDeliveryOption,
  categories,
  categoriesLoading,
  availableBrands,
  onClearAll,
  activeFilters,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 border-border hover:border-gold">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilters && (
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <Filter className="w-5 h-5 text-gold" />
            Filters
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] p-4">
          <ProductFiltersSidebar
            categories={categories}
            categoriesLoading={categoriesLoading}
            openSections={openSections}
            toggleSection={toggleSection}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            availableBrands={availableBrands}
            onClearAll={onClearAll}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

const Products = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
    brands: true,
    delivery: true,
  });

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, selectedCategory, sortBy],
    queryFn: () => {
      let url = `?limit=${PRODUCT_LIMIT}&skip=${(page - 1) * PRODUCT_LIMIT}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      return getProducts(url);
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: searchData } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchProducts(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  });

  const categories = useMemo(() => {
    const rawCategories = categoriesData?.data ?? [];

    if (rawCategories.length > 0 && typeof rawCategories[0] === "object") {
      return rawCategories.map((cat) => cat.name || cat.slug || cat);
    }

    return rawCategories;
  }, [categoriesData]);

  const products = useMemo(() => {
    if (debouncedSearch.length > 2) {
      return searchData?.data?.products ?? [];
    }

    return data?.data?.products ?? [];
  }, [data, debouncedSearch, searchData]);

  const totalProducts = useMemo(() => {
    if (debouncedSearch.length > 2) {
      return searchData?.data?.total ?? 0;
    }

    return data?.data?.total ?? 0;
  }, [data, debouncedSearch, searchData]);

  const totalPages = Math.ceil(totalProducts / PRODUCT_LIMIT);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const inPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const inRating = product.rating >= selectedRating;
      const inBrand =
        selectedBrands.length === 0 ||
        (product.brand && selectedBrands.includes(product.brand));

      return inPrice && inRating && inBrand;
    });
  }, [priceRange, products, selectedBrands, selectedRating]);

  const sortedProducts = useMemo(() => {
    const nextProducts = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        return nextProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return nextProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return nextProducts.sort((a, b) => b.rating - a.rating);
      case "newest":
        return nextProducts.sort((a, b) => b.id - a.id);
      default:
        return nextProducts.sort((a, b) => b.rating * b.stock - a.rating * a.stock);
    }
  }, [filteredProducts, sortBy]);

  const availableBrands = useMemo(() => {
    const brands = new Set();

    products.forEach((product) => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });

    if (brands.size === 0) {
      return ["Adidas", "Columbia", "Demix", "New Balance", "Nike", "Xiaomi", "Asics"];
    }

    return Array.from(brands);
  }, [products]);

  const activeFilters =
    selectedCategory ||
    selectedBrands.length > 0 ||
    selectedRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < DEFAULT_PRICE_RANGE[1] ||
    deliveryOption;

  const toggleBrand = useCallback((brand) => {
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]
    );
  }, []);

  const toggleSection = useCallback((section) => {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSelectedRating(0);
    setSelectedBrands([]);
    setDeliveryOption("");
    setSelectedCategory("");
    setPage(1);
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setPage(1);
  }, []);

  // دالة التعامل مع تغيير الصفحات والتمرير لأعلى
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-foreground">We couldn&rsquo;t load the products</h2>
        <p className="text-muted-foreground mt-2">Please refresh and try again.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalProducts} products found
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              aria-label="Search products"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setPage(1);
              }}
              className="pl-9 w-full sm:w-48 md:w-64 h-10 rounded-xl border-border focus:border-gold focus:ring-gold/20"
            />
          </div>

          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-10 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>

          <MobileFilterSheet
            openSections={openSections}
            toggleSection={toggleSection}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategorySelect}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            categories={categories}
            categoriesLoading={categoriesLoading}
            availableBrands={availableBrands}
            onClearAll={clearAllFilters}
            activeFilters={activeFilters}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
            <ProductFiltersSidebar
              categories={categories}
              categoriesLoading={categoriesLoading}
              openSections={openSections}
              toggleSection={toggleSection}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategorySelect}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              availableBrands={availableBrands}
              onClearAll={clearAllFilters}
            />
          </div>
        </aside>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse space-y-3 p-4 border border-border rounded-2xl bg-card">
                    <div className="bg-muted aspect-square rounded-xl" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded-xl w-full mt-4" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground">No products found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* إضافة مكون الترقيم هنا مع شرط التأكد من وجود صفحات */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-border/50">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Products;