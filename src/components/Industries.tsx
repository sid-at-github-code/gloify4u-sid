import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const industries = [
  {
    name: "Fintech",
    sub: "Financial Technology",
    body: "AI that handles the compliance, document, and risk work — faster and more accurately than a manual team.",
    bullets: [
      "Fraud detection & transaction monitoring",
      "Credit scoring & underwriting automation",
      "KYC / AML document processing",
      "Loan application intelligence",
    ],
  },
  {
    name: "Proptech",
    sub: "Property Technology",
    body: "AI that turns property data into decisions — for marketplaces, brokerages, and investment platforms.",
    bullets: [
      "Automated property valuation models",
      "Lead scoring & buyer-property matching",
      "Lease abstraction & contract AI",
      "Market forecasting & risk models",
    ],
  },
  {
    name: "Supply Chain",
    sub: "Operations & Sourcing",
    body: "AI that keeps inventory right, suppliers honest, and your ops team ahead of problems instead of chasing them.",
    bullets: [
      "Demand forecasting & inventory optimization",
      "Supplier risk scoring",
      "Disruption detection & rerouting",
      "PO & invoice automation",
    ],
  },
  {
    name: "E-commerce",
    sub: "DTC & Marketplaces",
    body: "AI that sells more, returns less, and makes your ops team's life easier — across the full customer journey.",
    bullets: [
      "Product recommendations & dynamic pricing",
      "Customer support automation",
      "Inventory forecasting",
      "Visual search & catalog intelligence",
    ],
  },
  {
    name: "EdTech",
    sub: "Education Technology",
    body: "AI that makes learning more personal and content creation less painful — for platforms, publishers, and schools.",
    bullets: [
      "Adaptive learning engines",
      "AI tutors trained on your content",
      "Automated grading & feedback",
      "Student churn prediction",
    ],
  },
  {
    name: "Logistics",
    sub: "Last-Mile & Fulfillment",
    body: "AI that cuts delivery costs, reduces delays, and gives your ops team real-time visibility — not a spreadsheet from yesterday.",
    bullets: [
      "Route optimization & last-mile AI",
      "Predictive ETA & delay alerts",
      "Fleet & driver analytics",
      "Warehouse & picking optimization",
    ],
  },
];

const Industries = () => (
  <section id="industries" className="section-padding bg-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">Industries</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Deep expertise
          <br />
          in six industries.
        </h2>
        <p className="font-body text-[17px] text-grey-text max-w-[560px] mt-5 leading-[1.75]">
          We've shipped enough production AI in each vertical to know which problems are worth solving — and which AI use cases are still vaporware.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {industries.map((ind, i) => (
          <ScrollReveal key={ind.name} delay={i * 0.06}>
            <div className="bg-card border border-grey-mid p-8 h-full flex flex-col transition-all duration-250 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:border-primary group">
              <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em]">
                {ind.sub}
              </p>
              <h3 className="font-display text-[24px] text-foreground mt-2 leading-[1.1]">
                {ind.name}
              </h3>
              <p className="font-body text-[15px] text-grey-text mt-3 leading-[1.7]">
                {ind.body}
              </p>
              <ul className="mt-5 space-y-1.5 flex-1">
                {ind.bullets.map((b) => (
                  <li
                    key={b}
                    className="font-body text-[14px] text-foreground/80 flex gap-2"
                  >
                    <span className="text-primary">·</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 pt-4 border-t border-grey-mid font-mono text-[11px] text-primary uppercase tracking-[0.12em] flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Talk to us about {ind.name}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
