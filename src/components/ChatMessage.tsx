import ReactMarkdown from "react-markdown";
import { FlowDiagram, type FlowNode } from "./FlowDiagram";
import { TechStack } from "./TechStack";
import { FeatureIdeas, type Feature } from "./FeatureIdeas";

type GloifyMeta = {
  title?:     string;
  nodes?:     FlowNode[];             // new format — nodes with explicit ids
  edges?:     [string, string][];     // explicit directed edges between node ids
  flow?:      FlowNode[];             // old format (backward compat, no edges)
  techstack?: string[];
  features?:  Feature[];
};

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

function stripPartialMeta(content: string): string {
  return content.replace(/\n?```json:gloify-meta[\s\S]*$/, "").trimEnd();
}

type Props = { content: string; streaming?: boolean };

export const ChatMessage = ({ content, streaming = false }: Props) => {
  const displayed = streaming ? stripPartialMeta(content) : parse(content).text;
  const meta      = streaming ? null : parse(content).meta;

  const diagramNodes = meta?.nodes ?? meta?.flow;
  const hasNodes     = (diagramNodes?.length ?? 0) >= 2;

  return (
    <div className="font-body text-[15px] text-foreground leading-[1.75]">
      {displayed && (
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:my-2.5 prose-headings:font-display prose-headings:font-medium prose-strong:text-foreground prose-a:text-primary prose-p:text-[15px]">
          <ReactMarkdown>{displayed}</ReactMarkdown>
        </div>
      )}
      {hasNodes && (
        <FlowDiagram
          nodes={meta!.nodes}
          edges={meta!.edges}
          flow={meta!.flow}
          title={meta!.title}
        />
      )}
      {meta?.techstack && meta.techstack.length > 0 && (
        <TechStack items={meta.techstack} />
      )}
      {meta?.features && meta.features.length > 0 && (
        <FeatureIdeas features={meta.features} />
      )}
    </div>
  );
};
