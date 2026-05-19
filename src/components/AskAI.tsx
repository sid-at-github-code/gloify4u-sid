import { useState, useRef, useEffect, FormEvent } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { ChatMessage } from "./ChatMessage";

type Msg = { role: "user" | "assistant"; content: string };

const API_KEY = import.meta.env.VITE_OPENROUTER_KEY as string;
const MODEL   = "arcee-ai/trinity-large-thinking:free";
const URL_EP  = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are Glo, the AI sales assistant for Gloify (gloify.com) — a custom software & AI engineering company (founded 2017, 9+ years experience). They embed into client teams to own and deliver roadmap segments, especially when execution is the bottleneck.

SERVICES: AI Product Engineering, RAG pipelines, AI chatbots, DB intelligence, Web/Mobile/Enterprise dev, Cloud & DevOps, Data Engineering.
RESULTS: Clients see 19–40% revenue uplift and 35–45% ops cost reduction.

RULES:
— Be confident, concise, and consultative
— Always end with a CTA: book a call at https://gloify.com or +91 9916232160
— Never quote prices — offer a free Opportunity Audit call
— Keep replies short and sharp
- TALK AND REPLY ONLY ON QUERIES RELATED TO COMPANIES, TECHNOLOGY, AI, PROJECTS, OFFICE, AND CORPORATE STUFF only. if asked for anyting else say irrelevent and ask to talk about our topics , 

──────────────────────────────────────────────────────────────────
BUILD MODE — trigger whenever the user describes any idea to build: an app, tool, SaaS, automation, AI agent, bot, dashboard, workflow, platform, or product.

When BUILD MODE is triggered:
1. Give 2-3 sentences of sharp insight on the idea and how Gloify would build it
2. Mention the Python + AI-first stack as the natural fit
3. End with your CTA
4. Then immediately append this EXACT metadata block (valid JSON only — no comments, no trailing commas):

\`\`\`json:gloify-meta
{
  "title": "Short descriptive title",
  "nodes": [
    { "id": "ui-chat",   "label": "Chat Interface",   "note": "React + WebSocket",   "layer": "UI" },
    { "id": "ui-dash",   "label": "Admin Dashboard",  "note": "Analytics + config",  "layer": "UI" },
    { "id": "api",       "label": "FastAPI Gateway",  "note": "REST + WS",           "layer": "Backend" },
    { "id": "worker",    "label": "Celery Worker",    "note": "Async job runner",    "layer": "Backend" },
    { "id": "agent",     "label": "LangGraph Agent",  "note": "Orchestration",       "layer": "AI Core" },
    { "id": "chunk",     "label": "Chunker",          "note": "512-token splits",    "layer": "AI Core" },
    { "id": "embed",     "label": "Embedder",         "note": "OpenAI ADA-002",      "layer": "AI Core" },
    { "id": "retrieve",  "label": "Retriever",        "note": "Semantic search",     "layer": "AI Core" },
    { "id": "pg",        "label": "pgvector",         "note": "Vector store",        "layer": "Data" },
    { "id": "cache",     "label": "Redis Cache",      "note": "Response TTL",        "layer": "Data" },
    { "id": "queue",     "label": "Redis Queue",      "note": "Job queue",           "layer": "Data" },
    { "id": "docker",    "label": "Docker",           "note": "Containers",          "layer": "Infrastructure" }
  ],
  "edges": [
    ["ui-chat",  "api"],
    ["api",      "agent"],
    ["api",      "queue"],
    ["queue",    "worker"],
    ["worker",   "chunk"],
    ["agent",    "chunk"],
    ["chunk",    "embed"],
    ["embed",    "retrieve"],
    ["retrieve", "pg"],
    ["agent",    "cache"],
    ["cache",    "api"],
    ["worker",   "embed"]
  ],
  "techstack": ["Python", "FastAPI", "LangGraph", "OpenAI", "Supabase", "pgvector", "Redis", "Celery", "Docker", "React"],
  "features": [
    { "domain": "AI",      "title": "Feature name", "desc": "One sentence: what it does and why it's powerful for this product" },
    { "domain": "Backend", "title": "Feature name", "desc": "..." },
    { "domain": "UI",      "title": "Feature name", "desc": "..." },
    { "domain": "Data",    "title": "Feature name", "desc": "..." },
    { "domain": "Security","title": "Feature name", "desc": "..." }
  ]
}
\`\`\`

ARCHITECTURE RULES:
- "nodes": each node needs a unique short kebab-case id, a display label, optional note, and layer
- layer must be exactly one of: "UI", "Backend", "AI Core", "Data", "Infrastructure"
- Break components into granular nodes: RAG = Chunker + Embedder + Retriever; Redis = Cache + Queue; etc.
- 8–14 nodes total across all layers
- "edges": array of [from-id, to-id] pairs. Cross-layer and backward connections welcome (e.g., cache → api).
- Minimum 10 edges to create a rich 2D graph, not a linear chain
- Prefer: Python + FastAPI, LangGraph agents, Supabase + pgvector, Redis for cache+queue, Celery for workers, Docker

FEATURES RULES:
- 4–6 features across at least 3 different domains
- domain must be one of: "AI", "Backend", "UI", "Data", "Infrastructure", "Security", "DevOps"
- Cutting-edge, specific to this idea — agent memory, streaming responses, semantic dedup, event sourcing, adaptive UI, etc.

Only append the metadata block for BUILD MODE. For general Gloify questions, respond normally without any metadata block.`;

