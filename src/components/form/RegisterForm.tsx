"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerValidationSchema } from "@/validation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { useRegister } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import Link from "next/link";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: register, isPending: registerPending } = useRegister();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerValidationSchema,
    },
    onSubmit: ({ value }) => {
      register(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (response) => {
            toast.add({
              title: "Account Created!",
              description:
                response?.message ||
                "Welcome to ProjectFlow! Your student account is ready.",
              type: "success",
            });

            if (typeof window !== "undefined" && response?.data) {
              if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
              }
              if (response.data.user) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user),
                );
              }
            }

            router.push("/");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.data?.message ||
              error?.message ||
              "Registration failed. Please check your details and try again.";

            toast.add({
              title: "Registration Failed",
              description: errorMessage,
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 ring-8 ring-primary/5 shadow-inner">
          <UserPlus className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Sign up as a student to submit and track your projects
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Full Name field */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Rahim Ahmed"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 h-11"
                      autoComplete="name"
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
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="•••••••• (Min 6 characters)"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
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

          {/* Confirm Password field */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
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
          <div className="pt-2">
            <Button
              type="submit"
              disabled={registerPending}
              className="w-full h-11 rounded-xl font-medium shadow-md transition-all hover:shadow-lg active:scale-[0.99] cursor-pointer"
            >
              {registerPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Student Account
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-6 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
