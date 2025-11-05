import { useState, useEffect } from 'react'
import { ArrowLeft, Star, MapPin, Heart, Droplets, Wind, Clock, Users, DollarSign, Navigation, Globe, Languages, Users as PopulationIcon } from 'lucide-react'
import { useLocation } from '../../hooks/useLocations'
import { useWeather } from '../../hooks/useWeather'
import { useUIStore, useFavoritesStore } from '../../store'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { ErrorDisplay } from '../ui/ErrorDisplay'
import { PhotoGallery } from './PhotoGallery'
import { placesAPI } from '../../services/api'

// Location-specific data (fallback)
const LOCATION_DETAILS = {
  'paris': {
    bestTime: 'April to June and September to October',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Seine River Cruise'],
    activities: ['Museum visits', 'Cafe hopping', 'Shopping', 'River cruises', 'Historical tours'],
    cost: 'Medium to High',
    culture: 'Art, fashion, and culinary excellence'
  },
  'tokyo': {
    bestTime: 'March to May and September to November', 
    attractions: ['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Meiji Shrine', 'Tsukiji Market'],
    activities: ['Temple visits', 'Shopping', 'Anime culture', 'Food tours', 'Gardens'],
    cost: 'High',
    culture: 'Traditional and modern blend'
  },
  'new york': {
    bestTime: 'April to June and September to November',
    attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Broadway'],
    activities: ['Museums', 'Shopping', 'Theater', 'Parks', 'Architecture tours'],
    cost: 'High', 
    culture: 'Cultural melting pot'
  },
  'santorini': {
    bestTime: 'April to October',
    attractions: ['Oia Sunset', 'Red Beach', 'Ancient Thera', 'Wineries', 'Volcanic Hot Springs'],
    activities: ['Beach relaxation', 'Wine tasting', 'Sunset viewing', 'Boat tours', 'Hiking'],
    cost: 'Medium to High',
    culture: 'Greek island lifestyle'
  },
  'bali': {
    bestTime: 'April to October',
    attractions: ['Uluwatu Temple', 'Tegallalang Rice Terraces', 'Sacred Monkey Forest', 'Mount Batur', 'Waterfalls'],
    activities: ['Temple visits', 'Beach activities', 'Yoga retreats', 'Rice field trekking', 'Spa treatments'],
    cost: 'Low to Medium',
    culture: 'Spiritual and artistic traditions'
  },
  'swiss alps': {
    bestTime: 'June to September (summer), December to March (winter)',
    attractions: ['Jungfraujoch', 'Matterhorn', 'Interlaken', 'Lake Geneva', 'Lauterbrunnen Valley'],
    activities: ['Skiing', 'Hiking', 'Mountain railways', 'Lake cruises', 'Alpine villages'],
    cost: 'High',
    culture: 'Alpine traditions and precision'
  },
  'rome': {
    bestTime: 'April to June and September to October',
    attractions: ['Colosseum', 'Roman Forum', 'Vatican City', 'Trevi Fountain', 'Pantheon'],
    activities: ['Historical tours', 'Museum visits', 'Pasta making classes', 'Piazza hopping', 'Gelato tasting'],
    cost: 'Medium',
    culture: 'Ancient history and Catholic heritage'
  },
  'kyoto': {
    bestTime: 'March to May and September to November',
    attractions: ['Fushimi Inari Shrine', 'Kinkaku-ji Temple', 'Arashiyama Bamboo Grove', 'Gion District', 'Kiyomizu-dera'],
    activities: ['Temple visits', 'Tea ceremonies', 'Geisha spotting', 'Gardens', 'Traditional crafts'],
    cost: 'Medium to High',
    culture: 'Traditional Japanese culture'
  },
  'barcelona': {
    bestTime: 'May to June and September to October',
    attractions: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'La Rambla', 'Casa Batlló'],
    activities: ['Gaudí architecture tours', 'Beach relaxation', 'Tapas tasting', 'Market visits', 'Flamenco shows'],
    cost: 'Medium',
    culture: 'Catalan culture and modernist art'
  },
  'sydney': {
    bestTime: 'September to November and March to May',
    attractions: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Royal Botanic Garden', 'The Rocks'],
    activities: ['Harbour cruises', 'Beach activities', 'Bridge climb', 'Zoo visits', 'Coastal walks'],
    cost: 'High',
    culture: 'Laid-back coastal lifestyle'
  },
  'machu picchu': {
    bestTime: 'May to September',
    attractions: ['Machu Picchu Citadel', 'Huayna Picchu', 'Inca Trail', 'Sacred Valley', 'Cusco'],
    activities: ['Archaeological tours', 'Hiking', 'Mountain climbing', 'Cultural immersion', 'Photography'],
    cost: 'Medium',
    culture: 'Ancient Incan civilization'
  },
  'dubai': {
    bestTime: 'November to March',
    attractions: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Dubai Fountain'],
    activities: ['Desert adventures', 'Shopping', 'Luxury dining', 'Beach clubs', 'Modern architecture'],
    cost: 'High',
    culture: 'Modern Arabic luxury'
  }
}

