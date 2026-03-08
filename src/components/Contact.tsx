import { useState, FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    source: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in the required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Enquiry sent. We'll be in touch within one business day.");
    setForm({ name: "", email: "", company: "", message: "", source: "" });
  };

  const inputClass =
    "w-full bg-card border border-grey-mid px-4 py-3.5 font-body text-[15px] text-foreground placeholder:text-grey-text/60 focus:outline-none focus:border-b-primary focus:border-b-2 transition-colors duration-200";

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <p className="section-label">Get in Touch</p>
          <h2 className="font-display text-[36px] md:text-[48px] text-foreground mt-4 leading-[1.05]">
            Tell us what you're building.
          </h2>
          <p className="font-body text-[17px] text-grey-text mt-4 max-w-[520px]">
            We respond to every serious enquiry within one business day.
            No discovery calls unless you want one.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 mt-16">
          {/* Left: Contact details */}
          <ScrollReveal>
            <div className="lg:pr-16 lg:border-r lg:border-grey-mid space-y-10">
              <div>
                <p className="font-body font-semibold text-[15px] text-foreground mb-2">
                  Direct Contact
                </p>
                <a
                  href="mailto:hello@gloify.com"
                  className="block font-body text-[16px] text-foreground link-hover"
                >
                  hello@gloify.com
                </a>
                <a
                  href="mailto:projects@gloify.com"
                  className="block font-body text-[16px] text-foreground link-hover"
                >
                  projects@gloify.com
                </a>
              </div>
              <div>
                <p className="font-body font-semibold text-[15px] text-foreground mb-2">
                  Find Us
                </p>
                <p className="font-body text-[15px] text-grey-text">
                  Gloify — Crossdev Technologies
                  <br />
                  Bangalore, India
                  <br />
                  Serving clients in the US and UK
                </p>
              </div>
              <div>
                <p className="font-body font-semibold text-[15px] text-foreground mb-2">
                  Availability
                </p>
                <p className="font-mono text-[13px] text-grey-text leading-[1.8]">
                  US EST business hours: 9am – 6pm overlap available
                  <br />
                  UK GMT business hours: Full coverage
                </p>
              </div>
              <div>
                <p className="font-body font-semibold text-[15px] text-foreground mb-2">
                  Connect
                </p>
                <a
                  href="https://linkedin.com/company/gloify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-body text-[15px] text-foreground link-hover"
                >
                  linkedin.com/company/gloify
                </a>
                <a
                  href="https://github.com/gloify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-body text-[15px] text-foreground link-hover"
                >
                  github.com/gloify
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="lg:pl-16 space-y-5">
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Work Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Company Name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputClass}
              />
              <textarea
                placeholder="What are you looking to build? *"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
              />
              <input
                type="text"
                placeholder="How did you find us? (optional)"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className={inputClass}
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-body font-medium text-[15px] h-[52px] transition-colors duration-200 hover:bg-primary-light"
              >
                Send Enquiry
              </button>
              <p className="font-body text-[13px] text-grey-text text-center">
                No automated follow-ups. A real reply from someone who
                has read what you wrote.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
