"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Download, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeDeliverableFile } from "@/server/actions/deliverable-actions";
import type { DeliverableFile } from "@/types/deliverables";

function formatBytes(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function DeliverableFileList({
  deliverableId,
  files,
  editable,
}: {
  deliverableId: string;
  files: DeliverableFile[];
  editable?: boolean;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (files.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Todavia no hay archivos adjuntos.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between"
          key={file.id}
        >
          <div>
            <p className="text-sm font-medium">{file.fileName}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {file.mimeType} · {formatBytes(file.sizeBytes)}
            </p>
          </div>
          <div className="flex gap-2">
            {file.signedUrl ? (
              <Button asChild size="sm" variant="ghost">
                <Link href={file.signedUrl} target="_blank">
                  <Download />
                  Abrir
                </Link>
              </Button>
            ) : null}
            {editable ? (
              <Button
                disabled={isPending && pendingId === file.id}
                onClick={() => {
                  setPendingId(file.id);
                  startTransition(async () => {
                    await removeDeliverableFile({
                      deliverableId,
                      fileId: file.id,
                    });
                    setPendingId(null);
                  });
                }}
                size="sm"
                type="button"
                variant="destructive"
              >
                {isPending && pendingId === file.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
                Quitar
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

