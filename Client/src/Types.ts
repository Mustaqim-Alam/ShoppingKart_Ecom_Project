export type orderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
};

export type orderType = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  status: "Processing" | "Shipped" | "Delivered";
  subTotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  total: number;
  orderItems: orderItemType[];
  _id: string;
};
