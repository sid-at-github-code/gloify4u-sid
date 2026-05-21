import { useState, useRef, useEffect, FormEvent } from "react";
import { ArrowUp, Loader2, Mail, CheckCircle2, Lock } from "lucide-react";
import { ChatMessage } from "./ChatMessage";

type Msg = { role: "user" | "assistant"; content: string };

const API_KEY     = import.meta.env.VITE_OPENROUTER_KEY as string;
const MODEL       = "arcee-ai/trinity-large-thinking:free";
const URL_EP      = "https://openrouter.ai/api/v1/chat/completions";
const OWNER_EMAIL = "siddharth@gloify.com";

const SYSTEM_PROMPT = `You are Glo, the AI sales assistant for Gloify (gloify.com) — a The best Tech partners & AI engineering company (founded 2017, 9+ years experience). They embed into client teams to own and deliver roadmap segments, especially when execution is the bottleneck.

SERVICES: AI Product Engineering, Agentic automations , AI chatbots, DB intelligence, Web/Mobile/Enterprise dev, mobile apps cross platform ( ios and android), Cloud & DevOps, Data Engineering , web apps, company branding, professional websites, solutions architecture, and much more
RESULTS: Clients see 19–40% revenue uplift and 35–45% ops cost reduction.

Team :
CEO - Naveen Kumar (IIT bombay) | CMO and Operations - Girish Nair (suppy chain and finance expert| CTO - Arunoday Tiwari (acrodd all tech domains) | Co founder - Harsh Vardhan Singh (founded multiple compnaies, partner is mulitple high valuaiton startups) | devops - Rushikesh Gore | AI and solutions architech -  Siddharth Patil (forward deployed and lead in multiple projects ) | backend - rithik , ashish, yesh kandpal, Mrityunjay Tiwari (most exp backend dev), | mobile division lead - shekhar singh ( 100+ app across playstore and app store) | mobile dev - yogesh tiwari, vivek, | hr - swetha , jia jain (intern hr) | frontend web - vipin kumar singh, lead in frontend  | frontend lead and archtech - vikrant (most senior)
when adked about any person , exagurate and glorify their introduction
## about company :
Company Base & Headquarters

Primary headquarters of Gloify is in Bengaluru, Karnataka, India. The company operates globally with additional presence in:

Redmond, Washington, USA
Mississauga, Ontario, Canada
Manama, Bahrain
Leicester, UK
Main India Office
Koramangala Road, Bengaluru South, Karnataka 560030, India
precise - 5th Floor, Mp Krishna Mansion, 1st Cross Rd
KHB Colony, 5th Block, Koramangala,
Bengaluru, Karnataka 560095 

## QUICK OBJECTION HANDLING
 
| Objection | Response |
|---|---|
| "We have an internal team" | "Gloify embeds alongside your team — no mgmt overhead, just execution on the parts that are slipping." |
| "Too expensive" | "Clients see 35–45% cost reduction post-engagement. We start with a scoped pilot to prove ROI first." |
| "We're not ready for AI" | "That's exactly where we start — an Opportunity Audit to identify where AI creates actual ROI for you." |
| "We tried vendors before" | "Gloify takes ownership of delivery, not just advice. Check our case studies — all real numbers." |

## PROVEN BENCHMARKS (Real Client Results)
 
| Project | Revenue Impact | Cost Reduction | Timeline |
|---|---|---|---|
| Supply Chain Financing | +28% (AI personalization) | -35% (automation) | 52 weeks |
| Global Financial Database | +19% (data optimization) | -42% (automation) | 68 weeks |
| Financial Asset Management | +37% (AI integration) | -35% (automation) | 60 weeks |
| PropTech Cloud Platform | +25% (data optimization) | -40% (DB intelligence) | 72 weeks |
| Investment & Asset Mgmt App | +30% (data + AI optimization) | -45% (RAG + automation) | 76 weeks |
| LMS & LOS for NBFC | +40% (data + AI optimization) | -35% (DB intelligence) | 146 weeks |
  

RULES:
— Be confident, concise, and consultative
— Always end with a CTA: book a call at https://gloify.com or +91 9916232160
— Never quote prices — offer a free Opportunity Audit call
— Keep replies short and sharp
- TALK AND REPLY ONLY ON QUERIES RELATED TO COMPANIES, TECHNOLOGY, AI, PROJECTS, OFFICE, AND CORPORATE STUFF only. if asked for anyting irrelevent simple say - irrelevent and ask to talk about our topics ,

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
- just prefer those , if user provider his own stack , strictly use that stack (MUST)
FEATURES RULES:
- 4–6 features across at least 3 different domains
- domain must be one of: "AI", "Backend", "UI", "Data", "Infrastructure", "Security", "DevOps"
- Cutting-edge, specific to this idea — agent memory, streaming responses, semantic dedup, event sourcing, adaptive UI, etc.

Only append the metadata block for BUILD MODE. For general Gloify questions, respond normally without any metadata block.`;

