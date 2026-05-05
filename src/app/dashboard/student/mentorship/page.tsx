import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentMentorshipPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="Solicitud de asesorías y agenda se desarrollan en la fase de mentorías."
      title="Asesorías"
    />
  );
}
