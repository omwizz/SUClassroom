"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Archive, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { FormError } from "@/components/shared/form-error";
import { Button } from "@/components/ui/button";
import { archiveStudentProject } from "@/server/actions/project-actions";

type ArchiveProjectButtonProps = {
  projectId: string;
  disabled?: boolean;
};

export function ArchiveProjectButton({
  projectId,
  disabled = false,
}: ArchiveProjectButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function archiveProject() {
    setError(null);
    startTransition(async () => {
      const result = await archiveStudentProject(projectId);

      if (!result.ok) {
        setError(result.message);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <ConfirmDialog
        confirmLabel="Archivar"
        description="El proyecto quedara fuera de las vistas activas. No se evaluara ni se eliminara informacion."
        destructive
        onConfirm={archiveProject}
        title="Archivar proyecto"
      >
        <Button disabled={disabled || isPending} variant="destructive">
          {isPending ? <Loader2 className="animate-spin" /> : <Archive />}
          Archivar
        </Button>
      </ConfirmDialog>
      <FormError message={error} />
    </div>
  );
}

