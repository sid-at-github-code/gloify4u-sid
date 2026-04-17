import ScrollReveal from "./ScrollReveal";

const services = [
  {
    label: "Most Requested",
    title: "AI Agents & Automation",
    body: "We build AI that handles your repetitive workflows — invoice processing, support tickets, lead qualification, compliance checks — without anyone touching it.",
    tag: true,
  },
  {
    label: "LLM / RAG",
    title: "AI first MCP, RAG and Agentic Systems",
    body: "We plug large language models into your private data — documents, databases, CRMs — so your team can search, query, and summarize information instantly.",
  },
  {
    label: "Web Apps",
    title: "Web and Mobile Applications",
    body: "Full-stack web apps with AI baked in — smart dashboards, recommendation systems, predictive tools. Not just a UI on top of ChatGPT.",
  },
  {
    label: "Mobile",
    title: "Native Mobile Apps",
    body: "iOS and Android apps with real AI features — voice interfaces, on-device ML, smart personalization. Built to scale, not just demo well.",
  },
  {
    label: "Infrastructure",
    title: "MLOps & LLMOps Infrastructure",
    body: "We make sure your AI actually stays alive in production — monitoring, auto-scaling, cost control, retraining pipelines. The boring stuff that matters.",
  },
  {
    label: "Free to Start",
    title: "AI Audit & Strategy",
    body: "Not sure where to start? We'll look at your operations and tell you exactly where AI makes sense — and where it doesn't. Straight talk, no pitch.",
    tag: true,
  },
];

const Services = () => (
  <section id="services" className="section-padding bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">What We Build</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Six things we're
          <br />
          really good at.
        </h2>
        <p className="font-body text-[17px] text-grey-text max-w-[520px] mt-5">
          We don't do everything. We focus on AI — and we go deep.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {services.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className="bg-card border border-grey-mid p-8 transition-all duration-250 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:border-primary h-full relative">
              {s.tag && (
                <span className="absolute top-6 right-6 font-mono text-[10px] text-primary border border-primary px-2 py-0.5 uppercase tracking-[0.1em]">
                  {s.label}
                </span>
              )}
              {!s.tag && (
                <p className="font-mono text-[12px] text-primary uppercase tracking-[0.12em]">
                  {s.label}
                </p>
              )}
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
