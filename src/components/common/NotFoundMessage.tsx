import { ArrowLink } from '@/components/common/ArrowLink'
import { PageContainer } from '@/components/layout/PageContainer'

interface NotFoundMessageProps {
  title: string
  message: string
  backHref: string
  backLabel: string
}

/** Shared empty/not-found state for the 404 route and missing content slugs. */
export function NotFoundMessage({ title, message, backHref, backLabel }: NotFoundMessageProps) {
  return (
    <PageContainer className="text-center">
      <h1 className="mb-4 text-headline-xl">{title}</h1>
      <p className="mb-8 text-body-md text-secondary">{message}</p>
      <ArrowLink to={backHref} direction="back" className="justify-center">
        {backLabel}
      </ArrowLink>
    </PageContainer>
  )
}
