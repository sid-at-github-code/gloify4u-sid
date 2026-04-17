import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Free AI audit",
    body: "We hop on a 45-minute call, look at your operations, and tell you honestly where AI can help — and where it's overkill.",
    badge: "No cost, no strings",
  },
  {
    num: "02",
    title: "Working demo first",
    body: "Before any contract, we build a prototype on your real data. You see it working. Then you decide if you want to continue.",
    badge: "See it before you buy it",
  },
  {
    num: "03",
    title: "Build & integrate",
    body: "We build the full system and connect it to whatever you already use — Salesforce, AWS, Shopify, custom APIs. Weekly demos throughout.",
    badge: "No surprises",
  },
  {
    num: "04",
    title: "Ship & keep improving",
    body: "We launch it, monitor it, and keep making it better. Your AI gets smarter the more it runs.",
    badge: "Continuous improvement",
  },
];

const HowWeWork = () => (
  <section id="how" className="section-padding bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">How We Work</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Simple. Four steps.
        </h2>
        <p className="font-body text-[17px] text-grey-text mt-5 max-w-[520px] leading-[1.75]">
          We hate complicated processes as much as you do.
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
