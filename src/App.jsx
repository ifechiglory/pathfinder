import { Layout } from './components/layout/Layout'
import { HeroSection } from './components/features/HeroSection'
import { LocationGrid } from './components/features/LocationGrid'
import { LocationDetails } from './components/features/LocationDetails'
import { useUIStore } from './store'

function App() {
  const selectedLocationId = useUIStore((state) => state.selectedLocationId)

  return (
    <Layout>
      <div className="px-0">
        {!selectedLocationId ? (
          <>
            {/* New Hero Section - Full Screen */}
            <HeroSection />
            
            {/* Destinations Grid Section - WITH ID FOR SCROLLING */}
            <section id="destinations-section" className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Featured Destinations
                    </h2>
                    <p className="text-gray-600">
                      Handpicked locations for your perfect getaway
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {useUIStore.getState().searchQuery ? 'Search Results' : 'Popular Now'}
                  </div>
                </div>
                <LocationGrid />
              </div>
            </section>
          </>
        ) : (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LocationDetails locationId={selectedLocationId} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default App