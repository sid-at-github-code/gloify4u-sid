import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    title: "Timezone Overlap",
    body: "We maintain coverage during US EST and UK business hours. You're not waiting until morning for a reply.",
  },
  {
    title: "Senior Engineers Throughout",
    body: "The team you meet is the team that builds. We don't credential-wash and hand off.",
  },
  {
    title: "Clear, Written Communication",
    body: "Every decision documented. Every sprint summarised. You're never chasing an update.",
  },
  {
    title: "Fixed Pricing, No Surprises",
    body: "Scope changes are flagged immediately and priced transparently. No invoice ever arrives unexpectedly.",
  },
  {
    title: "Your IP, Fully Protected",
    body: "NDAs before kickoff. All intellectual property transferred to you on completion. Standard, not optional.",
  },
  {
    title: "Honest Timelines",
    body: "We give you the real date, not the optimistic one. And we build enough buffer to hit it.",
  },
];

const WhyGloify = () => (
  <section className="section-padding bg-foreground text-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.14em]">
          Why Clients Stay
        </p>
        <h2 className="font-display text-[36px] md:text-[48px] text-background mt-4 leading-[1.05]">
          We've worked hard to be
          <br />
          easy to work with.
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {reasons.map((r, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="border-l-2 border-primary pl-5">
              <h3 className="font-body font-semibold text-[17px] text-background">
                {r.title}
              </h3>
              <p className="font-body text-[15px] text-grey-mid mt-2 leading-[1.7]">
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
