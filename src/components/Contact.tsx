import { useState, FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    email: "",
    company: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Booked. We'll be in touch within one business day.");
    setForm({ email: "", company: "" });
  };

  const inputClass =
    "w-full bg-card border border-grey-mid px-4 py-3.5 font-body text-[15px] text-foreground placeholder:text-grey-text/60 focus:outline-none focus:border-b-primary focus:border-b-2 transition-colors duration-200";

  const badges = [
    "Free, no commitment",
    "Demo before you sign",
    "Senior engineers only",
    "US time zone overlap",
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <p className="section-label">Let's Talk</p>
          <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05] max-w-[820px]">
            Not sure if AI is right for your business?
            <br />
            Let's find out together.
          </h2>
          <p className="font-body text-[17px] text-grey-text mt-5 max-w-[620px] leading-[1.75]">
            Book a free 45-minute call. We'll look at your operations, tell you
            exactly where AI can help, and give you a rough idea of cost and
            timeline. No pitch, no pressure.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 grid sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-[820px]"
          >
            <input
              type="email"
              placeholder="Your work email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Company name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={inputClass}
            />
            <button
              type="submit"
              className="group bg-primary text-primary-foreground font-body font-medium text-[15px] h-[54px] px-6 transition-colors duration-200 hover:bg-primary-light flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Book a free call
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
          <p className="font-body text-[13px] text-grey-text mt-3">
            We get back to you within one business day.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-14 pt-10 border-t border-grey-mid flex flex-wrap gap-x-8 gap-y-3">
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="font-body text-[14px] text-foreground">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
