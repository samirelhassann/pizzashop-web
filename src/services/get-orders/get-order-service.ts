import { api } from "@/lib/axios";

import { GetOrdersServiceResponse } from "./get-order-service-response";
import { mapStatusStringToEnum } from "../utils/map-status-to-enum";

export interface GetOrderServiceProps {
  pageIndex?: number;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export async function getOrdersService({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrderServiceProps) {
  const { data } = await api.get<GetOrdersServiceResponse>("/orders", {
    params: {
      pageIndex,
      orderId,
      customerName,
      status: status?.toLowerCase(),
    },
  });

  const convertedOrders = data.orders?.map((order) => {
    return {
      ...order,
      status: mapStatusStringToEnum(order.status),
    };
  });

  data.orders = convertedOrders;

  return data;
}
