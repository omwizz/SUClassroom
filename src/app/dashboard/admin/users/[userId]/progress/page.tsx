import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { AdminUserProgressView } from "@/features/progress/components/admin-user-progress-view";
import { StudentProgressTimeline } from "@/features/progress/components/student-progress-timeline";
import { requireRole } from "@/server/guards/role-guard";
import { getProfiles } from "@/server/queries/profiles";
import {
  getStudentCourseProgress,
  getStudentProgressEvents,
} from "@/server/queries/progress";

export const dynamic = "force-dynamic";

type AdminUserProgressPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function AdminUserProgressPage({
  params,
}: AdminUserProgressPageProps) {
  await requireRole(["admin"]);
  const { userId } = await params;
  const profiles = await getProfiles();
  const profile = profiles.find((item) => item.id === userId);

  if (!profile) {
    notFound();
  }

  const [items, events] = await Promise.all([
    getStudentCourseProgress(profile.id),
    getStudentProgressEvents(profile.id, 12),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        description={profile.email}
        eyebrow="Progreso de usuario"
        title={profile.fullName ?? "Usuario sin nombre"}
      />

      <SectionCard
        description="Vista administrativa para revisar estados y aplicar desbloqueo manual si corresponde."
        title="Cursos del alumno"
      >
        <AdminUserProgressView items={items} profile={profile} />
      </SectionCard>

      <SectionCard
        description="Eventos recientes asociados a la ruta del alumno."
        title="Historial de progreso"
      >
        <StudentProgressTimeline events={events} />
      </SectionCard>
    </div>
  );
}
