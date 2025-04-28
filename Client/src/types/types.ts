import { shippingInfo } from "./types";
export type User = {
  name: string;
  email: string;
  dob: string;
  gender: string;
  photo: string;
  role: string;
  _id: string;
};
export type Product = {
  name: string;
  category: string;
  photo: string;
  _id: string;
  stock: number;
  price: number;
};
export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};
export type cartItem = {
  name: string;
  productId: string;
  photo: string;
  quantity: number;
  price: number;
  stock: number;
};
export type orderItem = Omit<cartItem, "stock"> & { _id: string };

export type order = {
  orderItems: orderItem[];
  shippingInfo: shippingInfo;
  subTotal: number;
  tax: number;
  shippingCharge: number;
  total: number;
  discount: number;
  status: string;
  _id: string;
  user: {
    _id: string;
    name: string;
  };
};
