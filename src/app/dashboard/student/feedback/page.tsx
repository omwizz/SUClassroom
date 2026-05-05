import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentFeedbackPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="El feedback del mentor aparecerá después de implementar evaluación y revisión."
      title="Feedback"
    />
  );
}
