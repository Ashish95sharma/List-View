import { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import LazyLoader from './LazyLoader';
import ROUTES from './routes';

const ProductListing = LazyLoader(lazy(() => import('@features/list')));
const ProductDetails = LazyLoader(lazy(() => import('@features/details')));
const NotFound = LazyLoader(lazy(() => import('@pages/NotFound')));

const routes: RouteObject[] = [
  {
    path: ROUTES.BASE_ROUTE,
    element: <ProductListing />
  },
  {
    path: ROUTES.PRODUCT_DETAIL,
    element: <ProductDetails />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export const RouteManager = () => {
  return useRoutes(routes);
};
