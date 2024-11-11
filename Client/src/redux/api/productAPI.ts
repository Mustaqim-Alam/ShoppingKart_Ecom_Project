import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  adminProductResponse,
  CategoriesResponse,
  productResponse,
} from "../../types/apiTypes";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<productResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<adminProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
    }),
  }),
});

export const { useLatestProductsQuery, useAllProductsQuery } = productAPI;
