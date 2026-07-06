import React, { useRef, useEffect, useState, useCallback } from "react";
import "./AboutWave.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/ui/header-3";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* Fractured stone edge — sits at the top of the scrolling content, pointing upward */
const FractureEdge = ({ fill = '#FFFFFF' }) => (
  <svg
    className="absolute left-0 right-0 -top-[55px] w-full"
    height="56"
    viewBox="0 0 1440 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,40 L96,18 L188,34 L266,6 L344,28 L430,12 L512,36 L598,10 L676,30 L760,4 L842,26 L930,14 L1012,32 L1098,8 L1180,24 L1264,2 L1346,20 L1440,10 L1440,56 L0,56 Z"
      fill={fill}
    />
  </svg>
);

/* ── Scroll-driven vaporize style calculator ── */
const getVaporizeStyle = (scrollProgress, staggerStart = 0, staggerEnd = 1) => {
  const localProgress = Math.min(1, Math.max(0, (scrollProgress - staggerStart) / (staggerEnd - staggerStart)));
  const eased = localProgress < 0.5
    ? 4 * localProgress * localProgress * localProgress
    : 1 - Math.pow(-2 * localProgress + 2, 3) / 2;

  return {
    opacity: 1 - eased,
    transform: `translateY(${-eased * 60}px) scale(${1 + eased * 0.08})`,
    filter: `blur(${eased * 12}px)`,
    transition: 'none',
    willChange: 'opacity, transform, filter',
  };
};

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

const facilities = [
  {
    id: "01",
    label: "Processing Unit",
    title: "State-of-the-Art Stone Processing",
    body: "Our Gwalior-based processing unit is equipped with advanced CNC bridge saws, edge-profiling machines, and waterjet cutters that handle every stone variety with surgical precision — delivering hand-cut and machine-cut edges of exceptional quality.",
    img: "img/infra_cutting.png",
    tags: ["CNC Bridge Saws", "Waterjet Cutting", "Edge Profiling", "Surface Finishing"],
  },
  {
    id: "02",
    label: "Quality Control",
    title: "Rigorous Multi-Stage Inspection",
    body: "Every stone batch passes through our dedicated quality inspection zone before dispatch. Trained inspectors check for dimensional accuracy, surface finish, colour consistency, and structural integrity — ensuring zero compromise on standards.",
    img: "img/infra_quality.png",
    tags: ["Dimensional Accuracy", "Finish Grading", "Colour Matching", "Structural Testing"],
  },
  {
    id: "03",
    label: "Warehousing",
    title: "Large-Scale Storage & Inventory",
    body: "Our expansive warehouse facilities in Northern India safely store thousands of tonnes of finished and semi-finished stone slabs, ready for swift dispatch. Organised rack systems ensure zero damage and quick order fulfilment.",
    img: "img/infra_warehouse.png",
    tags: ["Slab Racking Systems", "Inventory Management", "Climate-Adapted Storage", "Swift Dispatch"],
  },
  {
    id: "04",
    label: "Packaging",
    title: "Export-Grade Packaging",
    body: "Stones are packed in seasoned wooden crates with foam-padded interiors, ensuring zero damage during transit. Our export-grade packaging meets international shipping standards for sea freight, ensuring safe delivery to all ports worldwide.",
    img: "img/infra_packaging.png",
    tags: ["Wooden Crating", "Foam Padding", "Sea-Freight Standards", "Custom Pack Sizes"],
  },
];

