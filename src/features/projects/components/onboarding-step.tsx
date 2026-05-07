import type { ReactNode } from "react";

type OnboardingStepProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function OnboardingStep({
  title,
  description,
  children,
}: OnboardingStepProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

