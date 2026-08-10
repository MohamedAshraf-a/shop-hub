import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Calendar,
  Crown,
  ChevronRight,
  ShieldCheck,
  User,
} from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getTotalItems } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    // محاكاة جلب بيانات المستخدم
    const timer = setTimeout(() => {
      setUser({
        id: 1,
        firstName: "Ahmed",
        lastName: "Mohamed",
        username: "ahmed_m",
        email: "ahmed@example.com",
        phone: "+20 123 456 7890",
        image: "https://i.pravatar.cc/300?img=1",
        address: {
          address: "123 Main Street",
          city: "Cairo",
          state: "Cairo",
          postalCode: "12345",
        },
        joined: "January 2024",
        orders: 12,
        reviews: 8,
        points: 1250,
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  /* Skeleton Loading State - Dynamic Luxury Loading */
  if (loading) {
    return (
      <div className="container-custom section-spacing max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 rounded-xl" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="card-premium p-6 text-center space-y-4">
              <Skeleton className="w-28 h-28 rounded-full mx-auto" />
              <Skeleton className="h-6 w-36 mx-auto rounded-lg" />
              <Skeleton className="h-4 w-24 mx-auto rounded-md" />
              <Skeleton className="h-6 w-32 mx-auto rounded-full" />
              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-28 w-full rounded-2xl" />
              ))}
            </div>
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Orders",
      value: user.orders || "12",
      icon: ShoppingBag,
      link: "/orders",
    },
    {
      label: "Wishlist Items",
      value: wishlist.length,
      icon: Heart,
      link: "/wishlist",
    },
    {
      label: "Cart Items",
      value: getTotalItems(),
      icon: ShoppingBag,
      link: "/cart",
    },
    {
      label: "Reviews",
      value: user.reviews || "8",
      icon: Award,
    },
    {
      label: "Reward Points",
      value: user.points || "1250",
      icon: Sparkles,
    },
    {
      label: "Account Status",
      value: "Verified",
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container-custom section-spacing max-w-5xl mx-auto space-y-8"
    >
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-foreground)]">
            My Account
          </h1>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Manage your personal profile, activity, and preferences
          </p>
        </div>
        <span className="badge-gold self-start sm:self-auto inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-bold shadow-sm">
          <Crown className="w-3.5 h-3.5 text-[#18181b]" />
          VIP Executive
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Sidebar */}
        <div className="md:col-span-1">
          <Card className="card-premium p-0 overflow-hidden relative shadow-2xl">
            {/* Background Accent Halo */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <CardContent className="p-6 text-center relative z-10 flex flex-col items-center">
              {/* Avatar Frame */}
              <div className="relative mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 blur opacity-70 animate-pulse" />
                <Avatar className="w-28 h-28 border-4 border-[var(--color-card)] relative shadow-xl">
                  <AvatarImage
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="gold-bg-light gold-text font-black text-3xl">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Name & Identity */}
              <h2 className="text-xl font-extrabold tracking-tight text-[var(--color-foreground)]">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs font-mono text-[var(--color-muted-foreground)] mt-0.5">
                @{user.username}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-muted)]/50 border border-[var(--color-border)] text-[11px] font-medium text-[var(--color-muted-foreground)]">
                <Calendar className="w-3 h-3 gold-text" />
                <span>Member since {user.joined}</span>
              </div>

              {/* Contact Information List */}
              <div className="w-full mt-6 space-y-3 pt-6 border-t border-[var(--color-border)] text-left">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]/20 border border-[var(--color-border)]">
                  <div className="p-2 rounded-lg gold-bg-light gold-text flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                      Email
                    </p>
                    <p className="text-xs font-medium text-[var(--color-foreground)] truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]/20 border border-[var(--color-border)]">
                  <div className="p-2 rounded-lg gold-bg-light gold-text flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                      Phone
                    </p>
                    <p className="text-xs font-medium text-[var(--color-foreground)]">
                      {user.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]/20 border border-[var(--color-border)]">
                  <div className="p-2 rounded-lg gold-bg-light gold-text flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                      Location
                    </p>
                    <p className="text-xs font-medium text-[var(--color-foreground)] truncate">
                      {user.address?.address}, {user.address?.city}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-[var(--color-border)] hover:border-red-500/50 hover:bg-red-500/10 text-red-500 hover:text-red-600 rounded-xl transition-all duration-300 font-semibold text-xs"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Recent Activity Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Dashboard Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="card-premium p-4 hover:border-gold/40 transition-all duration-300 group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl gold-bg-light gold-text group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-4 h-4" />
                      </div>
                      {stat.link && (
                        <Link
                          to={stat.link}
                          className="text-xs gold-text flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span>Go</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-2xl font-black text-[var(--color-foreground)] tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium text-[var(--color-muted-foreground)] mt-0.5 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <Card className="card-premium p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl gold-bg-light gold-text">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-foreground)]">
                    Recent Activity
                  </h3>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    Your latest actions across the platform
                  </p>
                </div>
              </div>
              <span className="badge-gold text-[10px] py-1 px-3">
                Live Timeline
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  text: 'Added <strong class="text-[var(--color-foreground)] font-semibold">iPhone 15 Pro</strong> to cart',
                  time: "2 hours ago",
                  icon: ShoppingBag,
                },
                {
                  text: 'Liked <strong class="text-[var(--color-foreground)] font-semibold">MacBook Pro M3</strong>',
                  time: "5 hours ago",
                  icon: Heart,
                },
                {
                  text: 'Purchased <strong class="text-[var(--color-foreground)] font-semibold">AirPods Max</strong>',
                  time: "1 day ago",
                  icon: Award,
                },
                {
                  text: 'Earned <strong class="text-[var(--color-foreground)] font-semibold">100 VIP Points</strong>',
                  time: "2 days ago",
                  icon: Sparkles,
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-[var(--color-muted)]/20 border border-[var(--color-border)] hover:border-gold/30 hover:bg-[var(--color-muted)]/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm" />
                    <span
                      className="text-xs text-[var(--color-muted-foreground)]"
                      dangerouslySetInnerHTML={{ __html: activity.text }}
                    />
                  </div>
                  <span className="text-[11px] text-[var(--color-muted-foreground)] font-mono flex items-center gap-1 self-end sm:self-auto">
                    <Clock className="w-3 h-3 text-gold" />
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}