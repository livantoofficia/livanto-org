import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentlyViewedStore {
  handles: string[];
  add: (handle: string) => void;
  clear: () => void;
}

const MAX = 8;

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      handles: [],
      add: (handle) => {
        if (!handle) return;
        const filtered = get().handles.filter((h) => h !== handle);
        set({ handles: [handle, ...filtered].slice(0, MAX) });
      },
      clear: () => set({ handles: [] }),
    }),
    {
      name: "livanto-recently-viewed",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
