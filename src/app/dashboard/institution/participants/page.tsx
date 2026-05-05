import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function InstitutionParticipantsPage() {
  await requireRole(["institution", "admin"]);

  return (
    <PlaceholderPage
      description="Participantes por institución, cohorte y avance."
      title="Participantes"
    />
  );
}
