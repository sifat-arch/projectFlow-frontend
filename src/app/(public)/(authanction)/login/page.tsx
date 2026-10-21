import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden bg-radial from-primary/5 via-background to-background">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
