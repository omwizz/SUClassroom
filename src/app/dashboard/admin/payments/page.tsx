import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Historial de pagos y preparación para Qulqi."
      title="Pagos"
    />
  );
}
