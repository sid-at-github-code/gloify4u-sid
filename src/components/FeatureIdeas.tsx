import { motion } from "framer-motion";

export type Feature = { domain: string; title: string; desc: string };

const DOMAIN_STYLE: Record<string, string> = {
  "AI":             "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "Backend":        "border-indigo-400/30 bg-indigo-500/10 text-indigo-400",
  "UI":             "border-sky-500/30   bg-sky-500/10   text-sky-400",
  "UX":             "border-sky-500/30   bg-sky-500/10   text-sky-400",
  "Data":           "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "Infra": "border-slate-400/30  bg-slate-500/10  text-slate-400",
  "DevOps":         "border-slate-400/30  bg-slate-500/10  text-slate-400",
  "Security":       "border-amber-500/30  bg-amber-500/10  text-amber-400",
};

const FALLBACK_STYLE = "border-grey-mid bg-card text-grey-text";

export const FeatureIdeas = ({ features }: { features: Feature[] }) => (
  <div className="mt-8 not-prose">
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text mb-4">
      Cutting-Edge Feature Ideas
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((f, i) => {
        const badge = DOMAIN_STYLE[f.domain] ?? FALLBACK_STYLE;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
            className="border border-grey-mid/50 bg-background/40 rounded-sm p-4"
          >
            <span className={`inline-block font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm border mb-2.5 ${badge}`}>
              {f.domain}
            </span>
            <p className="font-mono text-[12px] font-semibold text-foreground leading-snug mb-1.5">
              {f.title}
            </p>
            <p className="font-body text-[13px] text-grey-text leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
);
