import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/common/ProtectedRoute";

// ===== الصفحات الرئيسية (Lazy Loading) =====
const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Users = lazy(() => import("@/pages/Users"));
const UserDetails = lazy(() => import("@/pages/UserDetails"));
const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// ===== صفحات المصادقة =====
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));

// ===== صفحات Admin =====
const AdminLogin = lazy(() => import("@/pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));
const AdminOrders = lazy(() => import("@/pages/Admin/AdminOrders"));
const AdminUsers = lazy(() => import("@/pages/Admin/AdminUsers"));

// ===== مؤشر التحميل المؤقت =====
const routeFallback = (
  <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-4">
    <div className="h-8 w-48 rounded bg-muted" />
    <div className="h-64 rounded-xl bg-muted" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="h-40 rounded-xl bg-muted" />
      <div className="h-40 rounded-xl bg-muted" />
      <div className="h-40 rounded-xl bg-muted" />
    </div>
  </div>
);

// ===== دالة مغلّفة لتطبيق Suspense =====
const withLazyPage = (Component) => (
  <Suspense fallback={routeFallback}>
    <Component />
  </Suspense>
);

// ===== إنشاء الـ Router =====
const router = createBrowserRouter([
  // ==========================================
  // المسارات الرئيسية (مع MainLayout)
  // ==========================================
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        element: withLazyPage(Home),
      },
      {
        path: "/products",
        element: withLazyPage(Products),
      },
      {
        path: "/products/:id",
        element: withLazyPage(ProductDetails),
      },
      {
        path: "/users",
        element: withLazyPage(Users),
      },
      {
        path: "/users/:id",
        element: withLazyPage(UserDetails),
      },
      {
        path: "/cart",
        element: withLazyPage(Cart),
      },
      {
        path: "/wishlist",
        element: withLazyPage(Wishlist),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {withLazyPage(UserProfile)}
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ==========================================
  // المسارات المحمية (Protected Routes)
  // ==========================================
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute adminOnly>
        {withLazyPage(AdminDashboard)}
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute adminOnly>
        {withLazyPage(AdminOrders)}
      </ProtectedRoute>
    ),
  },
 
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute adminOnly>
        {withLazyPage(AdminUsers)}
      </ProtectedRoute>
    ),
  },

  // ==========================================
  // مسارات المصادقة (بدون MainLayout)
  // ==========================================
  {
    path: "/login",
    element: withLazyPage(Login),
  },
  {
    path: "/register",
    element: withLazyPage(Register),
  },
  {
    path: "/forgot-password",
    element: withLazyPage(ForgotPassword),
  },
  {
    path: "/admin",
    element: withLazyPage(AdminLogin),
  },

  // ==========================================
  // صفحة 404 (غير موجودة)
  // ==========================================
  {
    path: "*",
    element: withLazyPage(NotFound),
  },
]);

export default router;