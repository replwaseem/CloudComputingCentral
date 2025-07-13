import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizeClasses[size]
      )} />
    </div>
  )
}

export function PulsingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

export function BouncingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

export function WaveLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full animate-pulse"
          style={{ 
            animationDelay: `${i * 100}ms`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )
}