'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoffeeItem } from '@/data/items';

export interface CartItem {
  item: CoffeeItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CoffeeItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('coffee_shop_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedPromo = localStorage.getItem('coffee_shop_promo');
      if (savedPromo) {
        setAppliedPromo(savedPromo);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('coffee_shop_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, mounted]);

  const addToCart = (item: CoffeeItem, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity } : ci
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('coffee_shop_cart');
      localStorage.removeItem('coffee_shop_promo');
    }
  };

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CARAMEL10' || clean === 'BREW10' || clean === 'COFFEE10') {
      setAppliedPromo(clean);
      if (typeof window !== 'undefined') {
        localStorage.setItem('coffee_shop_promo', clean);
      }
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('coffee_shop_promo');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.item.priceAED * item.quantity,
    0
  );
  
  // Free delivery over 100 AED, otherwise 15 AED in UAE
  const deliveryFee = subtotal === 0 || subtotal >= 100 ? 0 : 15;
  
  // 10% discount if promo applied
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        discount,
        appliedPromo,
        applyPromo,
        removePromo,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
