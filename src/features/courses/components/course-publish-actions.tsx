"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Archive, EyeOff, Globe2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  archiveCourse,
  publishCourse,
  unpublishCourse,
} from "@/server/actions/course-actions";
import type { Course } from "@/types/courses";

type CoursePublishActionsProps = {
  course: Course;
};

export function CoursePublishActions({ course }: CoursePublishActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function run(action: () => Promise<{ ok: boolean; message: string }>) {
    setMessage(null);
    startTransition(async () => {
      const result = await action();
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {course.status !== "published" ? (
          <Button
            disabled={isPending}
            onClick={() => run(() => publishCourse(course.id))}
            size="sm"
            type="button"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Globe2 />}
            Publicar
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={() => run(() => unpublishCourse(course.id))}
            size="sm"
            type="button"
            variant="outline"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <EyeOff />}
            Retirar
          </Button>
        )}
        <ConfirmDialog
          confirmLabel="Archivar"
          description="El curso dejará de aparecer como activo y no se mostrará a estudiantes."
          destructive
          onConfirm={() => run(() => archiveCourse(course.id))}
          title="Archivar curso"
        >
          <Button disabled={isPending} size="sm" type="button" variant="outline">
            <Archive aria-hidden="true" />
            Archivar
          </Button>
        </ConfirmDialog>
      </div>
      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
    </div>
  );
}

