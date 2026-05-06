"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import {
  courseModuleSchema,
  type CourseModuleInput,
} from "@/lib/validations/courses";
import {
  createCourseModule,
  updateCourseModule,
} from "@/server/actions/course-actions";
import type { CourseModule } from "@/types/courses";

type CourseModuleFormProps = {
  courseId: string;
  moduleItem?: CourseModule;
  nextSortOrder?: number;
};

function numberValue(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export function CourseModuleForm({
  courseId,
  moduleItem,
  nextSortOrder = 1,
}: CourseModuleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<CourseModuleInput>({
    resolver: zodResolver(courseModuleSchema),
    defaultValues: {
      courseId,
      title: moduleItem?.title ?? "",
      description: moduleItem?.description ?? "",
      sortOrder: moduleItem?.sortOrder ?? nextSortOrder,
      isRequired: moduleItem?.isRequired ?? true,
    },
  });

  function onSubmit(values: CourseModuleInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = moduleItem
        ? await updateCourseModule({ ...values, id: moduleItem.id })
        : await createCourseModule(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      router.refresh();

      if (!moduleItem) {
        form.reset({
          courseId,
          title: "",
          description: "",
          sortOrder: nextSortOrder + 1,
          isRequired: true,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={form.formState.errors.root?.message} />
        <FormSuccess message={success} />
        <div className="grid gap-3 md:grid-cols-[1fr_120px]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del módulo</FormLabel>
                <FormControl>
                  <Input placeholder="Nuevo módulo" {...field} />
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
        <FormField
          control={form.control}
          name="isRequired"
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
              <FormLabel className="m-0">Módulo requerido</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} size="sm" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {moduleItem ? "Guardar módulo" : "Crear módulo"}
        </Button>
      </form>
    </Form>
  );
}

