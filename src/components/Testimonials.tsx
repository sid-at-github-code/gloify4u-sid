import ScrollReveal from "./ScrollReveal";

const quotes = [
  {
    text: "Gloify shipped a working AI agent in 3 weeks that replaced a process three of my team members were doing manually. The ROI case basically wrote itself.",
    name: "Anup Aggarwal",
    role: "Co-Founder & CEO, Mintifi",
  },
  {
    text: "What got me was the demo model — we saw it running on our actual data before we signed anything. Most agencies just ask you to trust them. Gloify doesn't.",
    name: "Kanan Ajmera",
    role: "Founder & CEO, BuildersPatch",
  },
  {
    text: "They told us our original spec was overcomplicated and saved us months of wasted work. That's the kind of honesty you don't get from most vendors.",
    name: "Ramya Reddy",
    role: "Founder & COO, Caterx",
  },
  {
    text: "Senior engineers on Slack from day one, weekly demos, no surprises. We've worked with 4 dev shops before Gloify. This is a completely different level.",
    name: "Ankit Mittal",
    role: "Founder, Coachcaddy",
  },
];

const Testimonials = () => (
  <section id="clients" className="px-6 md:px-12 lg:px-20 py-[100px] bg-grey-light">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">Clients</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          What people say.
        </h2>
        <p className="font-body text-[17px] text-grey-text mt-4">
          We let our clients do the talking.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
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

      <ScrollReveal>
        <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.14em] text-center mt-16">
          95+ companies have shipped AI with Gloify
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default Testimonials;
