import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const BEFORE = [
  { stat: "42 hrs/week",  label: "spent on manual data entry" },
  { stat: "5-day cycle",  label: "to produce one board report" },
  { stat: "23% error",    label: "rate in data processing" },
  { stat: "7 tools",      label: "siloed, no single source of truth" },
  { stat: "60% of eng",   label: "time spent on maintenance" },
  { stat: "Gut feel",     label: "driving most strategic decisions" },
];

const AFTER = [
  { stat: "3 hrs/week",   label: "human oversight, fully automated" },
  { stat: "Real-time",    label: "live dashboards, always current" },
  { stat: "<0.1% error",  label: "fully audited, AI-checked" },
  { stat: "1 platform",   label: "unified AI data layer" },
  { stat: "Engineers",    label: "focused on growth, not upkeep" },
  { stat: "Data-driven",  label: "every decision, every time" },
];

const METRICS = [
  { to: 93,  suffix: "%",   label: "reduction in manual work" },
  { to: 14,  suffix: "×",   label: "faster decision cycles" },
  { to: 11,  suffix: "wks", label: "average time to production" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(0);
  const spring = useSpring(val, { duration: 1800, bounce: 0 });
  const displayed = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) val.set(to);
  }, [inView, to, val]);

  return <motion.span ref={ref}>{displayed}</motion.span>;
}

export default function BeforeAfter() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-[1200px] mx-auto">

        <ScrollReveal>
          <p className="section-label mb-5">The Transformation</p>
          <h2 className="font-display text-[38px] md:text-[52px] font-medium text-foreground leading-[1.02] max-w-[600px] mb-20">
            What changes when we're done.
          </h2>
        </ScrollReveal>

        {/* Before / After columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20">

          {/* Before */}
          <ScrollReveal>
            <div className="border border-grey-mid p-8 md:p-10 md:border-r-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text mb-6">
                Before Gloify
              </p>
              <ul className="space-y-0">
                {BEFORE.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 border-b border-grey-mid last:border-b-0 py-4"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <span className="font-mono text-[12px] text-foreground/30 line-through mt-0.5 shrink-0 min-w-[90px]">
                      {item.stat}
                    </span>
                    <span className="font-body text-[14px] text-grey-text leading-[1.5]">
                      {item.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.1}>
            <div className="border border-primary/30 bg-primary/[0.03] p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary mb-6">
                After Gloify
              </p>
              <ul className="space-y-0">
                {AFTER.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 border-b border-primary/15 last:border-b-0 py-4"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <span className="font-mono text-[12px] text-primary font-medium mt-0.5 shrink-0 min-w-[90px]">
                      {item.stat}
                    </span>
                    <span className="font-body text-[14px] text-foreground/80 leading-[1.5]">
                      {item.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated metric counters */}
        <div className="border-t border-grey-mid pt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {METRICS.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <span className="font-display text-[52px] md:text-[64px] text-primary leading-none font-medium">
                  <Counter to={m.to} suffix={m.suffix} />
                </span>
                <p className="font-body text-[14px] text-grey-text mt-3 leading-[1.5]">
                  {m.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
