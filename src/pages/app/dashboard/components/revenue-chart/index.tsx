import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import RevenueChartDescription from "./revenue-chart-description";

const data = [
  { date: "20/03", revenue: 4000 },
  { date: "21/03", revenue: 3000 },
  { date: "22/03", revenue: 2000 },
  { date: "23/03", revenue: 2000 },
  { date: "24/03", revenue: 4000 },
  { date: "25/03", revenue: 3000 },
  { date: "26/03", revenue: 2000 },
  { date: "27/03", revenue: 2000 },
  { date: "28/03", revenue: 4000 },
  { date: "29/03", revenue: 3000 },
  { date: "30/03", revenue: 2000 },
  { date: "31/03", revenue: 2000 },
];

export default function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Revenue on the period
          </CardTitle>
          <RevenueChartDescription />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              stroke="#888"
              dy={16}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.orange[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
