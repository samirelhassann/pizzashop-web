import { ArrowRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import OrderDetails from "./order-details";
import OrderStatus from "./order-status";

export default function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="w-3 h-3" />
              <span className="sr-only">Order Details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">3113321</TableCell>
      <TableCell className="text-muted-foreground">15 minutes ago</TableCell>
      <TableCell>
        <OrderStatus status="Pending" />
      </TableCell>
      <TableCell className="font-medium">Samir El Hassan</TableCell>
      <TableCell className="font-medium">R$ 149,90</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="w-3 h-3 mr-2" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="w-3 h-3 mr-2" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
