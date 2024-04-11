/* eslint-disable react-hooks/rules-of-hooks */

import {
  UseMutationResult,
  UseSuspenseQueryResult,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getProfileService } from "@/services/get-profile/get-profile-service";
import { GetProfileServiceResponse } from "@/services/get-profile/get-profile-service-response";
import { SignInServiceProps, signInService } from "@/services/sign-in-service";
import { signOutService } from "@/services/sign-out-service";
import { SignupServiceProps, signupService } from "@/services/sign-up-service";
import { Optional } from "@/utils/OptionalProps";

const KEY = "profile";

interface UseProfileQueriesProps {
  getCachedData: GetProfileServiceResponse | undefined;
  useData: () => UseSuspenseQueryResult<GetProfileServiceResponse>;
  updateCachedData: (
    data: Optional<GetProfileServiceResponse>,
  ) => GetProfileServiceResponse | undefined;
  useSignUp: () => UseMutationResult<void, Error, SignupServiceProps>;
  useSignIn: () => UseMutationResult<void, Error, SignInServiceProps>;
  useSignOut: () => UseMutationResult<void, Error, void>;
}

export function useProfileQueries(): UseProfileQueriesProps {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useData = () => {
    return useSuspenseQuery({
      queryKey: [KEY],
      queryFn: getProfileService,
    });
  };

  const getCachedData = queryClient.getQueryData<GetProfileServiceResponse>([
    KEY,
  ]);

  const updateCachedData = (data: Optional<GetProfileServiceResponse>) => {
    const cached = queryClient.getQueryData<GetProfileServiceResponse>([KEY]);

    if (cached) {
      queryClient.setQueryData([KEY], {
        ...cached,
        ...data,
      });
    }

    return cached;
  };

  const useSignUp = () => {
    return useMutation({
      mutationFn: signupService,
    });
  };

  const useSignOut = () => {
    return useMutation({
      mutationFn: signOutService,
      onSuccess: () => {
        navigate("/sign-in", {
          replace: true,
        });
      },
    });
  };

  const useSignIn = () => {
    return useMutation({
      mutationFn: signInService,
    });
  };

  return {
    useData,
    getCachedData,
    updateCachedData,
    useSignUp,
    useSignIn,
    useSignOut,
  };
}
