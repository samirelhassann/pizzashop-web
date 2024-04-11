import { ArrowRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/services/get-orders/get-order-service-response";

import { useOrderTable } from "./hooks/useOrderTable";
import OrderDetails from "./order-details";
import OrderStatus from "./order-status";

export function OrderTableRowLoading() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-8 h-8 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 rounded-md w-52" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-md" />
      </TableCell>
    </TableRow>
  );
}

interface OrderTableRowProps {
  order: Order;
}

export default function OrderTableRow({ order }: OrderTableRowProps) {
  const {
    isDetailsOpen,
    isOrderCancellationAllowed,
    setIsDetailsOpen,
    formatedCreatedAt,
    formatedPrice,
  } = useOrderTable({
    order,
  });

  const { orderId, status, customerName } = order;

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="w-3 h-3" />
              <span className="sr-only">Order Details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={orderId} isOpen={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatedCreatedAt}
      </TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">{formatedPrice}</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="w-3 h-3 mr-2" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!isOrderCancellationAllowed}
          variant="ghost"
          size="xs"
        >
          <X className="w-3 h-3 mr-2" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
