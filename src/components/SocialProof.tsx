import ScrollReveal from "./ScrollReveal";

const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "4", label: "Disciplines" },
  { number: "98%", label: "Satisfaction" },
  { number: "6 yrs", label: "Operating" },
  { number: "US / UK", label: "Primary Markets" },
];

const SocialProof = () => (
  <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background">
    <ScrollReveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 md:gap-6 max-w-[1100px] mx-auto text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="font-display text-[36px] md:text-[40px] text-primary">{s.number}</p>
            <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.12em] mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </section>
);

export default SocialProof;
