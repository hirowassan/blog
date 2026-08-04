import { useContext } from 'react'
import { ThemeContext } from './theme-context'
import type { ThemeContextValue } from './theme.types'

/** Access the current theme and the function to toggle it. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
