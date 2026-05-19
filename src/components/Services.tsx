import ScrollReveal from "./ScrollReveal";

const services = [
  {
    label: "Most Requested",
    title: "AI Agents & Automation",
    body: "We build AI that takes over the repetitive — invoice processing, support triage, lead qualification, compliance review. No human in the loop. No errors on a Friday afternoon.",
    tag: true,
  },
  {
    label: "LLM / RAG",
    title: "LLM, RAG & Agentic Systems",
    body: "We connect large language models to your private data — documents, databases, CRMs — so your team can search, interrogate, and surface answers from information that previously took hours to find.",
  },
  {
    label: "Web",
    title: "Full-Stack Web Applications",
    body: "End-to-end web products with AI at their core, not bolted on as an afterthought. Intelligent dashboards, recommendation engines, real-time analytics, workflow automation — platforms built to last.",
  },
  {
    label: "Mobile",
    title: "iOS & Android Applications",
    body: "Native mobile apps that feel like premium products and behave like intelligent ones — voice interfaces, on-device ML, context-aware personalization. Built to scale beyond the demo.",
  },
  {
    label: "Infrastructure",
    title: "MLOps & LLMOps Infrastructure",
    body: "We deploy AI that stays deployed. Monitoring, cost control, auto-scaling, and retraining pipelines — the infrastructure layer that keeps your models performing six months after launch, not just on demo day.",
  },
  {
    label: "Free to Start",
    title: "AI Audit & Strategy",
    body: "We map your operations, identify the highest-leverage AI opportunities, and hand you a clear build roadmap — with honest answers about what's worth building and what isn't. No pitch, no obligation.",
    tag: true,
  },
];

const Services = () => (
  <section id="services" className="section-padding bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">What We Build</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Intelligent systems.
          <br />
          Exceptional products.
        </h2>
        <p className="font-body text-[17px] text-grey-text max-w-[520px] mt-5">
          We don't generalize. Every engagement is rooted in AI engineering — whether that's an autonomous agent, a production RAG pipeline, a mobile app, or a full-stack platform.
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
