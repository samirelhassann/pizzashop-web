import { ReactNode } from "react";

import { OrderStatusEnum } from "@/enums/order-status-enum";

const orderStatusMapping: Record<
  OrderStatusEnum,
  {
    name: string;
    roundedCircle: ReactNode;
  }
> = {
  [OrderStatusEnum.PENDING]: {
    name: "Pending",
    roundedCircle: (
      <span className="w-2 h-2 mr-1.5 rounded-full bg-yellow-400" />
    ),
  },
  [OrderStatusEnum.CANCELED]: {
    name: "Cancelled",
    roundedCircle: <span className="w-2 h-2 mr-1.5 rounded-full bg-red-400" />,
  },
  [OrderStatusEnum.PROCESSING]: {
    name: "Processing",
    roundedCircle: <span className="w-2 h-2 mr-1.5 rounded-full bg-blue-400" />,
  },
  [OrderStatusEnum.DELIVERING]: {
    name: "Delivering",
    roundedCircle: (
      <span className="w-2 h-2 mr-1.5 rounded-full bg-green-400" />
    ),
  },
  [OrderStatusEnum.DELIVERED]: {
    name: "Delivered",
    roundedCircle: (
      <span className="w-2 h-2 mr-1.5 rounded-full bg-green-400" />
    ),
  },
};

interface OrderStatusProps {
  status: OrderStatusEnum;
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const statusValues = orderStatusMapping[status];

  if (!statusValues) {
    return (
      <div className="flex items-center">
        <span className="w-2 h-2 mr-1.5 rounded-full bg-zinc-500" />
        <span className="font-medium text-muted-foreground">{status}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {statusValues.roundedCircle}
      <span className="font-medium text-muted-foreground">
        {statusValues.name}
      </span>
    </div>
  );
}
