import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    title: "Senior engineers only",
    body: "Every project is run by engineers with 5+ years in ML. We don't put juniors on client work.",
  },
  {
    title: "We work your hours",
    body: "Daily standups, fast Slack replies, and async workflows designed for US teams. No timezone headaches.",
  },
  {
    title: "Demo before you sign",
    body: "We build a working prototype on your actual data before you commit. If you don't love it, walk away.",
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
          Three reasons clients
          <br />
          stay with us.
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
