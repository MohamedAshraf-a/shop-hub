import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // ✅ تحقق من admin_token للمسارات الإدارية
  const isAdmin = localStorage.getItem("admin_token") === "admin-authenticated";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ إذا كان المسار يتطلب Admin، تحقق من admin_token
  if (adminOnly && !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // تحقق من صلاحيات المدير من AuthContext
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}