import ScrollReveal from "./ScrollReveal";

const stats = [
  { number: "40%", label: "Avg. reduction in operational costs" },
  { number: "3×", label: "Faster than building an in-house AI team" },
  { number: "12×", label: "Average ROI for clients in year one" },
  { number: "9 yrs", label: "In AI engineering & product delivery" },
];

const SocialProof = () => (
  <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background">
    <ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 max-w-[1100px] mx-auto text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="font-display text-[36px] md:text-[44px] text-primary">{s.number}</p>
            <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.12em] mt-2 max-w-[160px] mx-auto leading-[1.5]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </section>
);

export default SocialProof;
