import { Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  PROJECT_STAGE_LABELS,
  PROJECT_STAGES,
  PROJECT_STATUS_LABELS,
  PROJECT_STATUSES,
  type ProjectStage,
  type ProjectStatus,
} from "@/constants/projects";
import { AdminProjectsTable } from "@/features/projects/components/admin-projects-table";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminStudentProjectsByFilters } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

type AdminProjectsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    stage?: string;
  }>;
};

function normalizeStatus(status?: string): ProjectStatus | "all" {
  return PROJECT_STATUSES.includes(status as ProjectStatus)
    ? (status as ProjectStatus)
    : "all";
}

function normalizeStage(stage?: string): ProjectStage | "all" {
  return PROJECT_STAGES.includes(stage as ProjectStage)
    ? (stage as ProjectStage)
    : "all";
}

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  await requireRole(["admin"]);
  const params = await searchParams;
  const filters = {
    search: params.search,
    status: normalizeStatus(params.status),
    stage: normalizeStage(params.stage),
  };
  const projects = await getAdminStudentProjectsByFilters(filters);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Vista administrativa basica para consultar proyectos registrados por alumnos. Sin evaluacion ni feedback en esta fase."
        eyebrow="Admin"
        title="Proyectos de alumnos"
      />

      <Card className="glass-panel rounded-lg">
        <CardContent className="space-y-4 p-5">
          <form className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                defaultValue={filters.search}
                name="search"
                placeholder="Buscar proyecto o alumno"
              />
            </div>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              defaultValue={filters.status}
              name="status"
            >
              <option value="all">Todos los estados</option>
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {PROJECT_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              defaultValue={filters.stage}
              name="stage"
            >
              <option value="all">Todas las etapas</option>
              {PROJECT_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {PROJECT_STAGE_LABELS[stage]}
                </option>
              ))}
            </select>
            <Button type="submit">Filtrar</Button>
          </form>
          <AdminProjectsTable projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}
