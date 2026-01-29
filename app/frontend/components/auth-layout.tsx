import { FlashMessages } from "@/components/flash-messages";
import { Link } from "@inertiajs/react";
import { Command } from "lucide-react";
import { Toaster } from "sonner";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footerLink: { href: string; label: string; text: string };
}

export function AuthLayout({ children, title, footerLink }: AuthLayoutProps) {
  return (
    <>
      <FlashMessages />
      <Toaster position="top-right" />
      <div className="min-h-[80vh] w-full lg:grid lg:grid-cols-2">
        {/* Left Side - Placeholder/Branding */}
        <div className="hidden bg-muted lg:flex flex-col items-center justify-center p-10 dark:border-r">
          <div className="flex items-center gap-2 font-bold text-3xl mb-8">
            <div className="size-10 rounded bg-primary text-primary-foreground flex items-center justify-center">
              <Command className="size-6" />
            </div>
            <span>Starter Kit</span>
          </div>
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              This is a starter kit for building robust Rails applications with
              modern react/inertia.js toolings.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center py-12 px-4">
          <div className="mx-auto grid w-full max-w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              {/* Mobile Branding */}
              <div className="lg:hidden flex items-center justify-center gap-2 font-bold text-2xl mb-4 text-primary">
                <Command className="size-6" />
                <span>Starter Kit</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-balance text-muted-foreground text-sm">
                Enter your details below to {title.toLowerCase()}
              </p>
            </div>

            {children}

            <div className="mt-4 text-center text-sm">
              {footerLink.text}{" "}
              <Link href={footerLink.href} className="text-primary underline">
                {footerLink.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
