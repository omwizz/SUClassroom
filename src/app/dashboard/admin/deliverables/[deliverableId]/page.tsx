import { notFound } from "next/navigation";
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

  return <DeliverableDetailView adminView deliverable={deliverable} />;
}

