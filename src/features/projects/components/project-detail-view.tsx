import Link from "next/link";
import { ArrowLeft, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BUSINESS_AREA_LABELS } from "@/constants/projects";
import type { AdminStudentProject, StudentProject } from "@/types/projects";
import { ArchiveProjectButton } from "@/features/projects/components/archive-project-button";
import { ProjectStageBadge } from "@/features/projects/components/project-stage-badge";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";

type ProjectDetailViewProps = {
  project: StudentProject | AdminStudentProject;
  adminView?: boolean;
};

function hasStudent(project: StudentProject | AdminStudentProject): project is AdminStudentProject {
  return "student" in project;
}

export function ProjectDetailView({
  project,
  adminView = false,
}: ProjectDetailViewProps) {
  const student = hasStudent(project) ? project.student : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <ProjectStatusBadge status={project.status} />
            <ProjectStageBadge stage={project.currentStage} />
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>
        {adminView ? (
          <ArchiveProjectButton
            disabled={project.status === "archived"}
            projectId={project.id}
          />
        ) : (
          <Button asChild>
            <Link href="/dashboard/student/project/edit">Editar proyecto</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="glass-panel rounded-lg">
          <CardHeader>
            <CardTitle>Diagnostico del proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <section>
              <p className="text-xs uppercase text-muted-foreground">
                Problema
              </p>
              <p className="mt-2 text-sm leading-6">{project.problem}</p>
            </section>
            <Separator />
            <section>
              <p className="text-xs uppercase text-muted-foreground">
                Solucion propuesta
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {project.solution || "Sin solucion detallada todavia."}
              </p>
            </section>
            <Separator />
            <section>
              <p className="text-xs uppercase text-muted-foreground">
                Impacto social
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {project.socialImpact || "Sin impacto documentado todavia."}
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel rounded-lg">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Publico objetivo
                </p>
                <p className="mt-1">{project.targetAudience}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">Area</p>
                <p className="mt-1">
                  {BUSINESS_AREA_LABELS[project.businessArea]}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  Actualizado
                </p>
                <p className="mt-1">
                  {new Intl.DateTimeFormat("es", {
                    dateStyle: "medium",
                  }).format(new Date(project.updatedAt))}
                </p>
              </div>
            </CardContent>
          </Card>

          {student ? (
            <Card className="glass-panel rounded-lg">
              <CardHeader>
                <CardTitle>Alumno</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <UserRound className="size-4 text-primary" />
                  {student.fullName ?? "Sin nombre"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  {student.email}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      <Button asChild variant="ghost">
        <Link href={adminView ? "/dashboard/admin/projects" : "/dashboard/student/project"}>
          <ArrowLeft />
          Volver
        </Link>
      </Button>
    </div>
  );
}

