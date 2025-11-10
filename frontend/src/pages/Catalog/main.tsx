import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { useCartStore } from '@/domain/cart/stores';
import { ProductCard } from '@/core/components/ProductCard';
import { Pagination } from '@/core/components/Pagination';
import { Toast } from '@/core/components/Toast';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { Product } from '@/domain/product/types';
import type { CatalogPageProps } from './types';

export const CatalogPage = (props: CatalogPageProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [toastProduct, setToastProduct] = useState<Product | null>(null);

  const {
    products,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    setPage,
    setLimit,
    setSortBy,
  } = useProductList();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setToastProduct(product);
  };

  const handleViewDetails = (productId: string) => {
    console.log('View details:', productId);
  };

  const handleCloseToast = () => {
    setToastProduct(null);
  };

  const handleGoToCart = () => {
    setToastProduct(null);
    console.log('Navigate to cart');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar produtos</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Bolos</h1>
        <p className="text-gray-600">
          {total} {total === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Ordenar por:
          </label>
          <select
            id="sort"
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="relevance">Relevância</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
            <option value="name_asc">Nome (A-Z)</option>
            <option value="name_desc">Nome (Z-A)</option>
            <option value="rating">Melhor Avaliação</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium text-gray-700">
            Itens por página:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {toastProduct && (
        <Toast product={toastProduct} onClose={handleCloseToast} onGoToCart={handleGoToCart} />
      )}
    </div>
  );
};

export default CatalogPage;
