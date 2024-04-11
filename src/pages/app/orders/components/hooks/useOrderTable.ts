import { useState } from "react";

import { formatDate } from "date-fns";

import { Order } from "@/services/get-orders/get-order-service-response";

interface UseOrderTableInputProps {
  order: Order;
}

interface UseOrderTableProps {
  isDetailsOpen: boolean;
  setIsDetailsOpen: (value: boolean) => void;
  isOrderCancellationAllowed: boolean;
  formatedCreatedAt: string;
  formatedPrice: string;
}

export function useOrderTable({
  order,
}: UseOrderTableInputProps): UseOrderTableProps {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isOrderCancellationAllowed = ["pending", "processing"].includes(
    order.status,
  );

  const formatedCreatedAt = formatDate(new Date(order.createdAt), "dd/MM/yyyy");

  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(order.total / 100);

  return {
    isDetailsOpen,
    setIsDetailsOpen,
    isOrderCancellationAllowed,
    formatedCreatedAt,
    formatedPrice,
  };
}
