import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const PHASES = [
  {
    num: "01",
    label: "Deep Discovery",
    duration: "Days 1–5",
    desc: "We embed with your team. Shadow key workflows. Interview stakeholders. Observe every handoff and manual step in your operation.",
    deliverables: ["Process Audit Report", "Bottleneck Map", "Automation Opportunity Matrix", "Risk Assessment"],
    what: [
      "Sales pipeline & CRM workflows",
      "Data collection & reporting loops",
      "Finance & invoice handling",
      "Internal communication chains",
      "Customer support flows",
      "Data quality & governance",
    ],
  },
  {
    num: "02",
    label: "Architecture Design",
    duration: "Days 6–10",
    desc: "We design the AI system tailored to your exact workflows — selecting the right models, databases, APIs, and integration points.",
    deliverables: ["Technical Architecture Doc", "Stack Decision Log", "Data Flow Diagrams", "Timeline & Milestones"],
    what: [
      "Model selection & evaluation",
      "Data ingestion strategy",
      "Vector / relational DB design",
      "Agent & RAG architecture",
      "Security & compliance review",
      "Infrastructure sizing",
    ],
  },
  {
    num: "03",
    label: "Engineering Sprint",
    duration: "Weeks 3–10",
    desc: "Weekly demos. Your team has visibility at every stage. We ship incrementally so you can validate against real business outcomes, not specs.",
    deliverables: ["Weekly Build Demos", "Integration Tests", "Staging Environment", "Monitoring Setup"],
    what: [
      "Core infrastructure build",
      "AI model integration",
      "Workflow automation layer",
      "CRM / tool integrations",
      "Quality assurance",
      "Stakeholder review sessions",
    ],
  },
  {
    num: "04",
    label: "Deploy & Optimise",
    duration: "Weeks 11–12+",
    desc: "We ship to production, monitor every metric, and continuously refine. This is not a handoff — it is the beginning of the compound return.",
    deliverables: ["Production Deployment", "Observability Dashboards", "SLA Documentation", "Runbook & Training"],
    what: [
      "Zero-downtime production deploy",
      "Real-time performance dashboards",
      "Error alerting & auto-recovery",
      "Team training & handover",
      "Ongoing optimisation retainer",
      "Quarterly architecture reviews",
    ],
  },
];

export default function PhasesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-[1200px] mx-auto px-0">

        {/* Header */}
        <ScrollReveal>
          <p className="section-label mb-5">The Four Phases</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <h2 className="font-display text-[38px] md:text-[52px] font-medium text-foreground leading-[1.02] max-w-[520px]">
              A rigorous method, refined across 95 companies.
            </h2>
            <p className="font-body text-[15px] text-grey-text max-w-[380px] leading-[1.7]">
              Every engagement follows the same four-phase structure — adjusted
              for your industry, your team size, and the complexity of the
              automation we're building.
            </p>
          </div>
        </ScrollReveal>

        {/* Phase cards */}
        <div className="space-y-0">
          {PHASES.map((phase, i) => (
            <ScrollReveal key={phase.num} delay={i * 0.05}>
              <div className="border-t border-grey-mid grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr] gap-8 lg:gap-12 py-12 lg:py-14">

                {/* Number + meta */}
                <div>
                  <motion.span
                    className="font-display text-[72px] md:text-[88px] text-primary font-medium leading-none block"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {phase.num}
                  </motion.span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-text border border-grey-mid px-2 py-1 inline-block mt-4">
                    {phase.duration}
                  </span>
                </div>

                {/* Description + deliverables */}
                <div>
                  <h3 className="font-display text-[26px] md:text-[30px] font-medium text-foreground leading-[1.1] mb-4">
                    {phase.label}
                  </h3>
                  <p className="font-body text-[16px] text-grey-text leading-[1.7] mb-8">
                    {phase.desc}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey-text mb-3">
                    Deliverables
                  </p>
                  <ul className="space-y-1.5">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 font-body text-[14px] text-foreground/80">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What we examine */}
                <div className="lg:border-l lg:border-grey-mid lg:pl-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey-text mb-4">
                    {i === 0 ? "What we audit" : i === 1 ? "What we design" : i === 2 ? "What we build" : "What we ensure"}
                  </p>
                  <ul className="space-y-2">
                    {phase.what.map((w, wi) => (
                      <motion.li
                        key={w}
                        className="flex items-start gap-3 font-body text-[14px] text-grey-text"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + wi * 0.06 + 0.2 }}
                      >
                        <span className="font-mono text-[10px] text-primary/60 mt-0.5 shrink-0">
                          {String(wi + 1).padStart(2, "0")}
                        </span>
                        {w}
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
