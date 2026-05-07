import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BUSINESS_AREA_LABELS } from "@/constants/projects";
import type { AdminStudentProject } from "@/types/projects";
import { ProjectStageBadge } from "@/features/projects/components/project-stage-badge";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";

type AdminProjectsTableProps = {
  projects: AdminStudentProject[];
};

export function AdminProjectsTable({ projects }: AdminProjectsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Alumno</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">
                      {project.student?.fullName ?? "Sin nombre"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.student?.email ?? "Sin email"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {BUSINESS_AREA_LABELS[project.businessArea]}
                </TableCell>
                <TableCell>
                  <ProjectStageBadge stage={project.currentStage} />
                </TableCell>
                <TableCell>
                  <ProjectStatusBadge status={project.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/dashboard/admin/projects/${project.id}`}>
                      Ver
                      <ArrowRight />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="py-8 text-center text-sm text-muted-foreground"
                colSpan={6}
              >
                No hay proyectos para los filtros actuales.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

