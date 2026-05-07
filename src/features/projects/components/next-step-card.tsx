import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type NextStepCardProps = {
  title: string;
  description: string;
  href: string;
  action: string;
};

export function NextStepCard({
  title,
  description,
  href,
  action,
}: NextStepCardProps) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardContent className="space-y-4 p-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <Button asChild>
          <Link href={href}>
            {action}
            <ArrowRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

