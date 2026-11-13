"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/dummy-data";

interface WishlistStore {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const { items } = get();
        if (!items.some((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },

      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.some((item) => item.id === product.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: "myshop-wishlist-storage"
    }
  )
);
