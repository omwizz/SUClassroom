import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  KanbanSquare,
  LayoutDashboard,
  MessageSquareText,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const workflow = [
  {
    label: "Diagnostico",
    detail: "Punto de partida",
    icon: Target,
    tone: "bg-primary text-primary-foreground",
  },
  {
    label: "Ruta",
    detail: "Lecciones ordenadas",
    icon: BookOpenCheck,
    tone: "bg-chart-4 text-white",
  },
  {
    label: "Proyecto",
    detail: "Evidencia real",
    icon: ClipboardCheck,
    tone: "bg-chart-2 text-white",
  },
  {
    label: "Avance",
    detail: "Siguiente accion",
    icon: TrendingUp,
    tone: "bg-foreground text-background",
  },
];

const boardColumns = [
  {
    title: "Aprender",
    items: ["Clase activa", "Recursos clave"],
    accent: "border-primary/20 bg-primary/5 text-primary",
  },
  {
    title: "Ejecutar",
    items: ["Proyecto alumno", "Tarea de campo"],
    accent: "border-chart-2/30 bg-chart-2/10 text-chart-2",
  },
  {
    title: "Revisar",
    items: ["Feedback mentor", "Mejora pendiente"],
    accent: "border-chart-4/30 bg-chart-4/10 text-chart-4",
  },
];

const benefits = [
  {
    title: "Claridad para decidir",
    description:
      "Cada pantalla prioriza lo que sigue: aprender, aplicar, entregar o corregir.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion de proyecto integrada",
    description:
      "El alumno ve su avance como una ruta de ejecucion, no como una lista pasiva de contenidos.",
    icon: KanbanSquare,
  },
  {
    title: "Estructura educativa",
    description:
      "Cursos, modulos y recursos mantienen orden sin perder el enfoque en resultados visibles.",
    icon: GraduationCap,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-foreground [--accent-foreground:oklch(0.2_0.06_180)] [--accent:oklch(0.92_0.055_170)] [--background:oklch(1_0_0)] [--border:oklch(0.89_0.02_245)] [--card-foreground:oklch(0.19_0.025_250)] [--card:oklch(1_0_0)] [--chart-2:oklch(0.66_0.16_165)] [--chart-4:oklch(0.65_0.16_315)] [--foreground:oklch(0.19_0.025_250)] [--input:oklch(0.89_0.02_245)] [--muted-foreground:oklch(0.46_0.035_250)] [--muted:oklch(0.95_0.02_245)] [--popover-foreground:oklch(0.19_0.025_250)] [--popover:oklch(1_0_0)] [--primary-foreground:oklch(1_0_0)] [--primary:oklch(0.59_0.18_252)] [--ring:oklch(0.62_0.17_252)] [--secondary-foreground:oklch(0.22_0.04_250)] [--secondary:oklch(0.95_0.02_245)]">
      <section className="relative min-h-[88dvh] overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(1_0_0),oklch(0.975_0.012_245)_55%,oklch(0.965_0.025_165))]" />
        <div className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(oklch(0.7_0.03_250/0.18)_1px,transparent_1px),linear-gradient(90deg,oklch(0.7_0.03_250/0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-[linear-gradient(90deg,oklch(0.62_0.18_252/0.16),oklch(0.68_0.16_165/0.14),oklch(0.65_0.16_315/0.14))]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-base font-semibold">SUClassroom</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                Crear cuenta
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </nav>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-0 top-24 -z-0 mx-auto max-w-7xl opacity-95"
        >
          <div className="absolute right-0 top-12 hidden h-[540px] w-[60%] rounded-lg border border-border/70 bg-white/78 p-4 shadow-2xl shadow-primary/10 backdrop-blur md:block">
            <div className="grid h-full grid-cols-[190px_1fr] gap-4">
              <div className="rounded-lg border border-border bg-white p-4">
                <div className="mb-5 flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap className="size-4" />
                  </span>
                  <span className="text-sm font-semibold">Panel</span>
                </div>
                {["Progreso", "Cursos", "Proyecto", "Feedback"].map(
                  (item, index) => (
                    <div
                      className={`mb-2 rounded-md px-3 py-2 text-sm ${
                        index === 0
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                      key={item}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="grid min-w-0 gap-4">
                <div className="rounded-lg border border-border bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Proyecto activo
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold">
                        Validar propuesta de valor
                      </h2>
                    </div>
                    <Badge className="bg-chart-2 text-white">64%</Badge>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-muted">
                    <div className="h-2 w-[64%] rounded-full bg-[linear-gradient(90deg,var(--primary),var(--chart-2),var(--chart-4))]" />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {boardColumns.map((column) => (
                    <div
                      className="rounded-lg border border-border bg-white p-3"
                      key={column.title}
                    >
                      <div
                        className={`mb-3 rounded-md border px-3 py-2 text-sm font-medium ${column.accent}`}
                      >
                        {column.title}
                      </div>
                      {column.items.map((item) => (
                        <div
                          className="mb-2 rounded-md border border-border bg-muted/35 px-3 py-2 text-sm text-muted-foreground"
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-lg border border-border bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 font-medium">
                      <CheckCircle2 className="size-4 text-chart-2" />
                      Siguiente accion
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Completa la evidencia, conecta tu aprendizaje con el
                      proyecto y solicita revision.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 font-medium">
                      <MessageSquareText className="size-4 text-chart-4" />
                      Mentor
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Feedback listo para convertir observaciones en progreso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center pb-16 pt-24 sm:pt-28 lg:min-h-[calc(88dvh-5rem)] lg:pb-24">
          <Badge className="mb-5 w-fit border-primary/20 bg-white/80 text-primary shadow-sm">
            <Sparkles className="size-3.5" />
            Aprendizaje con gestion y ejecucion
          </Badge>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            SUClassroom
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground sm:text-xl">
            Una plataforma clara para aprender, avanzar y demostrar progreso
            con proyectos reales, rutas guiadas y acciones concretas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">
                Empezar mi proyecto
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              className="bg-white/80"
              size="lg"
              variant="outline"
            >
              <Link href="/login">
                <PlayCircle aria-hidden="true" />
                Continuar avance
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          {workflow.map((step) => (
            <article
              className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
              key={step.label}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${step.tone}`}
              >
                <step.icon className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">{step.label}</h2>
                <p className="text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase text-primary">
                Enfoque del producto
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Aprender se siente como avanzar en un tablero vivo.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              SUClassroom combina orden educativo, claridad visual y seguimiento
              de tareas para que el usuario sepa que esta construyendo algo, no
              solo consumiendo contenido.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                className="rounded-lg border border-border bg-white p-6 shadow-sm"
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

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-border bg-[linear-gradient(135deg,oklch(0.98_0.012_250),oklch(0.98_0.02_165),oklch(0.985_0.018_315))] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Empieza con una ruta y termina con evidencia.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Registra tu cuenta, define tu rol inicial y convierte el primer
              modulo en una accion concreta para tu proyecto.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/register">
                Crear cuenta
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">
                <UsersRound aria-hidden="true" />
                Ya tengo acceso
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
