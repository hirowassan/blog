import { Link } from 'react-router-dom'
import { paths } from '@/routes/paths'
import { MobileMenu } from './MobileMenu'
import { Navigation } from './Navigation'
import { ThemeToggleButton } from './ThemeToggleButton'

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-outline-variant bg-background">
      <div className="relative mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link to={paths.home()} className="text-headline-md">
          hirowassan's Blog
        </Link>
        <div className="flex items-center gap-6">
          <Navigation />
          <ThemeToggleButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
