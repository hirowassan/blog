import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from './theme-context'
import type { Theme } from './theme.types'
import { applyTheme, getInitialTheme, persistTheme } from './theme.utils'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Owns the current theme and keeps the DOM + localStorage in sync with it.
 *
 * The very first paint's theme is already set by the inline script in
 * `index.html` (to avoid a flash of the wrong theme before React loads),
 * so the `useEffect` below only needs to re-apply the theme on changes
 * that happen after mount.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    persistTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
