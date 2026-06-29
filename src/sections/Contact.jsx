import { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInRight, staggerContainer, staggerItem, viewportConfig,
} from "@/lib/animations";
import SectionLabel   from "@/components/ui/SectionLabel";
import GradientBlob   from "@/components/ui/GradientBlob";
import MagneticButton from "@/components/ui/MagneticButton";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { PERSONAL_INFO } from "@/lib/constants";
import {
  FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaExternalLinkAlt,
} from "react-icons/fa";
import { HiPaperAirplane, HiCheckCircle, HiXCircle } from "react-icons/hi";

const LINKS = [
  { icon: FaEnvelope,     label: "Email",    value: PERSONAL_INFO.email,            href: `mailto:${PERSONAL_INFO.email}`, color: "#8b5cf6", bg: "rgba(139,92,246,0.08)"  },
  { icon: FaLinkedin,     label: "LinkedIn", value: "linkedin.com/in/khush-sonani",  href: PERSONAL_INFO.links.linkedin,    color: "#0a66c2", bg: "rgba(10,102,194,0.08)"   },
  { icon: FaGithub,       label: "GitHub",   value: "github.com/KhushSonani",        href: PERSONAL_INFO.links.github,      color: "#ffffff", bg: "rgba(255,255,255,0.06)"  },
  { icon: FaMapMarkerAlt, label: "Location", value: PERSONAL_INFO.location,          href: null,                            color: "#10b981", bg: "rgba(16,185,129,0.08)"   },
];

const inputBase = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-200 bg-white/[0.04] border";
const inputCls  = (err) => `${inputBase} ${err ? "border-red-500/55 focus:border-red-500/80" : "border-white/8 focus:border-purple-500/60 focus:bg-white/[0.06]"}`;

