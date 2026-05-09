import { NotificationDropdown } from "@/features/evaluations/components/notification-dropdown";
import type { Notification } from "@/types/evaluations";

export function NotificationButton({
  notifications = [],
}: {
  notifications?: Notification[];
}) {
  return <NotificationDropdown notifications={notifications} />;
}
