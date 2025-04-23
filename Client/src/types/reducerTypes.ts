import { cartItem, shippingInfo, User } from "./types";

export interface userReducerInitialState {
  user: User | null;
  loading: boolean;
}
export interface cartReducerInitialState {
  loading: boolean;
  cartItems: cartItem[];
  subTotal: number;
  tax: number;
  shippingCharge: number;
  total: number;
  discount: number;
  shippingInfo: shippingInfo;
}
