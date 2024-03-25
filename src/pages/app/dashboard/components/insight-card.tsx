import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  period: "Day" | "Month";
  value: number;
  icon: ReactNode;
  previousValue?: number;
  isMonetary?: boolean;
  invertComparison?: boolean;
}

export default function InsightCard({
  title,
  period,
  value,
  previousValue,
  icon,
  isMonetary = false,
  invertComparison = false,
}: InsightCardProps) {
  const differenceInPercent =
    previousValue && Math.abs(((value - previousValue) / previousValue) * 100);

  const isIncrease =
    differenceInPercent &&
    (invertComparison ? value < previousValue : value > previousValue);

  const formatedComparisonText =
    differenceInPercent &&
    `${isIncrease ? "increase" : "decrease "} from last ${period.toLowerCase()}`;

  const formatedTitle = `${title} (${period.toLowerCase()})`;

  const formatedValue = isMonetary
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    : new Intl.NumberFormat("pt-BR").format(value);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          {formatedTitle}
        </CardTitle>
        {icon}
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formatedValue}
        </span>

        {!!previousValue && (
          <p className="flex items-baseline gap-1 text-xs text-muted-foreground">
            <span
              data-increase={isIncrease}
              className="data-[increase=true]:text-emerald-500 data-[increase=true]:dark:text-emerald-400 data-[increase=false]:text-rose-500 data-[increase=false]:dark:text-rose-400"
            >
              {differenceInPercent}%
            </span>
            {formatedComparisonText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
