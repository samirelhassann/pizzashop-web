import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useManagedRestaurantQueries } from "@/queries/managed-restaurant-queries";

import { Button } from "../ui/button";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const storeProfileForm = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

export type StoreProfile = z.infer<typeof storeProfileForm>;

export default function StoreProfileDialog() {
  const { useUpdateProfile, useData: getManagedRestaurantData } =
    useManagedRestaurantQueries();

  const { data: managedRestaurant } = getManagedRestaurantData();

  const { register, handleSubmit } = useForm<StoreProfile>({
    values: {
      name: managedRestaurant.name ?? "",
      description: managedRestaurant.description ?? "",
    },
  });

  const {
    mutateAsync: updateProfileService,
    isPending: isUpdateProfileServicePending,
  } = useUpdateProfile();

  const handleUpdateProfile = async ({ description, name }: StoreProfile) => {
    try {
      await updateProfileService({
        name,
        description,
      });
      toast.success("Profile updated successfully");
    } catch (e) {
      toast.error("Failed to update profile", {
        action: {
          label: "Try again",
          onClick: () => handleUpdateProfile({ description, name }),
        },
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          This is your store profile. You can manage your store from here.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="py-4 space-y-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input
              disabled={isUpdateProfileServicePending}
              className="col-span-3"
              id="name"
              {...register("name")}
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              disabled={isUpdateProfileServicePending}
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isUpdateProfileServicePending}
              variant="ghost"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            isLoading={isUpdateProfileServicePending}
            disabled={isUpdateProfileServicePending}
            type="submit"
            variant="success"
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
