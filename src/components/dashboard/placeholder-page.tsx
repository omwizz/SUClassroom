import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/dashboard/page-header";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        actions={<StatusBadge status="Próxima fase" />}
        description={description}
        title={title}
      />
      <EmptyState
        description="Esta ruta queda creada para mantener la navegación completa. La funcionalidad se conectará en su fase correspondiente."
        title="Preparado para próxima fase"
      />
      <Badge variant="outline">Sin datos reales todavía</Badge>
    </div>
  );
}
