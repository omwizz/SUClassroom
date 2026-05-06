"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { RESOURCE_TYPE_LABELS, RESOURCE_TYPES } from "@/constants/courses";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import {
  lessonResourceSchema,
  type LessonResourceInput,
} from "@/lib/validations/courses";
import {
  createLessonResource,
  updateLessonResource,
} from "@/server/actions/course-actions";
import type { LessonResource } from "@/types/courses";

type LessonResourceFormProps = {
  lessonId: string;
  resource?: LessonResource;
  nextSortOrder?: number;
};

function numberValue(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export function LessonResourceForm({
  lessonId,
  resource,
  nextSortOrder = 1,
}: LessonResourceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<LessonResourceInput>({
    resolver: zodResolver(lessonResourceSchema),
    defaultValues: {
      lessonId,
      title: resource?.title ?? "",
      description: resource?.description ?? "",
      resourceType: resource?.resourceType ?? "other",
      fileUrl: resource?.fileUrl ?? "",
      externalUrl: resource?.externalUrl ?? "",
      sortOrder: resource?.sortOrder ?? nextSortOrder,
      isDownloadable: resource?.isDownloadable ?? true,
    },
  });

  function onSubmit(values: LessonResourceInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = resource
        ? await updateLessonResource({ ...values, id: resource.id })
        : await createLessonResource(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      router.refresh();

      if (!resource) {
        form.reset({
          lessonId,
          title: "",
          description: "",
          resourceType: "other",
          fileUrl: "",
          externalUrl: "",
          sortOrder: nextSortOrder + 1,
          isDownloadable: true,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={form.formState.errors.root?.message} />
        <FormSuccess message={success} />
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del recurso</FormLabel>
                <FormControl>
                  <Input placeholder="Plantilla, guía o enlace" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resourceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RESOURCE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {RESOURCE_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="externalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL externa</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de archivo</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orden</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    onChange={(event) =>
                      field.onChange(numberValue(event.target.valueAsNumber))
                    }
                    type="number"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDownloadable"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
                <FormControl>
                  <input
                    checked={field.value}
                    className="size-4 accent-primary"
                    onChange={(event) => field.onChange(event.target.checked)}
                    type="checkbox"
                  />
                </FormControl>
                <FormLabel className="m-0">Descargable</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} size="sm" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {resource ? "Guardar recurso" : "Crear recurso"}
        </Button>
      </form>
    </Form>
  );
}

