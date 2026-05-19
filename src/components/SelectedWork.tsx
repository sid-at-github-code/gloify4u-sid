import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const PROJECTS = [
  {
    num: "01",
    category: "Fintech · AI",
    title: "Loan Document Intelligence",
    description:
      "Cut loan application review from 45 minutes to under 10. AI pipeline reads, classifies, and summarises every document automatically.",
    impact: "80%",
    impactLabel: "faster processing",
    stack: ["Python", "OpenAI", "FastAPI"],
  },
  {
    num: "02",
    category: "Logistics · AI",
    title: "Field Operations Platform",
    description:
      "AI-driven dispatch and routing for 400+ field agents across three countries. Real-time ETA prediction and offline-first mobile.",
    impact: "45%",
    impactLabel: "faster dispatch",
    stack: ["React Native", "Node.js", "Mapbox"],
  },
  {
    num: "03",
    category: "E-commerce · Web",
    title: "Unified Analytics Dashboard",
    description:
      "Aggregates Shopify, GA, Meta Ads, and Klaviyo with anomaly detection. Saved 4 hours of weekly reporting per analyst.",
    impact: "2×",
    impactLabel: "ROAS improvement",
    stack: ["Next.js", "BigQuery", "Python"],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="section-padding bg-background">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <p className="section-label mb-4">Selected Work</p>
              <h2 className="font-display text-[36px] md:text-[48px] text-foreground leading-[1.02]">
                Systems running
                <br />
                in production.
              </h2>
            </div>
            <Link
              to="/projects"
              className="group font-mono text-[12px] text-primary uppercase tracking-[0.14em] flex items-center gap-2 link-hover"
            >
              View all six projects
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                className="group relative bg-card border border-grey-mid h-full flex flex-col overflow-hidden cursor-default"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {/* Top accent line — slides in on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                <div className="p-8 flex flex-col flex-1">
                  {/* Number + category */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-display text-[56px] text-grey-mid/25 leading-none font-medium select-none">
                      {p.num}
                    </span>
                    <span className="font-mono text-[9px] text-primary uppercase tracking-[0.14em] border border-primary/30 px-2 py-1 mt-1">
                      {p.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[21px] md:text-[23px] text-foreground leading-[1.15] mb-3 group-hover:text-primary transition-colors duration-300">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[14px] text-grey-text leading-[1.7] flex-1">
                    {p.description}
                  </p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[9px] text-grey-text border border-grey-mid px-2 py-0.5 tracking-[0.04em]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Impact stat */}
                  <div className="mt-6 pt-5 border-t border-grey-mid flex items-end justify-between">
                    <div>
                      <div className="font-display text-[36px] text-primary leading-none font-medium">
                        {p.impact}
                      </div>
                      <p className="font-mono text-[9px] text-grey-text uppercase tracking-[0.1em] mt-1">
                        {p.impactLabel}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] text-primary uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      View details <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
