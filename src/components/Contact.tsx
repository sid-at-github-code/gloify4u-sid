import { useState, FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const NOTIFY_EMAIL = "siddharth@gloify.com";

function buildLeadEmailHtml(email: string, company: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New lead: ${esc(email)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9">

<div style="background:linear-gradient(160deg,#1e1b4b 0%,#312e81 50%,#1e0e3f 100%);
  padding:52px 32px 44px;text-align:center">
  <p style="color:#6366f1;font-size:10px;letter-spacing:4px;text-transform:uppercase;
    margin:0 0 12px;font-family:ui-monospace,monospace;font-weight:800">◆ &nbsp;Gloify&nbsp; ◆</p>
  <h1 style="color:#fff;font-size:27px;margin:0;font-weight:800;letter-spacing:-0.7px;
    font-family:ui-sans-serif,sans-serif">New lead — Book a free call</h1>
  <p style="font-size:14px;color:#c7d2fe;margin:10px 0 0;font-family:ui-sans-serif,sans-serif">
    Someone just booked a free call on gloify.com
  </p>
</div>

<div style="max-width:660px;margin:0 auto;padding:0 16px">
  <div style="background:#fff;border-radius:14px;padding:22px 24px;margin:24px 0 0;
    box-shadow:0 2px 12px rgba(0,0,0,0.07);border:1px solid #e2e8f0">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%;padding-right:12px;border-right:1px solid #e2e8f0">
          <p style="font-size:9px;color:#6366f1;letter-spacing:2.5px;text-transform:uppercase;
            margin:0 0 6px;font-family:ui-monospace,monospace;font-weight:800">Work Email</p>
          <p style="font-size:16px;font-weight:700;color:#1e293b;margin:0;
            font-family:ui-sans-serif,sans-serif">
            <a href="mailto:${esc(email)}" style="color:#4f46e5;text-decoration:none">${esc(email)}</a>
          </p>
        </td>
        <td style="padding-left:20px">
          <p style="font-size:9px;color:#6366f1;letter-spacing:2.5px;text-transform:uppercase;
            margin:0 0 6px;font-family:ui-monospace,monospace;font-weight:800">Company</p>
          <p style="font-size:16px;font-weight:700;color:#1e293b;margin:0;
            font-family:ui-sans-serif,sans-serif">${esc(company)}</p>
        </td>
      </tr>
    </table>
  </div>
</div>

<div style="max-width:660px;margin:0 auto;padding:0 16px 48px">
  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin:28px 0;
    box-shadow:0 4px 20px rgba(0,0,0,0.07);border:1px solid #e2e8f0">
    <p style="font-size:9px;color:#6366f1;letter-spacing:3px;text-transform:uppercase;
      margin:0 0 22px;font-family:ui-monospace,monospace;font-weight:800">Lead Details</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;width:140px;vertical-align:top">
          <p style="font-size:11px;font-weight:700;color:#64748b;margin:0;
            font-family:ui-sans-serif,sans-serif;text-transform:uppercase;letter-spacing:1px">Work Email</p>
        </td>
        <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top">
          <p style="font-size:14px;color:#1e293b;margin:0;font-family:ui-sans-serif,sans-serif">
            <a href="mailto:${esc(email)}" style="color:#4f46e5;text-decoration:none">${esc(email)}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;vertical-align:top">
          <p style="font-size:11px;font-weight:700;color:#64748b;margin:0;
            font-family:ui-sans-serif,sans-serif;text-transform:uppercase;letter-spacing:1px">Company</p>
        </td>
        <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top">
          <p style="font-size:14px;color:#1e293b;margin:0;font-family:ui-sans-serif,sans-serif">${esc(company)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;vertical-align:top">
          <p style="font-size:11px;font-weight:700;color:#64748b;margin:0;
            font-family:ui-sans-serif,sans-serif;text-transform:uppercase;letter-spacing:1px">Submitted (IST)</p>
        </td>
        <td style="padding:12px 0 12px 16px;vertical-align:top">
          <p style="font-size:14px;color:#1e293b;margin:0;font-family:ui-sans-serif,sans-serif">${timestamp}</p>
        </td>
      </tr>
    </table>
  </div>

  <div style="text-align:center;padding:16px 0 32px;border-top:1px solid #e2e8f0;margin-top:8px">
    <p style="font-size:12px;color:#94a3b8;margin:0;font-family:ui-sans-serif,sans-serif">
      Sent by Gloify website &nbsp;·&nbsp;
      <a href="https://gloify.com" style="color:#6366f1;text-decoration:none">gloify.com</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

const Contact = () => {
  const [form, setForm] = useState({ email: "", company: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: [NOTIFY_EMAIL],
          subject: `New lead: ${form.company} — ${form.email}`,
          html: buildLeadEmailHtml(form.email, form.company),
        }),
      });
    } catch {
      // non-blocking — don't surface network errors to the user
    } finally {
      setSubmitting(false);
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
              disabled={submitting}
              className="group bg-primary text-primary-foreground font-body font-medium text-[15px] h-[54px] px-6 transition-colors duration-200 hover:bg-primary-light flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Book a free call"}
              {!submitting && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />}
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
