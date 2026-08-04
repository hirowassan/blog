import { useEffect, useMemo, useRef } from 'react'
import { loadDefaultJapaneseParser } from 'budoux'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

/** Renders a Markdown body (frontmatter already stripped) as React elements. */
export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const parser = useMemo(() => loadDefaultJapaneseParser(), [])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    parser.applyToElement(containerRef.current)
  }, [content, parser])

  return (
    <div ref={containerRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
