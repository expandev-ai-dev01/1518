import type { Product, ProductListParams, ProductListResponse } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bolo de Chocolate Premium',
    description: 'Delicioso bolo de chocolate com cobertura de ganache',
    shortDescription: 'Bolo de chocolate com ganache premium',
    price: 89.9,
    originalPrice: 119.9,
    image: '/img/bolos/chocolate.jpg',
    rating: 4.8,
    reviewCount: 127,
    available: true,
    category: 'chocolate',
    discountPercentage: 25,
  },
  {
    id: '2',
    name: 'Bolo Red Velvet',
    description: 'Clássico bolo red velvet com cream cheese',
    shortDescription: 'Red velvet com cream cheese',
    price: 95.0,
    image: '/img/bolos/red-velvet.jpg',
    rating: 4.9,
    reviewCount: 203,
    available: true,
    category: 'especial',
  },
  {
    id: '3',
    name: 'Bolo de Cenoura com Chocolate',
    description: 'Tradicional bolo de cenoura com cobertura de chocolate',
    shortDescription: 'Cenoura com cobertura de chocolate',
    price: 65.0,
    originalPrice: 75.0,
    image: '/img/bolos/cenoura.jpg',
    rating: 4.7,
    reviewCount: 89,
    available: true,
    category: 'tradicional',
    discountPercentage: 13,
  },
  {
    id: '4',
    name: 'Bolo de Morango',
    description: 'Bolo recheado com morangos frescos e chantilly',
    shortDescription: 'Morango com chantilly',
    price: 98.0,
    image: '/img/bolos/morango.jpg',
    rating: 4.6,
    reviewCount: 156,
    available: true,
    category: 'frutas',
  },
  {
    id: '5',
    name: 'Bolo de Limão',
    description: 'Refrescante bolo de limão com cobertura de merengue',
    shortDescription: 'Limão com merengue',
    price: 72.0,
    image: '/img/bolos/limao.jpg',
    rating: 4.5,
    reviewCount: 94,
    available: true,
    category: 'frutas',
  },
  {
    id: '6',
    name: 'Bolo Floresta Negra',
    description: 'Bolo de chocolate com cerejas e chantilly',
    shortDescription: 'Chocolate com cerejas',
    price: 105.0,
    originalPrice: 130.0,
    image: '/img/bolos/floresta-negra.jpg',
    rating: 4.9,
    reviewCount: 178,
    available: true,
    category: 'especial',
    discountPercentage: 19,
  },
  {
    id: '7',
    name: 'Bolo de Coco',
    description: 'Bolo de coco com cobertura de coco ralado',
    shortDescription: 'Coco com cobertura especial',
    price: 68.0,
    image: '/img/bolos/coco.jpg',
    rating: 4.4,
    reviewCount: 67,
    available: true,
    category: 'tradicional',
  },
  {
    id: '8',
    name: 'Bolo de Nozes',
    description: 'Bolo com nozes e cobertura de caramelo',
    shortDescription: 'Nozes com caramelo',
    price: 92.0,
    image: '/img/bolos/nozes.jpg',
    rating: 4.7,
    reviewCount: 112,
    available: false,
    category: 'especial',
  },
  {
    id: '9',
    name: 'Bolo de Banana',
    description: 'Bolo de banana com canela e cobertura de açúcar',
    shortDescription: 'Banana com canela',
    price: 58.0,
    originalPrice: 70.0,
    image: '/img/bolos/banana.jpg',
    rating: 4.3,
    reviewCount: 81,
    available: true,
    category: 'tradicional',
    discountPercentage: 17,
  },
  {
    id: '10',
    name: 'Bolo de Maracujá',
    description: 'Bolo de maracujá com mousse de maracujá',
    shortDescription: 'Maracujá com mousse',
    price: 88.0,
    image: '/img/bolos/maracuja.jpg',
    rating: 4.8,
    reviewCount: 145,
    available: true,
    category: 'frutas',
  },
  {
    id: '11',
    name: 'Bolo Ópera',
    description: 'Sofisticado bolo francês com camadas de café e chocolate',
    shortDescription: 'Bolo francês café e chocolate',
    price: 125.0,
    image: '/img/bolos/opera.jpg',
    rating: 5.0,
    reviewCount: 89,
    available: true,
    category: 'especial',
  },
  {
    id: '12',
    name: 'Bolo de Abacaxi',
    description: 'Bolo de abacaxi invertido caramelizado',
    shortDescription: 'Abacaxi caramelizado',
    price: 75.0,
    originalPrice: 85.0,
    image: '/img/bolos/abacaxi.jpg',
    rating: 4.6,
    reviewCount: 98,
    available: true,
    category: 'frutas',
    discountPercentage: 12,
  },
  {
    id: '13',
    name: 'Bolo de Pistache',
    description: 'Bolo de pistache com cobertura de creme',
    shortDescription: 'Pistache com creme',
    price: 110.0,
    image: '/img/bolos/pistache.jpg',
    rating: 4.7,
    reviewCount: 76,
    available: true,
    category: 'especial',
  },
  {
    id: '14',
    name: 'Bolo de Fubá',
    description: 'Tradicional bolo de fubá cremoso',
    shortDescription: 'Fubá cremoso tradicional',
    price: 52.0,
    image: '/img/bolos/fuba.jpg',
    rating: 4.5,
    reviewCount: 134,
    available: true,
    category: 'tradicional',
  },
  {
    id: '15',
    name: 'Bolo de Laranja',
    description: 'Bolo de laranja com calda de laranja',
    shortDescription: 'Laranja com calda',
    price: 62.0,
    image: '/img/bolos/laranja.jpg',
    rating: 4.4,
    reviewCount: 91,
    available: true,
    category: 'frutas',
  },
];

const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'relevance':
    default:
      return sorted.sort((a, b) => {
        const scoreA = a.rating * a.reviewCount + (a.discountPercentage || 0);
        const scoreB = b.rating * b.reviewCount + (b.discountPercentage || 0);
        return scoreB - scoreA;
      });
  }
};

export const productService = {
  async list(params: ProductListParams = {}): Promise<ProductListResponse> {
    const { page = 1, limit = 12, sortBy = 'relevance', category } = params;

    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredProducts = [...MOCK_PRODUCTS];

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    const sortedProducts = sortProducts(filteredProducts, sortBy);

    const total = sortedProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = sortedProducts.slice(startIndex, endIndex);

    return {
      products,
      total,
      page,
      limit,
      totalPages,
    };
  },

  async getById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  },
};
