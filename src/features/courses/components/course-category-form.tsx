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
  courseCategorySchema,
  type CourseCategoryInput,
} from "@/lib/validations/courses";
import {
  createCourseCategory,
  updateCourseCategory,
} from "@/server/actions/course-actions";
import type { CourseCategory } from "@/types/courses";

type CourseCategoryFormProps = {
  category?: CourseCategory;
};

export function CourseCategoryForm({ category }: CourseCategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<CourseCategoryInput>({
    resolver: zodResolver(courseCategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      color: category?.color ?? "",
      icon: category?.icon ?? "",
      isActive: category?.isActive ?? true,
    },
  });

  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: CourseCategoryInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = category
        ? await updateCourseCategory({ ...values, id: category.id })
        : await createCourseCategory(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      router.refresh();

      if (!category) {
        form.reset({
          name: "",
          slug: "",
          description: "",
          color: "",
          icon: "",
          isActive: true,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={serverError} />
        <FormSuccess message={success} />
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Categoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="se-genera-si-lo-dejas-vacio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="#38bdf8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icono</FormLabel>
                <FormControl>
                  <Input placeholder="Lightbulb" {...field} />
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
          name="isActive"
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
              <FormLabel className="m-0">Categoría activa</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {category ? "Guardar categoría" : "Crear categoría"}
        </Button>
      </form>
    </Form>
  );
}

