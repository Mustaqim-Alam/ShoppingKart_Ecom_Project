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
  product: Products[];
};
