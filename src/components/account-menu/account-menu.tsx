import { Suspense } from "react";

import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Building,
  ChevronDown,
  LogOut,
  RefreshCcw,
  RefreshCwOff,
} from "lucide-react";
import { FallbackProps } from "react-error-boundary";

import { useManagedRestaurantQueries } from "@/queries/managed-restaurant-queries";
import { useProfileQueries } from "@/queries/profile-queries";

import StoreProfileDialog from "./store-profile-dialog";
import QueryErrorBoundary from "../query-error-boundary";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

function ErrorBoundering({ resetErrorBoundary }: FallbackProps) {
  return (
    <Card className="flex items-center gap-2 py-1 pl-4 pr-1.5">
      <span className="text-sm select-none blur-sm">Client Name</span>
      <Button
        variant="ghost"
        size="xs"
        className="cursor-pointer group"
        onClick={resetErrorBoundary}
      >
        <RefreshCcw className="hidden w-4 h-4 text-muted-foreground group-hover:block" />
        <RefreshCwOff className="w-4 h-4 text-rose-400 group-hover:hidden" />
      </Button>
    </Card>
  );
}

function Loading() {
  return <Skeleton className="h-[40px] w-[150px] rounded-md" />;
}

function Component() {
  const { useData: getManagedRestaurantData } = useManagedRestaurantQueries();
  const { useData: getProfileData, useSignOut } = useProfileQueries();

  const { mutateAsync: signOut, isPending: isSigninOut } = useSignOut();
  const { data: managedRestaurant } = getManagedRestaurantData();
  const { data: profile } = getProfileData();

  const { name: managerName, email: managerEmail } = profile;
  const { name: restaurantName } = managedRestaurant;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            {restaurantName}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{managerName}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {managerEmail}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem
              className="text-rose-500 dark:text-rose-400"
              asChild
              disabled={isSigninOut}
            >
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}

export default function AccountMenu() {
  return (
    <QueryErrorBoundary errorBoundaryComponent={ErrorBoundering}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </QueryErrorBoundary>
  );
}
