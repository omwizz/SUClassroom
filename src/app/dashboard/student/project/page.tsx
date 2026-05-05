import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentProjectPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="El proyecto del alumno y diagnóstico inicial llegan en la fase correspondiente."
      title="Mi proyecto"
    />
  );
}
