import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'pdt_theme_v1';

const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Read persisted preference on first mount; fall back to light
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark';
    } catch {
      return false;
    }
  });

  // Sync <html class="dark"> and localStorage whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch { /* storage unavailable — ignore */ }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

/** Convenience hook */
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
