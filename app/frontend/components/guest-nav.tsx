import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Command } from "lucide-react";

export function GuestNav() {
  return (
    <header className="h-16 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 font-bold text-lg">
        <div className="size-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
          <Command className="size-5" />
        </div>
        <span>Starter Kit</span>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/session/new">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/registration/new">
          <Button size="sm">Sign up</Button>
        </Link>
      </div>
    </header>
  );
}
