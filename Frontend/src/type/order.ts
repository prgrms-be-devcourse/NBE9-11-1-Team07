import { OrderProduct } from "./orderProduct";

export interface Order {
  email: string;
  address: string;
  postalCode: string;
  products: OrderProduct[];
}
