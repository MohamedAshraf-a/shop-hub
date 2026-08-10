import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/products";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw, 
  Check 
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { toast } from "sonner";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto animate-pulse px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted h-96 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-4xl mb-4">😅</div>
        <h3 className="text-xl font-semibold text-destructive">Error loading product</h3>
        <p className="text-muted-foreground mt-2">Please try again later</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const product = data?.data;
  const liked = isInWishlist(product?.id);
  const inCart = isInCart(product?.id);

  const handleAddToCart = () => {
    if (inCart) {
      toast.info("Already in cart");
      return;
    }
    addToCart(product, quantity);
    toast.success(`🛒 ${product.title} added to cart!`);
  };

  const handleToggleWishlist = () => {
    const newState = toggleWishlist(product);
    if (newState) {
      toast.success(`❤️ ${product.title} added to wishlist!`);
    } else {
      toast.info("Removed from wishlist");
    }
  };

  const images = product?.images || [product?.thumbnail];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-muted/30">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
            {product.discountPercentage > 10 && (
              <Badge className="absolute top-4 right-4 bg-gold text-foreground border-0 shadow-lg shadow-gold/30 px-3 py-1.5 text-sm font-bold rounded-full">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    selectedImage === index 
                      ? "border-gold shadow-md" 
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Category */}
          <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full bg-muted/50 text-foreground">
            {product.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-gold text-gold" />
              <span className="font-semibold text-foreground">{product.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              {product.stock} in stock
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-foreground">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-muted-foreground line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-muted transition-colors text-foreground"
              >
                -
              </button>
              <span className="px-4 py-2 min-w-[48px] text-center font-medium text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-muted transition-colors text-foreground"
              >
                +
              </button>
            </div>
            <span className="text-sm text-muted-foreground">
              Max {product.stock}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold ${
                inCart
                  ? "bg-green-600 text-white cursor-default shadow-lg shadow-green-600/30"
                  : "bg-foreground text-white hover:bg-foreground/90 hover:shadow-lg active:scale-95"
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
            
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-xl transition-all duration-300 ${
                liked
                  ? "bg-gold text-foreground shadow-lg shadow-gold/30"
                  : "border border-border hover:bg-muted text-muted-foreground hover:text-gold"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-foreground" : ""}`} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="w-5 h-5 text-gold" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-gold" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <RotateCcw className="w-5 h-5 text-gold" />
              <span>30 Days Return</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;