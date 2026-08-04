import { ContactList } from '@/components/about/ContactList'
import { WorkList } from '@/components/about/WorkList'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PageContainer } from '@/components/layout/PageContainer'
import { aboutContent } from '@/content/about'

export function AboutPage() {
  return (
    <PageContainer>
      <header className="mb-12">
        <h1 className="mb-6 text-headline-xl">About Me</h1>
        <p className="text-body-md text-secondary">{aboutContent.bio}</p>
      </header>

      <section id="contact" className="mb-12 scroll-mt-24">
        <SectionHeading className="mb-6">Contact</SectionHeading>
        <ContactList links={aboutContent.contactLinks} />
      </section>

      <section>
        <SectionHeading className="mb-6">Created Works</SectionHeading>
        <WorkList works={aboutContent.works} />
      </section>
    </PageContainer>
  )
}