/* ────────────────────────────────────────────────────────────
   Main Component
──────────────────────────────────────────────────────────── */
const AboutPage = () => {
  const pageRef = useRef(null);
  const typed = useTypewriter(["Stone Processors.", "Stone Traders.", "Stone Exporters.", "Quality Crafters."], 80, 2000);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const dissolveDistance = viewportHeight * 0.6;
    const progress = Math.min(1, Math.max(0, scrollY / dissolveDistance));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
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
    <div ref={pageRef} className="min-h-screen font-sans">
      <Header />

      {/* ══════════════════════════════════════
          FIXED HERO — Stays in place while content scrolls over it
      ══════════════════════════════════════ */}
      <div className="fixed inset-0 w-full h-[100svh] flex flex-col justify-end overflow-hidden z-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="img/about_hero_premium.png"
            alt="About Stone India"
            className="w-full h-full object-cover brightness-[0.55] contrast-[0.9] grayscale-[15%] motion-safe:animate-[projectHeroIn_1.4s_ease-out]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/60 to-[#0A0A08]/10" />
        </div>

        {/* Hero Content — each element vaporizes on scroll with staggered timing */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32 pt-24 sm:pt-32">
          
          {/* Back button — dissolves first (0.0 → 0.4) */}
          <div style={getVaporizeStyle(scrollProgress, 0.0, 0.4)}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium mb-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73] rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 shadow-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Badges — dissolves next (0.1 → 0.6) */}
          <div 
            className="flex flex-wrap gap-3 mb-6"
            style={getVaporizeStyle(scrollProgress, 0.1, 0.6)}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-[#DFBA73] uppercase">
              25+ Years of Excellence
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-white uppercase">
              Natural Stone Leaders
            </span>
          </div>

          {/* Main Headline — dissolves late (0.3 → 0.8) */}
          <h1 
            className="text-[2.2rem] sm:text-5xl lg:text-[5.5rem] font-bold text-white leading-[1.08] tracking-tight mb-6 sm:mb-8 drop-shadow-lg max-w-4xl"
            style={getVaporizeStyle(scrollProgress, 0.3, 0.8)}
          >
            India's Premier
            <br />
            <span className="text-[#DFBA73]">{typed}</span>
            <span className="text-[#DFBA73] animate-pulse">|</span>
          </h1>

          {/* Subtext and stats — dissolves last (0.5 → 1.0) */}
          <div 
            className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between border-t border-white/10 pt-8"
            style={getVaporizeStyle(scrollProgress, 0.5, 1.0)}
          >
            <p className="text-white/70 max-w-xl text-sm leading-relaxed">
              STONE INDIA processes and exports premium Gwalior &amp; Kota stones — Sandstone,
              Limestone, Slate, Granite and more — to clients across the world with
              uncompromising quality and decades of expertise.
            </p>
            <div className="flex gap-6 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#DFBA73]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-white/90 text-sm font-medium">Global Exports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SCROLLING CONTENT — Slides up over the hero
      ══════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-white mt-[100vh] rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <FractureEdge fill="#ffffff" />

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
          SOURCES OF STONES — Timeline style (frostrek "Our Journey")
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 pb-40">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="reveal-block text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Sources of Stones</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111] leading-[1.12]">
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
      {/* ═══════════════════════════════════════════════════════
          FACILITY TABS — Interactive, frostrek-phase-style
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-white border-y border-[#EDEDE9]">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-block text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-3">Our Facilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Inside Our <span className="text-[#B8955D]">Production World</span>
            </h2>
          </div>

          {/* Tab layout — left list, right detail panel */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left: Tab buttons */}
            <div className="lg:w-72 flex-shrink-0 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {facilities.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(i)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink w-48 lg:w-full ${
                    activeTab === i
                      ? "bg-[#B8955D]/8 border-[#B8955D]/40 shadow-md"
                      : "bg-[#FAFAF8] border-[#EDEDE9] hover:border-[#B8955D]/25"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    activeTab === i ? "bg-[#B8955D] text-white" : "bg-[#EDEDE9] text-[#888]"
                  }`}>
                    <span className="text-[11px] font-bold tracking-wider">{f.id}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-wider font-semibold mb-0.5 transition-colors ${
                      activeTab === i ? "text-[#B8955D]" : "text-[#AAA]"
                    }`}>Phase {f.id}</span>
                    <span className={`text-[13px] font-semibold transition-colors ${
                      activeTab === i ? "text-[#1A1A1A]" : "text-[#555]"
                    }`}>{f.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Detail panel */}
            <div className="flex-1 bg-[#FAFAF8] border border-[#EDEDE9] rounded-3xl overflow-hidden shadow-sm">
              {facilities.map((f, i) => (
                <div
                  key={f.id}
                  className={`${activeTab === i ? "block tab-image-in" : "hidden"}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56 sm:h-72 lg:h-80">
                    <img
                      src={f.img}
                      alt={f.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#B8955D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Phase {f.id} — {f.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 sm:p-9">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4">{f.title}</h3>
                    <p className="text-[15px] text-[#555] leading-relaxed mb-6">{f.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {f.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#B8955D]/8 border border-[#B8955D]/20 text-[#B8955D]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESS TIMELINE — The Wave Journey Section
      ═══════════════════════════════════════════════════════ */}
      <section className="journey pb-20">
        {/* Background Decor */}
        <div className="journey__bg-grid"></div>
        <div className="journey__corner-decor hidden md:block">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
            <g stroke="rgba(184, 149, 93, 0.12)" strokeWidth="1.5">
              <circle cx="800" cy="150" r="60" />
              <circle cx="800" cy="150" r="110" />
              <circle cx="800" cy="150" r="160" />
              <circle cx="800" cy="150" r="210" />
              <circle cx="800" cy="150" r="260" />
              <circle cx="800" cy="150" r="310" />
            </g>
            <g fill="rgba(184, 149, 93, 0.4)">
              {/* Carefully calculated scattered dots on the half-circles */}
              <circle cx="740" cy="150" r="2.5" />
              <circle cx="750" cy="248" r="2.5" />
              <circle cx="687" cy="263" r="2.5" />
              <circle cx="651" cy="299" r="2.5" />
              <circle cx="616" cy="344" r="2.5" />
              <circle cx="581" cy="369" r="2.5" />
              <circle cx="800" cy="360" r="2.5" />
              <circle cx="800" cy="460" r="2.5" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 journey__container">
          {/* Header */}
          <div className="journey__header reveal-block mb-16 text-center mx-auto">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              From <span className="text-[#B8955D]">Quarry</span> to Your Door
            </h2>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto mt-4 leading-relaxed">
              Our streamlined end-to-end process ensures every stone you receive meets our
              exacting standards — from the quarry face to your project site.
            </p>
          </div>

          {/* Wave Content Area - Scrollable on mobile/tablet */}
          <div className="journey__wave-wrapper reveal-block overflow-x-auto pb-4">
            <div className="min-w-[1100px] lg:min-w-0">
              {/* The mathematical SVG wave */}
              <div className="journey__wave-bg">
                <svg viewBox="0 0 1500 200" preserveAspectRatio="none" width="100%" height="100%">
                {/* Drop shadow / glow */}
                <filter id="up-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#B8955D" floodOpacity="0.4" />
                </filter>

                {/* Flat start + Going Up (01 to 02) */}
                <path
                  d="M 40,180 L 125,180 C 250,180 250,20 375,20"
                  fill="none"
                  stroke="#B8955D"
                  strokeWidth="2.5"
                  filter="url(#up-shadow)"
                  opacity="1"
                />

                {/* Going Down (02 to 03) */}
                <path
                  d="M 375,20 C 500,20 500,180 625,180"
                  fill="none"
                  stroke="#B8955D"
                  strokeWidth="2"
                  opacity="0.4"
                />

                {/* Going Up (03 to 04) */}
                <path
                  d="M 625,180 C 750,180 750,20 875,20"
                  fill="none"
                  stroke="#B8955D"
                  strokeWidth="2.5"
                  filter="url(#up-shadow)"
                  opacity="1"
                />

                {/* Going Down (04 to 05) */}
                <path
                  d="M 875,20 C 1000,20 1000,180 1125,180"
                  fill="none"
                  stroke="#B8955D"
                  strokeWidth="2"
                  opacity="0.4"
                />

                {/* Going Up (05 to 06) */}
                <path
                  d="M 1125,180 C 1250,180 1250,20 1375,20"
                  fill="none"
                  stroke="#B8955D"
                  strokeWidth="2.5"
                  filter="url(#up-shadow)"
                  opacity="1"
                />

                {/* Glowing filter for the moving dots */}
                <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Flowing animated dots */}
                <circle r="5" fill="#B8955D" filter="url(#dot-glow)">
                  <animateMotion dur="18s" begin="0s" repeatCount="indefinite" path="M 40,180 L 125,180 C 250,180 250,20 375,20 C 500,20 500,180 625,180 C 750,180 750,20 875,20 C 1000,20 1000,180 1125,180 C 1250,180 1250,20 1375,20" />
                  <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0; 0.05; 0.5; 0.95; 1" dur="18s" begin="0s" repeatCount="indefinite" />
                </circle>

                <circle r="5" fill="#B8955D" filter="url(#dot-glow)">
                  <animateMotion dur="18s" begin="-6s" repeatCount="indefinite" path="M 40,180 L 125,180 C 250,180 250,20 375,20 C 500,20 500,180 625,180 C 750,180 750,20 875,20 C 1000,20 1000,180 1125,180 C 1250,180 1250,20 1375,20" />
                  <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0; 0.05; 0.5; 0.95; 1" dur="18s" begin="-6s" repeatCount="indefinite" />
                </circle>

                <circle r="5" fill="#B8955D" filter="url(#dot-glow)">
                  <animateMotion dur="18s" begin="-12s" repeatCount="indefinite" path="M 40,180 L 125,180 C 250,180 250,20 375,20 C 500,20 500,180 625,180 C 750,180 750,20 875,20 C 1000,20 1000,180 1125,180 C 1250,180 1250,20 1375,20" />
                  <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0; 0.05; 0.5; 0.95; 1" dur="18s" begin="-12s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            {/* Grid overlay containing nodes and text */}
            <div className="journey__grid">
              {[
                {
                  num: 1,
                  title: 'Quarry\nSourcing',
                  desc: "Field teams select premium quarry blocks evaluating grain and finish suitability.",
                  icon: (
                    <span className="text-2xl">⛏️</span>
                  )
                },
                {
                  num: 2,
                  title: 'Raw\nProcessing',
                  desc: 'Blocks are transported where CNC saws calibrate slabs to precise specs.',
                  icon: (
                    <span className="text-2xl">🔩</span>
                  )
                },
                {
                  num: 3,
                  title: 'Surface\nFinishing',
                  desc: 'Slabs pass through finish lines based on exact order specifications.',
                  icon: (
                    <span className="text-2xl">✨</span>
                  )
                },
                {
                  num: 4,
                  title: 'Quality\nInspection',
                  desc: "Every batch goes through multi-point inspection and structural testing.",
                  icon: (
                    <span className="text-2xl">🔬</span>
                  )
                },
                {
                  num: 5,
                  title: 'Export\nPackaging',
                  desc: "Approved stones are packed in foam-padded seasoned wooden crates.",
                  icon: (
                    <span className="text-2xl">📦</span>
                  )
                },
                {
                  num: 6,
                  title: 'Global\nDelivery',
                  desc: "Dispatched via India's fastest ports for customs clearance in 50+ countries.",
                  icon: (
                    <span className="text-2xl">🚢</span>
                  )
                }
              ].map((step, index) => {
                const isCrest = index % 2 !== 0; // 0, 2, 4 are troughs. 1, 3, 5 are crests.
                return (
                  <div key={step.num} className="journey__col group cursor-pointer">
                    {/* Background Number */}
                    <div className={`journey__bg-number ${isCrest ? 'journey__bg-number--low' : 'journey__bg-number--high'}`}>
                      0{step.num}
                    </div>

                    {/* Node Area */}
                    <div className="journey__node-area">
                      <div className={`journey__icon-circle transition-all duration-500 group-hover:scale-110 group-hover:border-[#B8955D]/40 group-hover:shadow-[0_12px_32px_rgba(184,149,93,0.3)] ${isCrest ? 'journey__icon-circle--top' : 'journey__icon-circle--bottom'}`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="journey__text-area relative z-10 bg-white/60 lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none border lg:border-none border-[#EDEDE9]/50 transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="journey__step-title transition-colors duration-300 group-hover:text-[#B8955D]">
                        {step.title.split('\n').map((line, i) => (
                          <span key={i}>{line}{i < step.title.split('\n').length - 1 && <br className="hidden lg:block" />}</span>
                        ))}
                      </h3>
                      <div className="journey__step-rule hidden lg:block transition-all duration-500 group-hover:w-16"></div>
                      <p className="journey__step-desc">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ═══════════════════════════════════════════════════════
          IMAGE GALLERY STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-[#FAFAF8] border-t border-[#EDEDE9]">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-block text-center mb-10">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-2">Our Facility</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">A Glimpse Inside</h2>
          </div>
          <div className="reveal-block grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { img: "img/infra_cutting.png", cap: "CNC Cutting" },
              { img: "img/stone_craft.png", cap: "Stone Crafting" },
              { img: "img/infra_warehouse.png", cap: "Warehousing" },
              { img: "img/infra_packaging.png", cap: "Packaging" },
            ].map((g, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer">
                <img
                  src={g.img}
                  alt={g.cap}
                  className="w-full h-40 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-[13px] font-semibold">{g.cap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 max-w-5xl mx-auto px-6 text-center">
          <div className="reveal-block bg-gradient-to-br from-[#B8955D]/8 via-[#FAFAF8] to-white border border-[#B8955D]/20 rounded-3xl px-10 py-16 shadow-sm">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Ready to Order?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 leading-[1.2]">
              Premium Stone,{" "}
              <span className="text-[#B8955D]">Precision Delivered</span>
            </h2>
            <p className="text-[15px] text-[#666] max-w-xl mx-auto leading-relaxed mb-10">
              Our infrastructure is designed to handle bulk orders, custom specifications,
              and time-sensitive shipments — with quality guaranteed at every step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#B8955D] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Request a Quote
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-[#EDEDE9] text-[#555] font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:border-[#B8955D]/40 hover:text-[#B8955D] transition-all duration-300 hover:-translate-y-1"
              >
                Learn About Us
              </Link>
            </div>
          </div>
      </section>

      <Footer />
      
      {/* End of scrolling content overlay */}
      </div>
    </div>
  );
};

export default AboutPage;
