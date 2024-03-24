import { DialogTitle } from "@radix-ui/react-dialog";
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

import OrderStatus from "./order-status";

export default function OrderDetails() {
  const handleCopyToClipboard = async (value: string, label?: string) => {
    await navigator.clipboard.writeText(value);

    toast.success(`${label ? `${label} ` : ""}Copied to clipboard!`, {
      duration: 1500,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-muted-foreground">Order: 123</DialogTitle>
      </DialogHeader>

      <div className="space-y-12">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <OrderStatus status="Pending" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Client</TableCell>
              <TableCell>Samir El Hassan</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cellphone</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-mono">+55 11 99999-9999</span>

                  <Button
                    variant="ghost"
                    size="xs"
                    className="p-2 ml-2"
                    onClick={() => handleCopyToClipboard("+5511999999999")}
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
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-mono">samirelhassann@gmail.com</span>

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
                <span>15 minutes ago</span>
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
            <TableRow>
              <TableCell>Pizza Pepperoni Grande</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">69,90</TableCell>
              <TableCell className="text-right">139,80</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pizza Pepperoni Grande</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">69,90</TableCell>
              <TableCell className="text-right">139,80</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">279,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