const suggestions = [
  "What does Gloify do?",
  "I want to build something for my company ",
  "Why choose gloify as tech partners",
  "What results have your clients seen?",
];

// ── Module-level send state ────────────────────────────────────────────────────
// Using module-level vars (not React state/refs) so they are ALWAYS current
// even inside beforeunload/visibilitychange callbacks — no render-cycle lag.
let _msgs: Msg[]          = [];
let _userEmail            = "";
let _emailCaptured        = false;
let _summarySent          = false;
let _inactivityTimer: ReturnType<typeof setTimeout> | null = null;

function clearInactivity() {
  if (_inactivityTimer !== null) { clearTimeout(_inactivityTimer); _inactivityTimer = null; }
}

function resetInactivity() {
  clearInactivity();
  if (!_emailCaptured || _summarySent) return;
  console.log("[Glo Email] ⏱  Inactivity timer reset — will send in 5 min if no new messages");
  _inactivityTimer = setTimeout(() => {
    console.log("[Glo Email] ⏱  5 min inactivity reached — triggering send");
    triggerSend("inactivity-5min");
  }, 5 * 60 * 1000);
}

function triggerSend(reason: string) {
  console.log(`[Glo Email] triggerSend("${reason}") — email:"${_userEmail}" msgs:${_msgs.length} captured:${_emailCaptured} sent:${_summarySent}`);

  if (_summarySent) { console.log("[Glo Email] Already sent — skip"); return; }
  if (!_emailCaptured || !_userEmail) { console.log("[Glo Email] No email captured — skip"); return; }
  if (!_msgs.length) { console.log("[Glo Email] No messages — skip"); return; }

  _summarySent = true;
  clearInactivity();

  const meta = extractMeta(_msgs);
  console.log("[Glo Email] Building email | arch meta:", meta ? meta.title : "none");

  // Call the Vite server-side proxy — no CORS, API key never touches the browser
  const post = (to: string[], subject: string, html: string) => {
    const body = JSON.stringify({ to, subject, html });
    console.log(`[Glo Email] POST /api/send-email → to:${JSON.stringify(to)} | subject:"${subject}" | body:${body.length}B`);

    return fetch("/api/send-email", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then(async r => {
        let data: unknown = {};
        try { data = await r.json(); } catch { /* ignore */ }
        if (r.ok) {
          console.log(`[Glo Email] ✓ Sent OK → HTTP ${r.status}`, data);
        } else {
          console.error(`[Glo Email] ✗ Failed → HTTP ${r.status}`, data);
        }
      })
      .catch(err => console.error("[Glo Email] ✗ Network error:", err.message));
  };

  post([OWNER_EMAIL], `Chatbot lead: ${_userEmail}`, buildEmailHtml(_msgs, _userEmail, meta));
}

// ── Architecture SVG ───────────────────────────────────────────────────────────

const LAYER_ORDER = ["UI", "Backend", "AI Core", "Data", "Infrastructure"];
const LAYER_COLORS: Record<string, { stroke: string; label: string; bg: string }> = {
  "UI":             { stroke: "#6366f1", label: "#818cf8", bg: "#1e1b4b" },
  "Backend":        { stroke: "#8b5cf6", label: "#a78bfa", bg: "#1a0938" },
  "AI Core":        { stroke: "#ec4899", label: "#f472b6", bg: "#2d0021" },
  "Data":           { stroke: "#14b8a6", label: "#2dd4bf", bg: "#042f2e" },
  "Infrastructure": { stroke: "#f59e0b", label: "#fbbf24", bg: "#1c1008" },
};
const DOMAIN_COLORS: Record<string, string> = {
  AI: "#f472b6", Backend: "#a78bfa", UI: "#818cf8",
  Data: "#2dd4bf", Infrastructure: "#fbbf24", Security: "#fb923c", DevOps: "#4ade80",
};

function extractMeta(msgs: Msg[]) {
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role !== "assistant") continue;
    const m = msgs[i].content.match(/```json:gloify-meta\n([\s\S]*?)```/);
    if (m) { try { return JSON.parse(m[1]); } catch { /* skip */ } }
  }
  return null;
}

