import { OrderProduct } from "./orderProduct";

export interface Order {
  email: string;
  address: string;
  postalCode: string;
  products: OrderProduct[];
}

//
export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderCreateRequest {
  email: string;
  address: string;
  postcode: string;
  orderItems: OrderItem[];
}