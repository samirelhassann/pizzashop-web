import { Suspense } from "react";

import { DollarSign } from "lucide-react";
import { FallbackProps } from "react-error-boundary";

import QueryErrorBoundary from "@/components/query-error-boundary";
import { useMetricsQueries } from "@/queries/metrics-queries";

import InsightCard, {
  InsightCardErrorBoundering,
  InsightCardLoading,
} from "../insight-card";

function Loading() {
  return <InsightCardLoading />;
}

function ErrorBoundering({ resetErrorBoundary }: FallbackProps) {
  return <InsightCardErrorBoundering resetErrorBoundary={resetErrorBoundary} />;
}

function Component() {
  const { useMonthRevenueData: getMonthRevenue } = useMetricsQueries();

  const { data: monthRevenue } = getMonthRevenue();
  const { receipt, diffFromLastMonth } = monthRevenue;

  return (
    <InsightCard
      title="Total Revenue"
      period="Month"
      value={receipt}
      previousValue={diffFromLastMonth}
      icon={<DollarSign className="w-5 h-5 text-muted-foreground" />}
      isMonetary
    />
  );
}

export default function TotalRevenueInsight() {
  return (
    <QueryErrorBoundary errorBoundaryComponent={ErrorBoundering}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </QueryErrorBoundary>
  );
}
