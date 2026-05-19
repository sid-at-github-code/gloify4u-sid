import ScrollReveal from "./ScrollReveal";

const metrics = [
  { value: "40%", label: "Avg. cost reduction in ops across AI deployments" },
  { value: "3×", label: "Faster than building an in-house AI team from scratch" },
  { value: "12×", label: "Average ROI our clients see in year one" },
  { value: "98%", label: "On-time delivery across all 95+ projects" },
];

const caseMetrics = [
  { value: "80%", label: "Less time on manual document review" },
  { value: "6 wks", label: "Kickoff to live in production" },
  { value: "$420K", label: "Saved in year one" },
];

const Results = () => (
  <section id="results" className="section-padding bg-background">
    <div className="max-w-[1200px] mx-auto">
      <ScrollReveal>
        <p className="section-label">Real Results</p>
        <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
          Impact that shows up
          <br />
          on the balance sheet.
        </h2>
        <p className="font-body text-[17px] text-grey-text max-w-[520px] mt-5">
          No synthetic benchmarks. Every number here came from a real system we shipped for a real client.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {metrics.map((m, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className="border-t border-grey-mid pt-6">
              <p className="font-display text-[44px] md:text-[52px] text-primary leading-none">
                {m.value}
              </p>
              <p className="font-body text-[14px] text-grey-text mt-3 leading-[1.6]">
                {m.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Case study */}
      <ScrollReveal>
        <div className="mt-20 bg-grey-light border border-grey-mid p-8 md:p-12 grid lg:grid-cols-2 gap-10">
          <div>
            <span className="inline-block font-mono text-[10px] text-primary border border-primary px-2 py-0.5 uppercase tracking-[0.12em]">
              Fintech
            </span>
            <h3 className="font-display text-[26px] md:text-[34px] text-foreground mt-5 leading-[1.1]">
              We cut loan application review time by 80% for a US lending company.
            </h3>
            <p className="font-body text-[16px] text-grey-text mt-5 leading-[1.75]">
              They had 3 people manually reading loan documents for 45 minutes
              each. We built an AI pipeline that reads, classifies, and
              summarizes every document automatically — and dropped it into
              their existing system in 6 weeks.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 lg:border-l lg:border-grey-mid lg:pl-10 self-center">
            {caseMetrics.map((m, i) => (
              <div key={i}>
                <p className="font-display text-[28px] md:text-[36px] text-primary leading-none">
                  {m.value}
                </p>
                <p className="font-mono text-[10px] text-grey-text uppercase tracking-[0.1em] mt-2 leading-[1.4]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Results;
