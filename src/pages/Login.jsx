import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Shield,
  Fingerprint,
  Globe,
  AlertCircle,
  Home,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: localStorage.getItem("rememberedEmail") || "",
      rememberMe: Boolean(localStorage.getItem("rememberedEmail")),
    },
  });

  const rememberMe = useWatch({ control, name: "rememberMe" });
  const email = useWatch({ control, name: "email" });
  const from = location.state?.from?.pathname || "/";

  // ✅ زر الرجوع إلى Home مباشرة
  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await login(data.email, data.password);

      if (res && res.success === false) {
        throw new Error(res.message || "Invalid credentials");
      }

      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
        duration: 3000,
      });

      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password. Please try again.";

      setError("root", {
        message: errorMessage,
      });

      toast.error("Login failed", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-background via-background to-amber-500/5 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 rounded-full px-5 py-2 shadow-xl flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground">
              Welcome back! Please sign in to continue.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="shadow-2xl border-border/60 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-md relative">
          {/* Gold Bar */}
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

          {/* ✅ Back to Home Button */}
          <button
            onClick={handleGoHome}
            type="button"
            className="absolute top-4 left-4 p-2.5 rounded-full bg-background/60 hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 border border-border/50 transition-all flex items-center gap-1.5 text-xs font-medium group"
            title="Go to Home"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <CardHeader className="text-center pb-2 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1.5">
                Sign in to access your account and manage your orders
              </p>
            </motion.div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-500" /> Secure
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-amber-500" /> 2FA Ready
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-500" /> Global
              </span>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("email")}
                    autoComplete="email"
                  />
                  {email && !errors.email && (
                    <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4" />
                  )}
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-destructive mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-amber-500" />
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-amber-500 hover:text-amber-600 font-medium hover:underline transition-colors flex items-center gap-0.5"
                  >
                    Forgot password?
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("password")}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-destructive mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", Boolean(checked))
                    }
                    className="data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400"
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-xs sm:text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Remember me
                  </Label>
                </div>
              </div>

              {/* Errors */}
              {errors.root && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive text-center flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.root.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 group"
              >
                <span className="flex items-center justify-center gap-2 text-sm">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: "Google", icon: "G" },
                  { name: "Facebook", icon: "f" },
                  { name: "Apple", icon: "⌘" },
                ].map((social) => (
                  <button
                    key={social.name}
                    type="button"
                    className="h-10 rounded-xl border border-border/60 hover:border-amber-400/50 bg-background/50 hover:bg-muted/50 transition-all font-semibold text-foreground flex items-center justify-center gap-2 text-xs"
                  >
                    <span className="text-base">{social.icon}</span>
                    <span className="hidden sm:inline">{social.name}</span>
                  </button>
                ))}
              </div>

              {/* Register Link */}
              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-amber-500 hover:text-amber-600 font-bold hover:underline transition-colors inline-flex items-center gap-0.5"
                  >
                    Create an account
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-2 text-center"
        >
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-amber-500" /> SSL Encrypted
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" /> 24/7 Support
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground/80 max-w-xs">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}