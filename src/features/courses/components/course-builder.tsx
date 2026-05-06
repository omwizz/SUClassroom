"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { CourseModuleForm } from "@/features/courses/components/course-module-form";
import { ModuleBuilderItem } from "@/features/courses/components/module-builder-item";
import { reorderCourseModules } from "@/server/actions/course-actions";
import type { Course } from "@/types/courses";

type CourseBuilderProps = {
  course: Course;
};

export function CourseBuilder({ course }: CourseBuilderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function moveModule(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= course.modules.length) {
      return;
    }

    const ordered = [...course.modules];
    const [item] = ordered.splice(index, 1);
    ordered.splice(nextIndex, 0, item);

    setMessage(null);
    startTransition(async () => {
      const result = await reorderCourseModules(
        course.id,
        ordered.map((moduleItem) => moduleItem.id),
      );
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild size="sm" variant="ghost">
          <Link href="/dashboard/admin/courses">
            <ArrowLeft aria-hidden="true" />
            Volver a cursos
          </Link>
        </Button>
        {message ? (
          <span className="text-sm text-muted-foreground">{message}</span>
        ) : null}
      </div>

      <SectionCard
        description="Agrega módulos antes de sumar lecciones y recursos."
        title="Nuevo módulo"
      >
        <CourseModuleForm
          courseId={course.id}
          nextSortOrder={course.modules.length + 1}
        />
      </SectionCard>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Estructura del curso</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Reordena, edita y completa cada módulo con sus lecciones.
            </p>
          </div>
          <Button disabled={isPending} size="sm" variant="outline">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowUpDown aria-hidden="true" />
            )}
            Orden
          </Button>
        </div>

        {course.modules.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
            Este curso todavía no tiene módulos.
          </div>
        ) : (
          course.modules.map((moduleItem, index) => (
            <ModuleBuilderItem
              canMoveDown={index < course.modules.length - 1}
              canMoveUp={index > 0}
              key={moduleItem.id}
              moduleItem={moduleItem}
              onMoveDown={() => moveModule(index, 1)}
              onMoveUp={() => moveModule(index, -1)}
            />
          ))
        )}
      </div>
    </div>
  );
}

