import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Target,
} from "lucide-react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

const progressItems = [
  {
    label: "Diagnostico",
    detail: "Define tu punto de partida",
    icon: Target,
    done: true,
  },
  {
    label: "Curso activo",
    detail: "Aprende con una ruta clara",
    icon: BookOpenCheck,
    done: true,
  },
  {
    label: "Proyecto",
    detail: "Convierte teoria en evidencia",
    icon: ClipboardCheck,
    done: false,
  },
];

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-6 text-foreground [--accent-foreground:oklch(0.2_0.06_180)] [--accent:oklch(0.92_0.055_170)] [--background:oklch(1_0_0)] [--border:oklch(0.89_0.02_245)] [--card-foreground:oklch(0.19_0.025_250)] [--card:oklch(1_0_0)] [--chart-2:oklch(0.66_0.16_165)] [--chart-4:oklch(0.65_0.16_315)] [--foreground:oklch(0.19_0.025_250)] [--input:oklch(0.89_0.02_245)] [--muted-foreground:oklch(0.46_0.035_250)] [--muted:oklch(0.95_0.02_245)] [--popover-foreground:oklch(0.19_0.025_250)] [--popover:oklch(1_0_0)] [--primary-foreground:oklch(1_0_0)] [--primary:oklch(0.59_0.18_252)] [--ring:oklch(0.62_0.17_252)] [--secondary-foreground:oklch(0.22_0.04_250)] [--secondary:oklch(0.95_0.02_245)] sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(1_0_0),oklch(0.97_0.014_245)_58%,oklch(0.965_0.025_165))]" />
      <div className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(oklch(0.7_0.03_250/0.18)_1px,transparent_1px),linear-gradient(90deg,oklch(0.7_0.03_250/0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-[linear-gradient(90deg,oklch(0.62_0.18_252/0.16),oklch(0.68_0.16_165/0.14),oklch(0.65_0.16_315/0.14))]" />

      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <section className="hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <GraduationCap className="size-5" />
              </span>
              <span className="text-lg font-semibold">SUClassroom</span>
            </Link>

            <div className="mt-10 max-w-2xl">
              <p className="text-sm font-medium uppercase text-primary">
                Aprendizaje con accion
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance">
                Tu progreso se organiza como un proyecto vivo.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Entra para continuar tu ruta, revisar tu siguiente accion y
                mantener el foco en avanzar, entregar y mejorar.
              </p>
            </div>

            <div className="mt-8 max-w-2xl rounded-lg border border-border bg-white/82 p-5 shadow-2xl shadow-primary/10 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Ruta de ejecucion
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Proyecto en movimiento
                  </h2>
                </div>
                <span className="rounded-full bg-chart-2/10 px-3 py-1 text-sm font-medium text-chart-2">
                  64% avance
                </span>
              </div>

              <div className="mt-5 h-2 rounded-full bg-muted">
                <div className="h-2 w-[64%] rounded-full bg-[linear-gradient(90deg,var(--primary),var(--chart-2),var(--chart-4))]" />
              </div>

              <div className="mt-5 grid gap-3">
                {progressItems.map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                    key={item.label}
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-lg ${
                        item.done
                          ? "bg-primary text-primary-foreground"
                          : "bg-chart-4/10 text-chart-4"
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        <item.icon className="size-5" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-white/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="mb-6">
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 lg:hidden"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </span>
                <span className="font-semibold">SUClassroom</span>
              </Link>
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
            {children}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
