import { countriesAPI, weatherAPI, photosAPI, placesAPI } from './realApis'
import { MOCK_LOCATIONS } from '../constants'

// Enhanced Locations API with real data
export const locationsAPI = {
  getLocations: async (searchQuery) => {
    try {
      const allLocations = await countriesAPI.getAllCountries()
      
      if (searchQuery) {
        const filtered = allLocations.filter(location =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.country.toLowerCase().includes(searchQuery.toLowerCase())
        )
        
        // If no results from API, try fallback data
        if (filtered.length === 0) {
          return MOCK_LOCATIONS.filter(location =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.country.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
        
        return filtered
      }
      
      // Return popular destinations (capitals of major countries)
      const popularCountries = ['France', 'Italy', 'Japan', 'United States', 'Spain', 'Thailand', 'Australia', 'Brazil', 'Greece', 'Mexico']
      return allLocations
        .filter(location => popularCountries.includes(location.country))
        .slice(0, 12) // Limit to 12 popular destinations
    } catch (error) {
      console.warn('Locations API failed, using fallback data:', error)
      // Use fallback data with search filtering
      if (searchQuery) {
        return MOCK_LOCATIONS.filter(location =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.country.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      return MOCK_LOCATIONS
    }
  },
  
  getLocation: async (id) => {
    try {
      // Try to get from real API first
      const location = await countriesAPI.getCountryByName(id)
      if (location) return location
      
      // Fallback to mock data
      const fallbackLocation = MOCK_LOCATIONS.find(loc => loc.id === id)
      if (fallbackLocation) return fallbackLocation
      
      throw new Error(`Location with ID ${id} not found`)
    } catch (error) {
      console.warn('Location API failed, using fallback:', error)
      const fallbackLocation = MOCK_LOCATIONS.find(loc => loc.id === id)
      if (!fallbackLocation) {
        throw new Error(`Location with ID ${id} not found`)
      }
      return fallbackLocation
    }
  }
}

// Export the real APIs
export { weatherAPI, photosAPI, placesAPI }