"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  deliverableLinkSchema,
  type DeliverableLinkInput,
} from "@/lib/validations/deliverables";
import { addDeliverableLink } from "@/server/actions/deliverable-actions";

export function DeliverableLinkForm({
  deliverableId,
  disabled,
}: {
  deliverableId: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<DeliverableLinkInput>({
    resolver: zodResolver(deliverableLinkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });
  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: DeliverableLinkInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = await addDeliverableLink(deliverableId, values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={serverError} />
        <FormSuccess message={success} />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo del enlace</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Ej. Encuesta validada" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion opcional</FormLabel>
              <FormControl>
                <Textarea disabled={disabled} rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled || isPending} type="submit" variant="secondary">
          {isPending ? <Loader2 className="animate-spin" /> : <Link2 />}
          Agregar enlace
        </Button>
      </form>
    </Form>
  );
}

