import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Category,
  Product,
  ProductResponse,
  ProductsByCategoryParams,
  ProductsQueryParams
} from '@/types/product.types';
import { API_BASE_URL } from '@/constants/globalConstants';
import { createParamsPayload } from '@utils/createParamsPayload';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL || 'https://dummyjson.com' }),
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductsQueryParams | void>({
      query: (params) => ({
        url: '/products',
        params: createParamsPayload(params)
      }),
      providesTags: ['Products']
    }),

    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories',
      providesTags: ['Categories']
    }),

    getProductsByCategory: builder.query<ProductResponse, ProductsByCategoryParams>({
      query: ({ category, ...params }) => ({
        url: `/products/category/${category}`,
        params: createParamsPayload(params)
      }),
      providesTags: ['Products']
    }),

    getProductById: builder.query<Product, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Products']
    })
  })
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery
} = productApi;
