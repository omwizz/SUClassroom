import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCourseUnlockRuleFromForm } from "@/server/actions/progress-actions";
import type { Course } from "@/types/courses";

type CourseUnlockRulesFormProps = {
  courses: Course[];
};

export function CourseUnlockRulesForm({ courses }: CourseUnlockRulesFormProps) {
  return (
    <form action={saveCourseUnlockRuleFromForm} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="courseId">Curso a desbloquear</Label>
        <select
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          id="courseId"
          name="courseId"
          required
        >
          <option value="">Selecciona un curso</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredPreviousCourseId">Curso previo requerido</Label>
        <select
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          id="requiredPreviousCourseId"
          name="requiredPreviousCourseId"
        >
          <option value="">Sin curso previo</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortOrder">Orden</Label>
        <Input defaultValue={0} id="sortOrder" min={0} name="sortOrder" type="number" />
      </div>

      <div className="grid gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input defaultChecked name="requiresApprovedDeliverable" type="checkbox" />
          Requiere entregable aprobado
        </label>
        <label className="flex items-center gap-2">
          <input name="requiresPayment" type="checkbox" />
          Preparar regla de pago futuro
        </label>
        <label className="flex items-center gap-2">
          <input name="requiresMentorship" type="checkbox" />
          Preparar regla de mentoria futura
        </label>
      </div>

      <div className="md:col-span-2">
        <Button type="submit">
          <Save aria-hidden="true" />
          Guardar regla
        </Button>
      </div>
    </form>
  );
}
