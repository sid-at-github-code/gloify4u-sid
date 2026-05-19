import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    "AI Agents & Automation",
    "LLM & RAG Systems",
    "AI Web & Mobile Apps",
    "MLOps & Infrastructure",
    "AI Audit & Strategy",
  ];

  const industries = [
    "Fintech",
    "Proptech",
    "Supply Chain",
    "E-commerce",
    "EdTech",
    "Logistics",
  ];

  const company = [
    { label: "About", action: () => scrollTo("how") },
    { label: "Case Studies", to: "/projects" },
    { label: "Industries", action: () => scrollTo("industries") },
    { label: "Clients", action: () => scrollTo("clients") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <footer className="bg-background border-t border-grey-mid">
      <div className="px-6 md:px-12 lg:px-20 py-[60px] max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-xl text-foreground">Gloify</p>
            <p className="font-body text-[14px] text-grey-text mt-2 leading-[1.6]">
              AI engineering & product studio
              <br />
              Since 2017
            </p>
          </div>

          <nav aria-label="Services">
            <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.12em] mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("services")}
                    className="font-body text-[14px] text-foreground link-hover text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.12em] mb-4">
              Industries
            </p>
            <ul className="space-y-2">
              {industries.map((i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo("industries")}
                    className="font-body text-[14px] text-foreground link-hover text-left"
                  >
                    {i}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-mono text-[11px] text-grey-text uppercase tracking-[0.12em] mb-4">
              Company
            </p>
            <ul className="space-y-2">
              {company.map((c) =>
                c.to ? (
                  <li key={c.label}>
                    <Link
                      to={c.to}
                      className="font-body text-[14px] text-foreground link-hover"
                    >
                      {c.label}
                    </Link>
                  </li>
                ) : (
                  <li key={c.label}>
                    <button
                      onClick={c.action}
                      className="font-body text-[14px] text-foreground link-hover text-left"
                    >
                      {c.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <div className="border-t border-grey-mid mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-mono text-[12px] text-grey-text">
            © 2017–2026 Gloify Inc. — Crossdev Technologies Pvt. Ltd.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="font-mono text-[12px] text-grey-text link-hover"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-mono text-[12px] text-grey-text link-hover"
            >
              Terms
            </a>
            <a
              href="https://linkedin.com/company/gloify"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-grey-text link-hover"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
