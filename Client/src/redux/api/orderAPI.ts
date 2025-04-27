import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  newOrderRequest,
  orderDetailsResponse,
  orderUpdateRequest,
} from "../../types/apiTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, newOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<MessageResponse, orderUpdateRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<MessageResponse, orderUpdateRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    myOrder: builder.query< AllOrdersResponse,string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),
    allOrder: builder.query<AllOrdersResponse, string>({
      query: (id) => `allOrders?id=${id}`,
      providesTags: ["orders"],
    }),
    orderDetails: builder.query<orderDetailsResponse,string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrderQuery,
  useAllOrderQuery,
  useOrderDetailsQuery,
} = orderApi;
