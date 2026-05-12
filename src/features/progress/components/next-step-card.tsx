import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import type { NextProgressStep } from "@/server/services/next-step-service";

type NextStepCardProps = {
  step: NextProgressStep;
};

export function NextStepCard({ step }: NextStepCardProps) {
  return (
    <SectionCard description={step.description} title={step.title}>
      <Button asChild>
        <Link href={step.href}>
          <ListChecks aria-hidden="true" />
          {step.actionLabel}
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </SectionCard>
  );
}
