import { useCallback, useMemo, useState } from "react";

import { formatDate } from "date-fns";

import { OrderStatusEnum } from "@/enums/order-status-enum";
import { useOrdersQueries } from "@/queries/orders-queries";
import { Order } from "@/services/get-orders/get-order-service-response";

interface UseOrderTableInputProps {
  order: Order;
}

interface UseOrderTableProps {
  isDetailsOpen: boolean;
  isOrderCancellationAllowed: boolean;
  formatedCreatedAt: string;
  formatedPrice: string;
  orderAction: OrderAction | null;
  isCancellingOrder?: boolean;
  setIsDetailsOpen: (value: boolean) => void;
  handleCancelOrder: () => void;
}

interface OrderAction {
  label: string;
  isPending: boolean;
  handler: () => void;
}

export function useOrderTable({
  order,
}: UseOrderTableInputProps): UseOrderTableProps {
  const { useCancelOrder, useApproveOrder, useDeliverOrder, useDispatchOrder } =
    useOrdersQueries();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isOrderCancellationAllowed = ["pending", "processing"].includes(
    order.status,
  );

  const formatedCreatedAt = formatDate(new Date(order.createdAt), "dd/MM/yyyy");

  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total / 100);

  const { mutateAsync: cancelOrder, isPending: isCancellingOrder } =
    useCancelOrder();
  const { mutateAsync: approveOrder, isPending: isApprovingOrder } =
    useApproveOrder();
  const { mutateAsync: deliverOrder, isPending: isDeliveringOrder } =
    useDeliverOrder();
  const { mutateAsync: dispatchOrder, isPending: isDispatchingOrder } =
    useDispatchOrder();

  const handleCancelOrder = () => {
    const { orderId } = order;

    cancelOrder({
      orderId,
    });
  };

  const handleApproveOrder = useCallback(() => {
    const { orderId } = order;

    approveOrder({
      orderId,
    });
  }, [approveOrder, order]);

  const handleDeliverOrder = useCallback(() => {
    const { orderId } = order;

    deliverOrder({
      orderId,
    });
  }, [deliverOrder, order]);

  const handleDispatchOrder = useCallback(() => {
    const { orderId } = order;

    dispatchOrder({
      orderId,
    });
  }, [dispatchOrder, order]);

  const orderAction: OrderAction | null = useMemo(() => {
    const { status } = order;

    switch (status) {
      case OrderStatusEnum.PENDING:
        return {
          label: "Approve",
          handler: handleApproveOrder,
          isPending: isApprovingOrder,
        };

      case OrderStatusEnum.PROCESSING:
        return {
          label: "Dispatch",
          handler: handleDispatchOrder,
          isPending: isDispatchingOrder,
        };

      case OrderStatusEnum.DELIVERING:
        return {
          label: "Deliver",
          handler: handleDeliverOrder,
          isPending: isDeliveringOrder,
        };

      default:
        return null;
    }
  }, [
    handleApproveOrder,
    handleDeliverOrder,
    handleDispatchOrder,
    isApprovingOrder,
    isDeliveringOrder,
    isDispatchingOrder,
    order,
  ]);

  return {
    isDetailsOpen,
    setIsDetailsOpen,
    isOrderCancellationAllowed,
    formatedCreatedAt,
    formatedPrice,
    handleCancelOrder,
    orderAction,
    isCancellingOrder,
  };
}
