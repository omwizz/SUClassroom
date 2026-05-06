"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  LESSON_TYPE_LABELS,
  LESSON_TYPES,
  VIDEO_PROVIDER_LABELS,
  VIDEO_PROVIDERS,
} from "@/constants/courses";
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
import { lessonSchema, type LessonInput } from "@/lib/validations/courses";
import { createLesson, updateLesson } from "@/server/actions/course-actions";
import type { Lesson } from "@/types/courses";

type LessonFormProps = {
  moduleId: string;
  lesson?: Lesson;
  nextSortOrder?: number;
};

function numberValue(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export function LessonForm({
  moduleId,
  lesson,
  nextSortOrder = 1,
}: LessonFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<LessonInput>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      moduleId,
      title: lesson?.title ?? "",
      slug: lesson?.slug ?? "",
      description: lesson?.description ?? "",
      content: lesson?.content ?? "",
      videoUrl: lesson?.videoUrl ?? "",
      videoProvider: lesson?.videoProvider ?? "none",
      estimatedDurationMinutes: lesson?.estimatedDurationMinutes ?? 0,
      lessonType: lesson?.lessonType ?? "mixed",
      sortOrder: lesson?.sortOrder ?? nextSortOrder,
      isPreview: lesson?.isPreview ?? false,
      isRequired: lesson?.isRequired ?? true,
    },
  });

  function onSubmit(values: LessonInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = lesson
        ? await updateLesson({ ...values, id: lesson.id })
        : await createLesson(values);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      setSuccess(result.message);
      router.refresh();

      if (!lesson) {
        form.reset({
          moduleId,
          title: "",
          slug: "",
          description: "",
          content: "",
          videoUrl: "",
          videoProvider: "none",
          estimatedDurationMinutes: 0,
          lessonType: "mixed",
          sortOrder: nextSortOrder + 1,
          isPreview: false,
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
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título de lección</FormLabel>
                <FormControl>
                  <Input placeholder="Nueva lección" {...field} />
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
            name="lessonType"
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
                    {LESSON_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {LESSON_TYPE_LABELS[type]}
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
            name="videoProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor de video</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Video" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VIDEO_PROVIDERS.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {VIDEO_PROVIDER_LABELS[provider]}
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
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de video</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="estimatedDurationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutos</FormLabel>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="isPreview"
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
                <FormLabel className="m-0">Vista previa</FormLabel>
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
                <FormLabel className="m-0">Requerida</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} size="sm" type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {lesson ? "Guardar lección" : "Crear lección"}
        </Button>
      </form>
    </Form>
  );
}

