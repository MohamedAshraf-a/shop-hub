import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Check, Eye, Star } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCart, addToCart } = useCart();

  if (!product) return null;

  const liked = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const price = Number(product.price) || 0;
  const discount = Number(product.discountPercentage) || 0;

  // حساب السعر الأصلي قبل الخصم بشكل آمن
  const originalPrice =
    discount > 0 && discount < 100
      ? (price / (1 - discount / 100)).toFixed(2)
      : null;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleWishlist(product);
    if (newState) {
      toast.success(`❤️ ${product.title} added to wishlist!`);
    } else {
      toast.info(`Removed from wishlist`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      toast.info(`Already in cart`);
      return;
    }
    addToCart(product, 1);
    toast.success(`🛒 ${product.title} added to cart!`);
  };

  return (
    <Card className="group h-full flex flex-col border border-border/70 bg-card text-card-foreground transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 rounded-2xl overflow-hidden">
      <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
        <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
          {/* Container Picture */}
          <div className="relative overflow-hidden rounded-xl bg-muted/50 aspect-square">
            <img
              src={product.thumbnail || product.image || "/placeholder.png"}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <Badge className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-md shadow-rose-500/20 px-2.5 py-0.5 text-xs font-bold rounded-full">
                -{Math.round(discount)}%
              </Badge>
            )}

            {/* Rating Badge */}
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-md text-foreground border border-border/50 flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full shadow-sm"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {product.rating || "4.5"}
            </Badge>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-background/90 text-foreground px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg border border-border/50 transition-transform duration-200 active:scale-95 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400">
                <Eye className="w-4 h-4" />
                Quick View
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm md:text-base line-clamp-1 text-foreground group-hover:text-amber-500 transition-colors">
                {product.title}
              </h3>

              <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-2 border-t border-border/40">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base md:text-lg font-bold text-amber-500">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {product.category && (
                <Badge
                  variant="outline"
                  className="bg-muted/40 text-muted-foreground text-[11px] px-2 py-0.5 rounded-full border-border/60 capitalize"
                >
                  {product.category}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Card Actions */}
      <CardFooter className="p-4 md:p-5 pt-0">
        <div className="flex items-center gap-2.5 w-full">
          {/* Wishlist Button */}
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleLike}
            className={`rounded-xl transition-all duration-200 shrink-0 ${
              liked
                ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 hover:border-rose-600 shadow-md shadow-rose-500/20"
                : "border-border bg-background hover:border-rose-400/50 hover:bg-rose-500/10 hover:text-rose-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                liked ? "fill-white" : ""
              }`}
            />
          </Button>

          {/* Add to Cart Button */}
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={inCart}
            className={`flex-1 rounded-xl transition-all duration-200 text-xs md:text-sm font-semibold h-10 ${
              inCart
                ? "bg-emerald-600 text-white hover:bg-emerald-600 cursor-default shadow-md shadow-emerald-600/20"
                : "bg-amber-400 text-slate-950 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-500/20 active:scale-95"
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 mr-1.5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;