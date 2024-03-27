import { useMutation } from "@tanstack/react-query";
import { UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { signupService } from "@/services/sign-up-service";

const signUpForm = z.object({
  partnerName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

interface UseSignUpProps {
  register: UseFormRegister<SignUpForm>;
  isButtonDisabled: boolean;
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<SignUpForm>;
  handleSignUp: (data: SignUpForm) => Promise<void>;
}

export function useSignUp(): UseSignUpProps {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<SignUpForm>();
  const navigate = useNavigate();

  const { mutateAsync: signUpService } = useMutation({
    mutationFn: signupService,
  });

  const emailInput = watch("email");

  const isButtonDisabled = !emailInput || isSubmitting;

  const handleSignUp = async ({
    email,
    managerName,
    partnerName,
    phone,
  }: SignUpForm) => {
    try {
      signUpService({
        email,
        managerName,
        restaurantName: partnerName,
        phone,
      });

      toast.success("Restaurante succesfully registered 🎉", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${email}`),
        },
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    register,
    isButtonDisabled,
    isSubmitting,
    handleSubmit,
    handleSignUp,
  };
}
