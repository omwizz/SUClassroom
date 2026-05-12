import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { RoleBadge } from "@/components/shared/role-badge";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/server/guards/role-guard";
import { getProfiles } from "@/server/queries/profiles";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireRole(["admin"]);
  const profiles = await getProfiles();
  const students = profiles.filter((profile) =>
    profile.roles.includes("student"),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Consulta perfiles base y abre el progreso individual para desbloqueos manuales."
        title="Usuarios"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          detail="Perfiles registrados"
          icon={Users}
          title="Total"
          value={String(profiles.length)}
        />
        <MetricCard
          detail="Con rol alumno"
          icon={Users}
          title="Alumnos"
          value={String(students.length)}
          tone="info"
        />
        <MetricCard
          detail="Activos en la plataforma"
          icon={Users}
          title="Activos"
          value={String(profiles.filter((item) => item.status === "active").length)}
          tone="success"
        />
      </div>

      <SectionCard
        description="La gestion avanzada de usuarios queda fuera de esta fase; aqui se habilita el acceso a progreso."
        title="Listado"
      >
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol activo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Progreso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.fullName ?? "Sin nombre"}
                  </TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>
                    <RoleBadge role={profile.activeRole} />
                  </TableCell>
                  <TableCell>{profile.status}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/admin/users/${profile.id}/progress`}>
                        Ver progreso
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}