// ─── Accessible field wrapper ─────────────────────────────────────────────────
function Field({ id, label, error, children }) {
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            role="alert"
            className="text-red-400 text-[11px] mt-1 ml-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const uid = useId();
  const [form,    setForm]    = useState({ name: "", email: "", subject: "", message: "" });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  useGSAPReveal(formRef, { y: 20, stagger: 0.08 });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setStatus(null);
    try {
      const data = new FormData();
      data.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const fId = (k) => `${uid}-${k}`;

  return (
    <section id="contact" aria-label="Contact" className="relative section-padding overflow-hidden">
      <GradientBlob className="bottom-0 left-1/2 -translate-x-1/2" color1="#8b5cf6" color2="#6366f1" size={650} opacity={0.07} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Contact"
          title="Let's Work Together"
          description="Whether it's an internship, collaboration, or just a conversation — my inbox is open."
          center
        />

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 max-w-5xl mx-auto">

          {/* Left — contact info */}
          <motion.div
            className="lg:col-span-2 space-y-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {LINKS.map(({ icon: Icon, label, value, href, color, bg }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="relative flex items-center gap-3.5 p-4 rounded-2xl overflow-hidden group border border-white/8"
                style={{ background: "rgba(255,255,255,0.025)" }}
                whileHover={{ borderColor: `${color === "#ffffff" ? "rgba(255,255,255,0.2)" : color + "45"}`, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, ${bg}, transparent 60%)` }} />
                <motion.div
                  aria-hidden="true"
                  className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg, border: `1px solid ${color === "#ffffff" ? "rgba(255,255,255,0.12)" : color + "28"}` }}
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ duration: 0.18 }}
                >
                  <Icon size={14} style={{ color }} aria-hidden="true" />
                </motion.div>

                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-gray-600 text-[11px] uppercase tracking-wide font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${value}`}
                      className="text-white text-xs font-medium hover:text-purple-300 transition-colors truncate block mt-0.5"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-xs font-medium mt-0.5 truncate">{value}</p>
                  )}
                </div>

                {href && !href.startsWith("mailto") && (
                  <FaExternalLinkAlt
                    size={10}
                    aria-hidden="true"
                    className="relative z-10 text-gray-700 group-hover:text-gray-400 transition-colors flex-shrink-0"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              variants={staggerItem}
              className="p-4 rounded-2xl border border-white/8 text-sm"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-gray-600">🕐 Typically responds within </span>
              <span className="text-purple-400 font-medium">24 hours</span>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="p-4 rounded-2xl border border-green-500/20 flex items-start gap-3"
              style={{ background: "rgba(16,185,129,0.04)" }}
            >
              <span aria-hidden="true" className="relative flex h-2 w-2 mt-1 flex-shrink-0">
                <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-green-400" />
              </span>
              <p className="text-gray-400 text-xs">
                <span className="text-green-400 font-medium">Open to opportunities</span> — SDE internships,
                full-time roles, and freelance projects.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden border border-white/8 space-y-4"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(139,92,246,0.07), transparent)" }} />
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.55), transparent)" }} />

              {/* Live region for screen-reader status announcements */}
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {status === "success" && "Message sent successfully. I will reply within 24 hours."}
                {status === "error"   && "There was an error sending your message. Please try again."}
              </div>

              <div className="relative z-10 space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id={fId("name")} label="Your name" error={errors.name}>
                    <motion.input
                      id={fId("name")}
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${fId("name")}-error` : undefined}
                      className={inputCls(!!errors.name)}
                      value={form.name}
                      onChange={set("name")}
                      whileFocus={{ borderColor: "rgba(139,92,246,0.7)" }}
                      transition={{ duration: 0.15 }}
                    />
                  </Field>
                  <Field id={fId("email")} label="Your email address" error={errors.email}>
                    <motion.input
                      id={fId("email")}
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${fId("email")}-error` : undefined}
                      className={inputCls(!!errors.email)}
                      value={form.email}
                      onChange={set("email")}
                      whileFocus={{ borderColor: "rgba(139,92,246,0.7)" }}
                      transition={{ duration: 0.15 }}
                    />
                  </Field>
                </div>

                {/* Subject */}
                <Field id={fId("subject")} label="Subject" error={errors.subject}>
                  <motion.input
                    id={fId("subject")}
                    type="text"
                    placeholder="What's this about?"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? `${fId("subject")}-error` : undefined}
                    className={inputCls(!!errors.subject)}
                    value={form.subject}
                    onChange={set("subject")}
                    whileFocus={{ borderColor: "rgba(139,92,246,0.7)" }}
                    transition={{ duration: 0.15 }}
                  />
                </Field>

                {/* Message */}
                <Field id={fId("message")} label="Your message" error={errors.message}>
                  <motion.textarea
                    id={fId("message")}
                    placeholder="Tell me about your project, opportunity, or just say hi…"
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${fId("message")}-error` : undefined}
                    className={`${inputCls(!!errors.message)} resize-none`}
                    value={form.message}
                    onChange={set("message")}
                    whileFocus={{ borderColor: "rgba(139,92,246,0.7)" }}
                    transition={{ duration: 0.15 }}
                  />
                </Field>

                {/* Submit */}
                <MagneticButton className="w-full" strength={10}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading}
                    aria-label={loading ? "Sending message…" : "Send message"}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
                      boxShadow:  "0 0 28px rgba(139,92,246,0.4)",
                    }}
                    whileHover={{ scale: loading ? 1 : 1.015, boxShadow: "0 0 44px rgba(139,92,246,0.6)" }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                  >
                    {loading ? (
                      <>
                        <div aria-hidden="true" className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <HiPaperAirplane size={15} className="-rotate-45" aria-hidden="true" />
                      </>
                    )}
                  </motion.button>
                </MagneticButton>

                {/* Visible status */}
                <AnimatePresence mode="wait">
                  {status && (
                    <motion.div
                      key={status}
                      role="status"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: status === "success" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                        border:     `1px solid ${status === "success" ? "rgba(16,185,129,0.22)" : "rgba(239,68,68,0.22)"}`,
                        color:      status === "success" ? "#34d399" : "#f87171",
                      }}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {status === "success"
                        ? <><HiCheckCircle size={16} aria-hidden="true" /> Message sent! I'll reply within 24 hours.</>
                        : <><HiXCircle    size={16} aria-hidden="true" /> Something went wrong. Please try again.</>
                      }
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
