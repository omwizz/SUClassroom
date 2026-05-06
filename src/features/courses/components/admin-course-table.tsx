import Link from "next/link";
import { BookOpen, Edit, Hammer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { CourseLevelBadge } from "@/features/courses/components/course-level-badge";
import { CoursePublishActions } from "@/features/courses/components/course-publish-actions";
import { CourseStatusBadge } from "@/features/courses/components/course-status-badge";
import type { Course } from "@/types/courses";

type AdminCourseTableProps = {
  courses: Course[];
};

export function AdminCourseTable({ courses }: AdminCourseTableProps) {
  if (courses.length === 0) {
    return (
      <EmptyState
        description="Crea el primer curso para empezar a ordenar módulos, lecciones y recursos."
        icon={BookOpen}
        title="Todavía no hay cursos"
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Nivel</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Estructura</TableHead>
            <TableHead className="min-w-56">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => {
            const lessonCount = course.modules.reduce(
              (total, moduleItem) => total + moduleItem.lessons.length,
              0,
            );

            return (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="max-w-sm">
                    <p className="font-medium">{course.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {course.subtitle ?? course.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{course.category?.name ?? "Sin categoría"}</TableCell>
                <TableCell>
                  <CourseLevelBadge level={course.level} />
                </TableCell>
                <TableCell>
                  <CourseStatusBadge status={course.status} />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {course.modules.length} módulos, {lessonCount} lecciones
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/admin/courses/${course.id}/edit`}>
                          <Edit aria-hidden="true" />
                          Editar
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link
                          href={`/dashboard/admin/courses/${course.id}/builder`}
                        >
                          <Hammer aria-hidden="true" />
                          Builder
                        </Link>
                      </Button>
                      {course.status === "published" ? (
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/courses/${course.slug}`}>
                            <Plus aria-hidden="true" />
                            Ver
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                    <CoursePublishActions course={course} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

