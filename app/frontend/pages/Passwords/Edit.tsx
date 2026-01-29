import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ token }: { token: string }) {
  const { data, setData, put, processing, errors } = useForm({
    password: "",
    password_confirmation: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/passwords/${token}`);
  };

  return (
    <AuthLayout
      title="Reset Password"
      footerLink={{
        href: "/session/new",
        label: "Login",
        text: "Back to login",
      }}
    >
      <Head title="Reset Password" />
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <PasswordInput
            id="password"
            aria-label="New Password"
            placeholder="New Password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-destructive text-xs">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <PasswordInput
            id="password_confirmation"
            placeholder="Confirm New Password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />
        </div>

        <Button className="w-full" disabled={processing}>
          Update Password
        </Button>
      </form>
    </AuthLayout>
  );
}
