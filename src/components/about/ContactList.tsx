import type { ComponentType, SVGProps } from 'react'
import { BirdIcon, CodeIcon, MailIcon } from '@/components/common/Icons'
import type { ContactIcon, ContactLink } from '@/content/about'

const ICONS: Record<ContactIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  mail: MailIcon,
  code: CodeIcon,
  bird: BirdIcon,
}

interface ContactListProps {
  links: ContactLink[]
}

export function ContactList({ links }: ContactListProps) {
  return (
    <ul className="space-y-3">
      {links.map((link) => {
        const Icon = ICONS[link.icon]
        return (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex items-center gap-3 text-body-md transition-colors hover:text-secondary"
            >
              <Icon className="size-4 text-secondary" />
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
