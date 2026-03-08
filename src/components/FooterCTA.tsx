import ScrollReveal from "./ScrollReveal";

const FooterCTA = () => {
  const scrollTo = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-6 md:px-12 lg:px-20 py-[100px] bg-primary text-center">
      <ScrollReveal>
        <h2 className="font-display text-[40px] md:text-[56px] text-primary-foreground leading-[1.05] max-w-[640px] mx-auto">
          The right team changes
          <br />
          what's possible.
        </h2>
        <p className="font-body text-[17px] md:text-[18px] text-primary-foreground/70 mt-6 max-w-[460px] mx-auto leading-[1.75]">
          We take on a small number of new client projects each quarter.
          If your timing is right, let's talk.
        </p>
        <button
          onClick={scrollTo}
          className="mt-10 font-body font-medium text-[15px] text-primary-foreground border border-primary-foreground px-8 h-12 transition-all duration-200 hover:bg-primary-foreground hover:text-primary"
        >
          Start a Conversation
        </button>
      </ScrollReveal>
    </section>
  );
};

export default FooterCTA;
