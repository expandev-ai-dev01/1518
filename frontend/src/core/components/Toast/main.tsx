import { useEffect } from 'react';
import { ToastProps } from './types';
import { cn } from '@/core/utils';

export const Toast = ({ product, onClose, onGoToCart }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h4>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-2"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-green-600 font-medium mb-2">✓ Adicionado ao carrinho</p>
            <p className="text-lg font-bold text-gray-900 mb-3">R$ {product.price.toFixed(2)}</p>
            <button
              onClick={onGoToCart}
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Ir para o Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
