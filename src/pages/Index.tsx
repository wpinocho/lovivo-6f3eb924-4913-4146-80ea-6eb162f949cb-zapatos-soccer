import React, { useState, useMemo } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import ProductFilters from '@/components/ProductFilters';
import Cart from '@/components/Cart';
import { products } from '@/data/products';
import { Product } from '@/types/product';

interface FilterState {
  brand: string[];
  category: string;
  priceRange: [number, number];
  onSale: boolean;
}

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    brand: [],
    category: '',
    priceRange: [0, 500],
    onSale: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by brand
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false;
      }

      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Filter by price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Filter by sale status
      if (filters.onSale && !product.isOnSale) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleProductClick = (product: Product) => {
    console.log('Product selected:', product.name);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCartClick = () => {
    console.log('Cart opened');
    setIsCartOpen(true);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={handleCartClick} onMenuClick={handleMenuClick} />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Los Mejores Zapatos de Soccer
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Encuentra el calzado perfecto para tu juego
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Ver Productos
            </button>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4">
              <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                <ProductFilters filters={filters} onFiltersChange={setFilters} />
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Productos ({filteredProducts.length})
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No se encontraron productos con los filtros seleccionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Featured Brands Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Marcas Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-8 mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Nike</h3>
                </div>
                <p className="text-gray-600">Innovación y rendimiento</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-8 mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Adidas</h3>
                </div>
                <p className="text-gray-600">Tradición y calidad</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-8 mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Puma</h3>
                </div>
                <p className="text-gray-600">Velocidad y agilidad</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">SoccerShop</h3>
                <p className="text-gray-400">
                  Tu tienda de confianza para zapatos de soccer de alta calidad.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Productos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Terreno Firme</li>
                  <li>Césped Artificial</li>
                  <li>Sala/Fútsal</li>
                  <li>Ofertas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Ayuda</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Guía de Tallas</li>
                  <li>Envíos</li>
                  <li>Devoluciones</li>
                  <li>Contacto</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Síguenos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>Twitter</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SoccerShop. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
};

export default Index;