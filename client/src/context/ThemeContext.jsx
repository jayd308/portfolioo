import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored !== null) return stored === 'dark'
    return true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const themeClasses = {
    bg: isDark ? 'bg-gray-950' : 'bg-gray-50',
    surface: isDark ? 'bg-gray-900/80' : 'bg-white',
    text: isDark ? 'text-gray-100' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
    border: isDark ? 'border-white/10' : 'border-gray-200',
    input: isDark
      ? 'bg-gray-800/50 border-gray-700 text-gray-100'
      : 'bg-gray-100 border-gray-300 text-gray-900',
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
