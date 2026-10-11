import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Markdown({ children }: { children: string }) {
  return <div className="prose prose-invert prose-pre:bg-[var(--surface)] max-w-none prose-a:text-[var(--accent)]"><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>{children}</ReactMarkdown></div>;
}
