"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeDeliverableLink } from "@/server/actions/deliverable-actions";
import type { DeliverableLink } from "@/types/deliverables";

export function DeliverableLinkList({
  deliverableId,
  links,
  editable,
}: {
  deliverableId: string;
  links: DeliverableLink[];
  editable?: boolean;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (links.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Todavia no hay enlaces registrados.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <div
          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between"
          key={link.id}
        >
          <div>
            <p className="text-sm font-medium">{link.title}</p>
            {link.description ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {link.description}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="ghost">
              <Link href={link.url} target="_blank">
                <ExternalLink />
                Abrir
              </Link>
            </Button>
            {editable ? (
              <Button
                disabled={isPending && pendingId === link.id}
                onClick={() => {
                  setPendingId(link.id);
                  startTransition(async () => {
                    await removeDeliverableLink({
                      deliverableId,
                      linkId: link.id,
                    });
                    setPendingId(null);
                  });
                }}
                size="sm"
                type="button"
                variant="destructive"
              >
                {isPending && pendingId === link.id ? (
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

