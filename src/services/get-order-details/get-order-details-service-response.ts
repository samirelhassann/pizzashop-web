import { OrderStatusEnum } from "@/enums/order-status-enum";

export interface GetOrderDertailsServiceResponse {
  status: OrderStatusEnum;
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    product: {
      name: string;
    };
    quantity: number;
    priceInCents: number;
  }[];
}
