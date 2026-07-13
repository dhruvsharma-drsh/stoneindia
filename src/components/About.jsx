import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Globe, Gem, Layers, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const sliderImages = [
  { src: "/img/drsh/image copy 12.png", label: "Master Carved Jaali", subtitle: "Intricate Geometric Stone Carving" },
  { src: "/img/drsh/image copy 14.png", label: "Heritage Sandstone", subtitle: "Timeless Architectural Craft" },
  { src: "/img/drsh/image copy 11.png", label: "Ornate Lattice Panel", subtitle: "Precision Laser Cut Stone Art" },
  { src: "/img/drsh/9bb3928c-5874-4806-a749-94e644f55e79.jpg", label: "Royal Gwalior Facade", subtitle: "Elevating Exterior & Interior Spaces" },
];

/* ── Animated Counter Hook ── */
const useCountUp = (end, duration = 2000, trigger = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
};

const About = () => {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const imageColRef = useRef(null);
  const orbitalRef = useRef(null);
  const [activeTexture, setActiveTexture] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const countCountries = useCountUp(50, 2200, statsVisible);
  const countVarieties = useCountUp(200, 2400, statsVisible);
  const countYears = useCountUp(20, 1800, statsVisible);

  // Auto-play slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTexture((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goNext = useCallback(() => setActiveTexture((p) => (p + 1) % sliderImages.length), []);
  const goPrev = useCallback(() => setActiveTexture((p) => (p - 1 + sliderImages.length) % sliderImages.length), []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text column stagger
      gsap.fromTo(
        textColRef.current.children,
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.0, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Image capsule entrance
      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, x: -60, scale: 0.9 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Orbital ring spin
      if (orbitalRef.current) {
        gsap.to(orbitalRef.current, {
          rotation: 360,
          duration: 18,
          repeat: -1,
          ease: "none",
        });
      }

      // Trigger stat counters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setStatsVisible(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 w-full bg-[#FDFCFA] overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* ── Ambient Background Effects ── */}
      <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#B8955D]/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-[#1A1A1A]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #999 0.5px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative diagonal line */}
      <div className="absolute top-20 right-[10%] w-px h-40 bg-gradient-to-b from-transparent via-[#B8955D]/20 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute bottom-20 left-[8%] w-px h-32 bg-gradient-to-b from-transparent via-[#B8955D]/15 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-[88rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* ════════════════════════════════════════════════════════════ */}
          {/* ── LEFT: Capsule Image with Orbital Ring & Glow ────────── */}
          {/* ════════════════════════════════════════════════════════════ */}
          <div ref={imageColRef} className="relative flex items-center justify-center order-1 lg:order-1">

            {/* Radial glow behind capsule */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#B8955D]/[0.12] via-[#D4B978]/[0.06] to-transparent blur-[60px]" />
            </div>

            {/* Rotating orbital ring */}
            <div
              ref={orbitalRef}
              className="absolute w-[105%] h-[105%] pointer-events-none"
              style={{ transformOrigin: "center center" }}
            >
              {/* Ring path */}
              <svg viewBox="0 0 400 600" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <ellipse cx="200" cy="300" rx="185" ry="285" stroke="url(#orbitalGrad)" strokeWidth="1.2" strokeDasharray="8 12" opacity="0.5" />
                {/* Orbiting dot */}
                <circle cx="200" cy="15" r="5" fill="#B8955D" opacity="0.8">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <defs>
                  <linearGradient id="orbitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B8955D" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#D4B978" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#B8955D" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Small floating accent diamonds */}
            <div className="absolute -top-4 right-[15%] w-3 h-3 rotate-45 bg-[#B8955D]/20 rounded-sm animate-pulse hidden lg:block" />
            <div className="absolute bottom-8 -left-2 w-2.5 h-2.5 rotate-45 bg-[#B8955D]/25 rounded-sm hidden lg:block" style={{ animation: "pulse 3s ease-in-out infinite 1s" }} />

            {/* ── THE CAPSULE ── */}
            <div
              className="relative w-[340px] sm:w-[380px] lg:w-[420px] h-[520px] sm:h-[580px] lg:h-[640px] rounded-[200px] overflow-hidden group cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                boxShadow: `
                  0 30px 80px rgba(0,0,0,0.18),
                  0 0 0 1px rgba(245,214,62,0.15),
                  inset 0 0 0 2px rgba(245,214,62,0.12),
                  0 0 60px rgba(245,214,62,0.08)
                `,
              }}
            >
              {/* Crossfade images (smoother than translate slider for capsule) */}
              {sliderImages.map((t, idx) => (
                <div
                  key={t.label}
                  className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{
                    opacity: idx === activeTexture ? 1 : 0,
                    transform: idx === activeTexture ? "scale(1)" : "scale(1.08)",
                  }}
                >
                  <img
                    src={t.src}
                    alt={t.label}
                    className="w-full h-full object-cover object-center select-none"
                    draggable={false}
                  />
                </div>
              ))}

              {/* Inner capsule glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />



              {/* Navigation arrows — appear on hover */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full backdrop-blur-md bg-white/[0.1] border border-white/[0.2] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#FBC938] hover:border-[#FBC938] hover:text-[#111] hover:scale-110 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full backdrop-blur-md bg-white/[0.1] border border-white/[0.2] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#FBC938] hover:border-[#FBC938] hover:text-[#111] hover:scale-110 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Vertical progress indicator — left side */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {sliderImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTexture(dotIdx)}
                    className={`w-1.5 rounded-full transition-all duration-500 ${dotIdx === activeTexture
                      ? "h-8 bg-[#FBC938] shadow-[0_0_8px_rgba(245,214,62,0.5)]"
                      : "h-1.5 bg-white/40 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom dots — always visible, below capsule */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
              {sliderImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveTexture(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${dotIdx === activeTexture
                    ? "w-8 bg-[#FBC938]"
                    : "w-1.5 bg-[#FBC938]/30 hover:bg-[#FBC938]/60"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* ── RIGHT: Text Content ────────────────────────────────── */}
          {/* ════════════════════════════════════════════════════════════ */}
          <div ref={textColRef} className="z-10 flex flex-col items-start order-2 lg:order-2">

            {/* Subtitle badge */}
            <div className="flex items-center gap-3 mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8955D]/[0.08] border border-[#B8955D]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" />
                <span className="font-sans text-[11px] sm:text-xs tracking-[0.22em] font-semibold text-[#B8955D] uppercase">
                  About Gwalior Stone
                </span>
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-[#B8955D]/50 to-transparent block hidden sm:block" />
            </div>

            {/* Heading — refined typography */}
            <h2 className="text-[2rem] sm:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] leading-[1.1] tracking-tight text-[#1A1A1A] mb-7">
              <span style={{ fontFamily: "'PP Neue Montreal', sans-serif" }} className="font-medium">
                Nature's Strength,
              </span>
              <span className="block mt-2 sm:mt-3">
                <span className="relative font-editorial italic font-normal text-[#B8955D]">
                  Our Commitment
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M0 8 Q50 0, 100 6 T200 4" stroke="#B8955D" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                  </svg>
                </span>
                <span className="text-[#B8955D]">.</span>
              </span>
            </h2>

            {/* Description with accent first letter */}
            <div className="space-y-4 mb-7 max-w-[540px]">
              <p className="font-sans text-[15px] sm:text-base lg:text-[17px] text-[#5A5A5A] leading-[1.75]">
                <span className="text-[#B8955D] font-semibold text-lg">F</span>or over two decades, Gwalior Stone has been transforming
                India's finest natural stones into timeless architectural
                masterpieces — exported to <span className="text-[#1A1A1A] font-medium">50+ countries</span> worldwide.
              </p>
              <p className="font-sans text-[15px] sm:text-base lg:text-[17px] text-[#5A5A5A] leading-[1.75]">
                From intricate jaali carvings to grand facade cladding,
                our artisans blend heritage techniques with modern precision
                to deliver stone solutions that stand the test of time.
              </p>
            </div>

            {/* Elegant quote */}
            <div className="relative mb-9 max-w-[500px]">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#B8955D] via-[#D4B978] to-[#B8955D]/30" />
              <p className="font-serif text-[15px] text-[#888] leading-relaxed italic pl-5">
                "Where centuries-old craftsmanship meets modern precision — every stone tells a story."
              </p>
            </div>

            {/* ── Animated Stat Counters ── */}
            <div className="flex items-stretch gap-0 mb-9 w-full max-w-[480px]">
              {[
                { value: countCountries, suffix: "+", label: "Countries", sub: "Global Reach" },
                { value: countVarieties, suffix: "+", label: "Varieties", sub: "Stone Range" },
                { value: countYears, suffix: "+", label: "Years", sub: "Experience" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 text-center py-4 ${i !== 2 ? "border-r border-[#E8E5DE]" : ""}`}
                >
                  <span className="block font-editorial text-2xl sm:text-3xl lg:text-[2.2rem] font-light text-[#1A1A1A] leading-none">
                    {stat.value}<span className="text-[#B8955D]">{stat.suffix}</span>
                  </span>
                  <span className="block mt-1.5 font-sans text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[#999] font-medium">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 mb-9">
              {[
                { icon: ShieldCheck, text: "ISO Certified" },
                { icon: Globe, text: "Global Export" },
                { icon: Gem, text: "Premium Quality" },
                { icon: Layers, text: "Heritage Craft" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="group/pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E5DE] text-xs font-medium text-[#7A7A7A] hover:border-[#B8955D]/50 hover:text-[#B8955D] hover:shadow-[0_4px_16px_rgba(245,214,62,0.1)] transition-all duration-300 cursor-default"
                >
                  <item.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/pill:scale-110" />
                  {item.text}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-4 overflow-hidden bg-[#FBC938] text-[#111111] font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] pl-8 pr-3.5 py-3.5 rounded-full border border-[#FBC938] shadow-[0_4px_20px_rgba(245,214,62,0.25)] hover:shadow-[0_12px_35px_rgba(245,214,62,0.4)] hover:-translate-y-0.5 transition-all duration-400 ease-out active:scale-[0.97] transform-gpu"
            >
              {/* Hover sweep effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#e3c434] to-[#FBC938] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Discover Our Story</span>
              <span className="relative z-10 w-9 h-9 rounded-full bg-black/10 border border-black/15 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111] group-hover:scale-105 group-hover:rotate-[-360deg]">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
