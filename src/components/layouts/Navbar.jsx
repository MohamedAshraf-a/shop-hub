import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  Sparkles,
  LogIn,
  UserPlus,
  ChevronRight,
  LogOut,
  Crown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // المستخدم الحالي
  const { user, logout } = useAuth();

  const navLinks = [
    {
      path: "/products",
      label: "Products",
    },
    {
      path: "/users",
      label: "Users",
    },
  ];

  // تسجيل الخروج
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // اسم المستخدم
  const getUserDisplayName = () => {
    if (!user) return "";

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    return user.name || user.username || "User";
  };

  // أول حرف من اسم المستخدم
  const getUserInitial = () => {
    const name = getUserDisplayName();

    return name
      ? name.charAt(0).toUpperCase()
      : "U";
  };

  // هل المستخدم Admin؟
  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-2xl transition-all duration-300">

      <div className="container-custom flex h-16 md:h-20 items-center justify-between px-4 sm:px-6">

        {/* =========================================================
            Brand Logo
        ========================================================= */}

        <Link
          to="/"
          className="flex items-center gap-3 group relative py-1"
        >
          <div className="relative flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:border-amber-500/40 group-hover:shadow-[0_0_15px_rgba(217,119,6,0.15)]">
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-gradient-hero">
              Shop<span className="gold-text text-gradient-hero">Hub</span>
            </span>

            <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-[var(--color-muted-foreground)] -mt-1 group-hover:text-amber-500/80 transition-colors duration-300">
              Luxury Edition
            </span>
          </div>
        </Link>

        {/* =========================================================
            Desktop Navigation
        ========================================================= */}

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-semibold py-2 transition-all duration-300 hover:gold-text after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:to-yellow-600 after:transition-all after:duration-300 ${
                  isActive
                    ? "gold-text after:w-full"
                    : "text-[var(--color-muted-foreground)] after:w-0 hover:after:w-full"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* =========================================================
            Desktop Actions
        ========================================================= */}

        <div className="hidden lg:flex items-center gap-2.5">

          {/* =====================================================
              ADMIN BUTTON
          ===================================================== */}

          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 ">
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300"
              >
                <Crown className="h-4 w-4 text-amber-500" />

                <span className="text-xs font-bold gold-text">
                  Admin
                </span>
              </Button>
            </Link>
          )}

          {/* =====================================================
              Theme Toggle
          ===================================================== */}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]/50 transition-all duration-300 h-10 w-10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            )}
          </Button>

          {/* =====================================================
              Wishlist
          ===================================================== */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]/50 transition-all duration-300 h-10 w-10"
              >
                <Heart className="h-5 w-5 text-[var(--color-muted-foreground)] hover:gold-text transition-colors duration-300" />

                {wishlist.length > 0 && (
                  <Badge className="badge-gold absolute -top-1 -right-1 px-1.5 min-w-[18px] h-4.5 flex items-center justify-center text-[10px] font-bold border-none shadow-sm">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-60 p-2 rounded-2xl card-premium border border-[var(--color-border)] shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 py-2 mb-1 border-b border-[var(--color-border)]">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-foreground)]">
                  Wishlist
                </span>

                <span className="badge-gold text-[10px] py-0.5 px-2">
                  {wishlist.length} items
                </span>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 px-3 text-center gap-2">

                  <div className="p-3 rounded-full gold-bg-light">
                    <Heart className="h-5 w-5 gold-text opacity-70" />
                  </div>

                  <p className="text-xs font-medium text-[var(--color-muted-foreground)]">
                    Your wishlist is empty
                  </p>

                  <Button
                    variant="link"
                    size="sm"
                    className="gold-text h-auto p-0 text-xs font-semibold hover:underline"
                    onClick={() => navigate("/products")}
                  >
                    Explore Collections
                  </Button>
                </div>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate("/wishlist")}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--color-muted)]/50 transition-all duration-200 cursor-pointer mt-1"
                >
                  <span className="text-xs font-bold text-[var(--color-foreground)]">
                    View Wishlist
                  </span>

                  <ChevronRight className="h-4 w-4 gold-text" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* =====================================================
              Cart
          ===================================================== */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]/50 transition-all duration-300 h-10 w-10"
              >
                <ShoppingBag className="h-5 w-5 text-[var(--color-muted-foreground)] hover:gold-text transition-colors duration-300" />

                {getTotalItems() > 0 && (
                  <Badge className="badge-gold absolute -top-1 -right-1 px-1.5 min-w-[18px] h-4.5 flex items-center justify-center text-[10px] font-bold border-none shadow-sm">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-72 p-2 rounded-2xl card-premium border border-[var(--color-border)] shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 py-2 mb-1 border-b border-[var(--color-border)]">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-foreground)]">
                  Shopping Bag
                </span>

                <span className="badge-gold text-[10px] py-0.5 px-2">
                  {getTotalItems()} items
                </span>
              </div>

              {getTotalItems() === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 px-3 text-center gap-2">

                  <div className="p-3 rounded-full gold-bg-light">
                    <ShoppingBag className="h-5 w-5 gold-text opacity-70" />
                  </div>

                  <p className="text-xs font-medium text-[var(--color-muted-foreground)]">
                    Your bag is empty
                  </p>

                  <Button
                    variant="link"
                    size="sm"
                    className="gold-text h-auto p-0 text-xs font-semibold hover:underline"
                    onClick={() => navigate("/products")}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <DropdownMenuItem
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--color-muted)]/50 transition-all duration-200 cursor-pointer mt-1"
                >
                  <span className="text-xs font-bold text-[var(--color-foreground)]">
                    View Bag & Checkout
                  </span>

                  <ChevronRight className="h-4 w-4 gold-text" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* =====================================================
              User Account
          ===================================================== */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-amber-500/30 hover:ring-amber-500 transition-all duration-300 hover:scale-105">

                <AvatarImage
                  src={user?.image}
                  alt={getUserDisplayName()}
                />

                <AvatarFallback className="gold-bg-light gold-text text-xs font-black">
                  {user ? (
                    getUserInitial()
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-72 p-2 rounded-2xl card-premium border border-[var(--color-border)] shadow-2xl"
            >

              {user ? (
                <>
                  {/* User Information */}

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]/30 border border-[var(--color-border)] mb-2">

                    <Avatar className="h-10 w-10 ring-2 ring-amber-500/20">
                      <AvatarImage
                        src={user.image}
                        alt={getUserDisplayName()}
                      />

                      <AvatarFallback className="gold-bg-light gold-text font-black text-sm">
                        {getUserInitial()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col min-w-0">

                      <p className="font-bold text-xs truncate text-[var(--color-foreground)] flex items-center gap-1">

                        {getUserDisplayName()}

                        {isAdmin && (
                          <Crown className="w-3.5 h-3.5 text-amber-500 inline-block flex-shrink-0" />
                        )}
                      </p>

                      <p className="text-[11px] text-[var(--color-muted-foreground)] truncate">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">

                    {/* Admin Dashboard */}

                    {isAdmin && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/products")}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-amber-500/10 transition-all duration-200 cursor-pointer"
                      >
                        <Crown className="h-4 w-4 text-amber-500" />

                        <span className="text-xs font-bold text-amber-500">
                          Admin Dashboard
                        </span>
                      </DropdownMenuItem>
                    )}

                    {/* Profile */}

                    <DropdownMenuItem
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--color-muted)]/50 transition-all duration-200 cursor-pointer"
                    >
                      <User className="h-4 w-4 gold-text" />

                      <span className="text-xs font-semibold text-[var(--color-foreground)]">
                        Account Profile
                      </span>
                    </DropdownMenuItem>

                    {/* Logout */}

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 transition-all duration-200 cursor-pointer text-red-500 hover:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />

                      <span className="text-xs font-semibold">
                        Sign Out
                      </span>
                    </DropdownMenuItem>

                  </div>
                </>
              ) : (

                /* Not Logged In */

                <div className="flex flex-col gap-1">

                  <DropdownMenuItem
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-muted)]/50 transition-all duration-200 cursor-pointer"
                  >
                    <LogIn className="h-4 w-4 gold-text" />

                    <span className="text-xs font-semibold text-[var(--color-foreground)]">
                      Sign In
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/register")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-muted)]/50 transition-all duration-200 cursor-pointer"
                  >
                    <UserPlus className="h-4 w-4 gold-text" />

                    <span className="text-xs font-semibold text-[var(--color-foreground)]">
                      Create Account
                    </span>
                  </DropdownMenuItem>

                </div>
              )}

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* =========================================================
            Mobile Controls
        ========================================================= */}

        <div className="flex lg:hidden items-center gap-1.5">

          {/* Theme */}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-[var(--color-muted)]/50 h-9 w-9"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            )}
          </Button>

          {/* Wishlist */}

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-[var(--color-muted)]/50 h-9 w-9"
            onClick={() => navigate("/wishlist")}
          >
            <Heart className="h-4 w-4 text-[var(--color-muted-foreground)]" />

            {wishlist.length > 0 && (
              <Badge className="badge-gold absolute -top-1 -right-1 px-1 min-w-[16px] h-4 flex items-center justify-center text-[9px] font-bold border-none">
                {wishlist.length}
              </Badge>
            )}
          </Button>

          {/* Cart */}

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-[var(--color-muted)]/50 h-9 w-9"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag className="h-4 w-4 text-[var(--color-muted-foreground)]" />

            {getTotalItems() > 0 && (
              <Badge className="badge-gold absolute -top-1 -right-1 px-1 min-w-[16px] h-4 flex items-center justify-center text-[9px] font-bold border-none">
                {getTotalItems()}
              </Badge>
            )}
          </Button>

          {/* =====================================================
              Mobile Menu
          ===================================================== */}

          <Sheet>

            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-[var(--color-muted)]/50 h-9 w-9"
              >
                <Menu className="h-5 w-5 text-[var(--color-foreground)]" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm p-6 card-premium border-l border-[var(--color-border)] flex flex-col justify-between"
            >

              <div className="flex flex-col space-y-6">

                {/* Mobile Brand */}

                <div className="flex items-center gap-2">

                  <div className="p-2 rounded-xl gold-bg-light">
                    <Sparkles className="h-5 w-5 gold-text" />
                  </div>

                  <span className="text-xl font-black text-[var(--color-foreground)]">
                    ShopHub
                  </span>

                </div>

                {/* Mobile User */}

                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-muted)]/30 border border-[var(--color-border)]">

                    <Avatar className="h-10 w-10 ring-2 ring-amber-500/20">

                      <AvatarImage
                        src={user.image}
                        alt={getUserDisplayName()}
                      />

                      <AvatarFallback className="gold-bg-light gold-text font-black text-sm">
                        {getUserInitial()}
                      </AvatarFallback>

                    </Avatar>

                    <div className="flex flex-col min-w-0">

                      <p className="font-bold text-xs truncate text-[var(--color-foreground)] flex items-center gap-1">

                        {getUserDisplayName()}

                        {isAdmin && (
                          <Crown className="w-3 h-3 text-amber-500 inline-block flex-shrink-0" />
                        )}
                      </p>

                      <p className="text-[11px] text-[var(--color-muted-foreground)] truncate">
                        {user.email || "user@example.com"}
                      </p>

                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}

                <nav className="flex flex-col gap-1.5">

                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "gold-bg-light gold-text"
                            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50 hover:text-[var(--color-foreground)]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}

                  {/* =================================================
                      MOBILE ADMIN BUTTON
                  ================================================= */}

                  {isAdmin && (
                    <Link
                      to="/admin/products"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-amber-500 hover:bg-amber-500/10 transition-all duration-200"
                    >
                      <Crown className="h-4 w-4 text-amber-500" />

                      Admin Dashboard
                    </Link>
                  )}

                  <div className="h-px bg-[var(--color-border)] my-2" />

                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50 hover:text-[var(--color-foreground)] transition-all duration-200"
                      >
                        <User className="h-4 w-4 gold-text" />
                        Account Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50 hover:text-[var(--color-foreground)] transition-all duration-200"
                      >
                        <LogIn className="h-4 w-4 gold-text" />
                        Sign In
                      </Link>

                      <Link
                        to="/register"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]/50 hover:text-[var(--color-foreground)] transition-all duration-200"
                      >
                        <UserPlus className="h-4 w-4 gold-text" />
                        Create Account
                      </Link>
                    </>
                  )}

                </nav>
              </div>

              {/* Mobile Footer */}

              <div className="pt-4 border-t border-[var(--color-border)] text-center">
                <p className="text-[11px] text-[var(--color-muted-foreground)] font-mono">
                  © 2026 ShopHub Luxury Edition
                </p>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}