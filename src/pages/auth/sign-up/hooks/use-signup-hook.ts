import { UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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

  const emailInput = watch("email");

  const isButtonDisabled = !emailInput || isSubmitting;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSignUp = async (_data: SignUpForm) => {
    toast.success("Welcome back! 🎉");

    navigate("/sign-in");
  };

  return {
    register,
    isButtonDisabled,
    isSubmitting,
    handleSubmit,
    handleSignUp,
  };
}
