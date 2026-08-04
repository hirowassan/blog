import { NotFoundMessage } from '@/components/common/NotFoundMessage'
import { paths } from '@/routes/paths'

export function NotFoundPage() {
  return (
    <NotFoundMessage
      title="404"
      message="お探しのページは見つかりませんでした。"
      backHref={paths.home()}
      backLabel="ホームに戻る"
    />
  )
}
