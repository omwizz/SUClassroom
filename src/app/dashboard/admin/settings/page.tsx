import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireRole } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireRole(["admin"]);

  return (
    <PlaceholderPage
      description="Configuración operativa de plataforma y preferencias."
      title="Configuración"
    />
  );
}
