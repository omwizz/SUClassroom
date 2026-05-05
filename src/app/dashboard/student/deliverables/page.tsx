import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function StudentDeliverablesPage() {
  await requireRole(["student", "admin"]);

  return (
    <PlaceholderPage
      description="Borradores, envíos y reenvíos se conectarán con storage privado en Fase 5."
      title="Entregables"
    />
  );
}
