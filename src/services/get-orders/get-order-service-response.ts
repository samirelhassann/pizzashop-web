import { OrderStatusEnum } from "@/enums/order-status-enum";

export interface GetOrdersServiceResponse {
  orders: Order[];
  meta: Meta;
}

export interface Order {
  orderId: string;
  createdAt: string;
  status: OrderStatusEnum;
  customerName: string;
  total: number;
}

interface Meta {
  pageIndex: number;
  perPage: number;
  totalCount: number;
}
