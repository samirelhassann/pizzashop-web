import { ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet-async";

import InsightCard from "./components/insight-card";
import PopularProductsChart from "./components/popular-chart";
import RevenueChart from "./components/revenue-chart";
import TotalRevenueInsight from "./components/total-revenue-insight/total-revenue-insight";

export default function DashBoardPage() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <TotalRevenueInsight />
          <InsightCard
            title="Order"
            period="Month"
            value={5000}
            previousValue={10000}
            icon={<ShoppingBag className="w-5 h-5 text-muted-foreground" />}
          />
          <InsightCard
            title="Order"
            period="Day"
            value={200}
            previousValue={100}
            icon={<ShoppingBag className="w-5 h-5 text-muted-foreground" />}
          />
          <InsightCard
            title="Cancelled Orders"
            period="Month"
            value={50}
            previousValue={100}
            icon={<ShoppingBag className="w-5 h-5 text-muted-foreground" />}
            invertComparison
          />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
