import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<SignInForm>();

  const emailInput = watch("email");

  const isButtonDisabled = !emailInput || isSubmitting;

  const handleSignIn = async (data: SignInForm) => {
    // eslint-disable-next-line no-console
    console.log("• [LOG] - data", data);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Welcome back! 🎉");
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-4 top-8">
          <Link to="/sign-up" className="">
            New Partner
          </Link>
        </Button>

        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Panel
            </h1>
            <p className="text-muted-foreground">
              Track your sales through the partner dashboard
            </p>
          </div>

          <div>
            <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isButtonDisabled}
              >
                Access
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
