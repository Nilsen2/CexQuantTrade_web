"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/lib/fetchApi";

interface User {
  uid?: string;
  pid?: string;
  userName?: string;
  nickName?: string;
  email?: string;
  phone?: string;
  balance?: number;
  freezeBalance?: number;
}

interface AuthState {
  user: User | null;
  token: string | null | undefined;
  isLogged: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogged: false,
      token: null,
      setUser: (user) => set({ user, isLogged: !!user }),
      setToken: (token) => {
        set({ token })
        apiClient.setAuthToken(token as string)
      },
      logout: () => {
        set({ user: null, token: null, isLogged: false })
        apiClient.clearAuthToken()
      },
    }),
    {
      name: "auth-store", // localStorage key
    }
  )
);
