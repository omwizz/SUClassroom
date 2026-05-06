import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { CourseForm } from "@/features/courses/components/course-form";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseCategories } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  await requireRole(["admin"]);
  const categories = await getCourseCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        description="Crea la ficha base del curso antes de construir módulos y lecciones."
        title="Nuevo curso"
      />
      <SectionCard title="Ficha del curso">
        <CourseForm categories={categories} />
      </SectionCard>
    </div>
  );
}

