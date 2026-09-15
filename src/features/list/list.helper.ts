import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ALL_CATEGORIES_VALUE, type ProductFiltersValue } from '@components/ProductFilters';
import { DEFAULT_LIMIT } from '@constants/ui.constants';
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery
} from '@store/api/productApi';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  selectListingFilters,
  selectListingHeaderSearch,
  selectListingPage,
  setListingBrands,
  setListingFilters,
  setListingHeaderSearch,
  setListingPage
} from '@store/slices/listingFilters.slice';
import type { ProductsQueryParams } from '@/types/product.types';
import { createParamsPayload } from '@utils/createParamsPayload';
import { getQueryErrorMessage } from '@utils/getQueryErrorMessage';
import {
  applyClientProductFilters,
  extractUniqueBrands,
  parseOptionalPrice
} from '@utils/productFilters';

const queryOpts = { refetchOnMountOrArgChange: true } as const;

export const useListHelper = () => {
  const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'));
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectListingFilters);
  const headerSearch = useAppSelector(selectListingHeaderSearch);
  const page = useAppSelector(selectListingPage);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [useServerFilters, setUseServerFilters] = useState(false);

  const selectedCategory =
    filters.category === ALL_CATEGORIES_VALUE ? null : filters.category;
  const skip = (page - 1) * DEFAULT_LIMIT;
  const listParams = createParamsPayload<ProductsQueryParams>({
    limit: DEFAULT_LIMIT,
    skip,
    ...(useServerFilters && {
      brand: filters.brands.join(','),
      minPrice: parseOptionalPrice(filters.minPrice),
      maxPrice: parseOptionalPrice(filters.maxPrice),
      q: headerSearch.trim()
    })
  });

  const categoriesQuery = useGetCategoriesQuery();
  const allQuery = useGetProductsQuery(listParams, {
    skip: !!selectedCategory,
    ...queryOpts
  });
  const categoryQuery = useGetProductsByCategoryQuery(
    { category: selectedCategory ?? '', ...listParams },
    { skip: !selectedCategory, ...queryOpts }
  );

  const productsQuery = selectedCategory ? categoryQuery : allQuery;
  const products = productsQuery.data?.products ?? [];
  const brands = useMemo(() => extractUniqueBrands(products), [products]);

  useEffect(() => {
    const next = filters.brands.filter((brand) => brands.includes(brand));
    if (next.length !== filters.brands.length) dispatch(setListingBrands(next));
  }, [brands, dispatch, filters.brands]);

  const visibleProducts = useMemo(() => {
    if (useServerFilters) return products;
    return applyClientProductFilters(products, {
      brands: filters.brands,
      minPrice: parseOptionalPrice(filters.minPrice),
      maxPrice: parseOptionalPrice(filters.maxPrice),
      search: headerSearch
    });
  }, [useServerFilters, products, filters, headerSearch]);

  const totalPages = Math.max(1, Math.ceil((productsQuery.data?.total ?? 0) / DEFAULT_LIMIT));

  useEffect(() => {
    if (page > totalPages) dispatch(setListingPage(totalPages));
  }, [dispatch, page, totalPages]);

  return {
    filters,
    headerSearch,
    page,
    mobileFiltersOpen,
    isDesktop,
    useServerFilters,
    categories: categoriesQuery.data ?? [],
    brands,
    visibleProducts,
    totalPages,
    showLoading:
      categoriesQuery.isLoading ||
      categoriesQuery.isFetching ||
      productsQuery.isLoading ||
      productsQuery.isFetching,
    isError: categoriesQuery.isError || productsQuery.isError,
    errorMessage: getQueryErrorMessage(categoriesQuery.error || productsQuery.error),
    handleFiltersChange: (next: ProductFiltersValue) => dispatch(setListingFilters(next)),
    handleHeaderSearchChange: (value: string) => dispatch(setListingHeaderSearch(value)),
    handlePageChange: (nextPage: number) => dispatch(setListingPage(nextPage)),
    handleOpenMobileFilters: () => setMobileFiltersOpen(true),
    handleCloseMobileFilters: () => setMobileFiltersOpen(false),
    handleToggleServerFilters: () => setUseServerFilters((prev) => !prev),
    handleRetry: () => {
      categoriesQuery.refetch();
      productsQuery.refetch();
    }
  };
};
