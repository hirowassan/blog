import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils/cn'
import { paths } from '@/routes/paths'
import { NAV_ITEMS } from './nav-items'

/** Desktop horizontal nav. Hidden below the `sm` breakpoint in favor of `MobileMenu`. */
export function Navigation() {
  return (
    <nav aria-label="メインナビゲーション" className="hidden items-center gap-6 sm:flex">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === paths.home()}
          className={({ isActive }) =>
            cn(
              'text-label-md transition-colors',
              isActive
                ? 'font-semibold text-on-background underline decoration-2 underline-offset-4'
                : 'text-secondary hover:text-on-background',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
