import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUIStore = create(
  devtools(
    (set) => ({
      // Initial state
      searchQuery: '',
      selectedLocationId: null,
      isSearchOpen: false,
      
      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedLocation: (id) => set({ selectedLocationId: id }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      clearSearch: () => set({ searchQuery: '' }),
    }),
    {
      name: 'ui-store',
    }
  )
)