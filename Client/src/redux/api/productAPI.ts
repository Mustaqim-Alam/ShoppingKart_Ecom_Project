import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  adminProductResponse,
  CategoriesResponse,
  MessageResponse,
  newProductRequest,
  productResponse,
  SearchProductRequest,
  SearchProductResponse,
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
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all-products?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category${category}`;
        return base;
      },
    }),
    newProduct: builder.mutation<MessageResponse, newProductRequest>({
      query: ({ id, formData }) => ({
        url: `new?id${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
} = productAPI;
