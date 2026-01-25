import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function FlashMessages() {
  const { flash } = usePage().props as any;

  useEffect(() => {
    if (flash.notice) {
      toast.success(flash.notice);
    }
    if (flash.alert) {
      toast.error(flash.alert);
    }
  }, [flash]);

  return null;
}
