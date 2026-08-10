import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Crown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // الرجوع للصفحة السابقة
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      if (password === ADMIN_PASSWORD) {
        await login("admin@shophub.com", "admin123");

        localStorage.setItem(
          "admin_token",
          "admin-authenticated"
        );

        toast.success("✅ Welcome Admin!");

        navigate("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        toast.error("❌ Incorrect password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("❌ Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gold/5 via-background to-gold/5"
    >
      <div className="w-full max-w-md">

        {/* Back Button */}

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="group flex items-center gap-2 rounded-xl text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />

            <span className="text-sm font-semibold">
              Back
            </span>
          </Button>
        </motion.div>

        <Card className="w-full border-gold/20 shadow-2xl shadow-gold/10 bg-card/95 backdrop-blur-xl">

          {/* Gold Gradient Header */}

          <CardHeader className="text-center pb-4 pt-8">

            <motion.div
              initial={{
                scale: 0,
                rotate: -10,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-2xl shadow-gold/30 relative"
            >
              <Shield className="w-10 h-10 text-foreground" />

              <div className="absolute -top-1 -right-1">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
            </motion.div>

            <CardTitle className="text-3xl font-bold text-foreground">
              <span className="text-gold">
                Admin
              </span>{" "}
              Access
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              Enter your admin credentials to access the control panel
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Password */}

              <div className="space-y-2">

                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-gold" />
                  Admin Password
                </Label>

                <div className="relative">

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
                    <Lock className="w-4 h-4" />
                  </div>

                  <Input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="pl-10 pr-10 h-12 rounded-xl border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 bg-background transition-all duration-300"
                    autoFocus
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Error */}

                {error && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    className="text-sm text-destructive flex items-center gap-1.5 mt-1"
                  >
                    <span>⚠️</span>
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Login Button */}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-gold to-amber-500 text-foreground hover:shadow-xl hover:shadow-gold/30 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />

                    <span>
                      Verifying...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>
                      Access Dashboard
                    </span>

                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>

              {/* Demo Divider */}

              <div className="flex items-center justify-center gap-2 pt-2">

                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/20" />

                <span className="text-xs text-muted-foreground">
                  Demo
                </span>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/20" />
              </div>

              {/* Demo Password */}

              <p className="text-center text-xs text-muted-foreground">
                Use password:{" "}
                <span className="font-mono font-bold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/20">
                  admin123
                </span>
              </p>

              {/* Security */}

              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-2">
                <Sparkles className="w-3 h-3 text-gold" />

                <span>
                  Secure admin authentication
                </span>

                <Sparkles className="w-3 h-3 text-gold" />
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}