import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function FlashMessages() {
  const { flash } = usePage().props as any;
  const [show, setShow] = useState(false);

  // Trigger visibility when a flash message arrives
  useEffect(() => {
    if (flash?.notice || flash?.alert) {
      setShow(true);
      // Optional: Auto-hide after 5 seconds
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
      {flash.notice && (
        <Alert className="border-green-500 bg-green-50 text-green-700 shadow-lg">
          <AlertDescription>{flash.notice}</AlertDescription>
        </Alert>
      )}
      {flash.alert && (
        <Alert variant="destructive" className="shadow-lg">
          <AlertDescription>{flash.alert}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
