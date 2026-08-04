import { useMemo } from 'react'
import { ArrowLink } from '@/components/common/ArrowLink'
import { SectionHeading } from '@/components/common/SectionHeading'
import { RecentRecordItem } from '@/components/home/RecentRecordItem'
import { PageContainer } from '@/components/layout/PageContainer'
import { getRecentFeedItems } from '@/lib/content/feed'
import { paths } from '@/routes/paths'

const RECENT_ITEMS_COUNT = 4

export function HomePage() {
  const recentItems = useMemo(() => getRecentFeedItems(RECENT_ITEMS_COUNT), [])

  return (
    <PageContainer>
      <section className="mb-16">
        <h1 className="mb-6 text-headline-xl"> Meow meow meow</h1>
        <p className="mb-4 text-body-lg text-secondary">ねこってかわいいですよね</p>
        <p className="text-body-md text-secondary">
          hirowassanの備忘録だったり、メモを残していく場所です。
        </p>
      </section>

      <section>
        <SectionHeading className="mb-2">Recent Records</SectionHeading>
        <div>
          {recentItems.map((item) => (
            <RecentRecordItem key={item.href} item={item} />
          ))}
        </div>
        <div className="mt-8">
          <ArrowLink to={paths.articles()}>View all posts</ArrowLink>
        </div>
      </section>
    </PageContainer>
  )
}
