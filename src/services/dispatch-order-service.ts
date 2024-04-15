import { api } from "@/lib/axios";

export interface DispatchOrderServiceProps {
  orderId: string;
}

export async function dispatchOrderService({
  orderId,
}: DispatchOrderServiceProps) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
