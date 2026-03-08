import ScrollReveal from "./ScrollReveal";

const services = [
  {
    label: "iOS / Android",
    title: "Apps your users will actually open.",
    body: "Native and cross-platform mobile development for consumer and enterprise products. Built for performance, designed for retention.",
  },
  {
    label: "Frontend / Backend",
    title: "Platforms engineered to handle the real world.",
    body: "We build web products that scale — from clean marketing sites to complex, data-heavy portals that run without fault.",
  },
  {
    label: "LLMs / Pipelines / Workflows",
    title: "Practical AI. Not proof-of-concept AI.",
    body: "Production-grade AI systems — document intelligence, workflow automation, LLM integrations — that work when the demo ends.",
  },
  {
    label: "End-to-End",
    title: "One team that owns the whole thing.",
    body: "We take responsibility for every layer — from database schema to deployed product. No handoffs between agencies. No gaps.",
  },
];

const Services = () => (
  <section id="services" className="section-padding bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">What We Do</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Four disciplines.
          <br />
          Delivered as one.
        </h2>
        <p className="font-body text-[17px] text-grey-text max-w-[520px] mt-5">
          We don't spread thin across every trend. We've refined four
          service areas — and we do them well.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 mt-16">
        {services.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="bg-card border border-grey-mid p-8 transition-all duration-250 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:border-primary h-full">
              <p className="font-mono text-[12px] text-primary uppercase tracking-[0.12em]">
                {s.label}
              </p>
              <h3 className="font-display text-[22px] md:text-[24px] text-foreground mt-3 leading-[1.15]">
                {s.title}
              </h3>
              <p className="font-body text-[16px] text-grey-text mt-3 leading-[1.7]">
                {s.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
