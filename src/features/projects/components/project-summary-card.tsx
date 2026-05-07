import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BUSINESS_AREA_LABELS } from "@/constants/projects";
import type { StudentProject } from "@/types/projects";
import { ProjectStageBadge } from "@/features/projects/components/project-stage-badge";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";

type ProjectSummaryCardProps = {
  project: StudentProject;
  showAction?: boolean;
};

export function ProjectSummaryCard({
  project,
  showAction = true,
}: ProjectSummaryCardProps) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <Target className="size-4" />
            Proyecto actual
          </div>
          <CardTitle className="mt-2 text-xl">{project.name}</CardTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          <ProjectStatusBadge status={project.status} />
          <ProjectStageBadge stage={project.currentStage} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase text-muted-foreground">Area</p>
            <p className="mt-1 text-sm font-medium">
              {BUSINESS_AREA_LABELS[project.businessArea]}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase text-muted-foreground">Publico</p>
            <p className="mt-1 text-sm font-medium">{project.targetAudience}</p>
          </div>
        </div>
        {showAction ? (
          <Button asChild variant="secondary">
            <Link href="/dashboard/student/project">
              Ver proyecto
              <ArrowRight />
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

