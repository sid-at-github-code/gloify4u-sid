import ScrollReveal from "./ScrollReveal";

const clients = [
  "Mintifi",
  "BuildersPatch",
  "Caterx",
  "Koshex",
  "DYT",
  "Coachcaddy",
  "Orbitals",
  "Dusminute",
  "Zokudo",
  "UrbanMatch",
  "Neopay",
];

const ClientLogos = () => (
  <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 bg-grey-light border-y border-grey-mid">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.14em] text-center">
          Trusted by growth-stage and enterprise teams across fintech, logistics, proptech, and e-commerce
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {clients.map((c) => (
            <span
              key={c}
              className="font-display text-[20px] md:text-[24px] text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {c}
            </span>
          ))}
          <span className="font-mono text-[12px] text-grey-text uppercase tracking-[0.1em]">
            + 84 more
          </span>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ClientLogos;
