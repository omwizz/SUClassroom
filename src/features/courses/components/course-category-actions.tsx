"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { deactivateCourseCategory } from "@/server/actions/course-actions";
import type { CourseCategory } from "@/types/courses";

type CourseCategoryActionsProps = {
  category: CourseCategory;
};

export function CourseCategoryActions({ category }: CourseCategoryActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function deactivate() {
    setMessage(null);
    startTransition(async () => {
      const result = await deactivateCourseCategory(category.id);
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-2">
      <ConfirmDialog
        confirmLabel="Desactivar"
        description="La categoría dejará de aparecer en filtros públicos, pero los cursos existentes conservarán la referencia."
        onConfirm={deactivate}
        title="Desactivar categoría"
      >
        <Button
          disabled={isPending || !category.isActive}
          size="sm"
          type="button"
          variant="outline"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <PowerOff />}
          Desactivar
        </Button>
      </ConfirmDialog>
      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
    </div>
  );
}

