import ScrollReveal from "./ScrollReveal";

const quotes = [
  {
    text: "Gloify delivered a working AI pipeline in six weeks with documentation better than most internal engineering teams I have managed.",
    name: "Marcus T.",
    role: "CTO — New York, USA",
  },
  {
    text: "After two failed agency engagements, Gloify was the first team that actually understood the technical scope before writing a line of code.",
    name: "Sophie K.",
    role: "Head of Product — Berlin, Germany",
  },
  {
    text: "Fast, honest, and they surfaced problems before we did. That is genuinely rare. We have extended three times.",
    name: "James R.",
    role: "Founder — London, UK",
  },
];

const Testimonials = () => (
  <section className="px-6 md:px-12 lg:px-20 py-[100px] bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">Client Feedback</p>
        <h2 className="font-display text-[36px] md:text-[44px] text-foreground mt-4 leading-[1.05]">
          Heard directly.
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {quotes.map((q, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="bg-card border border-grey-mid p-9 h-full flex flex-col">
              <span className="font-display text-[64px] text-primary leading-none select-none">
                "
              </span>
              <p className="font-body italic text-[16px] md:text-[17px] text-foreground leading-[1.7] -mt-4 flex-1">
                {q.text}
              </p>
              <div className="mt-6 pt-4 border-t border-grey-mid">
                <p className="font-body font-semibold text-[15px] text-foreground">
                  {q.name}
                </p>
                <p className="font-mono text-[12px] text-grey-text mt-0.5">
                  {q.role}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
