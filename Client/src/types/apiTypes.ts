import { Product, User, cartItem, order, shippingInfo } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type userResponse = {
  success: boolean;
  user: User;
};

export type AllproductResponse = {
  success: boolean;
  products: Product[];
};
export type adminProductResponse = {
  success: boolean;
  adminProducts: Product[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: Product[];
};
export type SearchProductResponse = {
  success: boolean;
  products: Product[];
  totalPages: number;
};
export type SearchProductRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type newProductRequest = {
  id: string;
  formData: FormData;
};
export type updateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type deleteProductRequest = {
  userId: string;
  orderId: string;
};

export type newOrderRequest = {
  shippingInfo: shippingInfo;
  orderItem: cartItem[];
  subTotal: number;
  total: number;
  tax: number;
  shippingCharge: number;
  discount: number;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: order[];
};
export type orderDetailsResponse = {
  success: boolean;
  order: order;
};
export type orderUpdateRequest = {
  userId: string;
  orderId: string;
};
