"use client";

import { create } from "zustand";
import { apiClient } from "@/lib/fetchApi";


interface StrategyState {
  strategies: Strategy[] | null;
  subStrategy: SubStrategy | null;
  activeId: number | null;
  loading: boolean;
  getActiveStrategy: () => void;
  getStrategies: () => void;
}

export const useStrategyStore = create<StrategyState>()(
    (set) => ({
      strategies: null,
      subStrategy: null,
      activeId: null,
      loading: true,
      getActiveStrategy: async () => {
        try {
          const result = await apiClient.post<SubStrategy>('/strategy/active')
          if (result.code === 0) {
              set({ subStrategy: result.data || null, activeId:result.data?.strategyId })
          }
        } catch (error) {
        }
      },
      getStrategies: async () => {
        try {
          const result = await apiClient.post<Strategy[]>('/strategy/data')
          if (result.code === 0) {
              set({ strategies: result.data })
          }
          set({ loading: false })
        } catch (error) {
          set({ loading: false })
        }
      },
    }),
);
