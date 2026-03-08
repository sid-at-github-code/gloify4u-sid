import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discovery",
    body: "One focused call. We ask the right questions, document the scope, and send a fixed-price proposal within 48 hours.",
  },
  {
    num: "02",
    title: "Engineering",
    body: "Two-week sprints. A working build every Friday. Senior engineers throughout — not handed to juniors after the first call.",
  },
  {
    num: "03",
    title: "Delivery and Support",
    body: "We don't disappear after launch. QA, monitoring, and ongoing support come standard until you're confident the product is stable.",
  },
];

const HowWeWork = () => (
  <section id="about" className="section-padding bg-background">
    <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
      <ScrollReveal>
        <p className="section-label">Our Process</p>
        <h2 className="font-display text-[36px] md:text-[44px] text-foreground mt-4 leading-[1.05]">
          Straightforward
          <br />
          by design.
        </h2>
        <p className="font-body text-[17px] text-grey-text mt-5 max-w-[460px] leading-[1.75]">
          Working with an offshore team should not require a manual.
          We've structured our process so you always know what's happening,
          what's next, and who to call.
        </p>
      </ScrollReveal>

      <div className="flex flex-col">
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
