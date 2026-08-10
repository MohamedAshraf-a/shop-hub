import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  LayoutDashboard,
  Users,
  ChevronDown,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const allOrders = [
  { id: "#ORD-001", customer: "John Doe", email: "john@example.com", date: "2024-01-15", total: 299.99, status: "delivered", items: 3 },
  { id: "#ORD-002", customer: "Jane Smith", email: "jane@example.com", date: "2024-01-14", total: 149.99, status: "shipped", items: 2 },
  { id: "#ORD-003", customer: "Bob Johnson", email: "bob@example.com", date: "2024-01-13", total: 79.99, status: "pending", items: 1 },
  { id: "#ORD-004", customer: "Alice Brown", email: "alice@example.com", date: "2024-01-12", total: 459.99, status: "processing", items: 4 },
  { id: "#ORD-005", customer: "Charlie Wilson", email: "charlie@example.com", date: "2024-01-11", total: 199.99, status: "cancelled", items: 2 },
  { id: "#ORD-006", customer: "Eva Davis", email: "eva@example.com", date: "2024-01-10", total: 89.99, status: "delivered", items: 1 },
  { id: "#ORD-007", customer: "Frank Miller", email: "frank@example.com", date: "2024-01-09", total: 349.99, status: "shipped", items: 3 },
  { id: "#ORD-008", customer: "Grace Lee", email: "grace@example.com", date: "2024-01-08", total: 129.99, status: "pending", items: 2 },
];

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  processing: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  shipped: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
  delivered: "bg-green-500/20 text-green-700 dark:text-green-400",
  cancelled: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(allOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/admin");
    setTimeout(() => setIsLoading(false), 500);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleDeleteOrder = (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
      toast.success("Order deleted successfully");
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders", active: true },
    { icon: Users, label: "Users", path: "/admin/users" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar 
        navItems={navItems} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        handleLogout={handleLogout} 
      />

      <div className="flex-1 min-h-screen flex flex-col">
        <AdminHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          title="Orders" 
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border hover:border-gold/30 transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    All Orders
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filteredOrders.length} orders found
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-10 rounded-xl border-gold/20 focus:border-gold focus:ring-gold/20 bg-background"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 w-full sm:w-auto border-gold/20 text-gold hover:bg-gold/10">
                        <Filter className="w-4 h-4" />
                        {statusFilter === "all" ? "All Status" : statusFilter}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-gold/20">
                      <DropdownMenuItem onClick={() => setStatusFilter("all")} className="hover:bg-gold/10">All Status</DropdownMenuItem>
                      {statusOptions.map((status) => (
                        <DropdownMenuItem 
                          key={status} 
                          onClick={() => setStatusFilter(status)} 
                          className="capitalize hover:bg-gold/10"
                        >
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-gold/70">Order ID</TableHead>
                        <TableHead className="text-gold/70">Customer</TableHead>
                        <TableHead className="text-gold/70">Email</TableHead>
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
                          <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="text-muted-foreground">{order.email}</TableCell>
                          <TableCell className="text-muted-foreground">{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="font-medium text-gold">${order.total}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Badge className={`${statusColors[order.status]} border-0 capitalize cursor-pointer hover:opacity-80`}>
                                  {order.status}
                                </Badge>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start" className="border-gold/20">
                                {statusOptions.map((status) => (
                                  <DropdownMenuItem 
                                    key={status} 
                                    onClick={() => handleUpdateStatus(order.id, status)} 
                                    className="capitalize hover:bg-gold/10"
                                  >
                                    {status}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                                onClick={() => handleDeleteOrder(order.id)}
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
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// ===== Admin Sidebar =====
function AdminSidebar({ navItems, sidebarOpen, setSidebarOpen, handleLogout }) {
  return (
    <>
      <aside className={`fixed lg:relative z-50 w-72 h-full bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
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
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${item.active ? "bg-gold/10 text-gold font-medium border border-gold/20" : "text-muted-foreground hover:bg-gold/5 hover:text-gold"}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.active && <ChevronRight className="w-4 h-4 ml-auto text-gold" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border flex-shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}

// ===== Admin Header =====
function AdminHeader({ sidebarOpen, setSidebarOpen, title }) {
  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gold/10 transition-colors">
          {sidebarOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
        </button>
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="text-gold">✦</span> {title}
          </h2>
          <p className="text-xs text-muted-foreground">Manage your store orders</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/20">
          <Crown className="w-4 h-4 text-gold" />
          <span className="text-xs font-semibold text-gold">ADMIN</span>
        </div>
      </div>
    </header>
  );
}