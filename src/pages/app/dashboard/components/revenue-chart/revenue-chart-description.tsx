import { CardDescription } from "@/components/ui/card";

export default function RevenueChartDescription() {
  return (
    <CardDescription>
      <div className="flex flex-row items-center space-x-1">
        <span className="text-sm font-semibold text-muted-foreground">
          Total Revenue
        </span>
        <span className="text-sm font-semibold text-muted-foreground">
          on period
        </span>
      </div>
    </CardDescription>
  );
}
