import { useState, useCallback, useEffect } from "react";

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    // Prevent scrolling when search is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = "";
  }, []);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen, closeSearch]);

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
  };
}
