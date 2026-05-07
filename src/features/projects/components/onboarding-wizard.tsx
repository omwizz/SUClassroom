"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Rocket } from "lucide-react";
import { useForm, type FieldPath } from "react-hook-form";
import { FormError } from "@/components/shared/form-error";
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
import {
  BUSINESS_AREA_LABELS,
  BUSINESS_AREAS,
  EXPERIENCE_LEVEL_LABELS,
  EXPERIENCE_LEVELS,
  PROJECT_STAGE_LABELS,
  PROJECT_STAGES,
  USER_TYPE_LABELS,
  USER_TYPES,
} from "@/constants/projects";
import {
  onboardingWizardSchema,
  type OnboardingWizardInput,
} from "@/lib/validations/projects";
import { completeStudentOnboarding } from "@/server/actions/project-actions";
import { OnboardingProgress } from "@/features/projects/components/onboarding-progress";
import { OnboardingStep } from "@/features/projects/components/onboarding-step";

const steps = ["Perfil", "Objetivo", "Proyecto", "Confirmar"];

const stepFields: Record<number, FieldPath<OnboardingWizardInput>[]> = {
  1: ["onboarding.userType", "onboarding.experienceLevel"],
  2: [
    "onboarding.mainGoal",
    "onboarding.businessArea",
    "onboarding.projectStage",
    "onboarding.biggestChallenge",
    "onboarding.motivation",
  ],
  3: [
    "project.name",
    "project.description",
    "project.problem",
    "project.solution",
    "project.targetAudience",
    "project.currentStage",
    "project.businessArea",
    "project.socialImpact",
  ],
  4: [],
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const form = useForm<OnboardingWizardInput>({
    resolver: zodResolver(onboardingWizardSchema),
    defaultValues: {
      onboarding: {
        userType: "entrepreneur",
        experienceLevel: "beginner",
        mainGoal: "",
        businessArea: "validation",
        projectStage: "idea",
        biggestChallenge: "",
        motivation: "",
      },
      project: {
        name: "",
        description: "",
        problem: "",
        solution: "",
        targetAudience: "",
        currentStage: "idea",
        businessArea: "validation",
        socialImpact: "",
      },
    },
  });

  const serverError = form.formState.errors.root?.message;
  const summaryValues = step === 4 ? form.getValues() : null;

  async function goNext() {
    const valid = await form.trigger(stepFields[step]);

    if (valid) {
      setStep((current) => Math.min(current + 1, steps.length));
    }
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function onSubmit(input: OnboardingWizardInput) {
    form.clearErrors("root");

    startTransition(async () => {
      const result = await completeStudentOnboarding(input);

      if (!result.ok) {
        form.setError("root", { message: result.message });
        return;
      }

      router.refresh();
      router.push(result.redirectTo ?? "/dashboard/student");
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <OnboardingProgress currentStep={step} steps={steps} />
        <FormError message={serverError} />

        {step === 1 ? (
          <OnboardingStep
            description="Ubicamos tu contexto para que el diagnostico sea util desde el primer ingreso."
            title="Cuentanos quien eres"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="onboarding.userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona perfil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {USER_TYPE_LABELS[type]}
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
                name="onboarding.experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiencia</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona nivel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {EXPERIENCE_LEVEL_LABELS[level]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </OnboardingStep>
        ) : null}

        {step === 2 ? (
          <OnboardingStep
            description="El diagnostico inicial recoge tu meta, enfoque y barreras actuales."
            title="Define tu objetivo"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="onboarding.businessArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area principal</FormLabel>
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
              <FormField
                control={form.control}
                name="onboarding.projectStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etapa del proyecto</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="onboarding.mainGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo principal</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Que quieres lograr con SUClassroom durante esta ruta"
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
                name="onboarding.biggestChallenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mayor desafio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Que esta frenando tu avance"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="onboarding.motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivacion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Por que este proyecto te importa"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </OnboardingStep>
        ) : null}

        {step === 3 ? (
          <OnboardingStep
            description="Registra una ficha simple. Los entregables formales vendran en otra fase."
            title="Registra tu proyecto"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="project.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del proyecto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project.targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publico objetivo</FormLabel>
                    <FormControl>
                      <Input placeholder="A quien atiendes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project.currentStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etapa</FormLabel>
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
                name="project.businessArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
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
              name="project.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Que hace tu proyecto"
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
                name="project.problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problema</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Problema real que quieres resolver"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project.solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solucion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Como piensas resolverlo"
                        rows={4}
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
              name="project.socialImpact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impacto esperado</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Que cambio positivo podria generar"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </OnboardingStep>
        ) : null}

        {step === 4 ? (
          <OnboardingStep
            description="Revisa la informacion antes de entrar al dashboard de alumno."
            title="Confirma tu punto de partida"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-xs uppercase text-muted-foreground">
                  Objetivo
                </p>
                <p className="mt-2 text-sm leading-6">
                  {summaryValues?.onboarding.mainGoal}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-xs uppercase text-muted-foreground">
                  Proyecto
                </p>
                <p className="mt-2 font-medium">{summaryValues?.project.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {summaryValues?.project.description}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-xs uppercase text-muted-foreground">
                  Etapa
                </p>
                <p className="mt-2 text-sm">
                  {summaryValues
                    ? PROJECT_STAGE_LABELS[summaryValues.project.currentStage]
                    : null}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-xs uppercase text-muted-foreground">
                  Area recomendada
                </p>
                <p className="mt-2 text-sm">
                  {summaryValues
                    ? BUSINESS_AREA_LABELS[summaryValues.project.businessArea]
                    : null}
                </p>
              </div>
            </div>
          </OnboardingStep>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
          <Button
            disabled={step === 1 || isPending}
            onClick={goBack}
            type="button"
            variant="ghost"
          >
            <ArrowLeft />
            Volver
          </Button>
          {step < steps.length ? (
            <Button disabled={isPending} onClick={goNext} type="button">
              Continuar
              <ArrowRight />
            </Button>
          ) : (
            <Button disabled={isPending} type="submit">
              {isPending ? <Loader2 className="animate-spin" /> : <Rocket />}
              Entrar al dashboard
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
