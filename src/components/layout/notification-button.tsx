import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationButton() {
  return (
    <Button size="icon" variant="ghost">
      <Bell />
      <span className="sr-only">Notificaciones</span>
    </Button>
  );
}
