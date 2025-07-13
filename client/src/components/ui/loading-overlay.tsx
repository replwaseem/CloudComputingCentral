import { LoadingSpinner, BouncingDots, WaveLoader } from "./loading-spinner"

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  type?: "spinner" | "dots" | "wave"
  className?: string
}

export function LoadingOverlay({ 
  isVisible, 
  message = "Loading...", 
  type = "dots",
  className = ""
}: LoadingOverlayProps) {
  if (!isVisible) return null

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return <LoadingSpinner size="lg" />
      case "wave":
        return <WaveLoader />
      default:
        return <BouncingDots />
    }
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl animate-scale-in">
        <div className="text-center">
          <div className="mb-4">
            {renderLoader()}
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

interface PageLoadingProps {
  message?: string
  className?: string
}

export function PageLoading({ message = "Loading content...", className = "" }: PageLoadingProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="text-center animate-bounce-in">
        <div className="mb-6">
          <BouncingDots className="justify-center" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {message}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we fetch the latest content
        </p>
      </div>
    </div>
  )
}

export function InlineLoader({ message, className = "" }: { message?: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="text-center animate-fade-in">
        <WaveLoader className="mb-3 justify-center" />
        {message && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        )}
      </div>
    </div>
  )
}