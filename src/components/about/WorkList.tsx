import type { Work } from '@/content/about'

interface WorkListProps {
  works: Work[]
}

export function WorkList({ works }: WorkListProps) {
  return (
    <div className="space-y-8">
      {works.map((work) => (
        <div key={work.title}>
          <h3 className="mb-1 text-headline-md">{work.title}</h3>
          <p className="text-body-md text-secondary">{work.description}</p>
        </div>
      ))}
    </div>
  )
}