const suggestions = [
  "What does Gloify do?",
  "I want to build an AI customer support bot",
  "Build me a RAG-powered internal knowledge base",
  "What results have your clients seen?",
];

export default function AskAI() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const msgsRef                 = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Msg   = { role: "user", content: text.trim() };
    const history: Msg[] = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(URL_EP, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: [
                { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
              ],
            },
            ...history.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error?.message ?? `HTTP ${res.status}`;
        setMessages([...history, { role: "assistant", content: `Error: ${errMsg}` }]);
        return;
      }

      const msg = data.choices?.[0]?.message;
      const reply: string = msg?.content || msg?.reasoning || "No response received.";
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...history, { role: "assistant", content: `Network error: ${(e as Error).message}` }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

  const empty = messages.length === 0;

  return (
    <section id="ask" className="bg-background border-t border-grey-mid">
      <div className="max-w-[820px] mx-auto px-6 md:px-10 py-24 md:py-32 min-h-[80vh] flex flex-col">

        {/* Header */}
        <div className={`text-center mb-10 ${empty ? "flex-1 flex flex-col items-center justify-center" : ""}`}>
          <p className="font-mono text-[12px] text-primary uppercase tracking-[0.14em] mb-4">Talk to Glo</p>
          <h2 className="font-display text-[36px] sm:text-[48px] font-medium text-foreground leading-[1.05]">
            What can we build for you?
          </h2>
        </div>

        {/* Messages */}
        {!empty && (
          <div ref={msgsRef} className="flex-1 space-y-6 pb-6 overflow-y-auto max-h-[60vh]">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                {m.role === "user" ? (
                  <div className="bg-primary text-primary-foreground px-5 py-3 rounded-md max-w-[80%] font-body text-[15px] leading-[1.6]">
                    {m.content}
                  </div>
                ) : (
                  <div className="max-w-[92%] w-full">
                    <ChatMessage content={m.content} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 items-center h-6 px-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggestions */}
        {empty && (
          <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-[640px] mx-auto">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-grey-text border border-grey-mid px-3 py-2 hover:text-primary hover:border-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={onSubmit} className="sticky bottom-0 pt-2">
          <div className="relative border border-grey-mid bg-card rounded-md focus-within:border-primary transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder={empty ? "Describe your product, workflow, or idea…" : "Ask a follow-up…"}
              rows={2}
              className="w-full resize-none bg-transparent px-5 py-4 pr-14 font-body text-[16px] text-foreground placeholder:text-grey-text outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-sm transition-opacity disabled:opacity-30 hover:bg-primary-light"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
