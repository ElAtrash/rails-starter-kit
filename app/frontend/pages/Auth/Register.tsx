import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    email_address: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/registration");
  };

  return (
    <AuthLayout
      title="Create an account"
      footerLink={{
        text: "Already have an account?",
        label: "Login",
        href: "/session/new",
      }}
    >
      <Head title="Sign Up" />

      <form onSubmit={submit} className="space-y-4">
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
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Input
            type="password"
            aria-label="Confirm Password"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            className={errors.password_confirmation ? "border-destructive" : ""}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-destructive">
              {errors.password_confirmation}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
