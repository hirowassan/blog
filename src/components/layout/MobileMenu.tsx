import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '@/components/common/Icons'
import { cn } from '@/lib/utils/cn'
import { paths } from '@/routes/paths'
import { NAV_ITEMS } from './nav-items'

/**
 * Below the `sm` breakpoint there isn't room for the full horizontal nav
 * next to the site title and theme toggle (see the 390px-width overflow
 * this replaced), so it collapses into a disclosure button that reveals
 * the same links stacked vertically.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        className="inline-flex size-9 items-center justify-center rounded-full text-on-background transition-colors hover:bg-surface-container"
      >
        {isOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {isOpen && (
        <nav
          aria-label="メインナビゲーション"
          className="absolute inset-x-0 top-16 border-b border-outline-variant bg-background px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === paths.home()}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block text-body-md',
                      isActive ? 'font-semibold text-on-background' : 'text-secondary',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
