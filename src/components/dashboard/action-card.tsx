import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type ActionCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ActionCard({
  title,
  description,
  href,
  icon: Icon,
}: ActionCardProps) {
  return (
    <Link href={href}>
      <Card className="glass-panel h-full rounded-lg transition hover:border-primary/40">
        <CardContent className="flex h-full flex-col p-5">
          <Icon className="mb-5 size-5 text-primary" />
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Abrir
            <ArrowRight className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
