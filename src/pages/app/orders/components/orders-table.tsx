/* eslint-disable @typescript-eslint/no-shadow */
import { Suspense } from "react";

import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrdersQueries } from "@/queries/orders-queries";

import OrderTableRow, { OrderTableRowLoading } from "./order-table-row";

function Loading() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]" />
            <TableHead className="w-[140px]">Id</TableHead>
            <TableHead className="w-[180px]">Created</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="w-[140px]">Total</TableHead>
            <TableHead className="w-[164px]" />
            <TableHead className="w-[132px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <OrderTableRowLoading key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function Component() {
  const [searchParams] = useSearchParams();
  const { useData: getOrders } = useOrdersQueries();

  const page = searchParams.get("page") ?? "1";
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const filtersKey = `${page}-${orderId}-${customerName}-${status}`;

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: ordersResponse } = getOrders({
    filtersKey,
    serviceParams: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  });

  const { orders } = ordersResponse;

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]" />
            <TableHead className="w-[140px]">Id</TableHead>
            <TableHead className="w-[180px]">Created</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="w-[140px]">Total</TableHead>
            <TableHead className="w-[164px]" />
            <TableHead className="w-[132px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderTableRow key={order.orderId} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function OrdersTable() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
