import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Opportunity audit",
    body: "A focused 45-minute call where we map your operations, identify where AI creates the most leverage, and give you an honest read on what's worth building — and what isn't.",
    badge: "No cost, no strings",
  },
  {
    num: "02",
    title: "Prototype on your data",
    body: "Before any contract exists, we build a working prototype against your real data. You see the system running. Then you decide — no pressure, no pitch.",
    badge: "See it before you commit",
  },
  {
    num: "03",
    title: "Full build & integration",
    body: "We engineer the complete system and wire it into your existing stack — Salesforce, AWS, Shopify, custom APIs. Weekly demos and full transparency throughout.",
    badge: "Zero surprises",
  },
  {
    num: "04",
    title: "Launch & compound",
    body: "We ship to production, monitor performance, and iterate. AI systems that are trained on more data get better over time — and we stay with you through that cycle.",
    badge: "Built to improve",
  },
];

const HowWeWork = () => (
  <section id="how" className="section-padding bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">How We Work</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          From first call
          <br />
          to production.
        </h2>
        <p className="font-body text-[17px] text-grey-text mt-5 max-w-[520px] leading-[1.75]">
          A tight process built around reducing risk for you — not maximizing billable hours for us.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-x-10 mt-16">
        {steps.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="border-t border-grey-mid pt-8 pb-10">
              <div className="flex gap-6 items-start">
                <span className="font-display text-[48px] md:text-[52px] text-primary leading-none">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-display text-[22px] text-foreground leading-[1.1]">
                    {s.title}
                  </h3>
                  <p className="font-body text-[16px] text-grey-text mt-2 leading-[1.7]">
                    {s.body}
                  </p>
                  <span className="inline-block mt-4 font-mono text-[10px] text-primary border border-primary/40 px-2 py-0.5 uppercase tracking-[0.1em]">
                    {s.badge}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWork;
