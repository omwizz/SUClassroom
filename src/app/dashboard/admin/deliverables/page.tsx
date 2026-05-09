import { FileText, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DELIVERABLE_STATUS_LABELS,
  DELIVERABLE_STATUSES,
  type DeliverableStatus,
} from "@/constants/deliverables";
import { AdminDeliverablesTable } from "@/features/deliverables/components/admin-deliverables-table";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminDeliverables } from "@/server/queries/deliverables";

export const dynamic = "force-dynamic";

type AdminDeliverablesPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

function normalizeStatus(status?: string): DeliverableStatus | "all" {
  return DELIVERABLE_STATUSES.includes(status as DeliverableStatus)
    ? (status as DeliverableStatus)
    : "all";
}

export default async function AdminDeliverablesPage({
  searchParams,
}: AdminDeliverablesPageProps) {
  await requireRole(["admin"]);
  const params = await searchParams;
  const filters = {
    search: params.search,
    status: normalizeStatus(params.status),
  };
  const deliverables = await getAdminDeliverables(filters);
  const sent = deliverables.filter((item) =>
    ["submitted", "resubmitted", "under_review"].includes(item.status),
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        description="Seguimiento operativo de borradores, envios y evidencia. La evaluacion formal queda para la siguiente fase."
        eyebrow="Admin"
        title="Entregables"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          detail="Todos los estados"
          icon={FileText}
          title="Total"
          value={String(deliverables.length)}
        />
        <MetricCard
          detail="En espera de revision futura"
          icon={FileText}
          title="Enviados"
          value={String(sent)}
          tone="warning"
        />
        <MetricCard
          detail="Storage privado preparado"
          icon={FileText}
          title="Evidencias"
          value={String(
            deliverables.reduce((total, item) => total + item.filesCount, 0),
          )}
          tone="success"
        />
      </div>

      <Card className="glass-panel rounded-lg">
        <CardContent className="space-y-4 p-5">
          <form className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                defaultValue={filters.search}
                name="search"
                placeholder="Buscar entregable, alumno o curso"
              />
            </div>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              defaultValue={filters.status}
              name="status"
            >
              <option value="all">Todos los estados</option>
              {DELIVERABLE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {DELIVERABLE_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
            <Button type="submit">Filtrar</Button>
          </form>
          <AdminDeliverablesTable deliverables={deliverables} />
        </CardContent>
      </Card>
    </div>
  );
}

