import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    category: "Fintech / AI",
    title: "Loan Document Intelligence",
    description:
      "Cut loan application review from 45 minutes to under 10. AI pipeline reads, classifies, and summarizes every document automatically.",
  },
  {
    category: "Logistics / AI",
    title: "Field Operations Platform",
    description:
      "AI-driven dispatch and routing for 400+ field agents across three countries. Real-time ETA prediction and offline-first mobile.",
  },
  {
    category: "E-commerce / Web",
    title: "Unified Analytics Dashboard",
    description:
      "Aggregates Shopify, GA, Meta Ads, and Klaviyo with anomaly detection. Saved 4 hours of weekly reporting per analyst.",
  },
];

const SelectedWork = () => (
  <section id="work" className="section-padding bg-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
              A sample of what we've shipped.
            </h2>
            <p className="font-body text-[16px] text-grey-text mt-3">
              Case studies available on request under NDA.
            </p>
          </div>
          <Link
            to="/projects"
            className="group font-mono text-[12px] text-primary uppercase tracking-[0.14em] flex items-center gap-2 link-hover"
          >
            View all projects
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="bg-grey-light border-t-[3px] border-t-primary p-8 h-full flex flex-col">
              <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em]">
                {p.category}
              </p>
              <h3 className="font-display text-[20px] md:text-[22px] text-foreground mt-3 leading-[1.15]">
                {p.title}
              </h3>
              <p className="font-body text-[15px] text-grey-text mt-3 leading-[1.7] flex-1">
                {p.description}
              </p>
              <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.1em] mt-6 pt-4 border-t border-grey-mid">
                Case Study Available on Request
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWork;
