import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceBadge } from "@/features/courses/components/resource-badge";
import type { LessonResource } from "@/types/courses";

type LessonResourceListProps = {
  resources: LessonResource[];
};

export function LessonResourceList({ resources }: LessonResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        Esta lección todavía no tiene recursos adjuntos.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((resource) => {
        const href = resource.externalUrl ?? resource.fileUrl;

        return (
          <article
            className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between"
            key={resource.id}
          >
            <div className="flex min-w-0 gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background">
                <FileText className="size-4 text-primary" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium">{resource.title}</h4>
                  <ResourceBadge type={resource.resourceType} />
                </div>
                {resource.description ? (
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {resource.description}
                  </p>
                ) : null}
              </div>
            </div>
            {href ? (
              <Button asChild size="sm" variant="outline">
                <Link href={href} target="_blank">
                  {resource.isDownloadable ? (
                    <Download aria-hidden="true" />
                  ) : (
                    <ExternalLink aria-hidden="true" />
                  )}
                  Abrir
                </Link>
              </Button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

