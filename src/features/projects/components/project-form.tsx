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
  BUSINESS_AREA_LABELS,
  BUSINESS_AREAS,
  PROJECT_STAGE_LABELS,
  PROJECT_STAGES,
} from "@/constants/projects";
import {
  studentProjectSchema,
  type StudentProjectInput,
} from "@/lib/validations/projects";
import {
  createStudentProject,
  updateStudentProject,
} from "@/server/actions/project-actions";
import type { StudentProject } from "@/types/projects";

type ProjectFormProps = {
  project?: StudentProject | null;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<StudentProjectInput>({
    resolver: zodResolver(studentProjectSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      problem: project?.problem ?? "",
      solution: project?.solution ?? "",
      targetAudience: project?.targetAudience ?? "",
      currentStage: project?.currentStage ?? "idea",
      businessArea: project?.businessArea ?? "validation",
      socialImpact: project?.socialImpact ?? "",
    },
  });

  const serverError = form.formState.errors.root?.message;

  function onSubmit(values: StudentProjectInput) {
    form.clearErrors("root");
    setSuccess(null);

    startTransition(async () => {
      const result = project
        ? await updateStudentProject({ ...values, id: project.id })
        : await createStudentProject(values);

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del proyecto</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre corto y claro" {...field} />
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
                <FormLabel>Publico objetivo</FormLabel>
                <FormControl>
                  <Input placeholder="A quien atiende o ayuda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etapa actual</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona etapa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {PROJECT_STAGE_LABELS[stage]}
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
            name="businessArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area de enfoque</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_AREAS.map((area) => (
                      <SelectItem key={area} value={area}>
                        {BUSINESS_AREA_LABELS[area]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Que hace tu proyecto y por que importa"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problema</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Que problema concreto quieres resolver"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solucion propuesta</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Como imaginas resolverlo"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="socialImpact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impacto social o resultado esperado</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cambio que esperas generar si el proyecto avanza"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button asChild type="button" variant="ghost">
            <Link href="/dashboard/student/project">
              <ArrowLeft />
              Volver
            </Link>
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : <Save />}
            {project ? "Guardar proyecto" : "Crear proyecto"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

