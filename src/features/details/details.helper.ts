import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTES from '@routes/routes';
import { useGetProductByIdQuery } from '@store/api/productApi';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  selectListingHeaderSearch,
  setListingHeaderSearch
} from '@store/slices/listingFilters.slice';
import { getQueryErrorMessage } from '@utils/getQueryErrorMessage';
import { formatCategoryLabel, getDiscountedPrice } from '@utils/product.utils';
import type { DetailsRouteParams } from './details.interface';
import type { Product } from '@/types/product.types';

const getGallery = (product: Product | undefined, activeImage: number) => {
  const images = product
    ? [...new Set((product.images?.length ? product.images : [product.thumbnail]).filter(Boolean))]
    : [];
  const imagePage = Math.min(activeImage, Math.max(images.length, 1));
  return {
    images,
    imagePage,
    currentImage: images[imagePage - 1] || product?.thumbnail || ''
  };
};

export const useDetailsHelper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: productId = '' } = useParams<DetailsRouteParams>();
  const headerSearch = useAppSelector(selectListingHeaderSearch);
  const [activeImage, setActiveImage] = useState(1);

  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useGetProductByIdQuery(productId, { skip: !productId });

  const { images, imagePage, currentImage } = useMemo(
    () => getGallery(data, activeImage),
    [activeImage, data]
  );

  return {
    productId,
    product: data,
    images,
    imagePage,
    currentImage,
    finalPrice: data ? getDiscountedPrice(data) : 0,
    categoryLabel: data ? formatCategoryLabel(data.category) : '',
    brandLabel: data?.brand || 'N/A',
    reviews: data?.reviews ?? [],
    headerSearch,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isNotFound: Boolean(productId && isSuccess && !data && !isLoading),
    showProduct: Boolean(productId && isSuccess && data && !isFetching),
    errorMessage: getQueryErrorMessage(error),
    handleHeaderSearchChange: (value: string) => dispatch(setListingHeaderSearch(value)),
    handleBack: () => navigate(ROUTES.BASE_ROUTE),
    handleImagePageChange: setActiveImage,
    handleRetry: refetch
  };
};
