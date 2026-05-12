import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Course } from "@/types/courses";
import type { CourseUnlockRule } from "@/types/progress";

type CourseUnlockRulesTableProps = {
  courses: Course[];
  rules: CourseUnlockRule[];
};

export function CourseUnlockRulesTable({
  courses,
  rules,
}: CourseUnlockRulesTableProps) {
  const getCourseTitle = (courseId: string | null) =>
    courses.find((course) => course.id === courseId)?.title ?? "Sin curso";

  if (rules.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
        Aun no hay reglas creadas.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Curso previo</TableHead>
            <TableHead>Condiciones</TableHead>
            <TableHead>Orden</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">
                {getCourseTitle(rule.courseId)}
              </TableCell>
              <TableCell>{getCourseTitle(rule.requiredPreviousCourseId)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {rule.requiresApprovedDeliverable ? (
                    <Badge variant="secondary">Entregable aprobado</Badge>
                  ) : null}
                  {rule.requiresPayment ? (
                    <Badge variant="outline">Pago futuro</Badge>
                  ) : null}
                  {rule.requiresMentorship ? (
                    <Badge variant="outline">Mentoria futura</Badge>
                  ) : null}
                </div>
              </TableCell>
              <TableCell>{rule.sortOrder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
