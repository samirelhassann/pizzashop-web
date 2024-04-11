import { OrderStatusEnum } from "@/enums/order-status-enum";

const statusStringToEnumMap: Record<string, OrderStatusEnum> = {
  pending: OrderStatusEnum.PENDING,
  canceled: OrderStatusEnum.CANCELED,
  processing: OrderStatusEnum.PROCESSING,
  delivering: OrderStatusEnum.DELIVERING,
  delivered: OrderStatusEnum.DELIVERED,
};

export function mapStatusStringToEnum(statusString: string): OrderStatusEnum {
  const statusEnum = statusStringToEnumMap[statusString];
  if (!statusEnum) {
    throw new Error(`Invalid status string: ${statusString}`);
  }
  return statusEnum;
}
