import { api } from "@/lib/axios";

interface SignInServiceProps {
  email: string;
}

export async function signInService({ email }: SignInServiceProps) {
  await api.post("/authenticate", { email });
}
