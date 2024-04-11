import { useMemo } from "react";

import { OrderStatusEnum } from "@/enums/order-status-enum";

interface UseTableFilterProps {
  statusFilterOptions: string[];
  defaultStatusFilter: string;
}

export function useTableFilter(): UseTableFilterProps {
  const statusFilterOptions = useMemo(() => {
    return [
      "All",
      OrderStatusEnum.PENDING.replace(/^\w/, (c) => c.toUpperCase()),
      OrderStatusEnum.PROCESSING.replace(/^\w/, (c) => c.toUpperCase()),
      OrderStatusEnum.DELIVERING.replace(/^\w/, (c) => c.toUpperCase()),
      OrderStatusEnum.DELIVERED.replace(/^\w/, (c) => c.toUpperCase()),
      OrderStatusEnum.CANCELED.replace(/^\w/, (c) => c.toUpperCase()),
    ];
  }, []);

  const defaultStatusFilter = statusFilterOptions[0];

  return { statusFilterOptions, defaultStatusFilter };
}