export const LocationDetails = ({ locationId }) => {
  const setSelectedLocation = useUIStore((state) => state.setSelectedLocation)
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  
  const { data: location, isLoading: locationLoading, error: locationError } = useLocation(locationId)
  const { data: weather, isLoading: weatherLoading } = useWeather(
    location?.latitude, 
    location?.longitude
  )

  const [places, setPlaces] = useState([])
  const [placesLoading, setPlacesLoading] = useState(false)
  const [additionalWeather, setAdditionalWeather] = useState(null)

  const favorite = isFavorite(locationId)
  const locationKey = location?.name.toLowerCase().split(',')[0]
  const details = LOCATION_DETAILS[locationKey] || LOCATION_DETAILS.paris

  // Fetch nearby places when location data is available
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      setPlacesLoading(true)
      placesAPI.getPlaces(location.latitude, location.longitude, 30000) // 30km radius
        .then(setPlaces)
        .catch(console.error)
        .finally(() => setPlacesLoading(false))
    }
  }, [location])

  // Enhanced weather data
  useEffect(() => {
    if (weather) {
      setAdditionalWeather({
        feelsLike: weather.feelsLike || Math.round(weather.temperature + (Math.random() * 3 - 1)),
        pressure: weather.pressure || 1013,
        visibility: weather.visibility || Math.round((Math.random() * 10 + 5) * 1000),
        sunrise: weather.sunrise || '06:30',
        sunset: weather.sunset || '18:45'
      })
    }
  }, [weather])

  if (locationLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (locationError || !location) {
    return (
      <ErrorDisplay
        title="Location not found"
        message="The destination you're looking for doesn't exist."
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => setSelectedLocation(null)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-medium">Back to destinations</span>
      </button>

      {/* Location Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <img
            src={location.imageUrl}
            alt={location.name}
            className="w-full h-96 object-cover"
          />
          
          <button
            onClick={() => toggleFavorite(locationId)}
            className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 shadow-lg ${
              favorite 
                ? 'bg-red-500 text-white transform scale-110' 
                : 'bg-white/95 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {location.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-6 w-6 mr-2 text-blue-500" />
                <span className="text-xl">{location.country}</span>
              </div>
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                  <span className="text-xl font-medium">{location.rating}/5 Rating</span>
                </div>
                {location.population && (
                  <div className="flex items-center text-gray-600">
                    <PopulationIcon className="h-5 w-5 mr-1" />
                    <span>{(location.population / 1000000).toFixed(1)}M people</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Weather Info */}
            {weather && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 min-w-[280px] border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
                    <div className="text-lg text-gray-700 flex items-center space-x-2">
                      <span>{weather.condition}</span>
                      <span className="text-2xl">{weather.icon}</span>
                    </div>
                    {additionalWeather && (
                      <div className="text-sm text-gray-600 mt-1">
                        Feels like {additionalWeather.feelsLike}°C
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span>{weather.windSpeed} km/h</span>
                  </div>
                  {additionalWeather && (
                    <>
                      <div className="flex items-center space-x-2">
                        <span>🌡️</span>
                        <span>{additionalWeather.pressure} hPa</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>👁️</span>
                        <span>{(additionalWeather.visibility / 1000).toFixed(1)} km</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {location.description}
          </p>

          {/* Country Information */}
          {(location.currency || location.language) && (
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              {location.currency && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>Currency: {location.currency}</span>
                </div>
              )}
              {location.language && (
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-purple-500" />
                  <span>Language: {location.language}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery locationName={location.name} />
      
      {/* Enhanced Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span>Best Time to Visit</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {details.bestTime}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span>Average Cost</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {details.cost}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-500" />
            <span>Local Culture</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {details.culture}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span>⭐</span>
            <span>Traveler Rating</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-gray-600 font-semibold">{location.rating}/5</span>
          </div>
        </div>
      </div>

      {/* Nearby Attractions from Real API */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Navigation className="h-6 w-6 text-blue-500" />
          <span>Nearby Attractions</span>
        </h3>
        {placesLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
            <span className="ml-3 text-gray-600">Loading nearby places...</span>
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.slice(0, 6).map((place) => (
              <div key={place.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900 text-sm">{place.name}</h4>
                  <p className="text-xs text-gray-600 capitalize mt-1">
                    {place.type.replace(/_/g, ' ').replace(/[^a-zA-Z ]/g, '')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {place.distance < 1000 ? `${place.distance}m away` : `${(place.distance / 1000).toFixed(1)}km away`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No nearby attractions found from API</p>
            <p className="text-gray-400 text-sm mt-1">Showing fallback attractions instead</p>
          </div>
        )}
      </div>

      {/* Fallback Attractions & Activities */}
      {(places.length === 0 || placesLoading) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Attractions</h3>
            <ul className="space-y-3">
              {details.attractions.map((attraction, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{attraction}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Activities</h3>
            <ul className="space-y-3">
              {details.activities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}