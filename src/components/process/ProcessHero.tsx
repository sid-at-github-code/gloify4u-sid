import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeBackground from "./ThreeBackground";

const PHASES = [
  { num: "01", label: "Discovery",    period: "Days 1–5"    },
  { num: "02", label: "Architecture", period: "Days 6–10"   },
  { num: "03", label: "Build",        period: "Weeks 3–10"  },
  { num: "04", label: "Deploy",       period: "Weeks 11–12" },
];

export default function ProcessHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen bg-foreground overflow-hidden flex flex-col">

      {/* ── Three.js particle network ─────────────────────────── */}
      <ThreeBackground className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ── Gradient vignette so text stays legible ────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(28,74,42,0.18) 0%, transparent 65%), linear-gradient(to top, hsl(60 12% 4% / 0.7) 0%, transparent 40%)",
        }}
      />

      {/* ── Subtle grid ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,241,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main content (parallax on scroll) ────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 pt-36"
      >
        <motion.p
          className="font-mono text-[11px] text-primary uppercase tracking-[0.14em] mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Our Method
        </motion.p>

        <div className="max-w-[960px]">
          <motion.h1
            className="font-display text-[52px] sm:text-[76px] lg:text-[108px] xl:text-[128px] font-medium text-background leading-[0.86] tracking-[-0.025em] mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            We understand<br />
            before we{" "}
            <em className="text-primary not-italic">build.</em>
          </motion.h1>

          <motion.p
            className="font-body text-[17px] md:text-[19px] text-background/55 max-w-[580px] leading-[1.65]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            Most software agencies ask what you want built. We spend the first
            week embedded in your operations — mapping every bottleneck, every
            manual step, every missed signal — before writing a single line of
            code.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Phase strip ──────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-background/10 grid grid-cols-2 md:grid-cols-4">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.num}
            className="border-r last:border-r-0 border-background/10 px-6 md:px-8 py-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 + i * 0.08 }}
          >
            <span className="font-mono text-[10px] text-background/28 uppercase tracking-[0.14em] block mb-1">
              Phase {p.num}
            </span>
            <span className="font-mono text-[13px] text-background/72 tracking-[0.03em] block">
              {p.label}
            </span>
            <span className="font-mono text-[10px] text-primary block mt-0.5">
              {p.period}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
