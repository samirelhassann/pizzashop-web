import { api } from "@/lib/axios";

export interface ApproveOrderServiceProps {
  orderId: string;
}

export async function approveOrderService({
  orderId,
}: ApproveOrderServiceProps) {
  await api.patch(`/orders/${orderId}/approve`);
}
