/* eslint-disable react-hooks/rules-of-hooks */

import {
  UseMutationResult,
  UseSuspenseQueryResult,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { getManagedRestauranteService } from "@/services/get-managed-restaurant/get-managed-restaurant-service";
import { GetManagedRestauranteServiceResponse } from "@/services/get-managed-restaurant/get-managed-restaurant-service-response";
import {
  UpdateProfileServiceProps,
  updateprofileService,
} from "@/services/update-profile/update-profile-service";
import { Optional } from "@/utils/OptionalProps";

const KEY = "managed-restaurant";

interface UseManagedRestaurantQueriesProps {
  useData: () => UseSuspenseQueryResult<GetManagedRestauranteServiceResponse>;
  useUpdateProfile: () => UseMutationResult<
    void,
    Error,
    UpdateProfileServiceProps
  >;
}

export function useManagedRestaurantQueries(): UseManagedRestaurantQueriesProps {
  const queryClient = useQueryClient();

  const useData = () => {
    return useSuspenseQuery({
      queryKey: [KEY],
      queryFn: getManagedRestauranteService,
    });
  };

  const updateCachedData = (
    data: Optional<GetManagedRestauranteServiceResponse>,
  ) => {
    const cached =
      queryClient.getQueryData<GetManagedRestauranteServiceResponse>([KEY]);

    if (cached) {
      queryClient.setQueryData([KEY], {
        ...cached,
        ...data,
      });
    }

    return cached;
  };

  const useUpdateProfile = () => {
    return useMutation({
      mutationFn: updateprofileService,
      onMutate(variables) {
        const cached = updateCachedData(variables);

        return { previousCached: cached };
      },
      onError(_error, _variables, context) {
        if (context?.previousCached) {
          updateCachedData(context.previousCached);
        }
      },
    });
  };

  return { useData, useUpdateProfile };
}
