import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function MentorMentorshipPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <PlaceholderPage
      description="Agenda de asesorías y notas posteriores para mentores."
      title="Asesorías"
    />
  );
}
