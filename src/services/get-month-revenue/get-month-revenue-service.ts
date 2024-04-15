import { api } from "@/lib/axios";

import { GetMonthRevenueServiceResponse } from "./get-month-revenue-service-response";

export async function getMonthRevenueService() {
  const response = await api.get<GetMonthRevenueServiceResponse>(
    "/metrics/month-receipt",
  );

  return response.data;
}
