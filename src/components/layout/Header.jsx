import { useState } from 'react'
import { MapPin, Heart, User, LogOut, Menu, X } from 'lucide-react'
import { useAuthStore } from '../../store'
import { LoginForm } from '../features/LoginForm'
import { RegisterForm } from '../features/RegisterForm'

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      setShowAuthModal(true)
      setIsLogin(true)
    }
  }

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-r from-blue-500 to-blue-600 p-2 rounded-xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  PathFinder
                </span>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Travel Inspiration</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Discover
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                <Heart className="h-4 w-4" />
                <span>Saved</span>
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-blue-200"
                    />
                    <span className="text-gray-700 font-medium text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="space-y-4">
                <button className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                  Discover
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                  <Heart className="h-4 w-4" />
                  <span>Saved</span>
                </button>
                
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-10 w-10 rounded-full border-2 border-blue-200"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleAuthClick}
                      className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200 py-2 rounded-lg border border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleAuthClick}
                    className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      {showAuthModal && (
        isLogin ? (
          <LoginForm 
            onClose={() => setShowAuthModal(false)} 
            switchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm 
            onClose={() => setShowAuthModal(false)} 
            switchToLogin={() => setIsLogin(true)}
          />
        )
      )}
    </>
  )
}