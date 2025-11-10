import type { Product } from '@/domain/product/types';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (productId: string) => void;
}
