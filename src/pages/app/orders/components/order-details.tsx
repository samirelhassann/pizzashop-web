import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ClipboardCopyIcon, Mail, PhoneCall } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderDetailsService } from "@/services/get-order-details/get-order-details-service";

import OrderStatus from "./order-status";

interface OrderDetailsProps {
  orderId: string;
  isOpen: boolean;
}

export default function OrderDetails({ orderId, isOpen }: OrderDetailsProps) {
  const { data: orderDetails } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderDetailsService({ orderId }),
    enabled: isOpen,
  });

  if (!orderDetails) {
    return null;
  }

  const { status, createdAt, customer, id, orderItems, totalInCents } =
    orderDetails;

  const formatedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const handleCopyToClipboard = async (value: string, label?: string) => {
    await navigator.clipboard.writeText(value);

    toast.success(`${label ? `${label} ` : ""}Copied to clipboard!`, {
      duration: 1500,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-muted-foreground">{id}</DialogTitle>
      </DialogHeader>

      <div className="space-y-12">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <OrderStatus status={status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Client</TableCell>
              <TableCell>{customer.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cellphone</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-mono">{customer.phone}</span>

                  {!!customer.phone && (
                    <>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="p-2 ml-2"
                        onClick={() => handleCopyToClipboard(customer.phone!)}
                      >
                        <ClipboardCopyIcon className="w-4 h-4" />
                        <span className="sr-only">Copy to clipboard</span>
                      </Button>

                      <a href="tel:+5511999999999">
                        <Button variant="ghost" size="xs" className="p-2">
                          <PhoneCall className="w-4 h-4" />
                          <span className="sr-only">Call</span>
                        </Button>
                      </a>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-mono">{customer.email}</span>

                  <Button
                    variant="ghost"
                    size="xs"
                    className="p-2 ml-2"
                    onClick={() =>
                      handleCopyToClipboard("samirelhassann@gmail.com", "Email")
                    }
                  >
                    <ClipboardCopyIcon className="w-4 h-4" />
                    <span className="sr-only">Copy to clipboard</span>
                  </Button>

                  <a href="mailto:samirelhassann@gmail.com">
                    <Button variant="ghost" size="xs" className="p-2">
                      <Mail className="w-4 h-4" />
                      <span className="sr-only">Mail to</span>
                    </Button>
                  </a>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Created At
              </TableCell>
              <TableCell>
                <span>{formatedDate}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.priceInCents / 100)}
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format((item.priceInCents / 100) * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalInCents / 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
