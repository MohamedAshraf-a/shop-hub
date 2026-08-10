import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const {
    cart = [],
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const totalItems = getTotalItems ? getTotalItems() : cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = getTotalPrice ? getTotalPrice() : cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4"
      >
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-xl shadow-amber-500/5">
            <ShoppingBag className="w-12 h-12 text-amber-500" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Your Cart is Empty</h2>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm sm:text-base">
          Looks like you haven't added any items to your cart yet. Explore our collection and find something special!
        </p>

        <Link to="/products">
          <Button className="mt-6 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 h-12 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95">
            Start Shopping
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            Shopping Cart
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            clearCart();
            toast.info("Cart cleared successfully");
          }}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => {
              const itemPrice = Number(item.price) || 0;
              const itemQuantity = Number(item.quantity) || 1;
              const itemTotal = itemPrice * itemQuantity;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <Card className="overflow-hidden border-border/60 hover:border-amber-500/30 transition-all bg-card/80 backdrop-blur-sm rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Product Thumbnail */}
                      <Link to={`/products/${item.id}`} className="flex-shrink-0 group relative">
                        <img
                          src={item.thumbnail || item.image}
                          alt={item.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-border group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <Link to={`/products/${item.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-amber-500 transition-colors truncate text-base">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                          ${itemPrice.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity & Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                        <div className="flex items-center border border-border/80 rounded-xl overflow-hidden bg-background/50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, itemQuantity - 1)}
                            className="px-2.5 py-1.5 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center font-bold text-xs sm:text-sm text-foreground">
                            {itemQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, itemQuantity + 1)}
                            className="px-2.5 py-1.5 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Total per Item */}
                        <div className="text-right min-w-[75px]">
                          <p className="font-bold text-foreground text-sm sm:text-base">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success(`Removed "${item.title}" from cart`);
                          }}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border/60 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-md shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
            <CardContent className="p-6 space-y-5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm border-b border-border/60 pb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="text-muted-foreground font-normal">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground pt-1">
                <span>Total</span>
                <span className="text-amber-500">${totalPrice.toFixed(2)}</span>
              </div>

              <Button className="w-full h-12 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 rounded-xl transition-all active:scale-[0.98]">
                Proceed to Checkout
              </Button>

              <Link
                to="/products"
                className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-amber-500 font-medium transition-colors pt-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}