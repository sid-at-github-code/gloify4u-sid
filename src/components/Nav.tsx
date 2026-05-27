import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const sectionLinks = [
    { label: "Services",    id: "services"   },
    { label: "Industries",  id: "industries" },
    { label: "Results",     id: "results"    },
    { label: "Clients",     id: "clients"    },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${
          scrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-[72px]">
          <Link to="/" className="flex items-center">
            <img src="/gloify-black-text.svg" alt="Gloify" className="h-7 dark:hidden" />
            <img src="/gloify-white-text.svg" alt="Gloify" className="h-7 hidden dark:block" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-[14px] tracking-[0.04em] text-foreground link-hover relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-primary after:origin-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-left"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/how-we-work"
              className="font-body text-[14px] tracking-[0.04em] text-foreground link-hover relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-primary after:origin-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-left"
            >
              How We Work
            </Link>
            <Link
              to="/projects"
              className="font-body text-[14px] tracking-[0.04em] text-foreground link-hover relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-primary after:origin-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-left"
            >
              Projects
            </Link>
            <button
              onClick={() => scrollTo("contact")}
              className="font-body text-[14px] tracking-[0.04em] text-primary-foreground bg-primary px-5 py-2 transition-all duration-200 hover:bg-primary-light"
            >
              Book a free call
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="relative w-6 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-full h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block w-full h-[1.5px] bg-foreground transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-full h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10"
          >
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-display text-3xl text-foreground link-hover"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/how-we-work"
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-foreground link-hover"
            >
              How We Work
            </Link>
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-foreground link-hover"
            >
              Projects
            </Link>
            <button
              onClick={() => scrollTo("contact")}
              className="font-body text-base text-primary-foreground bg-primary px-8 py-3 mt-4 transition-all duration-200 hover:bg-primary-light"
            >
              Book a free call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
