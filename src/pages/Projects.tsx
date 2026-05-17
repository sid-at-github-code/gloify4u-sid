import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const PROJECTS = [
  {
    category: "AI · Automation",
    title: "Document Intelligence Platform",
    client: "US Fintech Firm",
    year: "2024",
    description:
      "An AI-powered document parsing, classification, and extraction system that reduced manual processing by 80%. Built with custom LLM pipelines, OCR integration, and a real-time review dashboard.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "OpenAI", "AWS"],
    hero: { value: "80%", label: "Reduction in manual processing" },
    metrics: [
      { value: "12K",  label: "Documents / day"      },
      { value: "6wks", label: "Start to production"  },
    ],
  },
  {
    category: "Full-Stack · Web",
    title: "Client Operations Portal",
    client: "B2B SaaS — UK & EU",
    year: "2023",
    description:
      "A custom enterprise web portal with live data dashboards, role-based access, automated reporting, and integrations with Salesforce and HubSpot. Serves 200+ daily active enterprise users.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Vercel"],
    hero: { value: "99.9%", label: "Uptime since launch" },
    metrics: [
      { value: "200+", label: "Daily active users"    },
      { value: "3×",   label: "Faster reporting"      },
    ],
  },
  {
    category: "Mobile",
    title: "Field Logistics Application",
    client: "Logistics Provider — APAC",
    year: "2023",
    description:
      "A cross-platform mobile app for coordinating field teams across three countries. Real-time GPS tracking, offline-first architecture, and automated dispatch routing.",
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB", "Firebase", "Mapbox"],
    hero: { value: "45%",  label: "Faster dispatch times"  },
    metrics: [
      { value: "400+", label: "Daily active users"    },
      { value: "3",    label: "Countries served"      },
    ],
  },
  {
    category: "AI · Web",
    title: "Intelligent Recruitment Engine",
    client: "HR Tech Startup — USA",
    year: "2024",
    description:
      "An AI-driven candidate matching and screening platform that processes resumes, scores candidates, and auto-generates interview questions. Integrated directly into the client's ATS.",
    stack: ["Python", "React", "OpenAI", "PostgreSQL", "Docker", "GCP"],
    hero: { value: "92%",  label: "Matching accuracy"      },
    metrics: [
      { value: "60%",  label: "Faster time-to-hire"  },
      { value: "5K+",  label: "Candidates / month"   },
    ],
  },
  {
    category: "Web · Automation",
    title: "E-Commerce Analytics Dashboard",
    client: "DTC Brand — UK",
    year: "2022",
    description:
      "A unified analytics dashboard aggregating data from Shopify, Google Analytics, Meta Ads, and Klaviyo. Automated weekly performance reports and anomaly detection alerts.",
    stack: ["Next.js", "Python", "BigQuery", "Tailwind CSS", "Vercel", "Stripe"],
    hero: { value: "2×",   label: "ROAS improvement"       },
    metrics: [
      { value: "4hrs", label: "Saved / week"          },
      { value: "6",    label: "Data sources unified"  },
    ],
  },
  {
    category: "Mobile · Full-Stack",
    title: "Patient Care Companion App",
    client: "HealthTech — USA",
    year: "2024",
    description:
      "A HIPAA-compliant mobile app for remote patient monitoring. Integrates with wearable devices, provides medication reminders, and delivers real-time vitals to care teams.",
    stack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "AWS", "HL7 FHIR"],
    hero: { value: "35%",  label: "Fewer missed appointments" },
    metrics: [
      { value: "1.2K", label: "Active patients"       },
      { value: "HIPAA", label: "Fully compliant"      },
    ],
  },
];

const HEADER_STATS = [
  { value: 95,  suffix: "+", label: "Companies served"  },
  { value: 7,   suffix: "+", label: "Years in operation" },
  { value: 3,   suffix: "",  label: "Continents"        },
];

function StatCounter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(0);
  const spring = useSpring(val, { duration: 1600, bounce: 0 });
  const displayed = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (inView) val.set(to); }, [inView, to, val]);
  return <motion.span ref={ref}>{displayed}</motion.span>;
}

export default function Projects() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">

        {/* ── Dark hero header ────────────────────────────────────── */}
        <section className="bg-foreground px-6 md:px-12 lg:px-20 pt-20 pb-0 overflow-hidden relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 80% 50%, rgba(28,74,42,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,241,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.025) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          <div className="max-w-[1200px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-primary uppercase tracking-[0.14em] mb-12 hover:opacity-70 transition-opacity"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <p className="font-mono text-[11px] text-primary uppercase tracking-[0.14em] mb-6">
                  Selected Work
                </p>
                <h1 className="font-display text-[52px] md:text-[72px] lg:text-[88px] text-background leading-[0.9] tracking-[-0.02em]">
                  Our<br /><em className="text-primary not-italic">Work.</em>
                </h1>
                <p className="font-body text-[16px] text-background/50 max-w-[440px] mt-6 leading-[1.7]">
                  A selection of products we've shipped for clients across the
                  US, UK, and Europe. Full case studies available under NDA.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-10 lg:gap-16 pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {HEADER_STATS.map((s) => (
                  <div key={s.label} className="border-l border-background/15 pl-6 lg:pl-8">
                    <div className="font-display text-[40px] md:text-[52px] text-background leading-none font-medium">
                      <StatCounter to={s.value} suffix={s.suffix} />
                    </div>
                    <p className="font-mono text-[10px] text-background/35 uppercase tracking-[0.12em] mt-2">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Project cards ───────────────────────────────────────── */}
        <section className="bg-background pb-[120px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 space-y-0">
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={i} delay={0.05}>
                <div className="group relative border-b border-grey-mid py-14 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">

                  {/* Left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                  {/* Project info */}
                  <div className="lg:pl-6">
                    {/* Index + category + year */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-display text-[52px] md:text-[64px] text-grey-mid/40 leading-none font-medium select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.14em]">
                          {p.category}
                        </span>
                        <span className="font-mono text-[10px] text-grey-text tracking-[0.08em]">
                          {p.year} · {p.client}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-[26px] md:text-[32px] text-foreground leading-[1.1] mb-4 group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </h2>

                    <p className="font-body text-[15px] text-grey-text leading-[1.72] max-w-[560px] mb-6">
                      {p.description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] text-grey-text border border-grey-mid px-2.5 py-1 tracking-[0.04em] group-hover:border-primary/30 transition-colors duration-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Case study link */}
                    <div className="flex items-center gap-2 mt-8 font-mono text-[11px] text-primary uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Case study available on request</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Metrics block */}
                  <div className="lg:min-w-[220px] lg:text-right flex lg:flex-col gap-8 lg:gap-0 lg:pt-4">
                    {/* Hero stat */}
                    <div className="lg:mb-8">
                      <div className="font-display text-[52px] md:text-[64px] text-primary leading-none font-medium">
                        {p.hero.value}
                      </div>
                      <p className="font-mono text-[10px] text-grey-text uppercase tracking-[0.1em] mt-2 max-w-[160px] lg:ml-auto leading-[1.4]">
                        {p.hero.label}
                      </p>
                    </div>

                    {/* Secondary metrics */}
                    <div className="lg:border-t lg:border-grey-mid lg:pt-6 flex lg:flex-col gap-6 lg:gap-5">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-display text-[22px] text-foreground leading-none font-medium">
                            {m.value}
                          </div>
                          <p className="font-mono text-[9px] text-grey-text uppercase tracking-[0.1em] mt-1">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
