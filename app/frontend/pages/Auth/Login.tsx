import { AuthLayout } from "@/components/auth-layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Head, Link, useForm } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";

interface LoginForm {
  email_address: string;
  password: string;
  auth?: string;
}

export default function Login() {
  const { data, setData, post, processing, errors } = useForm<LoginForm>({
    email_address: "",
    password: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/session");
  };

  return (
    <AuthLayout
      title="Login"
      footerLink={{
        text: "Don't have an account?",
        label: "Sign up",
        href: "/registration/new",
      }}
    >
      <Head title="Login" />

      <form onSubmit={submit} className="space-y-4">
        {errors.auth && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.auth}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Input
            type="email"
            aria-label="Email Address"
            placeholder="Email Address"
            value={data.email_address}
            onChange={(e) => setData("email_address", e.target.value)}
            className={errors.email_address ? "border-destructive" : ""}
          />
          {errors.email_address && (
            <p className="text-xs text-destructive">{errors.email_address}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Input
            type="password"
            aria-label="Password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className={errors.password ? "border-destructive" : ""}
          />
          <div className="flex justify-end">
            <Link
              href="/passwords/new"
              className="text-xs text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </AuthLayout>
  );
}
