const ROUTES = {
  BASE_ROUTE: '/',
  PRODUCT_DETAIL: '/product/:id'
} as const;

export const getProductDetailPath = (id: number | string) => `/product/${id}`;

export default ROUTES;
