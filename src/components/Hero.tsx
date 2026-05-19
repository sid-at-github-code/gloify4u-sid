import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroVisualization from "./HeroVisualization";

const tickerItems = [
  "AI Agents & Automation",
  "LLM & RAG Systems",
  "AI Web Applications",
  "AI Mobile Apps",
  "MLOps & Infrastructure",
  "95+ Companies Shipped",
  "98% On-Time Delivery",
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
              AI Engineering & Product Studio — Since 2017
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[40px] sm:text-[56px] lg:text-[52px] xl:text-[64px] font-medium text-foreground leading-[0.95]"
            >
              We build AI that
              <br />
              does the work
              <br />
              your team shouldn't.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[17px] sm:text-[18px] text-grey-text max-w-[520px] mt-7 leading-[1.8]"
            >
              We've shipped AI systems, full-stack web platforms, and mobile
              apps for 95+ companies — fintechs, logistics platforms, e-commerce
              brands — replacing the slow, manual, expensive parts of their
              operations with software that actually thinks. You see a working
              demo before we ask for a dollar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mt-11"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="group font-body font-medium text-[15px] bg-primary text-primary-foreground h-12 px-6 transition-colors duration-200 hover:bg-primary-light flex items-center gap-2"
              >
                Book a free call
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("work")}
                className="font-body font-medium text-[15px] text-primary underline underline-offset-4 decoration-primary/40 transition-colors duration-200 hover:decoration-primary"
              >
                See what we've built
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-mono text-[12px] text-grey-text mt-8 tracking-[0.04em]"
            >
              95+ companies have shipped with us · 98% on-time delivery
            </motion.p>
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
