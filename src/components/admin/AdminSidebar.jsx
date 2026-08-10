import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ArrowLeft,
  LogOut,
  Crown,
  Home,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  // ✅ زر الرجوع إلى Home
  const handleBackToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <aside className="hidden md:flex w-64 min-h-screen sticky top-0 h-screen flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/30">
            <Crown className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h1 className="font-black text-lg">
              <span className="text-gold">Shop</span>Hub
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Admin User */}
      <div className="p-4">
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-3">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="font-bold text-sm truncate mt-1 text-foreground">
            {user?.name || "Administrator"}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Crown className="w-3 h-3 text-gold" />
            <span className="text-[10px] text-gold font-bold uppercase">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Management
        </p>

        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `
                group flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-semibold
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/20 shadow-sm"
                    : "text-muted-foreground hover:bg-gold/5 hover:text-gold"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`
                      w-5 h-5 transition-transform duration-300
                      ${isActive ? "text-gold" : "group-hover:scale-110"}
                    `}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {/* ✅ Back to Home - يعيد إلى الصفحة الرئيسية */}
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-300 group"
        >
          <Home className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          Back to Home
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}