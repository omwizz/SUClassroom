import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminDeliverablesPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Seguimiento global de entregables, estados y revisiones."
      title="Entregables"
    />
  );
}
