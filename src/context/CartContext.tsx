"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const STORAGE_KEY = "tuli-cart";

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage full or unavailable
  }
}

// Module-level singleton store — safe because CartProvider is mounted once in layout
let cartData: CartItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    cartData = loadCart();
  }
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function getSnapshot() {
  return cartData;
}

const EMPTY_CART: CartItem[] = [];
function getServerSnapshot() {
  return EMPTY_CART;
}

function setCartData(updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) {
  cartData = typeof updater === "function" ? updater(cartData) : updater;
  saveCart(cartData);
  notify();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = useCallback((item: CartItem) => {
    setCartData((prev) => {
      const existing = prev.findIndex(
        (c) => c.id === item.id && c.selectedColor === item.selectedColor
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + item.qty };
        return updated;
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCartData((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, qty: number) => {
    if (qty < 1) return;
    setCartData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], qty };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartData([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
