import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Your wishlist is empty</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Start adding items you love to your wishlist.
        </p>
        <Link to="/products">
          <Button variant="gold" className="mt-6">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      toast.info("Already in cart");
      return;
    }
    addToCart(product, 1);
    toast.success(`🛒 ${product.title} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-sm text-muted-foreground">Items you've saved for later</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            clearWishlist();
            toast.info("Wishlist cleared");
          }}
          className="text-destructive hover:text-destructive/80"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Link to={`/products/${product.id}`}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-gold text-foreground border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {product.rating || "4.5"}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                        toast.info(`Removed ${product.title} from wishlist`);
                      }}
                      className="absolute top-2 left-2 p-1.5 bg-card/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-white transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                </Link>

                <CardContent className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-gold transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-gold">
                      ${product.price}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isInCart(product.id) ? (
                      "Already in Cart"
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/products"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}