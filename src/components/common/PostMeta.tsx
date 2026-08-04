import { formatDisplayDate } from '@/lib/format/date'
import { cn } from '@/lib/utils/cn'

interface PostMetaProps {
  date: string
  label: string
  className?: string
}

/** The "2024.05.20 — CATEGORY" line shared by every post-listing row. */
export function PostMeta({ date, label, className }: PostMetaProps) {
  return (
    <p className={cn('text-label-md text-secondary', className)}>
      {formatDisplayDate(date)} — {label}
    </p>
  )
}
