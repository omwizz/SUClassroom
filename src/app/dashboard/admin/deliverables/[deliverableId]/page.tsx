import { notFound } from "next/navigation";
import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliverableDetailView } from "@/features/deliverables/components/deliverable-detail-view";
import { requireRole } from "@/server/guards/role-guard";
import { getAdminDeliverableById } from "@/server/queries/deliverables";

export const dynamic = "force-dynamic";

type AdminDeliverableDetailPageProps = {
  params: Promise<{ deliverableId: string }>;
};

export default async function AdminDeliverableDetailPage({
  params,
}: AdminDeliverableDetailPageProps) {
  await requireRole(["admin"]);
  const { deliverableId } = await params;
  const deliverable = await getAdminDeliverableById(deliverableId);

  if (!deliverable) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/dashboard/admin/deliverables/${deliverable.id}/review`}>
            <ClipboardCheck />
            Revisar entregable
          </Link>
        </Button>
      </div>
      <DeliverableDetailView adminView deliverable={deliverable} />
    </div>
  );
}
