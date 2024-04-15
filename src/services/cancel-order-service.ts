import { api } from "@/lib/axios";

export interface CancelOrderServiceProps {
  orderId: string;
}

export async function cancelOrderService({ orderId }: CancelOrderServiceProps) {
  await api.patch(`/orders/${orderId}/cancel`);
}
