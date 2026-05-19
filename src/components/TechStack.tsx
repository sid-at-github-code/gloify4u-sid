const COLOURS: Record<string, string> = {
  "react":        "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "next.js":      "border-slate-400/30 text-slate-300 bg-slate-400/5",
  "nextjs":       "border-slate-400/30 text-slate-300 bg-slate-400/5",
  "vue":          "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  "svelte":       "border-orange-500/30 text-orange-400 bg-orange-500/5",
  "typescript":   "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "javascript":   "border-yellow-400/30 text-yellow-400 bg-yellow-400/5",
  "tailwindcss":  "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "tailwind":     "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "swift":        "border-orange-400/30 text-orange-300 bg-orange-400/5",
  "kotlin":       "border-violet-500/30 text-violet-400 bg-violet-500/5",
  "flutter":      "border-sky-400/30 text-sky-300 bg-sky-400/5",
  "python":       "border-yellow-500/30 text-yellow-400 bg-yellow-500/5",
  "fastapi":      "border-teal-500/30 text-teal-400 bg-teal-500/5",
  "django":       "border-green-600/30 text-green-400 bg-green-600/5",
  "flask":        "border-slate-400/30 text-slate-300 bg-slate-400/5",
  "node.js":      "border-green-500/30 text-green-400 bg-green-500/5",
  "nodejs":       "border-green-500/30 text-green-400 bg-green-500/5",
  "go":           "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "rust":         "border-orange-600/30 text-orange-400 bg-orange-600/5",
  "celery":       "border-green-400/30 text-green-300 bg-green-400/5",
  "openai":       "border-emerald-400/30 text-emerald-300 bg-emerald-400/5",
  "gemini":       "border-blue-400/30 text-blue-300 bg-blue-400/5",
  "langchain":    "border-green-400/30 text-green-300 bg-green-400/5",
  "langgraph":    "border-violet-400/30 text-violet-300 bg-violet-400/5",
  "crewai":       "border-violet-500/30 text-violet-400 bg-violet-500/5",
  "autogen":      "border-purple-400/30 text-purple-300 bg-purple-400/5",
  "llamaindex":   "border-purple-400/30 text-purple-300 bg-purple-400/5",
  "hugging face": "border-yellow-400/30 text-yellow-300 bg-yellow-400/5",
  "anthropic":    "border-amber-400/30 text-amber-300 bg-amber-400/5",
  "rag":          "border-violet-500/30 text-violet-400 bg-violet-500/5",
  "postgresql":   "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "postgres":     "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "pgvector":     "border-blue-500/30 text-blue-300 bg-blue-500/5",
  "pinecone":     "border-green-500/30 text-green-300 bg-green-500/5",
  "weaviate":     "border-purple-500/30 text-purple-300 bg-purple-500/5",
  "chromadb":     "border-orange-400/30 text-orange-300 bg-orange-400/5",
  "redis":        "border-red-500/30 text-red-400 bg-red-500/5",
  "mongodb":      "border-green-600/30 text-green-400 bg-green-600/5",
  "supabase":     "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  "vercel":       "border-slate-300/30 text-slate-300 bg-slate-300/5",
  "aws":          "border-amber-500/30 text-amber-400 bg-amber-500/5",
  "gcp":          "border-blue-400/30 text-blue-300 bg-blue-400/5",
  "azure":        "border-sky-400/30 text-sky-300 bg-sky-400/5",
  "docker":       "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "kubernetes":   "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "terraform":    "border-violet-500/30 text-violet-400 bg-violet-500/5",
};

const FALLBACK = "border-grey-mid text-grey-text bg-transparent";

const TECH_CATEGORY: Record<string, string> = {
  "python": "AI / ML", "langchain": "AI / ML", "langgraph": "AI / ML",
  "crewai": "AI / ML", "autogen": "AI / ML", "llamaindex": "AI / ML",
  "openai": "AI / ML", "anthropic": "AI / ML", "gemini": "AI / ML",
  "hugging face": "AI / ML", "pgvector": "AI / ML", "pinecone": "AI / ML",
  "weaviate": "AI / ML", "chromadb": "AI / ML", "rag": "AI / ML",
  "fastapi": "Backend", "django": "Backend", "flask": "Backend",
  "node.js": "Backend", "nodejs": "Backend", "go": "Backend",
  "rust": "Backend", "celery": "Backend",
  "react": "Frontend", "next.js": "Frontend", "nextjs": "Frontend",
  "vue": "Frontend", "svelte": "Frontend", "typescript": "Frontend",
  "javascript": "Frontend", "tailwindcss": "Frontend", "tailwind": "Frontend",
  "flutter": "Frontend", "swift": "Frontend", "kotlin": "Frontend",
  "postgresql": "Data", "postgres": "Data", "supabase": "Data",
  "mongodb": "Data", "redis": "Data", "mysql": "Data",
  "docker": "Infrastructure", "kubernetes": "Infrastructure", "aws": "Infrastructure",
  "gcp": "Infrastructure", "azure": "Infrastructure", "vercel": "Infrastructure",
  "terraform": "Infrastructure",
};

const CATEGORY_ORDER = ["AI / ML", "Backend", "Data", "Frontend", "Infrastructure"];

function colour(tech: string) {
  return COLOURS[tech.toLowerCase()] ?? FALLBACK;
}

function groupByCategory(items: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const item of items) {
    const cat = TECH_CATEGORY[item.toLowerCase()] ?? "Other";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }
  return groups;
}

export const TechStack = ({ items }: { items: string[] }) => {
  const grouped = groupByCategory(items);
  const orderedKeys = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="mt-8 not-prose">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text mb-4">
        Recommended Stack
      </p>
      <div className="space-y-3">
        {orderedKeys.map((cat) => (
          <div key={cat} className="flex items-start gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-grey-text/60 pt-1.5 w-[60px] shrink-0">
              {cat}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {grouped[cat].map((tech) => (
                <span
                  key={tech}
                  className={`font-mono text-[11px] tracking-[0.04em] px-2.5 py-1 rounded-sm border ${colour(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
