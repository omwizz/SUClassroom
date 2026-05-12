import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import type { CourseUnlockState } from "@/types/progress";
import { CourseUnlockService } from "@/server/services/course-unlock-service";

type UnlockReasonCardProps = {
  state: CourseUnlockState;
};

export function UnlockReasonCard({ state }: UnlockReasonCardProps) {
  const Icon = state.isUnlocked ? UnlockKeyhole : LockKeyhole;

  return (
    <SectionCard
      description={state.message}
      title={state.isUnlocked ? "Acceso disponible" : "Acceso bloqueado"}
    >
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
        <Icon className="size-5 text-primary" />
        <div>
          <p className="font-medium">
            {CourseUnlockService.labelForReason(state.reason)}
          </p>
          <p className="text-sm text-muted-foreground">
            {state.rule?.requiresPayment
              ? "Preparado para integrar pago mas adelante."
              : state.rule?.requiresMentorship
                ? "Preparado para integrar mentoria mas adelante."
                : "Regla evaluada con el progreso actual."}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
