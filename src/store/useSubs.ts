"use client";

import { create } from "zustand";
import { usePagination } from "@/hooks/usePagination";

interface SubsState {
  packages: Packages[] | null;
  loading: boolean;
  setPackages: (packages:Packages[]) => void;
}

export const useSubsStore = create<SubsState>()(
    (set) => ({
        packages: null,
        loading: true,
        setPackages: (packages) => {
        set({ loading: false, packages: packages })
        },
    }),
);
