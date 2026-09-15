import type { Product } from '@/types/product.types';

export const getDiscountedPrice = (product: Pick<Product, 'price' | 'discountPercentage'>) => {
  if (!product.discountPercentage) {
    return product.price;
  }

  return Number((product.price * (1 - product.discountPercentage / 100)).toFixed(2));
};

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const formatCategoryLabel = (category: string) =>
  category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
