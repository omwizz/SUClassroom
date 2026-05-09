import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESOURCE_FILE_TYPE_LABELS } from "@/constants/deliverables";
import type { DeliverableRequirement } from "@/types/deliverables";

type DeliverableRequirementCardProps = {
  requirement: DeliverableRequirement | null;
};

export function DeliverableRequirementCard({
  requirement,
}: DeliverableRequirementCardProps) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ClipboardList className="size-4 text-primary" />
          Requisito del curso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {requirement ? (
          <>
            <div>
              <p className="font-medium">{requirement.title}</p>
              {requirement.description ? (
                <p className="mt-2 leading-6 text-muted-foreground">
                  {requirement.description}
                </p>
              ) : null}
            </div>
            <p className="leading-6 text-muted-foreground">
              {requirement.instructions}
            </p>
            <div className="flex flex-wrap gap-2">
              {requirement.requiredFileTypes.length > 0 ? (
                requirement.requiredFileTypes.map((type) => (
                  <Badge key={type} variant="outline">
                    {RESOURCE_FILE_TYPE_LABELS[type]}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">Archivos o enlaces</Badge>
              )}
              <Badge variant="outline">Max. {requirement.maxFiles} archivos</Badge>
            </div>
          </>
        ) : (
          <p className="leading-6 text-muted-foreground">
            Este curso todavia no tiene una consigna formal configurada. Puedes
            preparar evidencia del avance de tu proyecto con archivos o enlaces.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

