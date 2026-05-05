import Link from "next/link";
import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
          <section className="hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <span className="text-lg font-semibold">SUClassroom</span>
            </Link>
            <div className="mt-10 max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Plataforma de ejecución guiada
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance">
                Convierte aprendizaje en proyectos revisados y aprobados.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                La experiencia está diseñada para que cada usuario avance con
                entregables, feedback estructurado y una ruta clara por rol.
              </p>
            </div>
          </section>

          <section className="glass-panel rounded-lg p-6">
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
