import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentDeliverablesTable } from "@/features/deliverables/components/student-deliverables-table";
import { requireRole } from "@/server/guards/role-guard";
import { getStudentDeliverables } from "@/server/queries/deliverables";
import { findCurrentStudentProject } from "@/server/queries/projects";

export const dynamic = "force-dynamic";

export default async function StudentDeliverablesPage() {
  const profile = await requireRole(["student"]);
  const [project, deliverables] = await Promise.all([
    findCurrentStudentProject(profile.id),
    getStudentDeliverables(profile.id),
  ]);
  const latest = deliverables.at(0);
  const submittedCount = deliverables.filter((item) =>
    ["submitted", "resubmitted", "under_review"].includes(item.status),
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          project ? (
            <Button asChild>
              <Link href="/dashboard/student/deliverables/new">
                <Plus />
                Nuevo entregable
              </Link>
            </Button>
          ) : (
            <Button disabled>
              <Plus />
              Nuevo entregable
            </Button>
          )
        }
        description="Guarda borradores, adjunta evidencia y envia entregables vinculados a tu proyecto y cursos."
        eyebrow="Alumno"
        title="Entregables"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          detail="Borradores y enviados"
          icon={FileText}
          title="Total"
          value={String(deliverables.length)}
        />
        <MetricCard
          detail="Listos para revision futura"
          icon={FileText}
          title="Enviados"
          value={String(submittedCount)}
          tone="info"
        />
        <MetricCard
          detail={latest?.title ?? "Sin entregables todavia"}
          icon={FileText}
          title="Ultimo avance"
          value={latest ? `v${latest.version}` : "--"}
          tone="success"
        />
      </div>

      {!project ? (
        <Card className="glass-panel rounded-lg">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">Primero registra tu proyecto</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Los entregables siempre se conectan a un proyecto real.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/student/project/edit">Crear proyecto</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card className="glass-panel rounded-lg">
        <CardContent className="p-5">
          <StudentDeliverablesTable deliverables={deliverables} />
        </CardContent>
      </Card>
    </div>
  );
}
