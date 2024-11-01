import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productResponse } from "../../types/apiTypes";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<productResponse, string>({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductsQuery } = productAPI;
