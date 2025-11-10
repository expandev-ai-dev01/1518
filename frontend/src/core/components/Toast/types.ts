import type { Product } from '@/domain/product/types';

export interface ToastProps {
  product: Product;
  onClose: () => void;
  onGoToCart: () => void;
}
