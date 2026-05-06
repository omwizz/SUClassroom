import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { CourseCard } from "@/features/courses/components/course-card";
import type { Course } from "@/types/courses";

type CourseGridProps = {
  courses: Course[];
  hrefBase?: string;
};

export function CourseGrid({ courses, hrefBase }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <EmptyState
        description="Ajusta los filtros o vuelve cuando haya más cursos publicados."
        icon={BookOpen}
        title="No hay cursos publicados con esos filtros"
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard course={course} hrefBase={hrefBase} key={course.id} />
      ))}
    </div>
  );
}

