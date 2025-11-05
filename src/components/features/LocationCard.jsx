import { Star, MapPin, Heart, Navigation } from 'lucide-react'
import { useFavoritesStore, useUIStore } from '../../store'

export const LocationCard = ({ location }) => {
  const setSelectedLocation = useUIStore((state) => state.setSelectedLocation)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  
  const favorite = isFavorite(location.id)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(location.id)
  }

  const handleCardClick = () => {
    setSelectedLocation(location.id)
  }

  const handleExploreClick = (e) => {
    e.stopPropagation() // Prevent card click from firing
    setSelectedLocation(location.id)
  }

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-1 shadow-lg">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-gray-900">{location.rating}</span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 left-4 p-2.5 rounded-full transition-all duration-300 shadow-lg ${
            favorite 
              ? 'bg-red-500 text-white transform scale-110' 
              : 'bg-white/95 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{location.country}</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <Navigation className="h-4 w-4" />
                <span className="text-sm font-medium">Explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {location.name}
          </h3>
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span className="text-sm">{location.country}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {location.description}
        </p>
        
        <button 
          onClick={handleExploreClick}
          className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/btn"
        >
          <span>Explore Destination</span>
          <Navigation className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}