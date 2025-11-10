import type { Product, ProductListParams } from '../../types';

export interface UseProductListOptions {
  initialParams?: ProductListParams;
}

export interface UseProductListReturn {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: ProductListParams['sortBy']) => void;
  refetch: () => void;
}
