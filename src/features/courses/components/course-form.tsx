"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { COURSE_LEVEL_LABELS, COURSE_LEVELS, COURSE_STATUS_LABELS, COURSE_STATUSES } from "@/constants/courses";
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
import { courseSchema, type CourseInput } from "@/lib/validations/courses";
import { createCourse, updateCourse } from "@/server/actions/course-actions";
import type { Course, CourseCategory } from "@/types/courses";

type CourseFormProps = {
  categories: CourseCategory[];
  course?: Course;
};

function numberValue(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export function CourseForm({ categories, course }: CourseFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      categoryId: course?.categoryId ?? "",
      title: course?.title ?? "",
      slug: course?.slug ?? "",
      subtitle: course?.subtitle ?? "",
      description: course?.description ?? "",
      objective: course?.objective ?? "",
      expectedResult: course?.expectedResult ?? "",
      targetAudience: course?.targetAudience ?? "",
      level: course?.level ?? "beginner",
      status: course?.status ?? "draft",
      thumbnailUrl: course?.thumbnailUrl ?? "",
      estimatedDurationMinutes: course?.estimatedDurationMinutes ?? 0,
      isFree: course?.isFree ?? true,
      sortOrder: course?.sortOrder ?? 0,
    },
  });

  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: CourseInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = course
        ? await updateCourse({ ...values, id: course.id })
        : await createCourse(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      router.refresh();

      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={serverError} />
        <FormSuccess message={success} />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre visible del curso" {...field} />
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? "" : value)
                  }
                  value={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Sin categoría</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtítulo</FormLabel>
                <FormControl>
                  <Input placeholder="Promesa corta del curso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nivel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COURSE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {COURSE_LEVEL_LABELS[level]}
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COURSE_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {COURSE_STATUS_LABELS[status]}
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
            name="estimatedDurationMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración estimada</FormLabel>
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
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen o miniatura</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expectedResult"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resultado esperado</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Público objetivo</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isFree"
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
              <FormLabel className="m-0">Curso gratuito o demo</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {course ? "Guardar curso" : "Crear curso"}
        </Button>
      </form>
    </Form>
  );
}

