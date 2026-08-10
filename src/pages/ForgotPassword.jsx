import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // محاكاة طلب إرسال إيميل
    setTimeout(() => {
      setIsSent(true);
      toast.success("✅ Reset link sent to your email!");
      setIsLoading(false);
    }, 1000);
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto mt-8 md:mt-16 px-4"
      >
        <Card className="shadow-xl border-border/50 rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gold" />
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="w-7 h-7 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">Check Your Email</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              We sent a password reset link to your email address.
            </p>
          </CardHeader>
          <CardContent>
            <Link to="/login">
              <Button className="w-full h-11 bg-gold text-foreground hover:bg-gold-hover font-semibold shadow-lg shadow-gold/30 rounded-xl transition-all">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-8 md:mt-16 px-4"
    >
      <Card className="shadow-xl border-border/50 rounded-2xl overflow-hidden">
        <div className="h-1.5 bg-gold" />
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-gold" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-foreground">Forgot Password</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11 rounded-xl border-border focus:border-gold focus:ring-gold/20"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gold text-foreground hover:bg-gold-hover font-semibold shadow-lg shadow-gold/30 rounded-xl transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Send Reset Link <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-gold font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}