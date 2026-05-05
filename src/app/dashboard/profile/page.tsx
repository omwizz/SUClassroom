import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { requireAuthProfile } from "@/server/guards/role-guard";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  await requireAuthProfile();

  return (
    <PlaceholderPage
      description="Perfil base preparado para edición de datos personales y rol activo."
      title="Perfil"
    />
  );
}
