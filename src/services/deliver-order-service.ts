import { api } from "@/lib/axios";

export interface DeliverOrderServiceProps {
  orderId: string;
}

export async function deliverOrderService({
  orderId,
}: DeliverOrderServiceProps) {
  await api.patch(`/orders/${orderId}/deliver`);
}
