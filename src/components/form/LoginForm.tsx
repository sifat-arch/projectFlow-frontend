"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginValidationSchema } from "@/validation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  LogIn,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import Link from "next/link";
import { setAuthSession } from "@/lib/auth-storage";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const router = useRouter();

  const executeLogin = (credentials: { email: string; password: string }) => {
    login(credentials, {
      onSuccess: (response) => {
        toast.add({
          title: "Welcome back!",
          description: response?.message || "Logged in successfully.",
          type: "success",
        });

        if (response?.data?.accessToken && response?.data?.user) {
          setAuthSession(response.data.accessToken, response.data.user);
        }

        const role = response?.data?.user?.role;
        if (role === "MENTOR") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard/my-submition");
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Invalid email or password. Please try again.";

        toast.add({
          title: "Login Failed",
          description: errorMessage,
          type: "error",
        });
      },
    });
  };

  const handleQuickFill = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    executeLogin({ email, password });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginValidationSchema,
    },
    onSubmit: ({ value }) => {
      executeLogin({
        email: value.email,
        password: value.password,
      });
    },
  });

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 ring-8 ring-primary/5 shadow-inner">
          <LogIn className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Sign in to your ProjectFlow account to review or submit projects
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Email field */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="student@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-11"
                      autoComplete="email"
                      aria-invalid={isInvalid}
                    />
                  </div>
                  {isInvalid && (
                    <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                      {field.state.meta.errors[0]?.message ||
                        String(field.state.meta.errors[0] || "")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password field */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={field.name}
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && (
                    <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                      {field.state.meta.errors[0]?.message ||
                        String(field.state.meta.errors[0] || "")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loginPending}
            className="w-full h-11 rounded-xl font-medium shadow-md transition-all hover:shadow-lg active:scale-[0.99] cursor-pointer"
          >
            {loginPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Quick Demo Login Credentials */}
        <div className="mt-6 pt-5 border-t border-border/60 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              Demo Credentials (1-Click Login)
            </span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Mentor Demo Button */}
            <button
              type="button"
              disabled={loginPending}
              onClick={() => handleQuickFill("jon@gmail.com", "jon12345")}
              className="flex flex-col text-left p-3 rounded-xl border border-border/70 bg-muted/30 hover:bg-muted/70 hover:border-primary/40 transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Mentor Account
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary uppercase">
                  Mentor
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono truncate">
                jon@gmail.com
              </span>
              <span className="text-[10px] text-muted-foreground/75 font-mono">
                Pass: jon12345
              </span>
            </button>

            {/* Student Demo Button */}
            <button
              type="button"
              disabled={loginPending}
              onClick={() => handleQuickFill("hasan@gmail.com", "123456")}
              className="flex flex-col text-left p-3 rounded-xl border border-border/70 bg-muted/30 hover:bg-muted/70 hover:border-emerald-500/40 transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
                  Student Account
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 uppercase">
                  Student
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono truncate">
                hasan@gmail.com
              </span>
              <span className="text-[10px] text-muted-foreground/75 font-mono">
                Pass: 123456
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-6 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
