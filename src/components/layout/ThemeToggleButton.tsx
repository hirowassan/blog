import { MoonIcon, SunIcon } from '@/components/common/Icons'
import { useTheme } from '@/theme/use-theme'

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
      className="inline-flex size-9 items-center justify-center rounded-full text-on-background transition-colors hover:bg-surface-container"
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  )
}
