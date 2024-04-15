import { api } from "@/lib/axios";

import { GetDayOrdersAmountServiceResponse } from "./get-day-orders-amount-service-response";

export async function getDayOrdersAmountService() {
  const response = await api.get<GetDayOrdersAmountServiceResponse>(
    "/metrics/day-orders-amount",
  );

  return response.data;
}
