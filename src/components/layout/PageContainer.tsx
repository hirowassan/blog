import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * The 720px reading column shared by the header, footer and every page's
 * main content, kept as one component so the width only has to change
 * in one place.
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn('mx-auto max-w-content px-6 py-16', className)}>{children}</div>
}
