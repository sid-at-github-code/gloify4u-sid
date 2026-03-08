const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Services", id: "services" },
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-background border-t border-grey-mid">
      <div className="px-6 md:px-12 lg:px-20 py-[60px] max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-xl text-foreground">Gloify</p>
            <p className="font-body text-[15px] text-grey-text mt-1">
              Engineering that ships.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-start">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="font-body text-[15px] text-foreground link-hover"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="md:text-right">
            <a
              href="mailto:hello@gloify.com"
              className="block font-body text-[15px] text-foreground link-hover"
            >
              hello@gloify.com
            </a>
            <a
              href="https://linkedin.com/company/gloify"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-[15px] text-foreground link-hover mt-1"
            >
              linkedin.com/company/gloify
            </a>
          </div>
        </div>

        <div className="border-t border-grey-mid mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-mono text-[12px] text-grey-text">
            Gloify — Crossdev Technologies Pvt. Ltd.
          </p>
          <p className="font-mono text-[12px] text-grey-text">
            Bangalore, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
