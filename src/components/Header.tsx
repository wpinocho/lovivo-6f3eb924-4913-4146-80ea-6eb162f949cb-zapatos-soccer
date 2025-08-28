import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onMenuClick }) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-green-600">SoccerShop</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Inicio
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Productos
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Marcas
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
              Ofertas
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;