# Chatbot Response API — Rich Rendering Contract

The Gloify AI chatbot renders two types of responses:

1. **Plain text** — the default for every reply
2. **Rich response** — plain text **plus** an architecture flow diagram and/or a highlighted tech-stack strip, rendered only when the LLM signals they are relevant

---

## How it works

The LLM appends a fenced JSON block — `json:gloify-meta` — at the very end of its response when a flow diagram or tech-stack callout is warranted. The frontend parses this block after streaming completes, strips it from the visible text, and renders the appropriate UI components in place.

During streaming the block is hidden from view — only the prose text is shown progressively. Once streaming ends, the block is parsed and the rich components appear.

---

## Schema

````
```json:gloify-meta
{
  "flow": [
    { "label": "Step Name", "note": "optional 2–5 word description" }
  ],
  "techstack": ["Tech1", "Tech2", "Tech3"]
}
```
````

Both `flow` and `techstack` are optional. The block itself is optional. Either field may appear without the other.

### `flow` — Architecture Flow Diagram

| Field   | Type     | Required | Constraint                        |
|---------|----------|----------|-----------------------------------|
| `label` | `string` | yes      | 1–3 words, title-case             |
| `note`  | `string` | no       | 2–5 words, lowercase              |

- Minimum 3 nodes, maximum 7 nodes
- Nodes are rendered left-to-right in array order with connecting arrows
- Use for: data flows, request/response paths, agent pipelines, automation sequences

**Trigger condition:** The user asks how something would be *built*, *architected*, or *automated*, and the answer involves a sequence of distinct system components.

**Do not include when:** The reply is conversational, clarifying, or pricing-related.

### `techstack` — Highlighted Tech Strip

| Field       | Type       | Required | Constraint                           |
|-------------|------------|----------|--------------------------------------|
| *(root)*    | `string[]` | —        | 2–10 items, proper-cased tech names  |

- Use the canonical name of each technology (e.g. `"Next.js"`, `"FastAPI"`, `"PostgreSQL"`)
- Categories are inferred by the frontend for color coding — do not include category metadata
- Rendered as monospaced badge pills below the prose

**Trigger condition:** The LLM recommends a specific technology stack for a project described by the user.

**Do not include when:** The user asks a general question, no specific stack is being recommended, or the stack is already obvious from the prose.

---

## Examples

### Plain text response (no block)

> That's a clarification question — tell us a bit more about your current data pipeline and we can scope this properly.

No `json:gloify-meta` block. The frontend renders only markdown prose.

---

### Response with flow only

> A RAG system over your internal documents would work as follows: ingest and chunk documents, embed them, store vectors, then retrieve and synthesise at query time.

```json:gloify-meta
{
  "flow": [
    { "label": "Document Ingest", "note": "PDF, Notion, Confluence" },
    { "label": "Chunking", "note": "512-token windows" },
    { "label": "Embedding", "note": "text-embedding-3-small" },
    { "label": "Vector Store", "note": "pgvector or Pinecone" },
    { "label": "Retrieval", "note": "top-k similarity" },
    { "label": "LLM Synthesis", "note": "Gemini 2.5 Flash" },
    { "label": "Response" }
  ]
}
```

---

### Response with techstack only

> For a production-grade mobile app with on-device ML, we would use Swift for the iOS layer and Core ML for inference, with a lightweight FastAPI service handling anything that needs server-side compute.

```json:gloify-meta
{
  "techstack": ["Swift", "Core ML", "FastAPI", "PostgreSQL", "Supabase"]
}
```

---

### Response with both

> Here is how an AI customer support agent would be structured, and the stack we would reach for.

```json:gloify-meta
{
  "flow": [
    { "label": "Customer Query", "note": "email, chat, web" },
    { "label": "Intent Router", "note": "classifies ticket type" },
    { "label": "RAG Lookup", "note": "knowledge base" },
    { "label": "Agent", "note": "GPT-4o / Gemini" },
    { "label": "Human Escalation", "note": "low-confidence replies" },
    { "label": "Resolution" }
  ],
  "techstack": ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "Redis", "Vercel"]
}
```

---

## Frontend components

| Component         | File                              | Renders when           |
|-------------------|-----------------------------------|------------------------|
| `FlowDiagram`     | `src/components/FlowDiagram.tsx`  | `meta.flow` is present |
| `TechStack`       | `src/components/TechStack.tsx`    | `meta.techstack` is present |
| `ChatMessage`     | `src/components/ChatMessage.tsx`  | Every assistant message |

`ChatMessage` owns parsing. It strips the `json:gloify-meta` block from the displayed prose, calls `FlowDiagram` and `TechStack` as needed, and passes a `streaming` flag so neither rich component renders mid-stream.
