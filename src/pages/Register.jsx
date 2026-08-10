import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Fingerprint,
  Globe,
  AlertCircle,
  Check,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

// مخطط التحقق من البيانات بالـ Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email("Please enter a valid email")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms & conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth?.() || {}; // يفترض وجود دالة signup في الـ Auth Context

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const passwordValue = watch("password", "");
  const acceptTermsValue = watch("acceptTerms", false);

  // حاسبة قوة كلمة المرور البسيطة
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (signup) {
        await signup(data.email, data.password, data.name);
      } else {
        // محاكاة مؤقتة إن لم تكن الدالة جاهزة
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      toast.success("Account created successfully!", {
        description: "Welcome aboard! Redirecting you...",
        duration: 3000,
      });

      navigate("/");
    } catch (error) {
      setError("root", {
        message: error?.message || "Registration failed. Please try again.",
      });
      toast.error("Registration failed", {
        description: error?.message || "Please check your details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-background via-background to-amber-500/5 overflow-hidden">
      {/* خلفية مزخرفة توفر نفس عمق صفحة الـ Login */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="shadow-2xl border-border/60 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-md">
          {/* شريط ذهبي متدرج */}
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

          <CardHeader className="text-center pb-2 pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/10 group"
            >
              <Sparkles className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Create an Account
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1.5">
                Join us today and unlock exclusive benefits
              </p>
            </motion.div>

            {/* شارات الأمان المتناسقة */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-500" /> Secure
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-amber-500" /> Encrypted
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-500" /> Free Access
              </span>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* حقل الاسم الكامل */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-amber-500" />
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 h-11 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* حقل البريد الإلكتروني */}
              <div className="space-y-1.5">
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
                    placeholder="name@example.com"
                    className="pl-10 h-11 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("email")}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* حقل كلمة المرور */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-500" />
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-11 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("password")}
                    autoComplete="new-password"
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

                {/* شريط قياس قوة كلمة المرور */}
                {passwordValue && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength >= 1 ? "bg-red-500 w-1/4" : "w-0"
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength >= 2 ? "bg-amber-500 w-1/4" : "w-0"
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength >= 3 ? "bg-blue-500 w-1/4" : "w-0"
                        }`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength >= 4 ? "bg-emerald-500 w-1/4" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* حقل تأكيد كلمة المرور */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-500" />
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    className="pl-10 pr-10 h-11 rounded-xl border-border bg-background/50 focus:border-amber-400 focus:ring-amber-400/20 text-sm transition-all"
                    {...register("confirmPassword")}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* الموافقة على الشروط والأحكام */}
              <div className="pt-1">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={acceptTermsValue}
                    onCheckedChange={(checked) =>
                      setValue("acceptTerms", Boolean(checked), {
                        shouldValidate: true,
                      })
                    }
                    className="mt-0.5 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400"
                  />
                  <Label
                    htmlFor="acceptTerms"
                    className="text-xs text-muted-foreground cursor-pointer leading-tight"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-amber-500 hover:underline font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-amber-500 hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              {/* خطأ عام */}
              {errors.root && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive text-center flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.root.message}
                </div>
              )}

              {/* زر الإنشاء */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 group mt-2"
              >
                <span className="flex items-center justify-center gap-2 text-sm">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>

              {/* فاصل */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-card text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* التسجيل الاجتماعي */}
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

              {/* التحويل للوجين */}
              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-amber-500 hover:text-amber-600 font-bold hover:underline transition-colors inline-flex items-center gap-0.5"
                  >
                    Sign In
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}