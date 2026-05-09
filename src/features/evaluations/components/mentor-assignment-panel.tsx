"use client";

import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { assignMentorToDeliverable } from "@/server/actions/evaluation-actions";
import type { Profile } from "@/types/auth";
import type { AdminDeliverable } from "@/types/deliverables";
import type {
  EvaluationActionState,
  MentorAssignmentDetail,
} from "@/types/evaluations";

type MentorAssignmentPanelProps = {
  mentors: Profile[];
  deliverables: AdminDeliverable[];
  assignments: MentorAssignmentDetail[];
};

export function MentorAssignmentPanel({
  mentors,
  deliverables,
  assignments,
}: MentorAssignmentPanelProps) {
  const [state, setState] = useState<EvaluationActionState | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await assignMentorToDeliverable({
        mentorId: String(formData.get("mentorId") ?? ""),
        deliverableId: String(formData.get("deliverableId") ?? ""),
      });
      setState(result);
    });
  }

  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" />
          Asignar mentor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form action={onSubmit} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <div className="grid gap-2">
            <Label htmlFor="mentorId">Mentor</Label>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              id="mentorId"
              name="mentorId"
              required
            >
              <option value="">Selecciona mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.fullName ?? mentor.email}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deliverableId">Entregable</Label>
            <select
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              id="deliverableId"
              name="deliverableId"
              required
            >
              <option value="">Selecciona entregable</option>
              {deliverables.map((deliverable) => (
                <option key={deliverable.id} value={deliverable.id}>
                  {deliverable.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button disabled={pending} type="submit">
              <UserPlus />
              Asignar
            </Button>
          </div>
        </form>

        {state ? (
          <p
            className={
              state.ok
                ? "rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300"
                : "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            }
          >
            {state.message}
          </p>
        ) : null}

        <div className="space-y-2">
          <p className="text-sm font-medium">Asignaciones recientes</p>
          {assignments.length > 0 ? (
            assignments.slice(0, 8).map((assignment) => (
              <div
                className="rounded-lg border border-border bg-muted/20 p-3 text-sm"
                key={assignment.id}
              >
                <p className="font-medium">
                  {assignment.mentor?.fullName ?? "Mentor"}
                  {" -> "}
                  {assignment.student?.fullName ?? "Alumno"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {assignment.project?.name ?? "Todos sus proyectos"} /{" "}
                  {assignment.course?.title ?? "Todos sus cursos"}
                </p>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
              Todavia no hay asignaciones registradas.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
