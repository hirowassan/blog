import { Link } from 'react-router-dom'
import { ArrowLink } from '@/components/common/ArrowLink'

interface PaginationProps {
  currentPage: number
  totalPages: number
  /** Builds the href for a given page number, keeping URL structure page-agnostic. */
  buildHref: (page: number) => string
}

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null

  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      aria-label="ページネーション"
      className="mt-4 flex items-center justify-between border-t border-outline-variant pt-8"
    >
      <ArrowLink to={hasPrevious ? buildHref(currentPage - 1) : undefined} direction="back">
        前のページ
      </ArrowLink>

      <ul className="flex items-center gap-4 text-label-md">
        {pageNumbers.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span aria-current="page" className="font-semibold text-on-background">
                {page}
              </span>
            ) : (
              <Link to={buildHref(page)} className="text-secondary hover:text-on-background">
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ArrowLink to={hasNext ? buildHref(currentPage + 1) : undefined}>次のページ</ArrowLink>
    </nav>
  )
}
