import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
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
import type { DeliverableDetail } from "@/types/deliverables";

export function StudentDeliverablesTable({
  deliverables,
}: {
  deliverables: DeliverableDetail[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entregable</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Version</TableHead>
            <TableHead className="text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliverables.length > 0 ? (
            deliverables.map((deliverable) => (
              <TableRow key={deliverable.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg border border-border bg-muted/30 p-2">
                      <FileText className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{deliverable.title}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {deliverable.project?.name ?? "Proyecto"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {deliverable.course?.title ?? "Curso"}
                </TableCell>
                <TableCell>
                  <DeliverableStatusBadge status={deliverable.status} />
                </TableCell>
                <TableCell>v{deliverable.version}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/dashboard/student/deliverables/${deliverable.id}`}>
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
                colSpan={5}
              >
                Todavia no tienes entregables. Crea un borrador para empezar a
                reunir evidencia.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

