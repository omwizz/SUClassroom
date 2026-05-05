"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartCardProps = {
  title: string;
  data: Array<{ label: string; value: number }>;
};

export function ChartCard({ title, data }: ChartCardProps) {
  return (
    <Card className="glass-panel rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="execution" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                stroke="var(--muted-foreground)"
                tickLine={false}
              />
              <YAxis stroke="var(--muted-foreground)" tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--popover-foreground)",
                }}
              />
              <Area
                dataKey="value"
                fill="url(#execution)"
                stroke="var(--chart-1)"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
