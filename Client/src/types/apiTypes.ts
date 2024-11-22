import { Products, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type userResponse = {
  success: boolean;
  user: User;
};

export type productResponse = {
  success: boolean;
  products: Products[];
};
export type adminProductResponse = {
  success: boolean;
  adminProducts: Products[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: Products[];
};
export type SearchProductResponse = {
  success: boolean;
  products: Products[];
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

export type newProductRequest = {
  id: string;
  formData: FormData;
};
