"use client";

import { create } from "zustand";

type AuthModalMode = "login" | "register";

interface AuthModalStore {
  isOpen: boolean;
  mode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  setMode: (mode: AuthModalMode) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  mode: "login",
  openAuthModal: (mode = "login") => set({ isOpen: true, mode }),
  closeAuthModal: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode })
}));
