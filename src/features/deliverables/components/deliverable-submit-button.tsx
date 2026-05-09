import { SubmitConfirmationDialog } from "@/features/deliverables/components/submit-confirmation-dialog";
import type { DeliverableStatus } from "@/constants/deliverables";

export function DeliverableSubmitButton({
  deliverableId,
  status,
  disabled,
}: {
  deliverableId: string;
  status: DeliverableStatus;
  disabled?: boolean;
}) {
  const mode =
    status === "changes_requested" || status === "rejected"
      ? "resubmit"
      : "submit";

  return (
    <SubmitConfirmationDialog
      deliverableId={deliverableId}
      disabled={disabled}
      mode={mode}
    />
  );
}

