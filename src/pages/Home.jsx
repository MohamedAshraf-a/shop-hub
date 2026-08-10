import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Users,
  ShieldCheck,
  Truck,
  Gem,
  Award,
  Clock,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    desc: "Complete protection for your data and financial transactions with military-grade encryption.",
  },
  {
    icon: Truck,
    title: "VIP Express Delivery",
    desc: "Fast shipping with premium white-glove packaging to ensure your products arrive in pristine condition.",
  },
  {
    icon: Gem,
    title: "Exceptional Quality",
    desc: "Meticulously curated products designed to meet your highest standards of luxury and refinement.",
  },
];

const TRUST_BADGES = [
  { icon: Award, label: "5,000+ Elite Clients" },
  { icon: Clock, label: "Fast & Reliable Shipping" },
  { icon: Crown, label: "Guaranteed Excellence" },
];

const Home = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen"
    >
      {/* ==========================================
          Hero Section
          ========================================== */}
      <section
        className="hero-gradient min-h-[calc(100vh-80px)] flex items-center justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32"
        aria-label="Hero"
      >
        <div className="max-w-5xl lg:max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <span className="badge-gold inline-flex items-center gap-2.5 py-2.5 px-6 text-sm sm:text-base rounded-full shadow-sm">
              <Sparkles
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#18181b]"
                aria-hidden="true"
              />
              <span>The Future of Luxury Shopping</span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            Redefining Modern Elegance <br className="hidden sm:inline" />
            <span className="text-gradient-hero">Exclusively at ShopHub</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 px-2 sm:px-4 font-normal text-[var(--color-muted-foreground)] leading-relaxed"
          >
            Curated collections of world-class products, designed to elevate
            your daily lifestyle with unmatched quality and sophistication.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto"
          >
            <Link
              to="/products"
              className="btn-gold group w-full sm:w-auto rounded-3xl px-8 py-4 text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] h-16 sm:h-18 min-w-[210px]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <span>Explore Collection</span>
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/users"
              className="btn-secondary w-full sm:w-auto rounded-3xl px-8 py-4 text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] h-16 sm:h-18 min-w-[210px]"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span>Join Community</span>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mt-16 sm:mt-24 pt-10 border-t border-[var(--color-border)] text-sm sm:text-base text-[var(--color-muted-foreground)] font-medium"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 transition-colors hover:text-[var(--color-foreground)]"
              >
                <Icon
                  className="w-5 h-5 text-gold shrink-0"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          Features Section
          ========================================== */}
      <section
        className="hero-gradient min-h-[calc(100vh-90px)] flex items-center justify-center px-2 sm:px-6 py-12 sm:py-16"
        aria-label="Features"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="gold-text text-xs font-semibold uppercase tracking-widest">
              Why Choose Emuurec
            </span>
            <h2 className="mt-2 font-bold">
              Crafted for <span className="text-gradient">Distinction</span>
            </h2>
            <div className="section-divider flex justify-center text-center" />
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                className="card-premium text-center"
              >
                <div className="inline-flex p-3.5 rounded-xl gold-bg-light gold-text mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Exclusive Products Section
          ========================================== */}
    </motion.div>
  );
};

export default Home;
