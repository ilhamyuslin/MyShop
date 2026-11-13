"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSession {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

interface UserAuthStore {
  isLoggedIn: boolean;
  user: UserSession | null;
  login: (user?: Partial<UserSession>) => void;
  logout: () => void;
}

export const useUserAuthStore = create<UserAuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: true, // Default to logged in so user can immediately experience profile features
      user: {
        name: "Ilham Yuslin",
        email: "ilham.yuslin@example.com",
        phone: "0812-3456-7890",
      },
      login: (userData) =>
        set({
          isLoggedIn: true,
          user: {
            name: userData?.name || "Ilham Yuslin",
            email: userData?.email || "ilham.yuslin@example.com",
            phone: userData?.phone || "0812-3456-7890",
          },
        }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: "myshop-user-auth",
    }
  )
);
