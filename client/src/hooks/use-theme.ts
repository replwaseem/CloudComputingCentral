import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("stackloom-theme");
    
    // If we have a saved preference, use it
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    
    // Otherwise, check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    
    // Default to light mode
    return "light";
  });

  useEffect(() => {
    // Update the data-theme attribute and localStorage when theme changes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("stackloom-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}
