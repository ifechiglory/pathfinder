import { useLocations } from '../../hooks/useLocations'
import { useUIStore } from '../../store'
import { LocationCard } from './LocationCard'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { ErrorDisplay } from '../ui/ErrorDisplay'

export const LocationGrid = () => {
  const searchQuery = useUIStore((state) => state.searchQuery)
  const { data: locations, isLoading, error, refetch } = useLocations(searchQuery)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Discovering amazing destinations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Failed to load destinations"
        message="There was an error loading the travel destinations. Please try again."
        onRetry={() => refetch()}
      />
    )
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🌍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search terms or explore our popular destinations</p>
          <button 
            onClick={() => useUIStore.getState().setSearchQuery('')}
            className="btn-primary"
          >
            View All Destinations
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
}