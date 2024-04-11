import { api } from "@/lib/axios";

import { UpdateProfileServiceRequest } from "./update-profile-service-request";

export interface UpdateProfileServiceProps {
  name: string;
  description: string | null;
}

export async function updateprofileService({
  name,
  description,
}: UpdateProfileServiceProps) {
  const payload: UpdateProfileServiceRequest = {
    name,
    description,
  };

  await api.put("/profile", payload);
}
