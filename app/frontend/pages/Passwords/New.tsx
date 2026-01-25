import { AuthLayout } from "@/components/auth-layout";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function New() {
  const { success } = usePage().props as any;
  const shownRef = useRef(false);
  const { data, setData, post, processing, errors, clearErrors, reset } =
    useForm({
      email_address: "",
    });

  useEffect(() => {
    if (success && !shownRef.current) {
      shownRef.current = true;
      toast.success(success);

      reset();
    }
  }, [success, reset]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("email_address", e.target.value);
    if (errors.email_address) clearErrors("email_address");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/passwords");
  };

  return (
    <AuthLayout
      title="Forgot password?"
      footerLink={{
        href: "/session/new",
        label: "Login",
        text: "Back to login",
      }}
    >
      <Head title="Forgot Password" />

      <form onSubmit={submit} className="space-y-6">
        <FormField
          type="email"
          placeholder="Email Address"
          value={data.email_address}
          onChange={handleEmailChange}
          error={errors.email_address}
        />

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Sending link..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
