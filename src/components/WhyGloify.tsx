import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    title: "Senior engineers, always",
    body: "Every engagement is run by engineers with 5+ years in ML, AI systems, and production software. We don't staff junior engineers on client work — ever.",
  },
  {
    title: "Your timezone, not ours",
    body: "Daily standups, same-day Slack responses, and async workflows built for US and UK teams. We've designed our process around your hours, not ours.",
  },
  {
    title: "You see it working before you pay",
    body: "We build a working prototype on your actual data before any contract is signed. If it doesn't impress you, we shake hands and part ways. No invoices, no hard feelings.",
  },
];

const WhyGloify = () => (
  <section className="section-padding bg-foreground text-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.14em]">
          Why Gloify
        </p>
        <h2 className="font-display text-[36px] md:text-[48px] text-background mt-4 leading-[1.05]">
          What makes a Gloify
          <br />
          engagement different.
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-10 mt-16">
        {reasons.map((r, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="border-l-2 border-primary pl-5">
              <h3 className="font-body font-semibold text-[18px] text-background">
                {r.title}
              </h3>
              <p className="font-body text-[15px] text-grey-mid mt-3 leading-[1.7]">
                {r.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyGloify;
