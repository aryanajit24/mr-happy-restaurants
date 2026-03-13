// Design: Warm Mediterranean Bistro
// Cart context for global cart state management

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { MenuItem } from '../data/menuItems';
import type { IngredientCustomization } from '../data/customizationRules';

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  ingredientCustomizations: IngredientCustomization[];
  selectedExtras: Array<{ name: string; price: number }>;
  selectedSauces: string[];
  selectedDips: string[];
  selectedDrinks: string[];
  specialInstructions: string;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (cartItem: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const addToCart = useCallback((cartItem: Omit<CartItem, 'cartId'>) => {
    const cartId = `${cartItem.item.id}-${Date.now()}`;
    setItems((prev) => [...prev, { ...cartItem, cartId }]);
    if (!restaurantId) setRestaurantId(cartItem.item.restaurantId);
  }, [restaurantId]);

  const removeFromCart = useCallback((cartId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.cartId !== cartId);
      if (next.length === 0) setRestaurantId(null);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => {
        const next = prev.filter((i) => i.cartId !== cartId);
        if (next.length === 0) setRestaurantId(null);
        return next;
      });
    } else {
      setItems((prev) =>
        prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, restaurantId }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
