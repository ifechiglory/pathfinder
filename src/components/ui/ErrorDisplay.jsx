import { AlertCircle, RefreshCw } from 'lucide-react'

export const ErrorDisplay = ({ title, message, onRetry }) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  )
}