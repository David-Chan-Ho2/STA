"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setDark] = useState<boolean>(false);

  const toggle = () => {
    setDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
