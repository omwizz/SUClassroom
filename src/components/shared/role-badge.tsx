import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS, type UserRole } from "@/constants/roles";

export function RoleBadge({ role }: { role: UserRole }) {
  return <Badge variant="secondary">{ROLE_LABELS[role]}</Badge>;
}
