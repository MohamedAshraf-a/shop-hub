import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Search,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

// بيانات الإحصائيات
const statsData = [
  {
    title: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    icon: ShoppingBag,
    trend: "up",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Total Users",
    value: "2,847",
    change: "+15.3%",
    icon: Users,
    trend: "up",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
    color: "from-green-500 to-emerald-500",
  },
];

// بيانات الطلبات الأخيرة
const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    date: "2024-01-14",
    total: 149.99,
    status: "shipped",
    items: 2,
  },
  {
    id: "#ORD-003",
    customer: "Bob Johnson",
    date: "2024-01-13",
    total: 79.99,
    status: "pending",
    items: 1,
  },
  {
    id: "#ORD-004",
    customer: "Alice Brown",
    date: "2024-01-12",
    total: 459.99,
    status: "processing",
    items: 4,
  },
  {
    id: "#ORD-005",
    customer: "Charlie Wilson",
    date: "2024-01-11",
    total: 199.99,
    status: "cancelled",
    items: 2,
  },
];

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  processing: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  shipped: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
  delivered: "bg-green-500/20 text-green-700 dark:text-green-400",
  cancelled: "bg-red-500/20 text-red-700 dark:text-red-400",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const filteredOrders = recentOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard", active: true },
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Users", path: "/admin/users" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed lg:relative z-50 w-72 h-full bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/30">
            <Shield className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">
              <span className="text-gold">Admin</span> Panel
            </h1>
            <p className="text-xs text-muted-foreground">ShopHub Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-gold/10 text-gold font-medium border border-gold/20"
                  : "text-muted-foreground hover:bg-gold/5 hover:text-gold"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.active && (
                <ChevronRight className="w-4 h-4 ml-auto text-gold" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay للجوال */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gold/10 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-gold">✦</span> Dashboard
              </h2>
              <p className="text-xs text-muted-foreground">Welcome back, Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-48 md:w-64 h-10 rounded-xl border-gold/20 focus:border-gold focus:ring-gold/20 bg-background"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/20">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-gold">ADMIN</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 border-border hover:border-gold/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              stat.trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border hover:border-gold/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    Recent Orders
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Latest transactions from your store
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-gold/20 text-gold hover:bg-gold/10"
                    onClick={() => navigate("/admin/orders")}
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-gold/70">Order ID</TableHead>
                        <TableHead className="text-gold/70">Customer</TableHead>
                        <TableHead className="text-gold/70">Date</TableHead>
                        <TableHead className="text-gold/70">Items</TableHead>
                        <TableHead className="text-gold/70">Total</TableHead>
                        <TableHead className="text-gold/70">Status</TableHead>
                        <TableHead className="text-right text-gold/70">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gold/5 transition-colors">
                          <TableCell className="font-medium text-foreground">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="text-muted-foreground">{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="font-medium text-gold">
                            ${order.total}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${statusColors[order.status]} border-0 capitalize`}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-gold/10 hover:text-gold transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-gold/10 hover:text-gold transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {filteredOrders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Info */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
            <p>© {new Date().getFullYear()} ShopHub Admin Panel. All rights reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
}