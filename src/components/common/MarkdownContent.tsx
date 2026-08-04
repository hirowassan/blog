import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

/** Renders a Markdown body (frontmatter already stripped) as React elements. */
export function MarkdownContent({ content }: MarkdownContentProps) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
}
