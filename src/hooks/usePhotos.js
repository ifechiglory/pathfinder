import { useQuery } from '@tanstack/react-query'
import { photosAPI } from '../services/api'

export const usePhotos = (locationName) => {
  return useQuery({
    queryKey: ['photos', locationName],
    queryFn: () => photosAPI.getPhotos(locationName),
    enabled: !!locationName,
    staleTime: 15 * 60 * 1000,
  })
}