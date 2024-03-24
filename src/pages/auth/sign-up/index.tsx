import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PolicyFooter from "./components/policy-footer";
import SignUpHeader from "./components/sign-up-header";
import { useSignUp } from "./hooks/use-signup-hook";

export default function SignUp() {
  const {
    handleSignUp,
    register,
    isButtonDisabled,
    isSubmitting,
    handleSubmit,
  } = useSignUp();

  return (
    <>
      <Helmet title="Register" />
      <Button variant="ghost" asChild className="absolute right-4 top-8">
        <Link to="/sign-in" className="">
          I am already a partner
        </Link>
      </Button>

      <div className="p-8">
        <div className="flex flex-col justify-center gap-6">
          <SignUpHeader />

          <div>
            <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name</Label>
                <Input
                  id="partnerName"
                  type="text"
                  {...register("partnerName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Manager Name</Label>
                <Input
                  id="managerName"
                  type="text"
                  {...register("managerName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="text" {...register("phone")} />
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isButtonDisabled}
              >
                Create Account
              </Button>

              <PolicyFooter />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
