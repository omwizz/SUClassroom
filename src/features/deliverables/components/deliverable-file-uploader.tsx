"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDeliverableFile } from "@/server/actions/deliverable-actions";

export function DeliverableFileUploader({
  deliverableId,
  disabled,
}: {
  deliverableId: string;
  disabled?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await addDeliverableFile(formData);

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);
      formRef.current?.reset();
    });
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit} ref={formRef}>
      <input name="deliverableId" type="hidden" value={deliverableId} />
      <FormError message={error} />
      <FormSuccess message={success} />
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4">
        <Input
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
          disabled={disabled || isPending}
          name="file"
          type="file"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          PDF, Word, PowerPoint, Excel o imagen. Maximo 10 MB.
        </p>
      </div>
      <Button disabled={disabled || isPending} type="submit" variant="secondary">
        {isPending ? <Loader2 className="animate-spin" /> : <UploadCloud />}
        Adjuntar archivo
      </Button>
    </form>
  );
}

