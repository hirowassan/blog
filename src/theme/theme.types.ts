export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  /** The theme currently applied to the document. */
  theme: Theme
  /** Flips between 'light' and 'dark'. */
  toggleTheme: () => void
}
