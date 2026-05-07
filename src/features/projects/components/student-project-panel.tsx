import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentProject } from "@/types/projects";
import { ProjectSummaryCard } from "@/features/projects/components/project-summary-card";

type StudentProjectPanelProps = {
  project: StudentProject | null;
};

export function StudentProjectPanel({ project }: StudentProjectPanelProps) {
  if (!project) {
    return (
      <Card className="glass-panel rounded-lg">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Aun no registras proyecto</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Crea tu ficha base para que el dashboard pueda conectar cursos y
              pasos sugeridos con tu contexto real.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/student/project/edit">
              <Plus />
              Crear proyecto
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <ProjectSummaryCard project={project} showAction={false} />
      <Button asChild variant="secondary">
        <Link href="/dashboard/student/project/edit">
          <Pencil />
          Editar proyecto
        </Link>
      </Button>
    </div>
  );
}