function generateArchSVG(meta: { nodes: { id: string; label: string; note?: string; layer: string }[]; edges: [string, string][] }): string {
  const NW = 118, NH = 54, HGAP = 14, VGAP = 42, PAD = 22, LH = 22;

  const byLayer: Record<string, typeof meta.nodes> = {};
  for (const n of meta.nodes) {
    if (!byLayer[n.layer]) byLayer[n.layer] = [];
    byLayer[n.layer].push(n);
  }

  const layers = LAYER_ORDER.filter(l => byLayer[l]);
  const maxN   = Math.max(...layers.map(l => byLayer[l].length));
  const W      = PAD * 2 + maxN * NW + (maxN - 1) * HGAP;
  const H      = PAD * 2 + layers.length * (LH + NH) + (layers.length - 1) * VGAP;

  type P = { cx: number; cy: number; x: number; y: number; layer: string };
  const pos: Record<string, P> = {};

  layers.forEach((layer, li) => {
    const nodes = byLayer[layer];
    const rowW  = nodes.length * NW + (nodes.length - 1) * HGAP;
    const x0    = (W - rowW) / 2;
    const rowTop = PAD + li * (LH + NH + VGAP) + LH;
    nodes.forEach((node, ni) => {
      const x = x0 + ni * (NW + HGAP);
      pos[node.id] = { cx: x + NW / 2, cy: rowTop + NH / 2, x, y: rowTop, layer };
    });
  });

  const p: string[] = [];

  // Background + subtle dot grid
  p.push(`<rect width="${W}" height="${H}" fill="#0a0f1e" rx="14"/>`);
  p.push(`<defs>
    <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.8" fill="#1e293b"/>
    </pattern>
  </defs>`);
  p.push(`<rect width="${W}" height="${H}" fill="url(#g)" rx="14" opacity="0.6"/>`);

  // Layer labels
  layers.forEach((layer, li) => {
    const y = PAD + li * (LH + NH + VGAP);
    const c = LAYER_COLORS[layer];
    p.push(`<rect x="${PAD - 4}" y="${y + 3}" width="${layer.length * 6.8 + 14}" height="15" rx="3" fill="${c.bg}" opacity="0.8"/>`);
    p.push(`<text x="${PAD + 3}" y="${y + 13}" fill="${c.label}" font-size="8" font-weight="800" letter-spacing="1.6" font-family="ui-monospace,monospace">${layer.toUpperCase()}</text>`);
  });

  // Edges (drawn under nodes)
  for (const [fId, tId] of meta.edges) {
    const f = pos[fId], t = pos[tId];
    if (!f || !t) continue;

    let d: string;
    if (f.layer === t.layer) {
      const arc = Math.max(f.cy, t.cy) + NH * 0.7;
      d = `M ${f.cx} ${f.cy + NH / 2} Q ${(f.cx + t.cx) / 2} ${arc} ${t.cx} ${t.cy + NH / 2}`;
    } else if (f.cy < t.cy) {
      const mY = (f.cy + NH / 2 + t.cy - NH / 2) / 2;
      d = `M ${f.cx} ${f.cy + NH / 2} C ${f.cx} ${mY} ${t.cx} ${mY} ${t.cx} ${t.cy - NH / 2}`;
    } else {
      const sX = Math.max(f.x + NW, t.x + NW) + 22;
      d = `M ${f.x + NW} ${f.cy} C ${sX} ${f.cy} ${sX} ${t.cy} ${t.x + NW} ${t.cy}`;
    }

    p.push(`<path d="${d}" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 3"/>`);

    if (f.layer !== t.layer && f.cy < t.cy) {
      const ax = t.cx, ay = t.cy - NH / 2;
      p.push(`<polygon points="${ax},${ay} ${ax - 4},${ay - 7} ${ax + 4},${ay - 7}" fill="#475569"/>`);
    }
  }

  // Nodes
  for (const node of meta.nodes) {
    const n = pos[node.id];
    if (!n) continue;
    const c = LAYER_COLORS[node.layer] || LAYER_COLORS["UI"];
    p.push(`<rect x="${n.x - 1}" y="${n.y - 1}" width="${NW + 2}" height="${NH + 2}" rx="7" fill="${c.stroke}" opacity="0.2"/>`);
    p.push(`<rect x="${n.x}" y="${n.y}" width="${NW}" height="${NH}" fill="${c.bg}" stroke="${c.stroke}" stroke-width="1.5" rx="6"/>`);
    const ty = node.note ? n.cy - 5 : n.cy + 5;
    p.push(`<text x="${n.cx}" y="${ty}" text-anchor="middle" fill="#f1f5f9" font-size="11" font-weight="700" font-family="ui-sans-serif,sans-serif">${node.label}</text>`);
    if (node.note) {
      p.push(`<text x="${n.cx}" y="${n.cy + 13}" text-anchor="middle" fill="#64748b" font-size="9" font-family="ui-monospace,monospace">${node.note}</text>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto;display:block;border-radius:14px">${p.join("")}</svg>`;
}

// ── Email HTML builder ─────────────────────────────────────────────────────────

function buildEmailHtml(msgs: Msg[], email: string, meta: ReturnType<typeof extractMeta>): string {
  const esc = (s: string) => s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const fmtContent = (raw: string) => {
    const stripped = raw.replace(/```json:gloify-meta[\s\S]*?```/g, "[ Architecture diagram — see below ]");
    return esc(stripped).replace(/\n/g, "<br>");
  };

  const transcript = msgs.map(m => {
    const u = m.role === "user";
    const avatarBg  = u ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#ec4899,#f472b6)";
    const nameColor = u ? "#6366f1" : "#ec4899";
    return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px">
  <tr>
    <td width="44" valign="top" style="padding-right:14px">
      <div style="width:34px;height:34px;border-radius:50%;background:${avatarBg};
        text-align:center;line-height:34px;font-size:13px;font-weight:800;color:#fff;
        font-family:ui-sans-serif,sans-serif">${u ? "U" : "G"}</div>
    </td>
    <td valign="top">
      <p style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
        margin:0 0 6px;color:${nameColor};font-family:ui-monospace,monospace">${u ? "You" : "Glo"}</p>
      <p style="font-size:14px;color:#1e293b;line-height:1.7;margin:0;
        font-family:ui-sans-serif,sans-serif">${fmtContent(m.content)}</p>
    </td>
  </tr>
</table>`;
  }).join("");

  let archSection = "";
  if (meta) {
    const svg = generateArchSVG(meta);

    const techBadges = ((meta.techstack as string[]) || []).map(t =>
      `<span style="display:inline-block;background:#0f172a;color:#94a3b8;
        font-size:11px;padding:5px 13px;border-radius:20px;margin:3px;
        border:1px solid #1e293b;font-family:ui-monospace,monospace;font-weight:600">${esc(t)}</span>`
    ).join("");

    const featureRows = ((meta.features as { domain: string; title: string; desc: string }[]) || []).map(f => {
      const col = DOMAIN_COLORS[f.domain] || "#818cf8";
      return `
<tr>
  <td style="padding:11px 14px;vertical-align:top;border-bottom:1px solid #0f172a;width:90px">
    <span style="display:inline-block;background:${col}25;color:${col};
      font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
      padding:3px 8px;border-radius:12px;font-family:ui-monospace,monospace">${esc(f.domain)}</span>
  </td>
  <td style="padding:11px 14px;vertical-align:top;border-bottom:1px solid #0f172a">
    <p style="font-size:13px;font-weight:700;color:#f1f5f9;margin:0 0 4px;
      font-family:ui-sans-serif,sans-serif">${esc(f.title)}</p>
    <p style="font-size:12px;color:#64748b;margin:0;line-height:1.55;
      font-family:ui-sans-serif,sans-serif">${esc(f.desc)}</p>
  </td>
</tr>`;
    }).join("");

    archSection = `
<div style="background:#0a0f1e;border-radius:16px;padding:32px 26px;margin:28px 0;border:1px solid #1e293b">
  <p style="font-size:9px;color:#475569;letter-spacing:3px;text-transform:uppercase;
    margin:0 0 6px;font-family:ui-monospace,monospace;font-weight:800">System Architecture</p>
  <h2 style="font-size:21px;color:#f1f5f9;margin:0 0 26px;font-weight:800;
    font-family:ui-sans-serif,sans-serif;letter-spacing:-0.4px">${esc(meta.title || "Architecture")}</h2>

  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:26px">
    ${svg}
  </div>

  <div style="margin-bottom:${featureRows ? "26px" : "0"}">
    <p style="font-size:9px;color:#475569;letter-spacing:3px;text-transform:uppercase;
      margin:0 0 12px;font-family:ui-monospace,monospace;font-weight:800">Tech Stack</p>
    <div>${techBadges}</div>
  </div>

  ${featureRows ? `
  <div style="border-top:1px solid #1e293b;padding-top:22px">
    <p style="font-size:9px;color:#475569;letter-spacing:3px;text-transform:uppercase;
      margin:0 0 14px;font-family:ui-monospace,monospace;font-weight:800">Key Features</p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#0f172a;border-radius:10px;overflow:hidden;border:1px solid #1e293b">
      <tbody>${featureRows}</tbody>
    </table>
  </div>` : ""}
</div>`;
  }

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chatbot lead: ${esc(email)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9">

<div style="background:linear-gradient(160deg,#1e1b4b 0%,#312e81 50%,#1e0e3f 100%);
  padding:52px 32px 44px;text-align:center">
  <p style="color:#6366f1;font-size:10px;letter-spacing:4px;text-transform:uppercase;
    margin:0 0 12px;font-family:ui-monospace,monospace;font-weight:800">◆ &nbsp;Gloify Glo&nbsp; ◆</p>
  <h1 style="color:#fff;font-size:27px;margin:0;font-weight:800;letter-spacing:-0.7px;
    font-family:ui-sans-serif,sans-serif">New chatbot lead</h1>
  <p style="font-size:14px;color:#c7d2fe;margin:10px 0 0;font-family:ui-sans-serif,sans-serif">
    A user interacted with Glo on your website
  </p>
</div>

<!-- Lead info banner -->
<div style="max-width:660px;margin:0 auto;padding:0 16px">
  <div style="background:#fff;border-radius:14px;padding:22px 24px;margin:24px 0 0;
    box-shadow:0 2px 12px rgba(0,0,0,0.07);border:1px solid #e2e8f0;
    display:flex;gap:16px;align-items:flex-start">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%;padding-right:12px;border-right:1px solid #e2e8f0">
          <p style="font-size:9px;color:#6366f1;letter-spacing:2.5px;text-transform:uppercase;
            margin:0 0 6px;font-family:ui-monospace,monospace;font-weight:800">User Email</p>
          <p style="font-size:16px;font-weight:700;color:#1e293b;margin:0;
            font-family:ui-sans-serif,sans-serif">
            <a href="mailto:${esc(email)}" style="color:#4f46e5;text-decoration:none">${esc(email)}</a>
          </p>
        </td>
        <td style="padding-left:20px">
          <p style="font-size:9px;color:#6366f1;letter-spacing:2.5px;text-transform:uppercase;
            margin:0 0 6px;font-family:ui-monospace,monospace;font-weight:800">Timestamp (IST)</p>
          <p style="font-size:14px;font-weight:600;color:#374151;margin:0;
            font-family:ui-sans-serif,sans-serif">${timestamp}</p>
        </td>
      </tr>
    </table>
  </div>
</div>

<div style="max-width:660px;margin:0 auto;padding:0 16px 48px">

  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin:28px 0;
    box-shadow:0 4px 20px rgba(0,0,0,0.07);border:1px solid #e2e8f0">
    <p style="font-size:9px;color:#6366f1;letter-spacing:3px;text-transform:uppercase;
      margin:0 0 22px;font-family:ui-monospace,monospace;font-weight:800">Conversation</p>
    ${transcript}
  </div>

  ${archSection}

  <div style="text-align:center;padding:16px 0 32px;border-top:1px solid #e2e8f0;margin-top:8px">
    <p style="font-size:12px;color:#94a3b8;margin:0;font-family:ui-sans-serif,sans-serif">
      Sent by Glo &nbsp;·&nbsp; Gloify AI assistant &nbsp;·&nbsp;
      <a href="https://gloify.com" style="color:#6366f1;text-decoration:none">gloify.com</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function AskAI() {
  const [messages, setMessages]               = useState<Msg[]>([]);
  const [input, setInput]                     = useState("");
  const [loading, setLoading]                 = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput]           = useState("");
  const [userEmail, setUserEmail]             = useState("");
  const [emailCaptured, setEmailCaptured]     = useState(false);
  const [emailError, setEmailError]           = useState("");

  const msgsRef       = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLTextAreaElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, showEmailPrompt, emailCaptured]);

  // Focus email input when prompt appears
  useEffect(() => {
    if (showEmailPrompt) requestAnimationFrame(() => emailInputRef.current?.focus());
  }, [showEmailPrompt]);

  // Register page-leave listeners once
  useEffect(() => {
    console.log("[Glo Chatbot] Component mounted — listeners registered");

    const onBeforeUnload = () => triggerSend("beforeunload");
    const onVisibility   = () => {
      if (document.visibilityState === "hidden") triggerSend("visibilitychange:hidden");
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVisibility);
      triggerSend("component-unmount");
      console.log("[Glo Chatbot] Component unmounted");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const send = async (text: string) => {
    if (!text.trim() || loading || showEmailPrompt) return;

    const userMsg: Msg   = { role: "user", content: text.trim() };
    const history: Msg[] = [...messages, userMsg];

    // Update module-level state immediately (no render-cycle lag)
    _msgs = history;
    setMessages(history);
    setInput("");
    setLoading(true);

    console.log(`[Glo Chatbot] User sent: "${text.trim().substring(0, 60)}…"`);

    try {
      const res = await fetch(URL_EP, {
        method: "POST",
        headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }] },
            ...history.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      console.log(`[Glo Chatbot] API response: HTTP ${res.status}`);
      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error?.message ?? `HTTP ${res.status}`;
        console.error("[Glo Chatbot] API error:", errMsg);
        const next = [...history, { role: "assistant" as const, content: `Error: ${errMsg}` }];
        _msgs = next;
        setMessages(next);
        return;
      }

      const msg   = data.choices?.[0]?.message;
      const reply: string = msg?.content || msg?.reasoning || "No response received.";
      const next: Msg[]   = [...history, { role: "assistant", content: reply }];

      // Update module state immediately
      _msgs = next;
      setMessages(next);

      const botCount = next.filter(m => m.role === "assistant").length;
      console.log(`[Glo Chatbot] Bot reply #${botCount} | len:${reply.length} chars`);

      // Show email prompt on 2nd bot reply
      if (botCount === 2 && !_emailCaptured) {
        console.log("[Glo Chatbot] Showing email prompt (2nd reply)");
        setShowEmailPrompt(true);
      }

      // Reset inactivity timer on each reply (once email is captured)
      if (_emailCaptured) resetInactivity();

    } catch (e) {
      console.error("[Glo Chatbot] Fetch error:", (e as Error).message);
      const next = [...history, { role: "assistant" as const, content: `Network error: ${(e as Error).message}` }];
      _msgs = next;
      setMessages(next);
    } finally {
      setLoading(false);
      if (!showEmailPrompt) requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const val = emailInput.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Update module-level state immediately — critical for beforeunload timing
    _userEmail      = val;
    _emailCaptured  = true;

    setUserEmail(val);
    setEmailCaptured(true);
    setShowEmailPrompt(false);
    setEmailError("");

    console.log("[Glo Email] Email captured:", val);
    resetInactivity(); // start 5-min countdown from now

    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };
  const empty    = messages.length === 0;

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

            {/* Inline email prompt */}
            {showEmailPrompt && (
              <div className="flex justify-start">
                <div className="max-w-[92%] w-full bg-card border border-primary/30 rounded-md p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="font-body text-[15px] text-foreground leading-[1.6]">
                      I'd love to keep this going — and send you a full summary with the architecture diagram and tech stack when we wrap up. What's your email?
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={emailInput}
                      onChange={e => { setEmailInput(e.target.value); setEmailError(""); }}
                      placeholder="your@email.com"
                      className="flex-1 bg-background border border-grey-mid px-4 py-2.5 font-body text-[14px] text-foreground placeholder:text-grey-text outline-none focus:border-primary rounded-sm transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                      Sure, share
                    </button>
                  </form>
                  {emailError && (
                    <p className="font-mono text-[11px] text-red-500 mt-2">{emailError}</p>
                  )}
                </div>
              </div>
            )}

            {/* Confirmation */}
            {emailCaptured && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 font-body text-[14px] text-grey-text">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  I'll email the full conversation and architecture to{" "}
                  <span className="text-foreground font-medium">{userEmail}</span> when you're done.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggestions */}
        {empty && (
          <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-[640px] mx-auto">
            {suggestions.map(s => (
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
          <div className={`relative border rounded-md transition-colors ${
            showEmailPrompt
              ? "border-primary/40 bg-card/50"
              : "border-grey-mid bg-card focus-within:border-primary"
          }`}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              disabled={showEmailPrompt}
              placeholder={
                showEmailPrompt
                  ? "Share your email above to continue the conversation…"
                  : empty
                  ? "Describe your product, workflow, or idea…"
                  : "Ask a follow-up…"
              }
              rows={2}
              className="w-full resize-none bg-transparent px-5 py-4 pr-14 font-body text-[16px] text-foreground placeholder:text-grey-text outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || showEmailPrompt}
              aria-label="Send"
              className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-sm transition-opacity disabled:opacity-30 hover:bg-primary-light"
            >
              {loading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : showEmailPrompt
                ? <Lock className="w-4 h-4" />
                : <ArrowUp className="w-4 h-4" />}
            </button>
          </div>
          {showEmailPrompt && (
            <p className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.1em] text-center mt-2">
              Enter your email above to continue
            </p>
          )}
        </form>

      </div>
    </section>
  );
}
