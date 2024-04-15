import { api } from "@/lib/axios";

import { GetMonthCanceledOrdersAmountServiceResponse } from "./get-month-canceled-orders-amount-service-response";

export async function getMonthCanceledOrdersAmountService() {
  const response = await api.get<GetMonthCanceledOrdersAmountServiceResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}
