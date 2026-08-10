import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Skeleton } from "../components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, Users as UsersIcon, Sparkles, Crown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Skeleton Loading State (Styled for Luxury Minimal)
  if (isLoading) {
    return (
      <div className="container-custom section-spacing space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          <Skeleton className="h-12 w-full sm:w-64 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card-premium flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container-custom section-spacing max-w-lg mx-auto">
        <Alert variant="destructive" className="rounded-2xl border-red-500/30 bg-red-500/10 text-red-200">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <AlertTitle className="font-bold text-red-400">Error Loading Members</AlertTitle>
          <AlertDescription className="text-sm mt-1">
            Unable to retrieve the elite members directory. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const users = data?.data?.users || [];
  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container-custom section-spacing space-y-10"
    >
      {/* Header & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-8">
        <div>
          <span className="badge-gold inline-flex items-center gap-1.5 mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>Community</span>
          </span>
          <h1 className="font-bold tracking-tight">
            Elite <span className="text-gradient">Members Directory</span>
          </h1>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            Showing {filteredUsers.length} registered members
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold w-4 h-4 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search members by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 rounded-xl bg-[var(--color-card)] border-[var(--color-border)] focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-20 card-glass max-w-md mx-auto">
          <UsersIcon className="w-12 h-12 gold-text mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-bold text-[var(--color-foreground)]">No Members Found</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            We couldn't find any member matching "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div key={user.id} variants={cardVariants} layout>
                <Link to={`/users/${user.id}`} className="block group h-full">
                  <div className="card-premium h-full flex items-center gap-4 relative overflow-hidden transition-all duration-300 group-hover:border-gold">
                    {/* Subtle Gold Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Avatar */}
                    <Avatar className="h-14 w-14 flex-shrink-0 border-2 border-[var(--color-border)] group-hover:border-gold transition-colors duration-300">
                      <AvatarImage 
                        src={user.image} 
                        alt={`${user.firstName} ${user.lastName}`} 
                        className="object-cover"
                      />
                      <AvatarFallback className="gold-bg-light gold-text font-bold text-base">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0 z-10">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-[var(--color-foreground)] truncate group-hover:text-gold transition-colors">
                          {user.firstName} {user.lastName}
                        </h3>
                        {user.role === "admin" && (
                          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-muted-foreground)] truncate mt-0.5 font-light">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Users;