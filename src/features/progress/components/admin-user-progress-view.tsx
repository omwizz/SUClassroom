import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COURSE_PROGRESS_STATUS_LABELS } from "@/constants/progress";
import { CourseProgressBar } from "@/features/progress/components/course-progress-bar";
import { ManualUnlockButton } from "@/features/progress/components/manual-unlock-button";
import type { Profile } from "@/types/auth";
import type { CourseProgressItem } from "@/types/progress";

type AdminUserProgressViewProps = {
  profile: Profile;
  items: CourseProgressItem[];
};

export function AdminUserProgressView({
  profile,
  items,
}: AdminUserProgressViewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Avance</TableHead>
            <TableHead>Regla</TableHead>
            <TableHead className="text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.course.id}>
              <TableCell className="font-medium">{item.course.title}</TableCell>
              <TableCell>
                <Badge variant={item.status === "locked" ? "outline" : "secondary"}>
                  {COURSE_PROGRESS_STATUS_LABELS[item.status]}
                </Badge>
              </TableCell>
              <TableCell className="min-w-48">
                <CourseProgressBar
                  label={`${item.completedLessons}/${item.totalRequiredLessons} lecciones`}
                  value={item.progressPercentage}
                />
              </TableCell>
              <TableCell className="max-w-72 text-sm text-muted-foreground">
                {item.unlockState.message}
              </TableCell>
              <TableCell className="text-right">
                <ManualUnlockButton
                  courseId={item.course.id}
                  disabled={item.status !== "locked"}
                  studentId={profile.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
