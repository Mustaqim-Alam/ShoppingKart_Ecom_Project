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

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
