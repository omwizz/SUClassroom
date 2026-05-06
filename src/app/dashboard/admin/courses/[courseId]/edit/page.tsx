import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { CourseForm } from "@/features/courses/components/course-form";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseById, getCourseCategories } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

type EditCoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  await requireRole(["admin"]);
  const { courseId } = await params;
  const [course, categories] = await Promise.all([
    getCourseById(courseId),
    getCourseCategories(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        description="Edita metadatos, estado y visibilidad del curso."
        title={`Editar: ${course.title}`}
      />
      <SectionCard title="Ficha del curso">
        <CourseForm categories={categories} course={course} />
      </SectionCard>
    </div>
  );
}

