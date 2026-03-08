import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroVisualization from "./HeroVisualization";

const tickerItems = [
  "Mobile Development",
  "Web Engineering",
  "AI and Automation",
  "Full-Stack",
  "US and UK Clients",
  "50+ Projects",
];

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col bg-background">
      <div className="flex-1 flex items-center px-6 md:px-[10vw] pt-[72px]">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column */}
          <div className="max-w-[720px] lg:max-w-[520px] xl:max-w-[580px] flex-shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[12px] text-primary uppercase tracking-[0.14em] mb-6"
            >
              Software Engineering — Est. 2019
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[40px] sm:text-[56px] lg:text-[52px] xl:text-[64px] font-medium text-foreground leading-[0.95]"
            >
              Software built
              <br />
              to the standard
              <br />
              your business deserves.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[17px] sm:text-[18px] text-grey-text max-w-[480px] mt-7 leading-[1.8]"
            >
              We work with founders and product teams in the US and UK to
              design, build, and ship mobile apps, web platforms, AI systems,
              and automation tools — without the overhead of a large agency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mt-11"
            >
              <button
                onClick={() => scrollTo("work")}
                className="font-body font-medium text-[15px] bg-primary text-primary-foreground h-12 px-6 transition-colors duration-200 hover:bg-primary-light"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="group font-body font-medium text-[15px] text-primary flex items-center gap-2 underline underline-offset-4 decoration-primary/40 transition-colors duration-200 hover:decoration-primary"
              >
                Book an Introduction
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Right column — visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex flex-1 items-center justify-center min-w-[340px] max-w-[480px]"
          >
            <HeroVisualization />
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="border-t border-grey-mid overflow-hidden py-4">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-mono text-[12px] text-grey-text mx-6">
              {item} &nbsp;—
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
