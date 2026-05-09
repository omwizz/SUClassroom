import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markNotificationAsReadFromForm } from "@/server/actions/evaluation-actions";
import type { Notification } from "@/types/evaluations";

export function NotificationDropdown({
  notifications,
}: {
  notifications: Notification[];
}) {
  const unread = notifications.filter((item) => !item.readAt).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" size="icon" variant="ghost">
          <Bell />
          {unread > 0 ? (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unread}
            </span>
          ) : null}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((item) => {
            const markRead = markNotificationAsReadFromForm.bind(null, item.id);

            return (
              <DropdownMenuItem asChild key={item.id}>
                <div className="flex items-start gap-3 p-2">
                  <div className="min-w-0 flex-1">
                    {item.href ? (
                      <Link className="font-medium" href={item.href}>
                        {item.title}
                      </Link>
                    ) : (
                      <p className="font-medium">{item.title}</p>
                    )}
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {item.message}
                    </p>
                  </div>
                  {!item.readAt ? (
                    <form action={markRead}>
                      <Button size="xs" type="submit" variant="ghost">
                        Leer
                      </Button>
                    </form>
                  ) : null}
                </div>
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem disabled>
            No hay notificaciones recientes.
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
