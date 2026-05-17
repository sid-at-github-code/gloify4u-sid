// Colour categories keyed by lowercase tech name
const COLOURS: Record<string, string> = {
  // Frontend / UI
  "react": "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "next.js": "border-slate-400/30 text-slate-300 bg-slate-400/5",
  "nextjs": "border-slate-400/30 text-slate-300 bg-slate-400/5",
  "vue": "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  "svelte": "border-orange-500/30 text-orange-400 bg-orange-500/5",
  "typescript": "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "javascript": "border-yellow-400/30 text-yellow-400 bg-yellow-400/5",
  "tailwindcss": "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "tailwind": "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  // Mobile
  "swift": "border-orange-400/30 text-orange-300 bg-orange-400/5",
  "kotlin": "border-violet-500/30 text-violet-400 bg-violet-500/5",
  "flutter": "border-sky-400/30 text-sky-300 bg-sky-400/5",
  "core ml": "border-orange-400/30 text-orange-300 bg-orange-400/5",
  "coreml": "border-orange-400/30 text-orange-300 bg-orange-400/5",
  // Backend
  "python": "border-yellow-500/30 text-yellow-400 bg-yellow-500/5",
  "fastapi": "border-teal-500/30 text-teal-400 bg-teal-500/5",
  "node.js": "border-green-500/30 text-green-400 bg-green-500/5",
  "nodejs": "border-green-500/30 text-green-400 bg-green-500/5",
  "django": "border-green-600/30 text-green-400 bg-green-600/5",
  "go": "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "rust": "border-orange-600/30 text-orange-400 bg-orange-600/5",
  // AI / ML
  "openai": "border-emerald-400/30 text-emerald-300 bg-emerald-400/5",
  "gemini": "border-blue-400/30 text-blue-300 bg-blue-400/5",
  "langchain": "border-green-400/30 text-green-300 bg-green-400/5",
  "llamaindex": "border-purple-400/30 text-purple-300 bg-purple-400/5",
  "hugging face": "border-yellow-400/30 text-yellow-300 bg-yellow-400/5",
  "anthropic": "border-amber-400/30 text-amber-300 bg-amber-400/5",
  // Databases
  "postgresql": "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "postgres": "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "pgvector": "border-blue-500/30 text-blue-300 bg-blue-500/5",
  "pinecone": "border-green-500/30 text-green-300 bg-green-500/5",
  "redis": "border-red-500/30 text-red-400 bg-red-500/5",
  "mongodb": "border-green-600/30 text-green-400 bg-green-600/5",
  "supabase": "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  // Infrastructure
  "vercel": "border-slate-300/30 text-slate-300 bg-slate-300/5",
  "aws": "border-amber-500/30 text-amber-400 bg-amber-500/5",
  "gcp": "border-blue-400/30 text-blue-300 bg-blue-400/5",
  "docker": "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "kubernetes": "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "terraform": "border-violet-500/30 text-violet-400 bg-violet-500/5",
};

const FALLBACK = "border-grey-mid text-grey-text bg-transparent";

function colour(tech: string) {
  return COLOURS[tech.toLowerCase()] ?? FALLBACK;
}

export const TechStack = ({ items }: { items: string[] }) => (
  <div className="mt-8">
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text mb-3">
      Recommended Stack
    </p>
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className={`font-mono text-[11px] tracking-[0.04em] px-3 py-1.5 rounded-sm border ${colour(tech)}`}
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);
