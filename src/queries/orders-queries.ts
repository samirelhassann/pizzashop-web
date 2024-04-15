/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  UseMutationResult,
  UseSuspenseQueryResult,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { OrderStatusEnum } from "@/enums/order-status-enum";
import {
  ApproveOrderServiceProps,
  approveOrderService,
} from "@/services/approve-order-service";
import {
  CancelOrderServiceProps,
  cancelOrderService,
} from "@/services/cancel-order-service";
import {
  DeliverOrderServiceProps,
  deliverOrderService,
} from "@/services/deliver-order-service";
import {
  DispatchOrderServiceProps,
  dispatchOrderService,
} from "@/services/dispatch-order-service";
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
  useCancelOrder: () => UseMutationResult<void, Error, CancelOrderServiceProps>;
  useApproveOrder: () => UseMutationResult<
    void,
    Error,
    ApproveOrderServiceProps
  >;
  useDeliverOrder: () => UseMutationResult<
    void,
    Error,
    DeliverOrderServiceProps
  >;
  useDispatchOrder: () => UseMutationResult<
    void,
    Error,
    DispatchOrderServiceProps
  >;
}

export function useOrdersQueries(): UseOrdersQueriesProps {
  const queryClient = useQueryClient();

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

  const updateOrderStatusById = (orderId: string, status: OrderStatusEnum) => {
    const orderListCache = queryClient.getQueriesData<GetOrdersServiceResponse>(
      {
        queryKey: [KEY],
      },
    );

    orderListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<GetOrdersServiceResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            };
          }

          return order;
        }),
      });
    });
  };

  const useCancelOrder = () => {
    return useMutation({
      mutationFn: cancelOrderService,
      async onSuccess(_, { orderId }) {
        updateOrderStatusById(orderId, OrderStatusEnum.CANCELED);
      },
    });
  };

  const useApproveOrder = () => {
    return useMutation({
      mutationFn: approveOrderService,
      async onSuccess(_, { orderId }) {
        updateOrderStatusById(orderId, OrderStatusEnum.PROCESSING);
      },
    });
  };

  const useDeliverOrder = () => {
    return useMutation({
      mutationFn: deliverOrderService,
      async onSuccess(_, { orderId }) {
        updateOrderStatusById(orderId, OrderStatusEnum.DELIVERED);
      },
    });
  };

  const useDispatchOrder = () => {
    return useMutation({
      mutationFn: dispatchOrderService,
      async onSuccess(_, { orderId }) {
        updateOrderStatusById(orderId, OrderStatusEnum.DELIVERING);
      },
    });
  };

  return {
    useData,
    useCancelOrder,
    useApproveOrder,
    useDeliverOrder,
    useDispatchOrder,
  };
}
