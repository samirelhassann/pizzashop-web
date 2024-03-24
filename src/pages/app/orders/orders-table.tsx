import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import OrderTableRow from "./order-table-row";

export default function OrdersTable() {
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
            <OrderTableRow key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
