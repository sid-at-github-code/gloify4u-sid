import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

/* ── Card dimensions ─────────────────────────────────────────────────── */
const CARD_W = 380;   // px — wider so content breathes
const GAP    = 32;    // px between cards
// Each card earns 200 px of vertical scroll space → silky pace
const SCROLL_PER_CARD = 200;

/* ── Week data ───────────────────────────────────────────────────────── */
const WEEKS = [
  { w: "01", phase: "Discovery", label: "Immersion & Audit",     items: ["Stakeholder interviews", "Workflow shadowing", "Bottleneck mapping",    "Risk identification"   ] },
  { w: "02", phase: "Discovery", label: "Architecture Planning", items: ["Stack selection",        "Data flow design",   "Milestone setting",       "Resource allocation"   ] },
  { w: "03", phase: "Build",     label: "Infrastructure Setup",  items: ["Cloud environment",      "CI/CD pipelines",    "Data connectors",         "Secrets management"    ] },
  { w: "04", phase: "Build",     label: "Core Systems",          items: ["Ingestion layer",        "Embedding pipeline", "Vector store",            "Storage schema"        ] },
  { w: "05", phase: "Build",     label: "AI Integration I",      items: ["LLM integration",        "Prompt engineering", "RAG baseline",            "Evaluation harness"    ] },
  { w: "06", phase: "Build",     label: "AI Integration II",     items: ["Agent tooling",          "Memory layer",       "Tool-use scaffolding",    "Feedback loops"        ] },
  { w: "07", phase: "Build",     label: "Workflow Automation",   items: ["Business logic",         "CRM integrations",   "Webhook handlers",        "Event routing"         ] },
  { w: "08", phase: "Build",     label: "Integration & Polish",  items: ["UI / dashboard",         "End-to-end tests",   "Performance tuning",      "Accessibility pass"    ] },
  { w: "09", phase: "QA",        label: "Quality Assurance",     items: ["Regression suite",       "Edge-case review",   "Security audit",          "Load profiling"        ] },
  { w: "10", phase: "QA",        label: "Stakeholder Review",    items: ["UAT sessions",           "Feedback iteration", "Sign-off ceremony",       "Documentation freeze"  ] },
  { w: "11", phase: "Deploy",    label: "Staging & Load Test",   items: ["Staging deployment",     "Load testing",       "Runbook preparation",     "Rollback rehearsal"    ] },
  { w: "12", phase: "Deploy",    label: "Production Go-Live",    items: ["Zero-downtime deploy",   "Monitoring live",    "On-call handover",        "30-day support window" ] },
];

/* ── Phase accent colours ────────────────────────────────────────────── */
const PHASE: Record<string, { dot: string; badge: string; border: string }> = {
  Discovery: { dot: "bg-primary",      badge: "text-primary border-primary/50",       border: "border-primary/30"        },
  Build:     { dot: "bg-blue-400",     badge: "text-blue-400 border-blue-400/40",     border: "border-blue-400/20"       },
  QA:        { dot: "bg-amber-400",    badge: "text-amber-400 border-amber-400/40",   border: "border-amber-400/20"      },
  Deploy:    { dot: "bg-emerald-400",  badge: "text-emerald-400 border-emerald-400/40", border: "border-emerald-400/20"  },
};

