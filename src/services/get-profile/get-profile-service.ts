import { api } from "@/lib/axios";

import { GetProfileServiceResponse } from "./get-profile-service-response";

export async function getProfileService() {
  const { data } = await api.get<GetProfileServiceResponse>("/me");

  return data;
}
