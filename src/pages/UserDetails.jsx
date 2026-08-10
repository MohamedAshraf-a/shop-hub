import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  User,
  Calendar,
  Home,
  Building2,
  Briefcase,
  Globe,
  Users,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  Crown,
  ExternalLink,
} from "lucide-react";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  /* Skeleton Loading State - Ultra Modern */
  if (isLoading) {
    return (
      <div className="container-custom section-spacing max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-40 rounded-full" />
        <div className="card-premium p-0 overflow-hidden rounded-3xl border border-[var(--color-border)]">
          <div className="p-12 bg-[var(--color-muted)]/10 flex flex-col items-center">
            <Skeleton className="w-32 h-32 rounded-full mb-6" />
            <Skeleton className="h-8 w-64 mb-3 rounded-xl" />
            <Skeleton className="h-4 w-36 rounded-md" />
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-5 w-40 rounded-lg" />
              <Skeleton className="h-14 w-full rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-40 rounded-lg" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Error State */
  if (error) {
    return (
      <div className="container-custom section-spacing max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 mx-auto rounded-full gold-bg-light flex items-center justify-center gold-text mb-6 shadow-inner">
          <User className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-[var(--color-foreground)]">
          Profile Unavailable
        </h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2 leading-relaxed">
          We encountered an issue retrieving this profile. Please verify the link or try again.
        </p>
        <Link to="/users" className="btn-gold inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-xl font-semibold shadow-lg">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Directory</span>
        </Link>
      </div>
    );
  }

  const user = data?.data;

  const userInfo = [
    { icon: Mail, label: "Email Address", value: user?.email },
    { icon: Phone, label: "Phone Contact", value: user?.phone },
    { icon: Calendar, label: "Age", value: user?.age ? `${user.age} Years Old` : null },
    {
      icon: User,
      label: "Gender",
      value: user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : null,
    },
  ];

  const userStats = [
    { icon: Users, label: "Connections", value: "1.2K" },
    { icon: Star, label: "Score", value: "4.9" },
    { icon: Award, label: "Orders", value: "47" },
    { icon: ShieldCheck, label: "Verification", value: "Verified" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container-custom section-spacing max-w-4xl mx-auto space-y-8"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/users"
          className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] hover:text-gold transition-all duration-300 group"
        >
          <div className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] group-hover:border-gold/50 group-hover:scale-105 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Back to Members</span>
        </Link>

        <span className="text-xs font-mono text-[var(--color-muted-foreground)]">
          ID: #{user?.id || "N/A"}
        </span>
      </div>

      {/* Main Luxury Profile Container */}
      <Card className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden shadow-2xl relative">
        
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Profile Hero Header */}
        <div className="relative p-8 sm:p-12 border-b border-[var(--color-border)] text-center bg-gradient-to-b from-[var(--color-muted)]/30 to-transparent">
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Avatar Frame with Gold Accent */}
            <div className="relative mb-6">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <Avatar className="w-32 h-32 sm:w-36 sm:h-36 border-4 border-[var(--color-card)] relative shadow-2xl">
                <AvatarImage
                  src={user?.image}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="gold-bg-light gold-text font-black text-4xl">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              {/* Online Indicator Badge */}
              <div
                className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-3 border-[var(--color-card)] shadow-lg"
                title="Active Member"
              />
            </div>

            {/* User Title & Identity */}
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--color-foreground)]">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>

            <p className="text-sm text-[var(--color-muted-foreground)] font-mono mb-4">
              @{user?.username}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <span className="badge-gold inline-flex items-center gap-1.5 text-xs py-1 px-3.5 rounded-full font-bold shadow-sm">
                <Crown className="w-3.5 h-3.5 text-[#18181b]" />
                VIP Executive
              </span>
              <span className="inline-flex items-center gap-1 text-xs py-1 px-3.5 rounded-full font-medium bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Verified Account
              </span>
            </div>

            {/* Key Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl pt-6 border-t border-[var(--color-border)]/60">
              {userStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-2xl bg-[var(--color-card)]/50 border border-[var(--color-border)]/50 backdrop-blur-sm"
                >
                  <p className="text-lg sm:text-xl font-extrabold gold-text">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)] mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <CardContent className="p-6 sm:p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Personal Info Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest gold-text">
                <User className="w-4 h-4" />
                <span>Personal Profile</span>
              </div>

              <div className="space-y-3">
                {userInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-muted)]/20 border border-[var(--color-border)] hover:border-gold/40 hover:bg-[var(--color-muted)]/40 transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl gold-bg-light gold-text flex-shrink-0 shadow-sm">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-[var(--color-foreground)] truncate mt-0.5">
                        {item.value || "Not Specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest gold-text">
                <MapPin className="w-4 h-4" />
                <span>Primary Residence</span>
              </div>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-[var(--color-muted)]/20 border border-[var(--color-border)] hover:border-gold/40 transition-all duration-300 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl gold-bg-light gold-text mt-0.5 flex-shrink-0 shadow-sm">
                      <Home className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-bold text-[var(--color-foreground)]">
                        {user?.address?.address || "Street address not provided"}
                      </p>
                      <p className="text-[var(--color-muted-foreground)]">
                        {user?.address?.city}
                        {user?.address?.state ? `, ${user.address.state}` : ""}
                      </p>
                      {user?.address?.postalCode && (
                        <p className="text-[11px] text-[var(--color-muted-foreground)] font-mono pt-1">
                          ZIP / Postal: {user.address.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-muted)]/20 border border-[var(--color-border)] hover:border-gold/40 transition-all duration-300">
                  <div className="p-3 rounded-xl gold-bg-light gold-text flex-shrink-0 shadow-sm">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                      Country & Territory
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-foreground)] mt-0.5">
                      {user?.address?.country || "United States"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company & Profession Card */}
          {user?.company && (
            <div className="pt-8 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest gold-text mb-4">
                <Building2 className="w-4 h-4" />
                <span>Corporate Affiliation</span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-muted)]/30 via-[var(--color-card)] to-[var(--color-muted)]/30 border border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl gold-bg-light gold-text flex-shrink-0 shadow-sm">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-foreground)]">
                      {user.company?.name}
                    </h4>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                      {user.company?.title}
                    </p>
                  </div>
                </div>

                {user.company?.department && (
                  <span className="badge-gold text-xs py-1.5 px-4 rounded-xl font-medium">
                    {user.company.department}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserDetails;