import { motion } from "framer-motion";

const TRUST = [
  "No obligation. No pitch deck.",
  "95+ companies audited since 2017.",
  "Results-backed retainer model.",
];

export default function ProcessCTA() {
  return (
    <section className="bg-foreground py-[120px] px-6 md:px-12 lg:px-20 text-center overflow-hidden relative">

      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(28,74,42,0.2) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-[700px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.14em] mb-6">
          Start Here
        </p>

        <h2 className="font-display text-[40px] md:text-[58px] lg:text-[68px] font-medium text-background leading-[0.95] tracking-[-0.01em] mb-8">
          Begin with a free<br />
          <span className="italic text-primary">process audit.</span>
        </h2>

        <p className="font-body text-[17px] md:text-[19px] text-background/55 leading-[1.65] mb-12 max-w-[520px] mx-auto">
          We'll map your workflows, identify what AI can realistically automate,
          and show you exactly what we'd build — before you commit to a single
          pound or rupee.
        </p>

        <motion.a
          href="/#contact"
          className="inline-flex items-center gap-3 border border-background/30 text-background font-body text-[15px] tracking-[0.04em] px-8 py-4 transition-all duration-200 hover:bg-background hover:text-foreground"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book the audit — it's free
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>

        {/* Trust bullets */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-2 font-mono text-[11px] text-background/35 uppercase tracking-[0.1em]">
              <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
