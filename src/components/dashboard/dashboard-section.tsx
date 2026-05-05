import type { ReactNode } from "react";

type DashboardSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function DashboardSection({
  title,
  description,
  children,
  actions,
}: DashboardSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
