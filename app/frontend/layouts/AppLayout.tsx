import { AppSidebar } from "@/components/app-sidebar";
import { FlashMessages } from "@/components/flash-messages";
import { GuestNav } from "@/components/guest-nav";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { props } = usePage<PageProps>();
  const user = props.auth?.user;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  if (user) {
    return (
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        {/* Mobile Header (Authenticated) */}
        <header className="flex h-16 items-center border-b px-4 md:hidden bg-background sticky top-0 z-10 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 transition-colors hover:bg-accent rounded-md"
            aria-label="Open menu"
          >
            <Menu className="size-6 text-muted-foreground" />
          </button>
          <span className="ml-4 font-bold text-lg text-primary">
            Starter Kit
          </span>
        </header>

        {/* Sidebar Backdrop (Mobile only) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Positioned fixed but logic handled internally */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content Area */}
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0",
            isSidebarOpen ? "md:pl-64" : "md:pl-16",
          )}
        >
          <main className="flex-1 p-4 md:p-6 pt-8 max-w-7xl mx-auto w-full">
            <FlashMessages />
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Guest Layout
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GuestNav />
      <main className="flex-1 container mx-auto px-4 md:px-5 py-8 max-w-7xl">
        <FlashMessages />
        {children}
      </main>
    </div>
  );
}
