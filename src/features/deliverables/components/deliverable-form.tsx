"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  deliverableSchema,
  type DeliverableInput,
} from "@/lib/validations/deliverables";
import {
  createDeliverableDraft,
  updateDeliverableDraft,
} from "@/server/actions/deliverable-actions";
import type { Course } from "@/types/courses";
import type { DeliverableDetail } from "@/types/deliverables";
import type { StudentProject } from "@/types/projects";

type DeliverableFormProps = {
  project: StudentProject;
  courses: Course[];
  deliverable?: DeliverableDetail | null;
  selectedCourseId?: string;
};

export function DeliverableForm({
  project,
  courses,
  deliverable,
  selectedCourseId,
}: DeliverableFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const defaultCourseId =
    deliverable?.courseId ?? selectedCourseId ?? courses.at(0)?.id ?? "";
  const form = useForm<DeliverableInput>({
    resolver: zodResolver(deliverableSchema),
    defaultValues: {
      projectId: project.id,
      courseId: defaultCourseId,
      title: deliverable?.title ?? "",
      description: deliverable?.description ?? "",
      links: [],
    },
  });
  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: DeliverableInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = deliverable
        ? await updateDeliverableDraft({ ...values, id: deliverable.id })
        : await createDeliverableDraft(values);

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

  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
        Publica al menos un curso antes de crear entregables.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={serverError} />
        <FormSuccess message={success} />

        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso asociado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo del entregable</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Evidencia de validacion inicial"
                  {...field}
                />
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
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Resume que trabajaste, que decisiones tomaste y que evidencia estas adjuntando."
                  rows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm">
          <p className="font-medium">{project.name}</p>
          <p className="mt-1 line-clamp-2 text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button asChild type="button" variant="ghost">
            <Link href="/dashboard/student/deliverables">
              <ArrowLeft />
              Volver
            </Link>
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : <Save />}
            {deliverable ? "Guardar borrador" : "Crear borrador"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

