import { Link } from 'react-router-dom'
import { PostMeta } from '@/components/common/PostMeta'
import type { FeedItem } from '@/lib/content/feed'

interface RecentRecordItemProps {
  item: FeedItem
}

/** One compact row in the home page's mixed article/weekly-report feed. */
export function RecentRecordItem({ item }: RecentRecordItemProps) {
  return (
    <div className="border-b border-outline-variant py-6 first:pt-0 last:border-b-0">
      <PostMeta date={item.date} label={item.label} className="mb-2" />
      <h3 className="text-headline-md">
        <Link to={item.href} className="transition-colors hover:text-secondary">
          {item.title}
        </Link>
      </h3>
    </div>
  )
}
