import { useState, useEffect } from 'react'
import { Search, MapPin, ArrowRight, Star, Users, Globe } from 'lucide-react'
import { useUIStore } from '../../store'

// Hero background images (using Unsplash)
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
  "https://plus.unsplash.com/premium_photo-1664283661568-859f7aff0b20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const searchQuery = useUIStore((state) => state.searchQuery)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is handled automatically by the searchQuery state
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Slideshow */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Travel background ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/25 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-white/15 rounded-full animate-float"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Animated Badge */}
        <div
          className={`inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/30 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Star className="h-4 w-4 text-yellow-300 fill-current" />
          <span className="text-sm font-medium">
            Trusted by 10,000+ Travelers
          </span>
        </div>
        {/* Main Heading with Animation */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Discover
          <span className="block bg-linear-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            Your World
          </span>
        </h1>
        {/* Subtitle with Animation */}
        <p
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Explore breathtaking destinations, get real-time weather insights, and
          plan your perfect adventure with stunning visual galleries
        </p>
        {/* Search Bar with Animation */}
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <form onSubmit={handleSearch} className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7 z-10" />
              <input
                type="text"
                placeholder="Where do you want to explore? Try 'Paris beaches' or 'Tokyo temples'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-20 pr-32 py-6 bg-white/95 backdrop-blur-sm text-gray-900 text-xl rounded-2xl border-2 border-white/40 focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400 shadow-2xl transition-all duration-300 hover:bg-white hover:border-white/60"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 font-semibold"
              >
                <span>{searchQuery ? 'Search' : 'Explore All'}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            </form>
        {/* Stats with Animation */}
        <div
          className={`flex justify-center space-x-12 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Globe className="h-6 w-6 text-cyan-300" />
              <div className="text-3xl font-bold">50+</div>
            </div>
            <div className="text-blue-100 text-sm">Destinations</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="h-6 w-6 text-cyan-300" />
              <div className="text-3xl font-bold">10K+</div>
            </div>
            <div className="text-blue-100 text-sm">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-6 w-6 text-yellow-300" />
              <div className="text-3xl font-bold">4.8</div>
            </div>
            <div className="text-blue-100 text-sm">Average Rating</div>
          </div>
        </div>
        </div>
        </div>

      {/* Linear Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}