import type { Product } from '@/types/product.types';

export type ClientProductFilters = {
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};


export const applyClientProductFilters = (
  products: Product[],
  filters: ClientProductFilters
): Product[] => {
  return products.filter((product) => {
    const matchesBrand =
      filters.brands.length === 0 ||
      (product.brand ? filters.brands.includes(product.brand) : false);

    // DummyJSON does not provide server-side min/max price filtering,
    // so price filtering is intentionally performed on the client.
    const matchesMin = filters.minPrice == null || product.price >= filters.minPrice;
    const matchesMax = filters.maxPrice == null || product.price <= filters.maxPrice;

    const search = filters.search?.trim().toLowerCase();
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      (product.brand?.toLowerCase().includes(search) ?? false);

    return matchesBrand && matchesMin && matchesMax && matchesSearch;
  });
};

export const extractUniqueBrands = (products: Product[]): string[] => {
  const brands = products
    .map((product) => product.brand)
    .filter((brand): brand is string => Boolean(brand));

  return [...new Set(brands)].sort((a, b) => a.localeCompare(b));
};

export const parseOptionalPrice = (value: string): number | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? undefined : parsed;
};
