import { useState, useRef, useEffect, FormEvent } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "An AI agent that handles customer support tickets",
  "A RAG system over our internal documents",
  "Automate invoice processing end-to-end",
  "A native iOS app with on-device ML",
];

const AskAI = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        toast({ title: "Couldn't reach the assistant", description: err.error });
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      setMessages([...next, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (e) {
      toast({ title: "Network error", description: (e as Error).message });
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const empty = messages.length === 0;

  return (
    <section id="ask" className="bg-background border-t border-grey-mid">
      <div className="max-w-[820px] mx-auto px-6 md:px-10 py-24 md:py-32 min-h-[80vh] flex flex-col">
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="font-mono text-[12px] text-primary uppercase tracking-[0.14em] mb-6">
              Talk to our AI
            </p>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-medium text-foreground leading-[1.05] mb-12">
              What can we build for you?
            </h2>

            <form onSubmit={onSubmit} className="w-full max-w-[680px]">
              <div className="relative border border-grey-mid bg-card rounded-md focus-within:border-primary transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Describe your product, workflow, or problem…"
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

            <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-[640px]">
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
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-8 pb-8 max-h-[60vh]">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "user" ? (
                    <div className="bg-primary text-primary-foreground px-5 py-3 rounded-md max-w-[80%] font-body text-[15px] leading-[1.6]">
                      {m.content}
                    </div>
                  ) : (
                    <div className="font-body text-[16px] text-foreground leading-[1.75] prose prose-neutral dark:prose-invert max-w-none prose-p:my-3 prose-headings:font-display prose-headings:font-medium prose-strong:text-foreground prose-a:text-primary">
                      {m.content ? (
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-grey-text" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={onSubmit} className="sticky bottom-0">
              <div className="relative border border-grey-mid bg-card rounded-md focus-within:border-primary transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask a follow-up…"
                  rows={1}
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
          </>
        )}
      </div>
    </section>
  );
};

export default AskAI;
