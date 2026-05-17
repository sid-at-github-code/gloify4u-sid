// Lovable AI chat edge function — streams responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not set");

    const systemPrompt = {
      role: "system",
      content: `You are Gloify's AI engineering consultant. Gloify is a Bangalore-based AI engineering company (since 2017) that's helped 95+ companies ship AI products — agents, RAG systems, automation, native mobile apps, web apps, MLOps. Speak with quiet confidence. Be concise, considered, premium. When a founder describes what they want to build, respond with: (1) a one-sentence framing of the problem, (2) a short plan of how Gloify would approach it (architecture, stack, timeline rough estimate), (3) a clear next step (book a free call). Never use emojis. Never hype. Sound like a senior engineer at a London/SF studio.

STRUCTURED OUTPUT RULES:
When your response describes a specific architecture, pipeline, or system flow, append the following fenced block at the very end of your response (after all prose):

\`\`\`json:gloify-meta
{
  "flow": [
    { "label": "Step Name", "note": "2–5 word description" }
  ],
  "techstack": ["Tech1", "Tech2"]
}
\`\`\`

Include "flow" only when describing a data/request flow or system architecture (3–7 nodes, array order = left-to-right). Node labels: 1–3 words. Notes: 2–5 words, lowercase.
Include "techstack" only when recommending a specific technology stack for the user's project. Use canonical names (e.g. "Next.js", "FastAPI", "PostgreSQL", "pgvector").
Omit the block entirely for conversational replies, clarifying questions, or when no concrete architecture or stack is being recommended.
Both fields are optional — include only what applies. The block must be the last thing in your response.`,
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [systemPrompt, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits required. Add credits in Lovable Cloud." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`AI gateway error: ${text}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("chat error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
