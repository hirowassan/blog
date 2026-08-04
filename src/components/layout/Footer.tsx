import { Link } from 'react-router-dom'
import { paths } from '@/routes/paths'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-outline-variant">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-label-md text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {currentYear} hirowassan's Blog. CC0.</p>
        <div className="flex items-center gap-6">
          {/* Generated at build time by scripts/generate-rss.mjs — see public/rss.xml */}
          <a href="/rss.xml" className="hover:text-on-background">
            RSS Feed
          </a>
          <Link to={`${paths.about()}#contact`} className="hover:text-on-background">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
