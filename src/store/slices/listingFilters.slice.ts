import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  ALL_CATEGORIES_VALUE,
  type ProductFiltersValue
} from '@components/ProductFilters';
import { DEFAULT_PAGE } from '@constants/ui.constants';
import type { RootState } from '@store/index';

export type ListingFiltersState = {
  filters: ProductFiltersValue;
  headerSearch: string;
  page: number;
};

const initialState: ListingFiltersState = {
  filters: {
    category: ALL_CATEGORIES_VALUE,
    brands: [],
    minPrice: '',
    maxPrice: ''
  },
  headerSearch: '',
  page: DEFAULT_PAGE
};

const listingFiltersSlice = createSlice({
  name: 'listingFilters',
  initialState,
  reducers: {
    setListingFilters(state, action: PayloadAction<ProductFiltersValue>) {
      state.filters = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setListingHeaderSearch(state, action: PayloadAction<string>) {
      state.headerSearch = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setListingPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setListingBrands(state, action: PayloadAction<string[]>) {
      state.filters.brands = action.payload;
    }
  }
});

export const {
  setListingFilters,
  setListingHeaderSearch,
  setListingPage,
  setListingBrands
} = listingFiltersSlice.actions;

export const selectListingFilters = (state: RootState) => state.listingFilters.filters;
export const selectListingHeaderSearch = (state: RootState) => state.listingFilters.headerSearch;
export const selectListingPage = (state: RootState) => state.listingFilters.page;

export default listingFiltersSlice.reducer;
