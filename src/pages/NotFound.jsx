import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[75vh] flex items-center justify-center py-12 px-4"
    >
      <div className="text-center max-w-lg mx-auto relative">
        {/* Glow Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full -z-10 pointer-events-none" />

        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm select-none"
        >
          404
        </motion.div>

        {/* Icon */}
        <div className="flex justify-center my-6">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/60 shadow-lg shadow-black/5"
          >
            <Search className="w-10 h-10 text-amber-500" />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border/60 bg-card/60 backdrop-blur-sm hover:bg-muted/80 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Link to="/products" className="inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-6 border-t border-border/60">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 font-medium">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center text-xs sm:text-sm">
            <Link
              to="/"
              className="text-foreground/80 hover:text-amber-500 transition-colors font-medium hover:underline underline-offset-4"
            >
              Home
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              to="/products"
              className="text-foreground/80 hover:text-amber-500 transition-colors font-medium hover:underline underline-offset-4"
            >
              Products
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              to="/users"
              className="text-foreground/80 hover:text-amber-500 transition-colors font-medium hover:underline underline-offset-4"
            >
              Users
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link
              to="/cart"
              className="text-foreground/80 hover:text-amber-500 transition-colors font-medium hover:underline underline-offset-4"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;