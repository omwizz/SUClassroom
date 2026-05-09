"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  resubmitDeliverable,
  submitDeliverable,
} from "@/server/actions/deliverable-actions";

type SubmitConfirmationDialogProps = {
  deliverableId: string;
  mode?: "submit" | "resubmit";
  disabled?: boolean;
};

export function SubmitConfirmationDialog({
  deliverableId,
  mode = "submit",
  disabled,
}: SubmitConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const label = mode === "resubmit" ? "Reenviar entregable" : "Enviar entregable";

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled}>
          <Send />
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{label}</AlertDialogTitle>
          <AlertDialogDescription>
            Al confirmar se registrara una version del entregable. Despues no
            podras editarlo libremente mientras este enviado o en revision.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              startTransition(async () => {
                const action =
                  mode === "resubmit" ? resubmitDeliverable : submitDeliverable;
                await action({ deliverableId, confirm: true });
                setOpen(false);
              });
            }}
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Send />}
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

