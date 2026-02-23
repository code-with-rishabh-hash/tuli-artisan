"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { THEME_COOKIE_NAME, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

interface ThemeContextType {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const theme: Theme = next ? "dark" : "light";

      // Update DOM attribute for CSS custom properties
      document.documentElement.setAttribute("data-theme", theme);

      // Persist to localStorage
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {}

      // Persist to cookie (for server-side reading on next page load)
      document.cookie = `${THEME_COOKIE_NAME}=${theme};path=/;max-age=31536000;SameSite=Lax`;

      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme: isDark ? "dark" : "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
