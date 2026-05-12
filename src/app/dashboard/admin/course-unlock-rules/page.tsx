import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { CourseUnlockRulesForm } from "@/features/progress/components/course-unlock-rules-form";
import { CourseUnlockRulesTable } from "@/features/progress/components/course-unlock-rules-table";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminCourses } from "@/server/queries/courses";
import { getUnlockRules } from "@/server/queries/progress";

export const dynamic = "force-dynamic";

export default async function CourseUnlockRulesPage() {
  await requireRole(["admin"]);
  const [courses, rules] = await Promise.all([
    getAdminCourses(),
    getUnlockRules(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Define prerequisitos basicos para avanzar entre cursos. Las reglas de pago y mentoria quedan preparadas para fases futuras."
        title="Reglas de desbloqueo"
      />

      <SectionCard
        description="Selecciona el curso a desbloquear y, si aplica, el curso previo que debe completarse."
        title="Crear o actualizar regla"
      >
        <CourseUnlockRulesForm courses={courses} />
      </SectionCard>

      <SectionCard
        description="Listado actual de reglas de avance entre cursos."
        title="Reglas configuradas"
      >
        <CourseUnlockRulesTable courses={courses} rules={rules} />
      </SectionCard>
    </div>
  );
}
