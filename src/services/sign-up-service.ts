import { api } from "@/lib/axios";

export interface SignupServiceProps {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function signupService({
  restaurantName,
  managerName,
  email,
  phone,
}: SignupServiceProps) {
  await api.post("/authenticate", {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
