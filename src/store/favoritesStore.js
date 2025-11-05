import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (locationId) => 
        set((state) => ({ 
          favorites: [...state.favorites, locationId] 
        })),
      
      removeFavorite: (locationId) =>
        set((state) => ({
          favorites: state.favorites.filter(id => id !== locationId)
        })),
      
      toggleFavorite: (locationId) => {
        const { favorites, addFavorite, removeFavorite } = get()
        if (favorites.includes(locationId)) {
          removeFavorite(locationId)
        } else {
          addFavorite(locationId)
        }
      },
      
      isFavorite: (locationId) => 
        get().favorites.includes(locationId),
      
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
)