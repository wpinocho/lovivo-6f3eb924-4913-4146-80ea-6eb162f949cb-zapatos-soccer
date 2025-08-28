import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: number; color: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, size: number, color: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          total: state.total + product.price
        };
      } else {
        const newItem: CartItem = {
          product,
          size,
          color,
          quantity: 1
        };
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + product.price
        };
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => 
        `${item.product.id}-${item.size}-${item.color}` === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(item => 
          `${item.product.id}-${item.size}-${item.color}` !== action.payload
        ),
        total: state.total - (itemToRemove.product.price * itemToRemove.quantity)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => 
        `${item.product.id}-${item.size}-${item.color}` === id
      );
      
      if (itemIndex === -1) return state;

      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => 
            `${item.product.id}-${item.size}-${item.color}` !== id
          ),
          total: state.total - (item.product.price * item.quantity)
        };
      }

      const updatedItems = [...state.items];
      updatedItems[itemIndex].quantity = quantity;

      return {
        ...state,
        items: updatedItems,
        total: state.total + (item.product.price * quantityDiff)
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (product: Product, size: number, color: string) => {
    console.log('Adding item to cart:', { product: product.name, size, color });
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color } });
  };

  const removeItem = (id: string) => {
    console.log('Removing item from cart:', id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log('Updating quantity:', { id, quantity });
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};