import { Helmet } from "react-helmet-async";

import OrderTableFilters from "./order-table-filters";
import OrdersTable from "./orders-table";

export default function Orders() {
  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Orders</h1>
      </div>

      <div className="space-y-2.5">
        <OrderTableFilters />

        <OrdersTable />
      </div>
    </>
  );
}
