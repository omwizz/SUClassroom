import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { CourseCategoryActions } from "@/features/courses/components/course-category-actions";
import { CourseCategoryForm } from "@/features/courses/components/course-category-form";
import { requireRole } from "@/server/guards/role-guard";
import { getCourseCategories } from "@/server/queries/courses";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await requireRole(["admin"]);
  const categories = await getCourseCategories(true);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Gestiona las categorías usadas para ordenar y filtrar cursos publicados."
        title="Categorías de cursos"
      />
      <SectionCard
        description="Las categorías activas aparecen en filtros y formularios."
        title="Nueva categoría"
      >
        <CourseCategoryForm />
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-2">
        {categories.map((category) => (
          <section
            className="rounded-lg border border-border bg-card p-4"
            key={category.id}
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">{category.name}</h2>
                  <Badge variant={category.isActive ? "default" : "outline"}>
                    {category.isActive ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  /{category.slug}
                </p>
              </div>
              <CourseCategoryActions category={category} />
            </div>
            <CourseCategoryForm category={category} />
          </section>
        ))}
      </div>
    </div>
  );
}

