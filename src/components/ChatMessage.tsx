import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { FlowDiagram } from "./FlowDiagram";
import { TechStack } from "./TechStack";

type FlowNode = { label: string; note?: string };
type GloifyMeta = { flow?: FlowNode[]; techstack?: string[] };

const META_BLOCK_RE = /```json:gloify-meta\n([\s\S]*?)\n```/;

function parse(content: string): { text: string; meta: GloifyMeta | null } {
  const match = content.match(META_BLOCK_RE);
  if (!match) return { text: content, meta: null };
  try {
    const meta = JSON.parse(match[1]) as GloifyMeta;
    return { text: content.replace(match[0], "").trimEnd(), meta };
  } catch {
    return { text: content.replace(match[0], "").trimEnd(), meta: null };
  }
}

// Strip the opening fence if partially streamed so it never shows raw
function stripPartialMeta(content: string): string {
  return content.replace(/\n?```json:gloify-meta[\s\S]*$/, "").trimEnd();
}

type Props = { content: string; streaming: boolean };

export const ChatMessage = ({ content, streaming }: Props) => {
  const displayed = streaming ? stripPartialMeta(content) : (() => {
    const { text } = parse(content);
    return text;
  })();
  const meta = streaming ? null : parse(content).meta;

  return (
    <div className="font-body text-[16px] text-foreground leading-[1.75] prose prose-neutral dark:prose-invert max-w-none prose-p:my-3 prose-headings:font-display prose-headings:font-medium prose-strong:text-foreground prose-a:text-primary">
      {displayed ? (
        <ReactMarkdown>{displayed}</ReactMarkdown>
      ) : (
        <Loader2 className="w-4 h-4 animate-spin text-grey-text" />
      )}
      {meta?.flow && meta.flow.length >= 2 && (
        <FlowDiagram nodes={meta.flow} />
      )}
      {meta?.techstack && meta.techstack.length > 0 && (
        <TechStack items={meta.techstack} />
      )}
    </div>
  );
};
