import { usePhotos } from '../../hooks/usePhotos'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { ErrorDisplay } from '../ui/ErrorDisplay'
import { ExternalLink } from 'lucide-react'

export const PhotoGallery = ({ locationName }) => {
  const { data: photos, isLoading, error } = usePhotos(locationName)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
        <ErrorDisplay
          title="Unable to load photos"
          message="We couldn't load the photo gallery at this time."
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos?.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Photographer Attribution */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium truncate">{photo.photographer}</p>
                {photo.photographerUrl && (
                  <a
                    href={photo.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-200 hover:text-white flex items-center space-x-1 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View on Unsplash</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Unsplash Attribution */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Photos provided by{' '}
          <a 
            href="https://unsplash.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  )
}