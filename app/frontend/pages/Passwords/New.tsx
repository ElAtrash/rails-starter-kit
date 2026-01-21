import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth-layout";
import { Head, useForm } from "@inertiajs/react";

export default function New() {
  const { data, setData, post, processing, errors } = useForm({
    email_address: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/passwords");
  };

  return (
    <AuthLayout
      title="Forgot password?"
      footerLink={{ href: "/session/new", label: "Login", text: "Back to login" }}
    >
      <Head title="Forgot Password" />

      <form onSubmit={submit} className="space-y-6">
        <div className="space-y-2">
          <Input
            id="email_address"
            aria-label="Email Address"
            type="email"
            value={data.email_address}
            onChange={(e) => setData("email_address", e.target.value)}
            placeholder="Email Address"
            required
            autoFocus
          />
          {errors.email_address && (
            <p className="text-sm text-destructive">{errors.email_address}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Sending link..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
