import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminMentorsPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Gestión de mentores, disponibilidad y asignaciones."
      title="Mentores"
    />
  );
}
