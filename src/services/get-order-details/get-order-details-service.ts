import { api } from "@/lib/axios";

import { GetOrderDertailsServiceResponse } from "./get-order-details-service-response";
import { mapStatusStringToEnum } from "../utils/map-status-to-enum";

interface GetOrderServiceProps {
  orderId: string;
}

export async function getOrderDetailsService({
  orderId,
}: GetOrderServiceProps) {
  const { data } = await api.get<GetOrderDertailsServiceResponse>(
    `/orders/${orderId}`,
  );

  return {
    ...data,
    status: mapStatusStringToEnum(data.status),
  };
}
