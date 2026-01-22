import { FlashMessages } from "@/components/flash-messages";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <FlashMessages />

      <main className="container mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
