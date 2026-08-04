import type { Theme } from './theme.types'

/**
 * Must stay in sync with the inline bootstrap script in `index.html` and
 * the `--theme-*` variable block in `src/styles/index.css`.
 */
export const THEME_STORAGE_KEY = 'theme'

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/**
 * Resolves the theme to use on first render: an explicit, previously
 * saved choice always wins; otherwise falls back to the OS preference.
 */
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (isTheme(stored)) return stored

  return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light'
}

/** Reflects the theme onto the DOM so CSS variables in index.css apply. */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
}

/**
 * Persists an explicit user choice. Once this is set it takes permanent
 * precedence over the OS setting, even if the OS setting later changes.
 */
export function persistTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
}
