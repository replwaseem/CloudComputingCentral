import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import SearchOverlay from "./search-overlay";
import { Cloud, Menu, Search, SunMedium, Moon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: 60 * 1000,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary-500 dark:text-primary-400">
                <Cloud className="h-8 w-8" />
              </span>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">StackLoom</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white font-medium">
              Home
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white font-medium">
              Articles
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white font-medium">
              About
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white font-medium flex items-center">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute hidden group-hover:block mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 dark:bg-gray-800">
                {categories?.map((category: any) => (
                  <Link 
                    key={category.id} 
                    href={`/categories/${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openSearch}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {/* Dark mode toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {theme === 'dark' ? (
                <SunMedium className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link href="/articles" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              Articles
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              About
            </Link>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300">
              Categories
            </div>
            <div className="pl-6 space-y-1">
              {categories?.map((category: any) => (
                <Link 
                  key={category.id} 
                  href={`/categories/${category.slug}`}
                  className="block px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Search overlay */}
      {isSearchOpen && <SearchOverlay onClose={closeSearch} />}
    </header>
  );
}
