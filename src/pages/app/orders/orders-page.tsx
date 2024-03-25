import { Helmet } from "react-helmet-async";

import Pagination from "@/components/pagination/pagination";

import OrderTableFilters from "./components/order-table-filters";
import OrdersTable from "./components/orders-table";

export default function Orders() {
  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Orders</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <OrdersTable />
        </div>

        <Pagination pageIndex={0} totalCount={100} perPage={10} />
      </div>
    </>
  );
}
