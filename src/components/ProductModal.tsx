import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    console.log('Adding to cart from modal:', { product: product.name, size: selectedSize, color: selectedColor });
    addItem(product, selectedSize, selectedColor);
    toast({
      title: "Producto agregado",
      description: `${product.name} agregado al carrito`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-2">
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
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <p className="text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500">(4.8)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Talla:
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-2 border rounded text-sm ${
                          selectedSize === size
                            ? 'border-green-600 bg-green-50 text-green-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color:
                  </label>
                  <div className="space-y-2">
                    {product.colors.map(color => (
                      <label key={color} className="flex items-center">
                        <input
                          type="radio"
                          name="color"
                          value={color}
                          checked={selectedColor === color}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="mr-2"
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 mb-4"
                onClick={handleAddToCart}
              >
                Agregar al Carrito - ${product.price}
              </Button>

              <div>
                <h3 className="font-semibold mb-2">Características:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;