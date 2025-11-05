import { useQuery } from '@tanstack/react-query'
import { weatherAPI } from '../services/api'

export const useWeather = (lat, lon) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => weatherAPI.getWeather(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 10 * 60 * 1000,
  })
}