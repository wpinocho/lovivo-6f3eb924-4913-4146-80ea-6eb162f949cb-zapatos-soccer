import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    console.log('Updating quantity:', { itemId, newQuantity });
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    console.log('Removing item:', itemId);
    removeItem(itemId);
  };

  const getItemId = (item: any) => `${item.product.id}-${item.size}-${item.color}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Carrito de Compras</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
              <Button onClick={onClose}>Continuar Comprando</Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => {
                  const itemId = getItemId(item);
                  return (
                    <Card key={itemId}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.product.name}</h3>
                            <p className="text-xs text-gray-500">{item.product.brand}</p>
                            <p className="text-xs text-gray-500">
                              Talla: {item.size} | Color: {item.color}
                            </p>
                            <p className="font-semibold text-green-600">
                              ${item.product.price}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(itemId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Proceder al Pago
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;