/* ── Inline SVG illustrations ────────────────────────────────────────── */
// Each SVG is 48×48, stroke-based, no fill, primaryish strokes on dark bg.
const S = "stroke-current"; // shorthand
const SVGS: Record<string, JSX.Element> = {
  // 01 Immersion — stakeholder org-tree
  "01": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <circle cx="24" cy="8"  r="3.5" />
      <circle cx="10" cy="30" r="3.5" />
      <circle cx="38" cy="30" r="3.5" />
      <line x1="24" y1="11.5" x2="24" y2="19" />
      <line x1="24" y1="19"   x2="10" y2="26.5" />
      <line x1="24" y1="19"   x2="38" y2="26.5" />
      <line x1="10" y1="33.5" x2="10" y2="40" strokeDasharray="2 2" />
      <line x1="38" y1="33.5" x2="38" y2="40" strokeDasharray="2 2" />
      <line x1="7"  y1="40"   x2="13" y2="40" />
      <line x1="35" y1="40"   x2="41" y2="40" />
    </svg>
  ),
  // 02 Architecture Planning — blueprint grid
  "02": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" className={S}>
      <rect x="6"  y="6"  width="36" height="36" rx="1" />
      <line x1="6"  y1="20" x2="42" y2="20" />
      <line x1="6"  y1="34" x2="42" y2="34" />
      <line x1="20" y1="6"  x2="20" y2="42" />
      <line x1="34" y1="6"  x2="34" y2="42" />
      <rect x="20" y="20" width="14" height="14" strokeOpacity="0.4" />
      <circle cx="20" cy="20" r="1.5" />
    </svg>
  ),
  // 03 Infrastructure — server rack
  "03": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <rect x="5"  y="8"  width="38" height="10" rx="1" />
      <rect x="5"  y="21" width="38" height="10" rx="1" />
      <rect x="5"  y="34" width="38" height="10" rx="1" />
      <circle cx="11" cy="13" r="1.5" />
      <circle cx="11" cy="26" r="1.5" />
      <circle cx="11" cy="39" r="1.5" />
      <line x1="17" y1="13" x2="36" y2="13" strokeOpacity="0.3" />
      <line x1="17" y1="26" x2="36" y2="26" strokeOpacity="0.3" />
      <line x1="17" y1="39" x2="36" y2="39" strokeOpacity="0.3" />
    </svg>
  ),
  // 04 Core Systems — layered architecture
  "04": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" className={S}>
      <rect x="5"  y="6"  width="38" height="8"  rx="1" />
      <rect x="9"  y="18" width="30" height="8"  rx="1" />
      <rect x="13" y="30" width="22" height="8"  rx="1" />
      <line x1="24" y1="14" x2="24" y2="18" />
      <line x1="24" y1="26" x2="24" y2="30" />
      <line x1="20" y1="38" x2="20" y2="44" strokeDasharray="2 2" />
      <line x1="28" y1="38" x2="28" y2="44" strokeDasharray="2 2" />
    </svg>
  ),
  // 05 AI Integration I — neural net nodes
  "05": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" className={S}>
      <circle cx="8"  cy="14" r="2.5" />
      <circle cx="8"  cy="34" r="2.5" />
      <circle cx="24" cy="8"  r="2.5" />
      <circle cx="24" cy="24" r="3"   />
      <circle cx="24" cy="40" r="2.5" />
      <circle cx="40" cy="14" r="2.5" />
      <circle cx="40" cy="34" r="2.5" />
      {/* connections */}
      <line x1="10.5" y1="14" x2="21"  y2="22"  strokeOpacity="0.5" />
      <line x1="10.5" y1="34" x2="21"  y2="26"  strokeOpacity="0.5" />
      <line x1="24"   y1="10.5" x2="24" y2="21" strokeOpacity="0.5" />
      <line x1="24"   y1="27" x2="24"  y2="37.5" strokeOpacity="0.5" />
      <line x1="27"   y1="22" x2="37.5" y2="14" strokeOpacity="0.5" />
      <line x1="27"   y1="26" x2="37.5" y2="34" strokeOpacity="0.5" />
    </svg>
  ),
  // 06 AI Integration II — agent hub, radial spokes
  "06": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" className={S}>
      <circle cx="24" cy="24" r="5" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r1 = 8, r2 = 17;
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={i}
            x1={24 + r1 * Math.cos(rad)} y1={24 + r1 * Math.sin(rad)}
            x2={24 + r2 * Math.cos(rad)} y2={24 + r2 * Math.sin(rad)}
            strokeOpacity={i % 2 === 0 ? 1 : 0.4}
          />
        );
      })}
      <circle cx="24" cy="24" r="17" strokeDasharray="3 3" strokeOpacity="0.25" />
    </svg>
  ),
  // 07 Workflow Automation — circular flow arrows
  "07": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <path d="M24 7 A17 17 0 1 1 7.5 29" />
      <polyline points="4,26 7.5,30 11,26" />
      <circle cx="24" cy="24" r="3" />
      <line x1="24" y1="7" x2="24" y2="14" strokeOpacity="0.3" />
    </svg>
  ),
  // 08 Integration & Polish — UI frame with tick
  "08": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <rect x="4" y="8" width="40" height="32" rx="2" />
      <line x1="4" y1="16" x2="44" y2="16" />
      <circle cx="9"  cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="21" cy="12" r="1.5" />
      <polyline points="15,28 21,34 33,22" />
    </svg>
  ),
  // 09 QA — shield
  "09": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <path d="M24 5 L42 12 L42 26 Q42 38 24 43 Q6 38 6 26 L6 12 Z" />
      <polyline points="16,24 21,30 32,18" />
    </svg>
  ),
  // 10 Stakeholder Review — rising bar chart
  "10": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <line x1="6" y1="42" x2="42" y2="42" />
      <line x1="6" y1="6"  x2="6"  y2="42" />
      <rect x="10" y="30" width="7" height="12" />
      <rect x="21" y="20" width="7" height="22" />
      <rect x="32" y="10" width="7" height="32" />
      <polyline points="13.5,30 24.5,20 35.5,10" strokeDasharray="3 2" strokeOpacity="0.5" />
    </svg>
  ),
  // 11 Staging & Load Test — gauge/meter
  "11": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" className={S}>
      <path d="M8 36 A16 16 0 0 1 40 36" />
      <path d="M11 36 A13 13 0 0 1 37 36" strokeOpacity="0.3" />
      <line x1="6"  y1="36" x2="11" y2="36" />
      <line x1="42" y1="36" x2="37" y2="36" />
      <line x1="24" y1="20" x2="24" y2="23" />
      {/* needle pointing to ~80% = roughly 170deg from left */}
      <line x1="24" y1="36" x2="13" y2="23" strokeWidth="1.4" />
      <circle cx="24" cy="36" r="2" />
      <text x="8"  y="44" fontSize="5" strokeWidth="0.5" fontFamily="'IBM Plex Mono'">0</text>
      <text x="39" y="44" fontSize="5" strokeWidth="0.5" fontFamily="'IBM Plex Mono'">100</text>
    </svg>
  ),
  // 12 Production Go-Live — rocket trajectory
  "12": (
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={S}>
      <path d="M10 38 Q18 20 36 8" />
      <polyline points="30,6 38,8 36,16" />
      <circle cx="10" cy="38" r="2.5" />
      <circle cx="22" cy="26" r="1.5" strokeOpacity="0.5" />
      <circle cx="30" cy="16" r="1.5" strokeOpacity="0.5" />
      <line x1="6"  y1="42" x2="42" y2="42" strokeOpacity="0.2" />
      <line x1="6"  y1="6"  x2="6"  y2="42" strokeOpacity="0.2" />
    </svg>
  ),
};

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Total horizontal distance to travel: all cards except ~2.5 visible on screen
  const totalShift = (WEEKS.length - 2) * (CARD_W + GAP);

  // Raw transform from scroll
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -totalShift]);

  // Spring wrapper = buttery smooth, eliminates all jank
  const x = useSpring(rawX, { stiffness: 70, damping: 24, mass: 0.6 });

  // Progress bar
  const barW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerH = WEEKS.length * SCROLL_PER_CARD;

  return (
    <section className="bg-foreground">

      {/* ── Static header (scrolls away before sticky zone starts) ──── */}
      <div className="px-6 md:px-12 lg:px-20 pt-24 pb-0">
        <ScrollReveal>
          <p className="font-mono text-[11px] text-primary uppercase tracking-[0.14em] mb-5">
            Project Timeline
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <h2 className="font-display text-[38px] md:text-[52px] font-medium text-background leading-[1.02] max-w-[520px]">
              From kickoff to production<br />in 12 weeks.
            </h2>
            <p className="font-body text-[15px] text-background/50 max-w-[340px] leading-[1.7]">
              Scroll to walk through a typical engagement week by week.
              The structure never changes — only the specifics do.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Sticky horizontal scroll zone ───────────────────────────── */}
      <div ref={containerRef} style={{ height: containerH }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center gap-0">

          {/* Top progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-background/8">
            <motion.div className="h-full bg-primary" style={{ width: barW }} />
          </div>

          {/* Phase legend + week counter */}
          <div className="px-6 md:px-12 lg:px-20 mb-7 flex items-center justify-between">
            <div className="flex gap-5">
              {Object.entries(PHASE).map(([ph, c]) => (
                <div key={ph} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  <span className="font-mono text-[10px] text-background/40 uppercase tracking-[0.1em]">{ph}</span>
                </div>
              ))}
            </div>
            <span className="font-mono text-[10px] text-background/25 uppercase tracking-[0.1em] hidden md:block">
              12 weeks · scroll to advance →
            </span>
          </div>

          {/* Card track */}
          <div className="pl-6 md:pl-12 lg:pl-20 overflow-visible">
            <motion.div
              className="flex items-stretch"
              style={{ x, gap: GAP, width: WEEKS.length * (CARD_W + GAP) }}
            >
              {WEEKS.map((wk) => {
                const ph = PHASE[wk.phase];
                const svg = SVGS[wk.w];
                return (
                  <div
                    key={wk.w}
                    style={{ width: CARD_W, flexShrink: 0 }}
                    className={`bg-background/[0.04] border ${ph.border} flex flex-col p-8 relative overflow-hidden`}
                  >
                    {/* Faint week number watermark */}
                    <span
                      className="absolute right-5 top-4 font-display text-[80px] leading-none font-medium select-none pointer-events-none"
                      style={{ color: "rgba(245,241,232,0.04)" }}
                    >
                      {wk.w}
                    </span>

                    {/* Header row: SVG left, phase badge right */}
                    <div className="flex items-start justify-between mb-6">
                      {/* SVG icon */}
                      <div
                        className="w-12 h-12 flex items-center justify-center shrink-0"
                        style={{ color: "hsl(var(--primary))" }}
                      >
                        {svg}
                      </div>

                      {/* Phase badge */}
                      <span className={`font-mono text-[9px] uppercase tracking-[0.14em] border px-2.5 py-1 shrink-0 ${ph.badge}`}>
                        {wk.phase}
                      </span>
                    </div>

                    {/* Week label */}
                    <p className="font-mono text-[10px] text-background/35 uppercase tracking-[0.12em] mb-2">
                      Week {wk.w}
                    </p>

                    {/* Title */}
                    <h4 className="font-display text-[22px] text-background leading-[1.15] font-medium mb-6">
                      {wk.label}
                    </h4>

                    {/* Tasks */}
                    <ul className="space-y-3 mt-auto">
                      {wk.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 font-mono text-[11px] text-background/50 leading-[1.4]">
                          <span className="w-1 h-1 rounded-full bg-background/25 shrink-0 mt-1.5" />
                          {it}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom divider with phase colour */}
                    <div className={`mt-8 pt-5 border-t ${ph.border}`}>
                      <div className="flex items-center gap-2">
                        <div className={`h-px flex-1 ${ph.dot} opacity-20`} />
                        <span className="font-mono text-[9px] text-background/20 tracking-[0.1em]">
                          W{wk.w} / 12
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Animated scroll nudge */}
          <div className="px-6 md:px-12 lg:px-20 mt-8">
            <motion.div
              className="flex items-center gap-3"
              animate={{ opacity: [0.6, 0.2, 0.6], x: [0, 6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-px bg-background/20" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-background/20">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] text-background/25 uppercase tracking-[0.12em]">
                Continue scrolling
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="h-20" />
    </section>
  );
}
