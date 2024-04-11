import { api } from "@/lib/axios";

export async function signOutService() {
  await api.post("/sign-out");
}
