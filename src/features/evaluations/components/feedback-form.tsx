import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FEEDBACK_PRIORITY_LABELS, FEEDBACK_PRIORITIES } from "@/constants/evaluations";

export function FeedbackForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="summary">Resumen del feedback</Label>
        <Textarea
          id="summary"
          name="summary"
          placeholder="Explica el resultado principal de la revision."
          required
          rows={3}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="strengths">Fortalezas</Label>
        <Textarea
          id="strengths"
          name="strengths"
          placeholder="Que esta funcionando bien en la evidencia."
          rows={3}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="improvements">Mejoras necesarias</Label>
        <Textarea
          id="improvements"
          name="improvements"
          placeholder="Que debe corregir o profundizar."
          rows={3}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nextSteps">Siguientes pasos</Label>
        <Textarea
          id="nextSteps"
          name="nextSteps"
          placeholder="Indica acciones concretas para avanzar."
          required
          rows={3}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-[180px_1fr]">
        <div className="grid gap-2">
          <Label htmlFor="priority">Prioridad</Label>
          <select
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            defaultValue="medium"
            id="priority"
            name="priority"
          >
            {FEEDBACK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {FEEDBACK_PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 text-sm">
          <input defaultChecked name="isVisibleToStudent" type="checkbox" />
          Visible para el alumno
        </label>
      </div>
    </div>
  );
}
