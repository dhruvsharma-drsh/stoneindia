import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone, Mail, Globe2, MapPin, ArrowUpRight, ArrowRight,
  Check, Loader2, Send, Sparkles, MessageSquare
} from "lucide-react";
import { Map, MapMarker, MarkerContent } from "./map-marker";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   CONTACT 2 — Awwwards-quality contact section
   Matches site DNA: GSAP, gold accent, floating shapes,
   dot grid, editorial type, interactive micro-animations
   ═══════════════════════════════════════════════════════ */

/* ── Input component ── */
const FormInput = ({ id, label, type = "text", value, onChange, textarea = false, required = false, autoComplete, focusedField, setFocusedField }) => {
  const isFocused = focusedField === id;
  const filled = value && value.length > 0;
  const active = isFocused || filled;

  return (
    <div className="relative group">
      {/* Subtle focus background */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#B8955D]/[0.03] to-transparent pointer-events-none transition-opacity duration-500"
        style={{ opacity: isFocused ? 1 : 0 }}
      />
      {textarea ? (
        <textarea
          id={id} name={id} value={value} onChange={onChange}
          onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
          rows={4}
          autoComplete={autoComplete}
          className="peer w-full bg-transparent border-b-[1.5px] border-[#D5D0C8] text-[#1A1A1A] text-[15px] pt-7 pb-2.5 px-0 outline-none resize-none transition-colors duration-300 placeholder-transparent z-10 relative"
          placeholder={label}
          style={{ minHeight: 110 }}
        />
      ) : (
        <input
          id={id} name={id} type={type} value={value} onChange={onChange}
          onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
          autoComplete={autoComplete}
          className="peer w-full bg-transparent border-b-[1.5px] border-[#D5D0C8] text-[#1A1A1A] text-[15px] h-14 pt-5 pb-2 px-0 outline-none transition-colors duration-300 placeholder-transparent z-10 relative"
          placeholder={label}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] z-20 ${
          active
            ? "top-1 text-[10px] tracking-[0.12em] uppercase font-semibold text-[#B8955D]"
            : "top-4 text-[15px] tracking-normal font-normal text-[#9A9A9A]"
        }`}
      >
        {label}{required && " *"}
      </label>
      {/* Smooth Gold underline sweep */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B8955D] origin-left transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] z-20"
        style={{ transform: isFocused ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};


export const Contact2 = ({
  title = "Get in Touch",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(123) 345-67890",
  email = import.meta.env.VITE_CONTACT_EMAIL || "dhruv.sharma@frostrek.com",
  address,
  web,
}) => {
  /* ── Refs ── */
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const shapesRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const formCardRef = useRef(null);

  /* ── Form state ── */
  const [form, setForm] = useState({
    firstname: "", lastname: "", email: "", subject: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const canSend = form.firstname.trim() && form.email.trim() && form.message.trim() && status !== "sending";
  const msgLimit = 500;
  const msgLeft = msgLimit - form.message.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;
    setStatus("sending");
    
    try {
      const fullName = `${form.firstname} ${form.lastname}`.trim();

      // Helper: submit to a Web3Forms key
      const submitToKey = async (key) => {
        if (!key) return { success: true };
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: key,
            name: fullName,
            email: form.email,
            subject: form.subject || "New Contact Form Submission — Gwalior Stone",
            message: form.message,
            from_name: "Gwalior Stone Website",
          }),
        });
        return await response.json();
      };

      // Helper: submit to backend SMTP server
      const submitToBackend = async () => {
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: fullName,
              email: form.email,
              subject: form.subject || "New Contact Form Submission — Gwalior Stone",
              message: form.message,
            }),
          });
          return await response.json();
        } catch (err) {
          console.error("Backend email failed:", err);
          return { success: false };
        }
      };

      // Fire all submissions in parallel (Web3Forms + Backend SMTP)
      const [result1, result2, result3, backendResult] = await Promise.all([
        submitToKey(import.meta.env.VITE_WEB3FORMS_KEY),
        submitToKey(import.meta.env.VITE_WEB3FORMS_KEY_2),
        submitToKey(import.meta.env.VITE_WEB3FORMS_KEY_3),
        submitToBackend(),
      ]);

      // Consider success if at least one channel delivered
      if (result1.success || result2.success || result3.success || backendResult.success) {
        setStatus("sent");
      } else {
        alert(result1.message || result2.message || result3.message || "There was an error sending your message. Please try again.");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
      setStatus("idle");
    }
  };

  const reset = () => {
    setForm({ firstname: "", lastname: "", email: "", subject: "", message: "" });
    setStatus("idle");
  };

  /* ── Contact rows ── */
  const contactRows = [
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    ...(address ? [{ icon: MapPin, label: "Address", value: address }] : []),
    ...(web ? [{ icon: Globe2, label: "Web", value: web.label, href: web.url }] : []),
  ];

  /* ── GSAP animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      const headEls = headingRef.current?.children;
      if (headEls) {
        gsap.fromTo(headEls,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 1.2, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Left column slides from left
      if (leftColRef.current) {
        const leftEls = leftColRef.current.children;
        gsap.fromTo(leftEls,
          { opacity: 0, x: -80, filter: "blur(6px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 1, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: leftColRef.current, start: "top 82%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Right column (form) slides from right
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current,
          { opacity: 0, x: 80, filter: "blur(6px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: rightColRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Floating geometric shapes
      const shapes = shapesRef.current?.querySelectorAll(".ct-shape");
      shapes?.forEach((shape, i) => {
        gsap.to(shape, {
          x: (i % 2 === 0 ? 1 : -1) * (20 + i * 12),
          y: (i % 3 === 0 ? -1 : 1) * (18 + i * 10),
          rotation: i % 2 === 0 ? 360 : -360,
          scale: i % 2 === 0 ? 1.12 : 0.88,
          duration: 6 + i * 1.5,
          repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // Orbit rings
      gsap.to(orbRef1.current, { rotation: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(orbRef2.current, { rotation: -360, duration: 38, repeat: -1, ease: "none" });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── 3D tilt for form card ── */
  const handleCardMove = useCallback((e) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - cy) / (rect.height / 2)) * -4;
    const rotateY = ((e.clientX - cx) / (rect.width / 2)) * 4;
    gsap.to(formCardRef.current, {
      rotateX, rotateY, duration: 0.4, ease: "power2.out", transformPerspective: 1200,
    });
  }, []);

  const handleCardLeave = useCallback(() => {
    if (!formCardRef.current) return;
    gsap.to(formCardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  }, []);



  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden pb-12 sm:pb-24 lg:pb-28 pt-4 sm:pt-6 lg:pt-8"
    >
      {/* ── Background Ambient Glow (Made Brighter) ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vw] bg-[#B8955D]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#B8955D]/[0.06] rounded-full blur-[100px] pointer-events-none" />

      {/* ── Dot Pattern (Made Brighter) ── */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #111 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Floating Geometric Shapes ── */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="ct-shape absolute top-16 left-[8%] w-14 h-14 border border-[#B8955D]/20 rotate-45 rounded-md" />
        <div className="ct-shape absolute top-24 right-[12%] w-10 h-10 bg-gradient-to-br from-[#B8955D]/15 to-transparent rotate-12 rounded" />
        <div className="ct-shape absolute bottom-32 left-[22%] w-16 h-16 rounded-full border border-black/[0.06] flex items-center justify-center">
          <div className="w-7 h-7 bg-[#B8955D]/10 rounded-full" />
        </div>
        <div className="ct-shape absolute bottom-24 right-[28%] w-5 h-5 rounded-full border-2 border-[#B8955D]/25" />
        <div className="ct-shape absolute top-1/2 left-[48%] w-11 h-11 flex items-center justify-center opacity-30">
          <div className="absolute w-full h-[1px] bg-[#B8955D]/40" />
          <div className="absolute h-full w-[1px] bg-[#B8955D]/40" />
        </div>
        <div className="ct-shape absolute top-[35%] right-[6%] w-8 h-8 border border-dashed border-[#B8955D]/20 rounded-full" />
      </div>

      {/* ── Orbit Rings (behind form) ── */}
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 pointer-events-none hidden lg:block">
        <div ref={orbRef1} className="absolute w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#B8955D]/15 flex items-center justify-start">
          <div className="w-2 h-2 rounded-full bg-[#B8955D]/50 -ml-1" />
        </div>
        <div ref={orbRef2} className="absolute w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.04] flex items-start justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-black/20 -mt-0.5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ═══ SECTION HEADING ═══ */}
        <div ref={headingRef} className="mb-10 sm:mb-14 max-w-3xl">
          {/* Main heading */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.08] tracking-tight text-[#1A1A1A] font-light max-w-2xl">
            {title.split(",").length > 1 ? (
              <>
                {title.split(",")[0]},<br />
                <span className="italic font-normal text-[#B8955D]">
                  {title.split(",").slice(1).join(",")}
                </span>
              </>
            ) : (
              <>
                {title}
              </>
            )}
          </h1>
          
          <p className="font-sans text-[15px] sm:text-base text-[#6B6B6B] leading-relaxed mt-6 max-w-md">
            {description}
          </p>
        </div>

        {/* ═══ TWO-COLUMN LAYOUT ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-stretch">

          {/* ── LEFT: Form + Info Card ── */}
          <div ref={leftColRef} className="flex flex-col gap-8 lg:gap-10">
            
            {/* Interactive Form Card */}
            <div
              ref={formCardRef}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="relative bg-[#FAFAF8] border border-black/[0.06] rounded-2xl p-5 sm:p-10 shadow-sm hover:shadow-xl hover:border-[#B8955D]/20 transition-all duration-500 flex-1"
              style={{ willChange: "transform" }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden rounded-tr-2xl">
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#B8955D]/25" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none overflow-hidden rounded-bl-2xl">
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#B8955D]/25" />
              </div>

              {status === "sent" ? (
                /* ── SUCCESS STATE ── */
                <div className="min-h-[480px] flex flex-col items-center justify-center text-center py-12 relative overflow-hidden">
                  {/* Subtle radial glow behind the icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#B8955D]/[0.06] rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Animated concentric rings */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 -m-6 rounded-full border border-[#B8955D]/10 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-0 -m-3 rounded-full border border-[#B8955D]/15 animate-pulse" style={{ animationDuration: '1.5s' }} />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B8955D]/20 via-[#B8955D]/10 to-transparent border-2 border-[#B8955D]/40 flex items-center justify-center animate-[scaleIn_0.5s_cubic-bezier(.34,1.56,.64,1)_both] backdrop-blur-sm">
                      <Check className="w-9 h-9 text-[#B8955D]" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Decorative sparkles */}
                  <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-[#B8955D]/40 rounded-full animate-pulse" />
                  <div className="absolute top-[30%] left-[15%] w-1 h-1 bg-[#B8955D]/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute bottom-[25%] right-[25%] w-1 h-1 bg-[#B8955D]/25 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute bottom-[35%] left-[22%] w-1.5 h-1.5 bg-[#B8955D]/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

                  <h3 className="font-editorial text-4xl sm:text-5xl text-[#1A1A1A] font-light mb-4 relative z-10">
                    Message <span className="italic text-[#B8955D]">Sent</span>
                  </h3>
                  
                  {/* Gold divider line */}
                  <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8955D] to-transparent mb-5" />
                  
                  <p className="font-sans text-sm text-[#6B6B6B] max-w-xs mb-4 leading-relaxed relative z-10">
                    Thank you for reaching out. We'll get back to you within one business day.
                  </p>

                  <p className="font-sans text-[11px] text-[#B8955D] tracking-[0.15em] uppercase font-semibold mb-10 relative z-10">
                    ✦ Check your inbox for a confirmation ✦
                  </p>

                  <button
                    onClick={reset}
                    className="group relative inline-flex items-center gap-3 bg-[#141414] text-white font-sans text-xs font-semibold uppercase tracking-[0.14em] pl-7 pr-4 py-3.5 rounded-full border border-[#B8955D]/30 overflow-hidden transition-all duration-500 hover:border-[#B8955D] hover:shadow-[0_12px_36px_rgba(245,214,62,0.25)] hover:-translate-y-0.5"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#B8955D] via-[#C5A880] to-[#B8955D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                    <span className="relative z-10">Send Another</span>
                    <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-[#111] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit}>
                  {/* Form header */}
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#B8955D]/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-[#B8955D]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-editorial text-lg sm:text-xl text-[#1A1A1A] font-light leading-tight">
                          Send us a message
                        </h3>
                        <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-[#B8955D] font-semibold">
                          We reply within 24 hrs
                        </span>
                      </div>
                    </div>
                    <Send className="w-4 h-4 text-[#C5C0B8] hidden sm:block" strokeWidth={1.5} />
                  </div>

                  {/* Fields */}
                  <div className="space-y-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                      <FormInput id="ct-firstname" label="First name" value={form.firstname} onChange={update("firstname")} required autoComplete="given-name" focusedField={focusedField} setFocusedField={setFocusedField} />
                      <FormInput id="ct-lastname" label="Last name" value={form.lastname} onChange={update("lastname")} autoComplete="family-name" focusedField={focusedField} setFocusedField={setFocusedField} />
                    </div>
                    <FormInput id="ct-email" label="Email" type="email" value={form.email} onChange={update("email")} required autoComplete="email" focusedField={focusedField} setFocusedField={setFocusedField} />
                    <FormInput id="ct-subject" label="Subject" value={form.subject} onChange={update("subject")} focusedField={focusedField} setFocusedField={setFocusedField} />
                    <div>
                      <FormInput
                        id="ct-message" label="Your message" textarea
                        value={form.message}
                        onChange={(e) => { if (e.target.value.length <= msgLimit) update("message")(e); }}
                        required
                        focusedField={focusedField} setFocusedField={setFocusedField}
                      />
                      <div className="flex justify-between items-center mt-1.5 px-0.5">
                        <span className="font-sans text-[10px] text-[#B8955D]/70 tracking-wide">* Required fields</span>
                        <span className={`font-sans text-[10px] tabular-nums tracking-wide ${msgLeft < 50 ? "text-[#B8955D]" : "text-[#C5C0B8]"}`}>
                          {form.message.length} / {msgLimit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="mt-8 sm:mt-10">
                    <button
                      type="submit"
                      disabled={!canSend}
                      className={`group relative w-full inline-flex items-center justify-center gap-3 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] py-4 rounded-full border overflow-hidden transition-all duration-500 active:scale-[0.98] ${
                        canSend
                          ? "bg-[#141414] text-white border-[#B8955D]/35 hover:border-[#B8955D] hover:shadow-[0_12px_36px_rgba(245,214,62,0.25)] hover:-translate-y-0.5 cursor-pointer"
                          : "bg-[#F0EDE8] text-[#B8B3AA] border-transparent cursor-not-allowed"
                      }`}
                    >
                      {/* Gold sheen sweep on hover */}
                      {canSend && (
                        <span className="absolute inset-0 bg-gradient-to-r from-[#B8955D] via-[#C5A880] to-[#B8955D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                      )}
                      <span className="relative z-10 flex items-center gap-2.5">
                        {status === "sending" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Start the Conversation
                          </>
                        )}
                      </span>
                      {canSend && (
                        <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[#111] group-hover:scale-105">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </button>

                    <p className="font-sans text-[11px] text-[#B8B3AA] text-center mt-4 tracking-wide">
                      Your privacy matters — no spam, no newsletter, just a reply.
                    </p>
                  </div>
                </form>
              )}
            </div>
            
            {/* Info Card */}
            <div className="bg-[#FAFAF8] border border-black/[0.06] rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F3ED] border border-[#B8955D]/15 flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8955D]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#B8955D] font-semibold mb-1">Phone</h4>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-sans text-sm sm:text-[15px] font-semibold text-[#1A1A1A] hover:text-[#B8955D] transition-colors">{phone}</a>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F3ED] border border-[#B8955D]/15 flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8955D]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#B8955D] font-semibold mb-1">Email</h4>
                    <a href={`mailto:${email}`} className="font-sans text-sm sm:text-[15px] font-semibold text-[#1A1A1A] hover:text-[#B8955D] transition-colors">{email}</a>
                  </div>
                </div>
              </div>
              
              {address && (
                <>
                  <hr className="border-t border-black/[0.06] w-full" />
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F3ED] border border-[#B8955D]/15 flex items-center justify-center">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8955D]" />
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#B8955D] font-semibold mb-1">Address</h4>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="font-sans text-sm sm:text-[15px] font-semibold text-[#1A1A1A] hover:text-[#B8955D] transition-colors block w-full pr-2">
                        {address}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── RIGHT: Google Calendar Embed ── */}
          <div ref={rightColRef} className="bg-[#FAFAF8] border border-black/[0.06] rounded-2xl shadow-sm overflow-hidden min-h-[650px] sm:min-h-[700px] xl:min-h-[750px] w-full relative">
            <iframe
              src={import.meta.env.VITE_CALENDAR_URL || "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0?gv=true"}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a meeting"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            ></iframe>
          </div>
          
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0) rotate(-15deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Contact2;
