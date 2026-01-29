"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AuthUser, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
    ChevronsUpDown,
    Home,
    LogOut,
    LucideIcon,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Settings", href: "/settings", icon: Settings },
];

// SidebarNavItem - Sub-component for individual navigation links
function SidebarNavItem({
  item,
  isOpen,
  isActive,
}: {
  item: { name: string; href: string; icon: LucideIcon };
  isOpen: boolean;
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-sidebar-foreground/5 text-foreground"
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-foreground",
        !isOpen && "md:justify-center",
      )}
      title={item.name}
    >
      <item.icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          isActive
            ? "text-primary"
            : "text-sidebar-foreground/60 group-hover:text-foreground",
        )}
      />

      <span
        className={cn(
          "whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300",
          isOpen ? "block" : "hidden md:hidden lg:hidden",
          !isOpen && "md:hidden",
        )}
      >
        {item.name}
      </span>

      {/* Mobile-only label (fallback if state logic is complex) */}
      <span className="md:hidden whitespace-nowrap">{item.name}</span>

      {isActive && (
        <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-lg" />
      )}
    </Link>
  );
}

// SidebarProfile - Sub-component for the user profile section
function SidebarProfile({ user, isOpen }: { user: AuthUser; isOpen: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-3 w-full transition-all duration-200 text-left group outline-none",
            !isOpen && "md:justify-center",
          )}
        >
          <div className="size-8 rounded-full bg-sidebar-accent flex items-center justify-center border border-sidebar-border transition-colors shrink-0">
            <span className="text-xs font-bold text-sidebar-foreground">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          {isOpen && (
            <>
              <div className="flex flex-col flex-1 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-sm font-medium truncate">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-50 shrink-0" />
            </>
          )}
          {/* Mobile visible label */}
          <div className="md:hidden flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium truncate">{user.email}</span>
          </div>
          <ChevronsUpDown className="md:hidden ml-auto size-4 opacity-50 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 animate-in slide-in-from-bottom-2 duration-200"
        align={isOpen ? "end" : "start"}
        side={isOpen ? "top" : "right"}
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/session"
            method="delete"
            as="button"
            className="w-full flex items-center cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const { url, props } = usePage<PageProps>();
  const user = props.auth?.user;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col",
        isOpen ? "md:w-64" : "md:w-16 w-64",
        // Mobile visibility logic
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-sidebar-border/50 transition-all",
          isOpen ? "px-6 justify-between" : "justify-center px-2",
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-bold text-lg hover:opacity-80 transition-all whitespace-nowrap overflow-hidden text-primary animate-in fade-in active:scale-95 duration-300",
            !isOpen && "md:hidden",
          )}
        >
          Starter Kit
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent focus-visible:ring-1 focus-visible:ring-sidebar-ring"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-sidebar-border">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isOpen={isOpen}
            isActive={url === item.href}
          />
        ))}
      </nav>

      {/* Footer / Profile */}
      <div className="p-2 mt-auto border-t border-sidebar-border/50 hover:bg-sidebar-accent transition-colors">
        {user && <SidebarProfile user={user} isOpen={isOpen} />}
      </div>
    </aside>
  );
}
