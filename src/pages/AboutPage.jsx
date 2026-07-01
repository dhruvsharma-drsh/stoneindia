import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/ui/header-3";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────
   Animated Counter
──────────────────────────────────────────────────────────── */
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let start = 0;
          const step = target / (duration * 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 1000 / 60);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ────────────────────────────────────────────────────────────
   Typewriter hook
──────────────────────────────────────────────────────────── */
const useTypewriter = (words, speed = 90, pause = 1800) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => { setDisplayed(words[wordIdx].slice(0, charIdx)); }, [charIdx, wordIdx, words]);

  return displayed;
};

/* ────────────────────────────────────────────────────────────
   Main Component
──────────────────────────────────────────────────────────── */
const AboutPage = () => {
  const pageRef = useRef(null);
  const typed = useTypewriter(["Stone Processors.", "Stone Traders.", "Stone Exporters.", "Quality Crafters."], 80, 2000);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".hero-h1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 });

      // Scroll-triggered blocks
      gsap.utils.toArray(".reveal-block").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" },
          }
        );
      });

      // Stats cards stagger
      gsap.fromTo(".stat-card",
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Split sections
      gsap.utils.toArray(".split-left").forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
      gsap.utils.toArray(".split-right").forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: 50 }, {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-white min-h-screen font-sans">
      <Header />

      {/* ══════════════════════════════════════
          HERO — Centered, frostrek-style
      ══════════════════════════════════════ */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        {/* ── Animated background: CSS injected via style tag ── */}
        <style>{`
          @keyframes floatA {
            0%,100% { transform: translate(0,0) scale(1); }
            33%      { transform: translate(40px,-30px) scale(1.08); }
            66%      { transform: translate(-25px,20px) scale(0.95); }
          }
          @keyframes floatB {
            0%,100% { transform: translate(0,0) scale(1); }
            40%      { transform: translate(-50px,35px) scale(1.1); }
            70%      { transform: translate(30px,-20px) scale(0.92); }
          }
          @keyframes floatC {
            0%,100% { transform: translate(0,0) scale(1); }
            50%      { transform: translate(20px,40px) scale(1.06); }
          }
          @keyframes shimmerGrid {
            0%   { background-position: 0 0; }
            100% { background-position: 56px 56px; }
          }
          @keyframes orbitDot {
            0%   { transform: rotate(0deg) translateX(180px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
          }
          @keyframes orbitDot2 {
            0%   { transform: rotate(120deg) translateX(240px) rotate(-120deg); }
            100% { transform: rotate(480deg) translateX(240px) rotate(-480deg); }
          }
          @keyframes orbitDot3 {
            0%   { transform: rotate(240deg) translateX(140px) rotate(-240deg); }
            100% { transform: rotate(600deg) translateX(140px) rotate(-600deg); }
          }
          @keyframes pulseFade {
            0%,100% { opacity: 0.3; transform: scale(1); }
            50%      { opacity: 0.7; transform: scale(1.15); }
          }
        `}</style>

        {/* ── Animated Grid overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,149,93,0.07) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(184,149,93,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            animation: "shimmerGrid 6s linear infinite",
          }}
        />

        {/* ── Floating blob A — top-left warm gold ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 480,
            height: 480,
            top: "-80px",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(184,149,93,0.22) 0%, rgba(184,149,93,0.06) 55%, transparent 75%)",
            animation: "floatA 9s ease-in-out infinite",
            filter: "blur(2px)",
          }}
        />

        {/* ── Floating blob B — right-center ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "10%",
            right: "-120px",
            background:
              "radial-gradient(circle, rgba(210,175,117,0.18) 0%, rgba(184,149,93,0.05) 55%, transparent 75%)",
            animation: "floatB 12s ease-in-out infinite",
            filter: "blur(4px)",
          }}
        />

        {/* ── Floating blob C — bottom-center subtle ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 360,
            height: 360,
            bottom: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(184,149,93,0.14) 0%, transparent 65%)",
            animation: "floatC 10s ease-in-out infinite",
            filter: "blur(8px)",
          }}
        />

        {/* ── Orbiting dots ── */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#B8955D",
              opacity: 0.45,
              position: "absolute",
              animation: "orbitDot 18s linear infinite",
            }}
          />
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#C5A880",
              opacity: 0.35,
              position: "absolute",
              animation: "orbitDot2 24s linear infinite",
            }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#947444",
              opacity: 0.3,
              position: "absolute",
              animation: "orbitDot3 14s linear infinite",
            }}
          />
        </div>

        {/* ── Pulsing centre radial glow ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: 700,
            height: 340,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(ellipse, rgba(184,149,93,0.10) 0%, transparent 65%)",
            animation: "pulseFade 5s ease-in-out infinite",
          }}
        />

        {/* ── Bottom gradient fade to white ── */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B8955D]/40 bg-[#B8955D]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#B8955D] animate-pulse" />
            <span className="text-[11px] tracking-[0.22em] text-[#B8955D] font-semibold uppercase">
              25+ Years of Excellence · Natural Stone Leaders
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-h1 text-[2.8rem] sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[1.08] tracking-tight mb-6">
            India's Premier
            <br />
            <span className="relative inline-block">
              <span className="text-[#B8955D]">{typed}</span>
              <span className="text-[#B8955D] animate-pulse">|</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub text-base sm:text-lg text-[#666] max-w-2xl mx-auto leading-relaxed">
            STONE INDIA processes and exports premium Gwalior &amp; Kota stones — Sandstone,
            Limestone, Slate, Granite and more — to clients across the world with
            uncompromising quality and decades of expertise.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR — frostrek style, colored numbers
      ══════════════════════════════════════ */}
      <section className="stats-row py-10 border-y border-[#EDEDE9]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#EDEDE9]">
          {[
            { value: 25, suffix: "+", label: "Years of Experience", color: "#B8955D" },
            { value: 50,  suffix: "+", label: "Countries Exported",  color: "#2E7D52" },
            { value: 200, suffix: "+", label: "Stone Varieties",     color: "#C0392B" },
            { value: 100, suffix: "%", label: "Quality Assured",     color: "#1565C0" },
          ].map((s, i) => (
            <div key={i} className="stat-card bg-white px-8 py-9 flex flex-col items-center text-center">
              <span className="text-4xl sm:text-5xl font-bold leading-none mb-2" style={{ color: s.color }}>
                <Counter target={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[13px] text-[#777] font-medium tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT US — Split: text left, image right
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <div className="split-left">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">About Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-[1.2] mb-6">
              A Comprehensive Range of{" "}
              <span className="relative">
                <span className="text-[#B8955D]">Gwalior &amp; Kota</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#B8955D]/40"
                />
              </span>{" "}
              Stones
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.85] mb-5">
              STONE INDIA is one of the prominent names engaged in offering a comprehensive
              range of Gwalior &amp; Kota stones. We are also one of the leading Natural Stone
              processors and traders in India who process and export a variety of Indian
              stone-like Sandstone, Limestone, Slate, Mosaic, Pebbles, circles, Stone
              Palisade, granite, etc.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.85]">
              These stones are processed in our manufacturing units and are made available
              in various finishes like natural, sawn, honed polished, sandblasted, tumbled,
              calibrated, and other finishes that are in demand. These stones are processed
              either by hand or, by machines producing exceptional quality hand-cut or,
              machine-cut edges which can then be used for paving, flooring, walling, and
              wall-cladding, etc.
            </p>

            {/* Finish tags */}
            <div className="flex flex-wrap gap-2 mt-7">
              {["Natural","Sawn","Honed Polished","Sandblasted","Tumbled","Calibrated"].map(f => (
                <span key={f} className="px-3 py-1.5 text-[12px] font-medium rounded-full border border-[#B8955D]/30 text-[#B8955D] bg-[#B8955D]/5">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right — image mosaic */}
          <div className="split-right grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-2xl row-span-2 h-64 sm:h-auto">
              <img src="img/about_quarry_hero.png" alt="Stone quarry operations" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-[11px] font-semibold tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  Quarry Operations
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl h-36">
              <img src="img/gwalior_mint.png" alt="Gwalior mint stone" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden rounded-2xl h-36">
              <img src="img/kota_blue.png" alt="Kota blue stone" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE ARE — image left, text right
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — image */}
          <div className="split-left relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="img/about_showroom.png"
                alt="Stone India showroom and experience"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-4 sm:-right-8 bg-white rounded-2xl shadow-xl border border-[#EDEDE9] px-6 py-4">
              <span className="block text-3xl font-bold text-[#B8955D]">25+</span>
              <span className="text-[12px] text-[#777] font-medium">Years of Trust</span>
            </div>
          </div>

          {/* Right — text */}
          <div className="split-right">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-[1.2] mb-6">
              Building Strong Relations{" "}
              <span className="text-[#B8955D]">Across India</span>
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.85] mb-5">
              We have more than 25 years of experience as a Natural Stone processors and
              traders. This has helped us in building very strong relations with the various
              factories and suppliers all over India. Thus we can source any stone at a very
              low-profit margin for our customers. We are inclined towards understanding your
              requirements and then fulfilling them to your satisfaction.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.85] mb-8">
              We do not confine ourselves to taking orders and delivering them. Instead, we
              believe in a long-term relationship with you and hence are always available to
              help you in the selection of the right material. We give you complete peace of
              mind by taking care of aspects like quality control, timely deliveries, fast
              and correct communications, assistance with shipments, and immediate responses
              to your queries.
            </p>

            {/* Commitment list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Quality Control",
                "Timely Deliveries",
                "Fast Communications",
                "Shipment Assistance",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#B8955D]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#B8955D]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium text-[#444]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR TEAM — card on white
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Our Team</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-[1.2] mb-6">
                Dedicated Professionals,{" "}
                <span className="text-[#B8955D]">Exceptional Results</span>
              </h2>
              <p className="text-[15px] text-[#555] leading-[1.85]">
                Our Organization is a closely-knit group of dedicated professionals who are
                highly motivated and are always ready for any challenges that they might
                encounter. We believe in providing excellent quality stones at competitive
                prices along with impeccable services to our customers, thus building a
                long-term relationship.
              </p>
            </div>

            {/* Image + stat cards */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="img/stone_craft.png"
                  alt="Stone India professional team"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "50+", l: "Team Members" },
                  { v: "100%", l: "Satisfaction" },
                  { v: "24/7", l: "Support" },
                ].map(s => (
                  <div key={s.l} className="bg-[#FAFAF8] border border-[#EDEDE9] rounded-xl p-4 text-center">
                    <span className="block text-xl font-bold text-[#B8955D]">{s.v}</span>
                    <span className="text-[11px] text-[#888] font-medium mt-0.5 block">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WAREHOUSING & PACKAGING — 3-col cards
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="reveal-block text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Warehousing &amp; Packaging</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-[1.2] mb-4">
              Global <span className="text-[#B8955D]">Export Network</span>
            </h2>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto leading-relaxed">
              All stones that are produced and processed in North India are normally exported
              from the Mundra Ports while the stones that are processed in Southern India are
              exported from the Chennai port in Tamil Nadu or from Mumbai port in Maharashtra.
              Just as we ensure that we do not compromise our quality we are also very
              particular about the delivery time and schedules.
            </p>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto leading-relaxed mt-4">
              Since our experience and evidence show that these ports are extremely fast in
              their dispatch processing activities and are very efficient, we decided towards
              using these ports for our exports.
            </p>
          </div>

          {/* 3 Port Cards */}
          <div className="reveal-block grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { port: "Mundra Port", region: "North India", state: "Gujarat", desc: "Primary export hub for stones processed in Northern India." },
              { port: "Chennai Port", region: "South India", state: "Tamil Nadu", desc: "Key export channel for Southern India processed stones." },
              { port: "Mumbai Port", region: "West India", state: "Maharashtra", desc: "Alternate fast-dispatch port for Western region exports." },
            ].map((p, i) => (
              <div key={i} className="group bg-white border border-[#EDEDE9] rounded-2xl p-7 hover:border-[#B8955D]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#B8955D]/10 flex items-center justify-center mb-5 group-hover:bg-[#B8955D] transition-colors duration-300">
                  <svg className="w-5 h-5 text-[#B8955D] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1 group-hover:text-[#B8955D] transition-colors duration-300">{p.port}</h3>
                <p className="text-[12px] text-[#B8955D] font-semibold uppercase tracking-wider mb-3">{p.region} · {p.state}</p>
                <p className="text-[14px] text-[#666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SOURCES OF STONES — Timeline style (frostrek "Our Journey")
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="reveal-block text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Sources of Stones</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-[1.2]">
              Directly from India's{" "}
              <span className="text-[#B8955D]">Finest Quarries</span>
            </h2>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto mt-4 leading-relaxed">
              These Natural stones are sourced from various quarries all over India. This is
              done by our trained field staff who primarily control the production and quality
              of these stones that are procured.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[#EDEDE9] sm:-translate-x-px" />

            {[
              {
                step: "01",
                title: "Quarry Selection",
                body: "Trained field staff identify and evaluate quarries across India for premium stone quality and consistency.",
                img: "img/about_hero_quarry.png",
                side: "right",
              },
              {
                step: "02",
                title: "Controlled Production",
                body: "Since producing all varieties in one location isn't feasible, we source from factories near each quarry — ensuring minimal transportation cost and fresher stone.",
                img: "img/stone_villa.png",
                side: "left",
              },
              {
                step: "03",
                title: "Strict Quality Inspection",
                body: "In every case, we take extra care to ensure that the stones procured are exceptional in quality and meet our standards. Our field staff ensures we do not compromise.",
                img: "img/marble_texture.png",
                side: "right",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal-block relative flex flex-col sm:flex-row gap-8 sm:gap-0 mb-16 last:mb-0 ${
                  item.side === "left" ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Step node */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-[11px] sm:-translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[#B8955D] border-4 border-white shadow-md z-10" />

                {/* Text card */}
                <div className={`sm:w-[45%] pl-14 sm:pl-0 ${item.side === "right" ? "sm:pr-12" : "sm:pl-12"}`}>
                  <div className="bg-[#FAFAF8] border border-[#EDEDE9] rounded-2xl p-6 hover:border-[#B8955D]/30 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-bold text-[#B8955D] bg-[#B8955D]/10 px-2.5 py-1 rounded-full tracking-widest">
                        STEP {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                    <p className="text-[14px] text-[#666] leading-relaxed">{item.body}</p>
                  </div>
                </div>

                {/* Image */}
                <div className={`hidden sm:block sm:w-[45%] ${item.side === "right" ? "sm:pl-12" : "sm:pr-12"}`}>
                  <div className="overflow-hidden rounded-2xl border border-[#EDEDE9]">
                    <img src={item.img} alt={item.title} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
