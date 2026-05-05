import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const flowSteps = [
  { label: "Aprender", icon: GraduationCap },
  { label: "Aplicar", icon: Target },
  { label: "Entregar", icon: FileText },
  { label: "Feedback", icon: MessageSquareText },
  { label: "Avanzar", icon: CheckCircle2 },
];

const benefits = [
  {
    title: "Rutas guiadas por ejecución",
    description:
      "Cada módulo empuja una acción concreta para que el usuario construya algo real.",
    icon: Target,
  },
  {
    title: "Entregables con criterio",
    description:
      "Los cursos no terminan por mirar contenido, sino por presentar evidencia revisable.",
    icon: ClipboardCheck,
  },
  {
    title: "Roles preparados desde el inicio",
    description:
      "Alumno, mentor, admin e institución tienen un punto de entrada claro para crecer por fases.",
    icon: ShieldCheck,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[92dvh] px-4 py-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.13_0.035_252),oklch(0.1_0.035_255))]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-full opacity-35 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-base font-semibold">SUClassroom</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                Crear cuenta
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-12 pt-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:items-center lg:pt-24">
          <div>
            <Badge className="mb-5" variant="secondary">
              <Sparkles className="size-3.5" />
              MVP base: auth, roles y dashboards
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              SUClassroom
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Plataforma e-learning para transformar conocimiento en proyectos
              reales mediante entregables, feedback y avance validado.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Empezar ejecución guiada
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">Entrar a mi panel</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-5">
              {flowSteps.map((step) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-3"
                  key={step.label}
                >
                  <step.icon className="mb-3 size-4 text-primary" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-[660px]">
            <div className="absolute inset-0 rounded-lg border border-white/10 bg-black/20 shadow-2xl shadow-black/40" />
            <div className="absolute inset-4 grid grid-cols-[190px_1fr] gap-4 rounded-lg border border-white/10 bg-card/70 p-4 backdrop-blur-xl max-sm:grid-cols-1">
              <aside className="hidden rounded-lg border border-white/10 bg-sidebar/80 p-4 sm:block">
                <div className="mb-8 flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap className="size-4" />
                  </span>
                  <span className="text-sm font-semibold">SU Panel</span>
                </div>
                {["Progreso", "Cursos", "Proyecto", "Feedback", "Perfil"].map(
                  (item, index) => (
                    <div
                      className={`mb-2 rounded-md px-3 py-2 text-sm ${
                        index === 0
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground"
                      }`}
                      key={item}
                    >
                      {item}
                    </div>
                  ),
                )}
              </aside>

              <div className="flex min-w-0 flex-col gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Bienvenida, Alumna
                      </p>
                      <h2 className="text-2xl font-semibold">
                        Tu siguiente entrega
                      </h2>
                    </div>
                    <Badge>En progreso</Badge>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-muted">
                    <div className="h-2 w-[64%] rounded-full bg-primary" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ["64%", "avance"],
                    ["1", "entregable"],
                    ["24h", "feedback"],
                  ].map(([value, label]) => (
                    <div
                      className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                      key={label}
                    >
                      <p className="font-mono text-3xl font-semibold">
                        {value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid flex-1 gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Ruta de ejecución</h3>
                      <Badge variant="secondary">Fase 1</Badge>
                    </div>
                    {[
                      "Definir problema",
                      "Validar propuesta",
                      "Enviar evidencia",
                      "Aplicar correcciones",
                    ].map((item, index) => (
                      <div
                        className="flex items-center gap-3 border-t border-white/10 py-3 text-sm"
                        key={item}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            index < 2 ? "bg-chart-2" : "bg-muted-foreground"
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <h3 className="font-semibold">Feedback mentor</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Mejora la evidencia y vuelve a enviar cuando tu hipótesis
                      esté más clara.
                    </p>
                    <Button className="mt-5 w-full" variant="secondary">
                      Ver feedback
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Base funcional
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              La plataforma nace preparada para crecer por fases.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                className="rounded-lg border border-white/10 bg-card/70 p-5"
                key={benefit.title}
              >
                <benefit.icon className="mb-5 size-5 text-primary" />
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
