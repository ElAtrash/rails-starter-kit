import { FlashMessages } from "@/components/flash-messages";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Link } from "@inertiajs/react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footerLink: { href: string; label: string; text: string };
}

export function AuthLayout({ children, title, footerLink }: AuthLayoutProps) {
  return (
    <>
      <FlashMessages />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <Card className="w-full max-w-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
            {footerLink.text}
            <Link
              href={footerLink.href}
              className="font-medium text-primary underline underline-offset-4"
            >
              {footerLink.label}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
