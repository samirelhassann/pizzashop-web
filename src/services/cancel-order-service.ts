import { api } from "@/lib/axios";

interface GetOrderServiceProps {
  orderId: string;
}

export async function cancelOrderService({ orderId }: GetOrderServiceProps) {
  await api.patch(`/orders/${orderId}/cancel`);
}
