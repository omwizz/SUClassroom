import Link from "next/link";
import { FolderPlus, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { AdminCourseTable } from "@/features/courses/components/admin-course-table";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminCourses } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  await requireRole(["admin"]);
  const courses = await getAdminCourses();

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/admin/categories">
                <Tags aria-hidden="true" />
                Categorías
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/admin/courses/new">
                <FolderPlus aria-hidden="true" />
                Nuevo curso
              </Link>
            </Button>
          </div>
        }
        description="Administra cursos, estados de publicación y acceso al builder de módulos, lecciones y recursos."
        title="Cursos"
      />
      <SectionCard
        description="Los borradores y archivados solo son visibles para administración."
        title="Listado de cursos"
      >
        <AdminCourseTable courses={courses} />
      </SectionCard>
    </div>
  );
}

