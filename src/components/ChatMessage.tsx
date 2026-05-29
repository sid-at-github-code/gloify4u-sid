import ReactMarkdown from "react-markdown";
import { FlowDiagram, type FlowNode } from "./FlowDiagram";
import { TechStack } from "./TechStack";
import { FeatureIdeas, type Feature } from "./FeatureIdeas";

type GloifyMeta = {
  title?:     string;
  nodes?:     FlowNode[];
  edges?:     [string, string][];
  flow?:      FlowNode[];
  techstack?: string[];
  features?:  Feature[];
};

function tryParseGloMeta(json: string): GloifyMeta | null {
  try {
    const parsed = JSON.parse(json.trim()) as Record<string, unknown>;
    if (parsed && typeof parsed === "object" && (parsed.nodes || parsed.flow)) {
      return parsed as GloifyMeta;
    }
  } catch { /* skip */ }
  return null;
}

// Walk backwards from the last `}` to find the matching `{` of the outermost JSON object.
function extractTrailingJson(content: string): { pre: string; json: string } | null {
  const lastClose = content.lastIndexOf("}");
  if (lastClose === -1) return null;
  let depth = 0;
  for (let i = lastClose; i >= 0; i--) {
    if (content[i] === "}") depth++;
    else if (content[i] === "{") {
      depth--;
      if (depth === 0) {
        return { pre: content.slice(0, i), json: content.slice(i, lastClose + 1) };
      }
    }
  }
  return null;
}

function parse(content: string): { text: string; meta: GloifyMeta | null } {
  // 1. Code fence — strict label or plain ```json (model may omit :gloify-meta)
  const fenceMatch = content.match(/```(?:json:gloify-meta|json)\r?\n([\s\S]*?)```/);
  if (fenceMatch) {
    const meta = tryParseGloMeta(fenceMatch[1]);
    return { text: content.replace(fenceMatch[0], "").trimEnd(), meta };
  }

  // 2. Raw JSON appended without fences (model deviated from instructions)
  const trailing = extractTrailingJson(content);
  if (trailing) {
    const meta = tryParseGloMeta(trailing.json);
    if (meta) return { text: trailing.pre.trimEnd(), meta };
  }

  return { text: content, meta: null };
}

function stripPartialMeta(content: string): string {
  // Partial code fence
  const s = content.replace(/\n?```(?:json:gloify-meta|json)[\s\S]*$/, "").trimEnd();
  if (s !== content) return s;
  // Partial raw JSON object at end of stream
  return content.replace(/\n\{[\s\S]*$/, "").trimEnd();
}

type Props = { content: string; streaming?: boolean };

export const ChatMessage = ({ content, streaming = false }: Props) => {
  const parsed   = streaming ? null : parse(content);
  const displayed = streaming ? stripPartialMeta(content) : parsed!.text;
  const meta      = parsed?.meta ?? null;

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
