import { ProductCardProps } from './types';
import { cn } from '@/core/utils';

export const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.available && onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ⯨
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer',
        'border border-gray-200 flex flex-col h-full'
      )}
    >
      <div className="relative aspect-square bg-gray-100">
        {product.discountPercentage && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
            -{product.discountPercentage}%
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto">
          <div className="mb-3">
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-2xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={cn(
              'w-full py-2 px-4 rounded-md font-medium transition-colors',
              product.available
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            {product.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
};
