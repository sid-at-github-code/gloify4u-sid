import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    category: "AI / Automation",
    title: "Document Intelligence Platform",
    description:
      "An AI-powered document parsing and classification system for a US fintech firm. Reduced manual processing by 80%.",
  },
  {
    category: "Full-Stack / Web",
    title: "Client Operations Portal",
    description:
      "A custom enterprise web portal with live data dashboards built for a B2B SaaS company operating across the UK and EU.",
  },
  {
    category: "Mobile",
    title: "Field Logistics Application",
    description:
      "A cross-platform mobile app for coordinating field teams across three countries — used by 400+ daily active users.",
  },
];

const SelectedWork = () => (
  <section id="work" className="section-padding bg-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">Selected Work</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          A sample of what we've shipped.
        </h2>
        <p className="font-body text-[16px] text-grey-text mt-3">
          Case studies available on request under NDA.
        </p>
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
