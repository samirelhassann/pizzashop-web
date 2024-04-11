/* eslint-disable react-hooks/rules-of-hooks */

import {
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  GetOrderServiceProps,
  getOrdersService,
} from "@/services/get-orders/get-order-service";
import { GetOrdersServiceResponse } from "@/services/get-orders/get-order-service-response";

const KEY = "orders";

interface UseDataProps {
  serviceParams: GetOrderServiceProps;
  filtersKey: string;
}

interface UseOrdersQueriesProps {
  useData: (
    props: UseDataProps,
  ) => UseSuspenseQueryResult<GetOrdersServiceResponse>;
}

export function useOrdersQueries(): UseOrdersQueriesProps {
  const useData = ({
    serviceParams: { pageIndex, orderId, customerName, status },
    filtersKey,
  }: UseDataProps) => {
    return useSuspenseQuery({
      queryKey: [KEY, filtersKey],
      queryFn: () =>
        getOrdersService({
          pageIndex,
          orderId,
          customerName,
          status: status === "All" ? null : status,
        }),
    });
  };

  return { useData };
}
