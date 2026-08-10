import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";
import { motion } from "framer-motion";

import {
  Users,
  Search,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  LayoutDashboard,
  ShoppingBag,
  UserPlus,
  Crown,
  Sparkles,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getUsers,
  });

  const users = data?.data?.users || [];

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const handleDeleteUser = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      toast.success(`User ${name} deleted successfully`);
      refetch();
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`User status updated to ${newStatus}`);
    refetch();
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Users", path: "/admin/users", active: true },
  ];

  // Skeleton Loading
  if (isLoading) {
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
            title="Users"
          />
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <Card className="border-border">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
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
            title="Users"
          />
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <Alert variant="destructive" className="rounded-2xl max-w-2xl mx-auto border-red-500/30">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <AlertTitle className="text-red-400">Error Loading Users</AlertTitle>
              <AlertDescription>
                Unable to retrieve the user list. Please check your connection and try again.
              </AlertDescription>
            </Alert>
          </main>
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
          title="Users"
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
                    All Users
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filteredUsers.length} members found
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-10 rounded-xl border-gold/20 focus:border-gold focus:ring-gold/20 bg-background"
                    />
                  </div>
                  <Button className="gap-2 bg-gold text-foreground hover:bg-gold-hover shadow-lg shadow-gold/20">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-gold/70">User</TableHead>
                        <TableHead className="text-gold/70">Email</TableHead>
                        <TableHead className="text-gold/70">Role</TableHead>
                        <TableHead className="text-gold/70">Status</TableHead>
                        <TableHead className="text-right text-gold/70">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gold/5 transition-colors">
                          <TableCell className="font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              <span>{user.firstName} {user.lastName}</span>
                              {user.role === "admin" && (
                                <Crown className="w-3.5 h-3.5 text-gold" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                user.role === "admin"
                                  ? "bg-gold/20 text-gold border-gold/30"
                                  : "bg-muted text-muted-foreground"
                              } border-0 capitalize`}
                            >
                              {user.role || "user"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                user.status === "active"
                                  ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30"
                                  : "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30"
                              } border-0 capitalize cursor-pointer hover:opacity-80`}
                              onClick={() =>
                                handleToggleStatus(user.id, user.status)
                              }
                            >
                              {user.status || "active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg hover:bg-gold/10 hover:text-gold transition-colors"
                                onClick={() => handleViewUser(user)}
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
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id,
                                    `${user.firstName} ${user.lastName}`
                                  )
                                }
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
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      {/* View User Dialog - Gold Themed */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg border-gold/20 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              User Details
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center text-2xl font-bold text-gold shadow-lg shadow-gold/20">
                  {selectedUser.firstName?.[0]}
                  {selectedUser.lastName?.[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    @{selectedUser.username}
                  </p>
                  {selectedUser.role === "admin" && (
                    <Badge className="bg-gold/20 text-gold border-gold/30 text-xs mt-1">
                      <Crown className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedUser.email}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedUser.phone}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedUser.age}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedUser.gender}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gold/5 border border-gold/10">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">
                  {selectedUser.address?.address}, {selectedUser.address?.city}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedUser.address?.state} - {selectedUser.address?.postalCode}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
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
            <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${item.active ? "bg-gold/10 text-gold font-medium border border-gold/20" : "text-muted-foreground hover:bg-gold/5 hover:text-gold"}`}>
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
          <p className="text-xs text-muted-foreground">Manage your users</p>
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