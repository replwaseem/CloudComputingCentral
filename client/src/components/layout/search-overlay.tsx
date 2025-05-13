import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  category: {
    name: string;
    slug: string;
  };
}

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['/api/search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const response = await apiRequest('GET', `/api/search?q=${encodeURIComponent(searchTerm)}`);
      return await response.json();
    },
    enabled: searchTerm.trim().length >= 2
  });

  useEffect(() => {
    // Focus the search input when overlay is opened
    searchInputRef.current?.focus();
    
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  const handleClickOutside = (e: React.MouseEvent) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      onClose();
    }
  };
  
  const handleResultClick = (slug: string) => {
    navigate(`/articles/${slug}`);
    onClose();
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
      onClick={handleClickOutside}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700 flex items-center">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search articles..."
            className="flex-grow border-none shadow-none focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim().length < 2 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
              Start typing to search articles
            </p>
          )}
          
          {isLoading && searchTerm.trim().length >= 2 && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-4/5 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {searchResults && searchResults.length === 0 && searchTerm.trim().length >= 2 && !isLoading && (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
              No results found for "{searchTerm}"
            </p>
          )}
          
          {searchResults && searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((result: SearchResult) => (
                <div 
                  key={result.id} 
                  className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md"
                  onClick={() => handleResultClick(result.slug)}
                >
                  {result.featuredImage && (
                    <div className="rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={result.featuredImage} 
                        alt={result.title} 
                        className="w-16 h-16 object-cover" 
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{result.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{result.excerpt}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-primary-500 dark:text-primary-400">{result.category.name}</span>
                      <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(result.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
