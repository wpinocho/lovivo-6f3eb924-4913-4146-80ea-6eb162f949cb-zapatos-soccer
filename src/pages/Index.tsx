import React, { useState, useMemo, useEffect } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import ProductFilters from '@/components/ProductFilters';
import Cart from '@/components/Cart';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Trophy, Zap } from 'lucide-react';

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
  const [scrollY, setScrollY] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    brand: [],
    category: '',
    priceRange: [0, 500],
    onSale: false
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={handleCartClick} onMenuClick={handleMenuClick} />
        
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-700 to-blue-800">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Soccer Balls */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-white rounded-full opacity-10 animate-bounce" 
                 style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-white rounded-full opacity-10 animate-bounce" 
                 style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-bounce" 
                 style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            
            {/* Geometric Shapes */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-white opacity-20 rotate-45 animate-spin" 
                 style={{ animationDuration: '20s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-4 border-green-300 opacity-30 animate-pulse"></div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse" 
                 style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" 
                 style={{ transform: `translateY(${-scrollY * 0.3}px)`, animationDelay: '2s' }}></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Equipamiento Profesional</span>
              </div>

              {/* Main Title with Animation */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  DOMINA
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up" 
                      style={{ animationDelay: '0.4s' }}>
                  LA CANCHA
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-2xl mx-auto animate-fade-in-up" 
                 style={{ animationDelay: '0.6s' }}>
                Descubre la colección más completa de zapatos de soccer profesionales. 
                Velocidad, control y precisión en cada jugada.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" 
                   style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Tecnología Avanzada</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Calidad Premium</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Rendimiento Pro</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" 
                   style={{ animationDelay: '1s' }}>
                <Button 
                  size="lg" 
                  className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={scrollToProducts}
                >
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  Ver Ofertas Especiales
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div id="products-section" className="container mx-auto px-4 py-8">
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
              <div className="text-center group">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-gray-800">Nike</h3>
                </div>
                <p className="text-gray-600">Innovación y rendimiento</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-gray-800">Adidas</h3>
                </div>
                <p className="text-gray-600">Tradición y calidad</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-4 transform group-hover:scale-105 transition-transform duration-300">
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </CartProvider>
  );
};

export default Index;