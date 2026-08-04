/**
 * About page content. Kept as a small typed module rather than Markdown —
 * unlike articles and weekly reports, this page is a single static block
 * that doesn't grow over time, so a content file would add indirection
 * without a real benefit.
 */

export type ContactIcon = 'mail' | 'code' | 'bird'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIcon
}

export interface Work {
  title: string
  description: string
}

export interface AboutContent {
  bio: string
  contactLinks: ContactLink[]
  works: Work[]
}

export const aboutContent: AboutContent = {
  bio: 'にゃんこです。いろいろなことに手を出しては飽きて放置するタイプの人です。',
  contactLinks: [
    { label: 'Email', href: 'mailto:me@hirowassan.com', icon: 'mail' },
    { label: 'Twitter', href: 'https://x.com/hirowassan_poke', icon: 'bird' },
    { label: 'GitHub', href: 'https://github.com/hirowassan', icon: 'code' },
  ],
  works: [
    {
      title: 'null',
      description: 'nullです。強いて言えばこのblogです。',
    },
  ],
}
