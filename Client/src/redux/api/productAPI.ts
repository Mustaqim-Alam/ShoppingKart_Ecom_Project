import {
  deleteProductRequest,
  ProductResponse,
  updateProductRequest,
} from "./../../types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  adminProductResponse,
  CategoriesResponse,
  MessageResponse,
  newProductRequest,
  AllproductResponse,
  SearchProductRequest,
  SearchProductResponse,
} from "../../types/apiTypes";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllproductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),

    allProducts: builder.query<adminProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),

    categories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),

    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all-products?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category${category}`;
        return base;
      },
      providesTags: ["product"],
    }),
    
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, newProductRequest>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<MessageResponse, updateProductRequest>({
      query: ({ userId, productId, formData }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
