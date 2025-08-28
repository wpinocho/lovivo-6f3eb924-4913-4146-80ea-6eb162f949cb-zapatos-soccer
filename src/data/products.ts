import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Mercurial Vapor 15 Elite',
    brand: 'Nike',
    price: 275,
    originalPrice: 300,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop',
    category: 'firm-ground',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Negro/Oro', 'Blanco/Azul', 'Rojo/Negro'],
    description: 'Diseñados para velocidad explosiva en terreno firme.',
    features: ['Suela de carbono', 'Upper sintético', 'Ajuste ceñido'],
    isNew: true,
    isOnSale: true
  },
  {
    id: '2',
    name: 'Predator Accuracy.1',
    brand: 'Adidas',
    price: 250,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
    category: 'firm-ground',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Negro/Rojo', 'Blanco/Negro', 'Azul/Blanco'],
    description: 'Control y precisión absolutos en cada toque.',
    features: ['Tecnología FACET', 'Suela Controlframe', 'Upper Hybridtouch'],
    isNew: true
  },
  {
    id: '3',
    name: 'Future 7 Ultimate',
    brand: 'Puma',
    price: 220,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
    category: 'firm-ground',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Verde/Negro', 'Blanco/Dorado', 'Negro/Naranja'],
    description: 'Libertad de movimiento y agilidad extrema.',
    features: ['Sistema FUZIONFIT360', 'Suela Dynamic Motion', 'Upper adaptativo']
  },
  {
    id: '4',
    name: 'Phantom GX Elite',
    brand: 'Nike',
    price: 230,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=500&fit=crop',
    category: 'firm-ground',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Blanco/Negro', 'Negro/Blanco', 'Azul/Blanco'],
    description: 'Precisión y potencia en cada disparo.',
    features: ['Tecnología Gripknit', 'Suela Cyclone 360', 'Zona de golpeo texturizada']
  },
  {
    id: '5',
    name: 'Copa Pure.1',
    brand: 'Adidas',
    price: 200,
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    category: 'firm-ground',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Negro/Blanco', 'Blanco/Negro', 'Marrón/Oro'],
    description: 'Comodidad clásica con tecnología moderna.',
    features: ['Upper de cuero K', 'Suela Controlframe', 'Acolchado premium'],
    isOnSale: true
  },
  {
    id: '6',
    name: 'Ultra Ultimate',
    brand: 'Puma',
    price: 180,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
    category: 'artificial-grass',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Amarillo/Negro', 'Blanco/Azul', 'Negro/Rojo'],
    description: 'Velocidad y agilidad en césped artificial.',
    features: ['Upper MATRYXEVO', 'Suela SpeedUnit', 'Diseño ultraligero']
  }
];