import type { Product } from '@/types/product.types';
import type { ProductReview } from '@/types/product.types';

export type DetailsRouteParams = {
  id?: string;
};

export type ProductImageGallery = {
  images: string[];
  imagePage: number;
  currentImage: string;
};

export type DetailsViewModel = {
  productId: string;
  product?: Product;
  images: string[];
  imagePage: number;
  currentImage: string;
  finalPrice: number;
  categoryLabel: string;
  brandLabel: string;
  reviews: ProductReview[];
  headerSearch: string;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isNotFound: boolean;
  errorMessage: string;
};
