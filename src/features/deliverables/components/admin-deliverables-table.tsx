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
import { DeliverableStatusBadge } from "@/features/deliverables/components/deliverable-status-badge";
import type { AdminDeliverable } from "@/types/deliverables";

export function AdminDeliverablesTable({
  deliverables,
}: {
  deliverables: AdminDeliverable[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entregable</TableHead>
            <TableHead>Alumno</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Evidencia</TableHead>
            <TableHead className="text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliverables.length > 0 ? (
            deliverables.map((deliverable) => (
              <TableRow key={deliverable.id}>
                <TableCell>
                  <p className="font-medium">{deliverable.title}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {deliverable.project?.name ?? "Sin proyecto"}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-sm">
                    {deliverable.student?.fullName ?? "Sin nombre"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {deliverable.student?.email ?? "Sin email"}
                  </p>
                </TableCell>
                <TableCell className="text-sm">
                  {deliverable.course?.title ?? "Sin curso"}
                </TableCell>
                <TableCell>
                  <DeliverableStatusBadge status={deliverable.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {deliverable.filesCount} archivos · {deliverable.linksCount} links
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/dashboard/admin/deliverables/${deliverable.id}`}>
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
                No hay entregables para mostrar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

