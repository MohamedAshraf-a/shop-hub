import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Truck, Headphones } from "lucide-react";

const Athen = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-16 px-4">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom text-center max-w-4xl mx-auto z-10"
      >
        {/* Top Badge */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-500 border border-amber-400/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            The Ultimate Luxury Shopping Experience
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground"
        >
          Welcome to <span className="text-amber-500 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Athen</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Your premium destination for smart shopping, curated with elegance,
          uncompromising quality, and effortless style.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/products" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all text-base gap-2 group">
              Explore Collections
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 rounded-xl text-base font-semibold border-border hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Features Bar */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border/50 text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-right sm:text-left">
              <p className="text-xs font-medium text-muted-foreground">Guarantee</p>
              <p className="text-sm font-semibold text-foreground">Premium Quality</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-right sm:text-left">
              <p className="text-xs font-medium text-muted-foreground">Checkout</p>
              <p className="text-sm font-semibold text-foreground">Secure Payments</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-500">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="text-right sm:text-left">
              <p className="text-xs font-medium text-muted-foreground">Assistance</p>
              <p className="text-sm font-semibold text-foreground">24/7 Dedicated Support</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Athen;