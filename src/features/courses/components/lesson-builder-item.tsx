"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Clock3, Trash2 } from "lucide-react";
import { LESSON_TYPE_LABELS } from "@/constants/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { LessonForm } from "@/features/courses/components/lesson-form";
import { LessonResourceForm } from "@/features/courses/components/lesson-resource-form";
import { ResourceBadge } from "@/features/courses/components/resource-badge";
import {
  deleteLesson,
  deleteLessonResource,
} from "@/server/actions/course-actions";
import type { Lesson, LessonResource } from "@/types/courses";

type LessonBuilderItemProps = {
  lesson: Lesson;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function LessonBuilderItem({
  lesson,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: LessonBuilderItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function removeLesson() {
    setMessage(null);
    startTransition(async () => {
      const result = await deleteLesson(lesson.id);
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  function removeResource(resource: LessonResource) {
    setMessage(null);
    startTransition(async () => {
      const result = await deleteLessonResource(resource.id);
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <article className="rounded-lg border border-border bg-background/50">
      <header className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium">{lesson.title}</h4>
            <Badge>{LESSON_TYPE_LABELS[lesson.lessonType]}</Badge>
            {lesson.isPreview ? <Badge variant="secondary">Preview</Badge> : null}
            <Badge variant="outline">
              <Clock3 className="size-3" />
              {lesson.estimatedDurationMinutes} min
            </Badge>
          </div>
          {lesson.description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {lesson.description}
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
            description="También se eliminarán los recursos de esta lección."
            destructive
            onConfirm={removeLesson}
            title="Eliminar lección"
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

      <div className="space-y-4 p-4">
        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Editar lección
          </summary>
          <div className="mt-4">
            <LessonForm lesson={lesson} moduleId={lesson.moduleId} />
          </div>
        </details>

        <details className="rounded-lg border border-border bg-muted/20 p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Nuevo recurso
          </summary>
          <div className="mt-4">
            <LessonResourceForm
              lessonId={lesson.id}
              nextSortOrder={lesson.resources.length + 1}
            />
          </div>
        </details>

        <div className="space-y-3">
          {lesson.resources.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
              Esta lección no tiene recursos.
            </div>
          ) : (
            lesson.resources.map((resource) => (
              <div
                className="rounded-lg border border-border bg-card p-4"
                key={resource.id}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="font-medium">{resource.title}</h5>
                      <ResourceBadge type={resource.resourceType} />
                    </div>
                    {resource.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    ) : null}
                  </div>
                  <ConfirmDialog
                    confirmLabel="Eliminar"
                    description="El recurso se quitará de la lección."
                    destructive
                    onConfirm={() => removeResource(resource)}
                    title="Eliminar recurso"
                  >
                    <Button
                      disabled={isPending}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <Trash2 aria-hidden="true" />
                      Eliminar
                    </Button>
                  </ConfirmDialog>
                </div>
                <details className="mt-3 rounded-lg border border-border bg-muted/20 p-4">
                  <summary className="cursor-pointer text-sm font-medium">
                    Editar recurso
                  </summary>
                  <div className="mt-4">
                    <LessonResourceForm
                      lessonId={lesson.id}
                      resource={resource}
                    />
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}

