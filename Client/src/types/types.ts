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
