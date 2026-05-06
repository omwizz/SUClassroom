"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { CourseModuleForm } from "@/features/courses/components/course-module-form";
import { LessonBuilderItem } from "@/features/courses/components/lesson-builder-item";
import { LessonForm } from "@/features/courses/components/lesson-form";
import {
  deleteCourseModule,
  reorderLessons,
} from "@/server/actions/course-actions";
import type { CourseModule } from "@/types/courses";

type ModuleBuilderItemProps = {
  moduleItem: CourseModule;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function ModuleBuilderItem({
  moduleItem,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: ModuleBuilderItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function removeModule() {
    setMessage(null);
    startTransition(async () => {
      const result = await deleteCourseModule(moduleItem.id);
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  function moveLesson(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= moduleItem.lessons.length) {
      return;
    }

    const ordered = [...moduleItem.lessons];
    const [item] = ordered.splice(index, 1);
    ordered.splice(nextIndex, 0, item);

    setMessage(null);
    startTransition(async () => {
      const result = await reorderLessons(
        moduleItem.id,
        ordered.map((lesson) => lesson.id),
      );
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <section className="rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{moduleItem.title}</h3>
            <Badge variant="outline">Orden {moduleItem.sortOrder}</Badge>
            {moduleItem.isRequired ? <Badge>Requerido</Badge> : null}
          </div>
          {moduleItem.description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {moduleItem.description}
            </p>
          ) : null}
          {message ? (
            <p className="mt-2 text-xs text-muted-foreground">{message}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={!canMoveUp || isPending}
            onClick={onMoveUp}
            size="icon-sm"
            type="button"
            variant="outline"
          >
            <ChevronUp aria-hidden="true" />
          </Button>
          <Button
            disabled={!canMoveDown || isPending}
            onClick={onMoveDown}
            size="icon-sm"
            type="button"
            variant="outline"
          >
            <ChevronDown aria-hidden="true" />
          </Button>
          <ConfirmDialog
            confirmLabel="Eliminar"
            description="También se eliminarán las lecciones y recursos del módulo."
            destructive
            onConfirm={removeModule}
            title="Eliminar módulo"
          >
            <Button
              disabled={isPending}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </ConfirmDialog>
        </div>
      </header>

      <div className="space-y-5 p-4">
        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Editar módulo
          </summary>
          <div className="mt-4">
            <CourseModuleForm
              courseId={moduleItem.courseId}
              moduleItem={moduleItem}
            />
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4" open>
          <summary className="cursor-pointer text-sm font-medium">
            Nueva lección
          </summary>
          <div className="mt-4">
            <LessonForm
              moduleId={moduleItem.id}
              nextSortOrder={moduleItem.lessons.length + 1}
            />
          </div>
        </details>

        <div className="space-y-3">
          {moduleItem.lessons.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-background/40 p-4 text-sm text-muted-foreground">
              Este módulo todavía no tiene lecciones.
            </div>
          ) : (
            moduleItem.lessons.map((lesson, index) => (
              <LessonBuilderItem
                canMoveDown={index < moduleItem.lessons.length - 1}
                canMoveUp={index > 0}
                key={lesson.id}
                lesson={lesson}
                onMoveDown={() => moveLesson(index, 1)}
                onMoveUp={() => moveLesson(index, -1)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

