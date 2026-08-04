import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils/cn'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'

interface ArrowLinkProps {
  /** Destination path. When omitted, renders a disabled, non-interactive state. */
  to?: string
  children: ReactNode
  /** 'forward' places the arrow after the text pointing right (default);
   *  'back' places it before the text pointing left. */
  direction?: 'forward' | 'back'
  className?: string
}

/**
 * The "View all posts →" / "記事を読む →" / pagination arrow-link pattern
 * used throughout the design: text plus an arrow that nudges forward on
 * hover. Shared so that micro-interaction only has to be tuned in one place.
 */
export function ArrowLink({ to, children, direction = 'forward', className }: ArrowLinkProps) {
  const content =
    direction === 'forward' ? (
      <>
        <span>{children}</span>
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </>
    ) : (
      <>
        <ArrowLeftIcon className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>{children}</span>
      </>
    )

  const sharedClassName = cn(
    'group inline-flex items-center gap-1.5 text-label-md',
    className,
  )

  if (!to) {
    return (
      <span className={cn(sharedClassName, 'cursor-not-allowed text-secondary/50')}>
        {content}
      </span>
    )
  }

  return (
    <Link to={to} className={cn(sharedClassName, 'text-on-background hover:text-secondary')}>
      {content}
    </Link>
  )
}
