import type { Product } from '@/types/product.types';
import type { Category } from '@/types/product.types';
import type { ProductFiltersValue } from '@components/ProductFilters';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ListViewState = {
  filters: ProductFiltersValue;
  headerSearch: string;
  page: number;
  mobileFiltersOpen: boolean;
};

export type ListHelperResult = {
  filters: ProductFiltersValue;
  headerSearch: string;
  page: number;
  mobileFiltersOpen: boolean;
  isDesktop: boolean;
  categories: Category[];
  brands: string[];
  visibleProducts: Product[];
  totalPages: number;
  showLoading: boolean;
  isError: boolean;
  errorMessage: string;
  handleFiltersChange: (next: ProductFiltersValue) => void;
  handleHeaderSearchChange: (value: string) => void;
  handlePageChange: (nextPage: number) => void;
  handleOpenMobileFilters: () => void;
  handleCloseMobileFilters: () => void;
  handleRetry: () => void;
};

export type ListQueryError = FetchBaseQueryError | SerializedError | undefined;
