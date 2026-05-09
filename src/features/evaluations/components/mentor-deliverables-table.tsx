import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";
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
import { ReviewStatusBadge } from "@/features/evaluations/components/review-status-badge";
import type { MentorDeliverable } from "@/types/evaluations";

export function MentorDeliverablesTable({
  deliverables,
}: {
  deliverables: MentorDeliverable[];
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
            <TableHead>Revision</TableHead>
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
                    {deliverable.project?.name ?? "Proyecto"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-4 text-primary" />
                    <div>
                      <p className="text-sm">
                        {deliverable.student?.fullName ?? "Alumno"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deliverable.student?.email ?? "Sin email"}
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
                <TableCell>
                  {deliverable.latestEvaluation ? (
                    <ReviewStatusBadge status={deliverable.latestEvaluation.status} />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Sin iniciar
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/dashboard/mentor/deliverables/${deliverable.id}`}>
                      Revisar
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
                No hay entregables asignados para revision.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
