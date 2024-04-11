import { api } from "@/lib/axios";

import { GetManagedRestauranteServiceResponse } from "./get-managed-restaurant-service-response";

export async function getManagedRestauranteService() {
  const { data } = await api.get<GetManagedRestauranteServiceResponse>(
    "/managed-restaurant",
  );

  return data;
}
