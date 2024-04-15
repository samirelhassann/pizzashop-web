import { api } from "@/lib/axios";

import { GetMonthOrderAmountServiceResponse } from "./get-month-orders-amount-service-response";

export async function getMonthOrdersAmountService() {
  const response = await api.get<GetMonthOrderAmountServiceResponse>(
    "/metrics/month-orders-amount",
  );

  return response.data;
}
