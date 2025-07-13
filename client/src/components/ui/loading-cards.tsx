import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 animate-pulse", className)}>
      {/* Image skeleton with shimmer effect */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
      
      <div className="p-6">
        {/* Category and tags */}
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        
        {/* Excerpt */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        
        {/* Author and metadata */}
        <div className="flex items-center">
          <Skeleton className="h-8 w-8 rounded-full mr-3" />
          <div className="flex-1">
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedArticleSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("mb-12", className)}>
      <Skeleton className="h-10 w-64 mb-8" />
      <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 animate-pulse">
        <div className="md:flex">
          {/* Image skeleton with gradient animation */}
          <div className="relative h-48 w-full md:h-64 md:w-2/5 overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
          
          <div className="p-6 md:w-3/5">
            {/* Category badges */}
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            
            {/* Title */}
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-4/5 mb-4" />
            
            {/* Excerpt */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            
            {/* Author info */}
            <div className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-full mr-4" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SidebarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("lg:w-1/3 space-y-8", className)}>
      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className={`h-6 rounded-full ${i % 3 === 0 ? 'w-16' : i % 3 === 1 ? 'w-20' : 'w-12'}`} />
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-6" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export function ArticleDetailSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 dark:bg-gray-800 animate-pulse">
      {/* Tags and metadata */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-4/5 mb-4" />
        
        {/* Excerpt */}
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-6" />
        
        {/* Featured image */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className={`h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
      
      {/* Author info */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}