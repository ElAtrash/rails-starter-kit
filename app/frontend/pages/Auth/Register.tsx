import { AuthLayout } from "@/components/auth-layout";
import { FormField } from "@/components/form-field";
import { GoogleOAuthButton } from "@/components/google-oauth-button";
import { OAuthDivider } from "@/components/oauth-divider";
import { Button } from "@/components/ui/button";
import { Head, useForm } from "@inertiajs/react";

interface RegisterForm {
  email_address: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const { data, setData, post, processing, errors, clearErrors } =
    useForm<RegisterForm>({
      email_address: "",
      password: "",
      password_confirmation: "",
    });

  const handleFieldChange =
    (field: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(field, e.target.value);
      if (errors[field]) clearErrors(field);
    };

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

      <GoogleOAuthButton label="Sign up with Google" />

      <OAuthDivider />

      <form onSubmit={submit} className="space-y-4">
        <FormField
          type="email"
          placeholder="Email Address"
          value={data.email_address}
          onChange={handleFieldChange("email_address")}
          error={errors.email_address}
        />

        <FormField
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleFieldChange("password")}
          error={errors.password}
          helperText="Must be at least 8 characters"
        />

        <FormField
          type="password"
          placeholder="Confirm Password"
          value={data.password_confirmation}
          onChange={handleFieldChange("password_confirmation")}
          error={errors.password_confirmation}
        />

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
