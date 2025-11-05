import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      
      // Actions
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      register: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      updateProfile: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      }))
    }),
    {
      name: 'auth-storage',
    }
  )
)