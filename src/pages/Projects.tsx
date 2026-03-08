import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    category: "AI / Automation",
    title: "Document Intelligence Platform",
    client: "US Fintech Firm",
    year: "2024",
    description:
      "An AI-powered document parsing, classification, and extraction system that reduced manual processing by 80%. Built with custom LLM pipelines, OCR integration, and a real-time review dashboard.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "OpenAI", "AWS"],
    metrics: [
      { value: "80%", label: "Reduction in manual processing" },
      { value: "12K", label: "Documents processed daily" },
      { value: "6 wks", label: "From kickoff to production" },
    ],
  },
  {
    category: "Full-Stack / Web",
    title: "Client Operations Portal",
    client: "B2B SaaS — UK & EU",
    year: "2023",
    description:
      "A custom enterprise web portal with live data dashboards, role-based access, automated reporting, and integrations with Salesforce and HubSpot. Serves 200+ daily active enterprise users.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Vercel"],
    metrics: [
      { value: "200+", label: "Daily active users" },
      { value: "99.9%", label: "Uptime since launch" },
      { value: "3x", label: "Faster reporting cycles" },
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
    metrics: [
      { value: "400+", label: "Daily active users" },
      { value: "3", label: "Countries served" },
      { value: "45%", label: "Faster dispatch times" },
    ],
  },
  {
    category: "AI / Web",
    title: "Intelligent Recruitment Engine",
    client: "HR Tech Startup — USA",
    year: "2024",
    description:
      "An AI-driven candidate matching and screening platform that processes resumes, scores candidates, and auto-generates interview questions. Integrated directly into the client's ATS.",
    stack: ["Python", "React", "OpenAI", "PostgreSQL", "Docker", "GCP"],
    metrics: [
      { value: "60%", label: "Faster time-to-hire" },
      { value: "5K+", label: "Candidates processed monthly" },
      { value: "92%", label: "Matching accuracy" },
    ],
  },
  {
    category: "Web / Automation",
    title: "E-Commerce Analytics Dashboard",
    client: "DTC Brand — UK",
    year: "2022",
    description:
      "A unified analytics dashboard aggregating data from Shopify, Google Analytics, Meta Ads, and Klaviyo. Automated weekly performance reports and anomaly detection alerts.",
    stack: ["Next.js", "Python", "BigQuery", "Tailwind CSS", "Vercel", "Stripe"],
    metrics: [
      { value: "4hrs", label: "Saved weekly on reporting" },
      { value: "6", label: "Data sources unified" },
      { value: "2x", label: "ROAS improvement" },
    ],
  },
  {
    category: "Mobile / Full-Stack",
    title: "Patient Care Companion App",
    client: "HealthTech — USA",
    year: "2024",
    description:
      "A HIPAA-compliant mobile app for remote patient monitoring. Integrates with wearable devices, provides medication reminders, and delivers real-time vitals to care teams.",
    stack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "AWS", "HL7 FHIR"],
    metrics: [
      { value: "1.2K", label: "Active patients" },
      { value: "HIPAA", label: "Fully compliant" },
      { value: "35%", label: "Fewer missed appointments" },
    ],
  },
];

const Projects = () => (
  <>
    <Nav />
    <main className="pt-[72px]">
      {/* Header */}
      <section className="section-padding pb-16 bg-background">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[12px] text-primary uppercase tracking-[0.14em] mb-8 link-hover"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-[40px] md:text-[56px] lg:text-[64px] text-foreground leading-[0.95]"
          >
            Our Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[17px] md:text-[18px] text-grey-text max-w-[560px] mt-6 leading-[1.75]"
          >
            A selection of projects we have delivered for clients across the US,
            UK, and Europe. Full case studies available under NDA.
          </motion.p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-[120px] bg-background">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="bg-card border border-border p-8 md:p-10 transition-all duration-250 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:border-primary group">
                <div className="flex flex-col lg:flex-row lg:gap-12">
                  {/* Left */}
                  <div className="lg:w-3/5">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-[11px] text-primary uppercase tracking-[0.12em]">
                        {p.category}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em]">
                        {p.year}
                      </span>
                    </div>
                    <h2 className="font-display text-[24px] md:text-[28px] text-foreground leading-[1.1]">
                      {p.title}
                    </h2>
                    <p className="font-mono text-[12px] text-muted-foreground mt-2">
                      {p.client}
                    </p>
                    <p className="font-body text-[16px] text-grey-text mt-4 leading-[1.7] max-w-[520px]">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[11px] text-muted-foreground border border-border px-2.5 py-1 tracking-[0.04em]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — Metrics */}
                  <div className="lg:w-2/5 mt-8 lg:mt-0 flex flex-col justify-center">
                    <div className="grid grid-cols-3 gap-4">
                      {p.metrics.map((m, mi) => (
                        <div key={mi} className="text-center lg:text-left">
                          <p className="font-display text-[28px] md:text-[32px] text-primary leading-none">
                            {m.value}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.1em] mt-1.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t border-border">
                      <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em] flex items-center gap-1.5">
                        <ExternalLink className="w-3 h-3" />
                        Case Study Available on Request
                      </p>
                    </div>
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

export default Projects;
