import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Adding to cart:', { product: product.name, size: selectedSize, color: selectedColor });
    addItem(product, selectedSize, selectedColor);
    toast({
      title: "Producto agregado",
      description: `${product.name} agregado al carrito`,
    });
  };

  const handleCardClick = () => {
    console.log('Product card clicked:', product.name);
    onProductClick(product);
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={handleCardClick}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="default" className="bg-blue-500">
                Nuevo
              </Badge>
            )}
            {product.isOnSale && (
              <Badge variant="destructive">
                Oferta
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Talla:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="ml-2 text-sm border rounded px-2 py-1"
              >
                {product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="ml-2 text-sm border rounded px-2 py-1"
              >
                {product.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;