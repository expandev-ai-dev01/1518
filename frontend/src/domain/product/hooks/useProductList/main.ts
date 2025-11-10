import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions, UseProductListReturn } from './types';
import type { ProductListParams } from '../../types';

export const useProductList = (options: UseProductListOptions = {}): UseProductListReturn => {
  const { initialParams = {} } = options;

  const [page, setPage] = useState(initialParams.page || 1);
  const [limit, setLimit] = useState(initialParams.limit || 12);
  const [sortBy, setSortBy] = useState<ProductListParams['sortBy']>(
    initialParams.sortBy || 'relevance'
  );

  const queryKey = useMemo(() => ['products', { page, limit, sortBy }], [page, limit, sortBy]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list({ page, limit, sortBy }),
    staleTime: 2 * 60 * 1000,
  });

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const handleSetLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSetSortBy = (newSortBy: ProductListParams['sortBy']) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  return {
    products: data?.products || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    totalPages: data?.totalPages || 0,
    isLoading,
    error: error as Error | null,
    setPage: handleSetPage,
    setLimit: handleSetLimit,
    setSortBy: handleSetSortBy,
    refetch,
  };
};
