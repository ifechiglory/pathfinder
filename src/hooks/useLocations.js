import { useQuery } from '@tanstack/react-query'
import { locationsAPI } from '../services/api'

// Query keys for caching
export const locationKeys = {
  all: ['locations'],
  lists: () => [...locationKeys.all, 'list'],
  list: (filters) => [...locationKeys.lists(), { filters }],
  details: () => [...locationKeys.all, 'detail'],
  detail: (id) => [...locationKeys.details(), id],
}

// Hook to fetch all locations
export const useLocations = (searchQuery) => {
  return useQuery({
    queryKey: locationKeys.list(searchQuery || ''),
    queryFn: () => locationsAPI.getLocations(searchQuery),
    staleTime: 5 * 60 * 1000,
  })
}

// Hook to fetch single location
export const useLocation = (id) => {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => locationsAPI.getLocation(id),
    enabled: !!id,
  })
}