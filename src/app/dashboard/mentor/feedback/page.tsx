import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function MentorFeedbackPage() {
  await requireRole(["mentor", "admin"]);

  return (
    <PlaceholderPage
      description="Historial de feedback emitido y criterios de revisión."
      title="Feedback"
    />
  );
}
