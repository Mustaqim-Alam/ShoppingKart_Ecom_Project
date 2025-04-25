import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducerTypes";
import { cartItem } from "../../types/types";

const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharge: 0,
  total: 0,
  discount: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },

    
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subTotal = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      state.subTotal = subTotal;
      state.shippingCharge = state.subTotal > 1000 ? 200 : 0;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.tax + state.shippingCharge - state.discount;
    },
  },
});

export const { addToCart, removeCartItem, calculatePrice } =
  cartReducer.actions;
