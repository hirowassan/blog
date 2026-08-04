import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

/**
 * The small tracked-uppercase label pattern used to introduce a section
 * ("RECENT RECORDS", "CONTACT", "CREATED WORKS"), underlined with a
 * hairline rule.
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'border-b border-outline-variant pb-3 text-label-md uppercase text-secondary',
        className,
      )}
    >
      {children}
    </h2>
  )
}
