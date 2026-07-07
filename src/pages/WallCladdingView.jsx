// src/pages/products/MosaicStoneTilesView.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowRight, PhoneCall, ShieldCheck, Gem, Layers, ChevronRight, CheckCircle2, ZoomIn, Globe } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";

gsap.registerPlugin(ScrollTrigger);

/* ── Asset pool (swap for dedicated per-pattern photography when available) ── */
const HERO_IMG = "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-1.webp";

const TILE_COLS = 8;
const TILE_ROWS = 5;
const TILE_INDICES = Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => i);

const patterns = [
  { name: "Pattern 1", stone: "Wall Cladding", img: "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-1.webp", desc: "Unique and beautiful look for the interior as well as exterior wall cladding.", swatch: "#A9C4A0", type: "Cladding", complexity: "High", bestFor: "Feature Walls" },
  { name: "Pattern 2", stone: "Wall Cladding", img: "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-2.webp", desc: "Unique and beautiful look for the interior as well as exterior wall cladding.", swatch: "#4A6D7C", type: "Cladding", complexity: "Medium", bestFor: "Exteriors" },
  { name: "Pattern 3", stone: "Wall Cladding", img: "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-3.webp", desc: "Unique and beautiful look for the interior as well as exterior wall cladding.", swatch: "#C9A66B", type: "Cladding", complexity: "Low", bestFor: "Interiors" },
  { name: "Pattern 4", stone: "Wall Cladding", img: "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-stone-india-11.webp", desc: "Unique and beautiful look for the interior as well as exterior wall cladding.", swatch: "#8B8D8A", type: "Cladding", complexity: "High", bestFor: "Facades" },
  { name: "Pattern 5", stone: "Wall Cladding", img: "/img/product/Stone Products/Gwalior Stone/Wall Cladding/Patterns/wall-cladding-stone-india-12.webp", desc: "Unique and beautiful look for the interior as well as exterior wall cladding.", swatch: "#D9A441", type: "Cladding", complexity: "Medium", bestFor: "Pathways" },
];

const galleryImages = [
  "/img/product/Stone Products/Gwalior Stone/Wall Cladding/If you have been/wall-cladding-4.webp",
  "/img/product/Stone Products/Gwalior Stone/Wall Cladding/If you have been/wall-cladding-5.webp",
  "/img/product/Stone Products/Gwalior Stone/Wall Cladding/If you have been/wall-cladding-6.webp",
  "/img/product/Stone Products/Gwalior Stone/Wall Cladding/If you have been/wall-cladding-stone-india-13.webp",
  "/img/product/Stone Products/Gwalior Stone/Wall Cladding/If you have been/wall-cladding-stone-india-14.jpg",
];



const steps = [
  { title: "Stone Selection", body: "Trained field staff hand-select slabs for consistent color, grain, and durability before processing begins." },
  { title: "Precision Cutting", body: "Each piece is cut to exact dimensions and arranged into interlocking patterns for a seamless finished look." },
  { title: "Mesh-Backing", body: "Finished mosaics are mesh-backed on food-grade netting for fast, even installation on site." },
  { title: "Quality Inspection", body: "Every sheet passes a final hand inspection for color match, edge finish, and structural integrity." },
];

const LENS_SIZE = 180;
const ZOOM = 2.4;

const WallCladdingView = () => {
  const pageRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);

  const zoomRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [activePattern, setActivePattern] = useState(0);
  const [lens, setLens] = useState({ x: 0, y: 0, rectW: 0, rectH: 0, show: false });

  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Hero: tiles assemble into the image, then content fades in ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      ".mosaic-tile",
      { opacity: 0, scale: 0.25, rotate: () => gsap.utils.random(-30, 30) },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "power3.out", stagger: { each: 0.018, from: "random" } }
    ).fromTo(
      [heroBadgeRef.current, heroTitleRef.current, heroSubRef.current, heroCtaRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
      "-=0.3"
    );
    return () => tl.kill();
  }, []);

  /* ── Generic scroll reveals for the rest of the page ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-block").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" },
        });
      });
      gsap.utils.toArray(".split-left").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });
      gsap.utils.toArray(".split-right").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: 50 }, {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });

      // Parallax Gallery columns (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray(".parallax-col").forEach((col) => {
          const speed = parseFloat(col.getAttribute("data-speed") || "1");
          gsap.to(col, {
            y: speed * 150,
            ease: "none",
            scrollTrigger: {
              trigger: "#parallax-gallery",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);



  const handleLensMove = (e) => {
    const rect = zoomRef.current.getBoundingClientRect();
    setLens({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      rectW: rect.width,
      rectH: rect.height,
      show: true,
    });
  };

  const handleTouchMove = (e) => {
    if (!zoomRef.current) return;
    const rect = zoomRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setLens({ show: true, x, y, rectW: rect.width, rectH: rect.height });
  };

  return (
    <div ref={pageRef} className="bg-[#FAFAF8] min-h-[100svh] font-sans text-[#111]">

      {/* ══════════════════════════════════════
          1. HERO — tiles assemble into the image
      ══════════════════════════════════════ */}
      <section className="relative h-[100svh] min-h-[500px] sm:min-h-[600px] w-full overflow-hidden bg-[#111]">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
          <div
            className="grid gap-[2px] bg-black w-full h-full"
            style={{ gridTemplateColumns: `repeat(${TILE_COLS}, 1fr)`, gridTemplateRows: `repeat(${TILE_ROWS}, 1fr)` }}
          >
            {TILE_INDICES.map((i) => {
              const col = i % TILE_COLS;
              const row = Math.floor(i / TILE_COLS);
              return (
                <div
                  key={i}
                  className="mosaic-tile"
                  style={{
                    backgroundImage: `url('${HERO_IMG}')`,
                    backgroundSize: `${TILE_COLS * 100}% ${TILE_ROWS * 100}%`,
                    backgroundPosition: `${(col / (TILE_COLS - 1)) * 100}% ${(row / (TILE_ROWS - 1)) * 100}%`,
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-[#111]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-end sm:justify-center text-center px-4 sm:px-6 pb-20 sm:pb-0 max-w-5xl mx-auto">
          <div ref={heroBadgeRef} className="opacity-0 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse" />
            <span className="text-xs tracking-[0.2em] text-[#DFBA73] font-bold uppercase">Architectural Excellence</span>
          </div>

          <h1 ref={heroTitleRef} className="opacity-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
            Wall Cladding
          </h1>

          <p ref={heroSubRef} className="opacity-0 text-sm sm:text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10">
            Create a great warmth and natural feeling. An inevitable part of architectural works.
          </p>

          <div ref={heroCtaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto">
            <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:scale-105 hover:shadow-[0_0_40px_rgba(184,149,93,0.5)] transition-all duration-300 flex items-center gap-2">
              <PhoneCall size={18} /> Request Wholesale Quote
            </a>
            <a href="#patterns" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/30 text-white font-medium text-xs sm:text-sm hover:bg-white hover:text-black transition-colors backdrop-blur-sm flex items-center gap-2">
              Explore Patterns <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Fractured stone edge */}
        <svg
          className="absolute left-0 right-0 bottom-0 w-full z-20"
          height="56"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 L96,18 L188,34 L266,6 L344,28 L430,12 L512,36 L598,10 L676,30 L760,4 L842,26 L930,14 L1012,32 L1098,8 L1180,24 L1264,2 L1346,20 L1440,10 L1440,56 L0,56 Z"
            fill="#FFFFFF"
          />
        </svg>
      </section>

      {/* ══════════════════════════════════════
          2. INTRO & TRUST
      ══════════════════════════════════════ */}
      <section className="reveal-block py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="split-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111] leading-[1.2]">
              If you have been looking for the best quality <span className="text-[#B8955D] italic">Natural Stone</span>, you can trust Stone India.
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              Our wall cladding tiles are made from high-quality sandstone stones. They offer a unique and beautiful look for the interior as well as exterior wall cladding. The natural shine is the most important reason that enhances the appearance and it has become an inevitable part of architectural works.
            </p>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              If you use these wall cladding stones in your bedroom, you can achieve a great warmth and natural feeling. A blissful environment for the entire family can be created with our high-quality stones. Many architects and designers have been recommending our products and you can easily enhance the traditional aesthetic by effectively utilizing the unlimited possibilities of our products.
            </p>
            <div className="pt-4">
              <a href="tel:+919826058456" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#A88B5D] text-white font-medium text-sm tracking-wider hover:bg-[#8A7148] transition-colors duration-300">
                <PhoneCall size={18} /> +91 982 605 8456
              </a>
            </div>
          </div>
          <div className="split-right relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAFAF8] border border-[#EDEDE9] shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-center gap-4 sm:gap-5 py-6">
            {/* Fade edges for a premium look */}
            <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
            
            {/* Track 1: Slides Left */}
            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '40s' }}>
              {[
                "Mosaic-Stone-Tiles-23.webp", "mosaic-stone-tile-2.webp", "mosaic-stone-tile-4.webp", "Mosaic-Stone-Tiles-24.webp", "mosaic-stone-tile-1.webp",
                "Mosaic-Stone-Tiles-23.webp", "mosaic-stone-tile-2.webp", "mosaic-stone-tile-4.webp", "Mosaic-Stone-Tiles-24.webp", "mosaic-stone-tile-1.webp"
              ].map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={`/img/product/Stone Products/Gwalior Stone/Mosaic Stone Tiles/If you have been/${img}`} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Track 2: Slides Right */}
            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '50s', animationDirection: 'reverse' }}>
              {[
                "mosaic-stone-tile-3.jpg", "mosaic-stone-tile-5.webp", "Mosaic-Stone-Tiles-23.webp", "mosaic-stone-tile-1.webp", "mosaic-stone-tile-2.webp",
                "mosaic-stone-tile-3.jpg", "mosaic-stone-tile-5.webp", "Mosaic-Stone-Tiles-23.webp", "mosaic-stone-tile-1.webp", "mosaic-stone-tile-2.webp"
              ].map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={`/img/product/Stone Products/Gwalior Stone/Mosaic Stone Tiles/If you have been/${img}`} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Track 3: Slides Left */}
            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '45s' }}>
              {[
                "mosaic-stone-tile-4.webp", "Mosaic-Stone-Tiles-24.webp", "mosaic-stone-tile-5.webp", "mosaic-stone-tile-3.jpg", "Mosaic-Stone-Tiles-23.webp",
                "mosaic-stone-tile-4.webp", "Mosaic-Stone-Tiles-24.webp", "mosaic-stone-tile-5.webp", "mosaic-stone-tile-3.jpg", "Mosaic-Stone-Tiles-23.webp"
              ].map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={`/img/product/Stone Products/Gwalior Stone/Mosaic Stone Tiles/If you have been/${img}`} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2.1. MACRO TEXTURE ZOOM
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center reveal-block">
          <div className="split-left">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Up Close</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2] mb-6">
              Texture You Can <span className="text-[#B8955D] italic">Feel Through the Screen</span>
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light mb-5">
              Hover over the stone to inspect the grain, veining, and natural color shift up close —
              the same detail you'll find in every finished mosaic sheet.
            </p>
            <div className="flex items-center gap-2 text-[#B8955D] text-sm font-medium">
              <ZoomIn size={16} /> <span className="hidden lg:inline">Move your cursor over the image</span><span className="inline lg:hidden">Drag your finger to explore the texture</span>
            </div>
          </div>

          <div
            ref={zoomRef}
            onMouseMove={handleLensMove}
            onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => {
              handleTouchMove(e);
            }}
            className="split-right relative aspect-square rounded-3xl overflow-hidden shadow-2xl lg:cursor-none touch-none"
          >
            <img src={patterns[0].img} alt="Stone texture detail" className="w-full h-full object-cover" onLoad={(e) => {
              const r = e.target.getBoundingClientRect();
              setLens(l => ({ ...l, x: r.width/2, y: r.height/2, rectW: r.width, rectH: r.height }));
            }} />
            <div
                className={`absolute pointer-events-none rounded-full border-4 border-white shadow-2xl z-50 transition-opacity duration-300 ${lens.show ? "opacity-100" : "opacity-100 lg:opacity-0"}`}
                style={{
                  width: LENS_SIZE,
                  height: LENS_SIZE,
                  left: lens.x - LENS_SIZE / 2,
                  top: lens.y - LENS_SIZE / 2,
                  backgroundImage: `url('${patterns[0].img}')`,
                  backgroundSize: `${lens.rectW * ZOOM}px ${lens.rectH * ZOOM}px`,
                  backgroundPosition: `-${lens.x * ZOOM - LENS_SIZE / 2}px -${lens.y * ZOOM - LENS_SIZE / 2}px`,
                }}
              />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2.2. PATTERNS WIDE RANGE (TABBED SELECTOR)
      ══════════════════════════════════════ */}
      <section className="reveal-block py-20 sm:py-28 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Our Collection</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2] mb-6">
              We Offer A Wide Range Of <span className="text-[#B8955D] italic">Patterns</span>
            </h2>
            <p className="text-[#666] font-light max-w-2xl mx-auto leading-relaxed">
              Despite offering all these benefits, we are offering our products in a cost-effective manner and our existing clients describe our pricing as unbeatable. Our wall tiles are incredibly unique and we offer eco-friendly products to take care of the interests of our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {patterns.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActivePattern(i)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left flex-shrink-0 transition-all duration-300 ${
                    i === activePattern ? "border-[#B8955D] bg-[#B8955D]/5 shadow-md" : "border-[#EDEDE9] hover:border-[#B8955D]/40"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full border border-black/10 flex-shrink-0" style={{ backgroundColor: p.swatch }} />
                  <div>
                    <p className="font-serif font-bold text-[#111] whitespace-nowrap">{p.name}</p>
                    <p className="text-[12px] text-[#888] font-mono">{p.type}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl mb-6">
                {patterns.map((p, i) => (
                  <img
                    key={p.name}
                    src={p.img}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === activePattern ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <span className="text-white font-serif text-2xl lg:text-3xl block mb-2">{patterns[activePattern].name}</span>
                  <p className="text-white/80 text-sm font-light leading-relaxed max-w-xl">{patterns[activePattern].desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-[#EDEDE9] rounded-xl p-4 text-center">
                  <span className="block text-sm font-serif font-bold text-[#B8955D]">{patterns[activePattern].type}</span>
                  <span className="text-[11px] text-[#888] font-medium">Style</span>
                </div>
                <div className="bg-white border border-[#EDEDE9] rounded-xl p-4 text-center">
                  <span className="block text-sm font-serif font-bold text-[#B8955D]">{patterns[activePattern].complexity}</span>
                  <span className="text-[11px] text-[#888] font-medium">Complexity</span>
                </div>
                <div className="bg-white border border-[#EDEDE9] rounded-xl p-4 text-center">
                  <span className="block text-sm font-serif font-bold text-[#B8955D]">{patterns[activePattern].bestFor}</span>
                  <span className="text-[11px] text-[#888] font-medium">Best For</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════
          3. STAGGERED PARALLAX GALLERY
      ══════════════════════════════════════ */}
      <section id="parallax-gallery" className="py-24 sm:py-32 px-6 bg-[#111] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block" style={{
          background: 'linear-gradient(to bottom, #111 0%, transparent 10%, transparent 90%, #111 100%)'
        }} />
        
        <div className="max-w-7xl mx-auto relative z-0">
          <div className="text-center mb-16 md:mb-24 reveal-block">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#DFBA73] uppercase mb-4 font-mono">Inspiration</p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-white leading-[1.2]">
              See It In <span className="text-[#DFBA73] italic">Space</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 md:h-[1100px] md:overflow-visible">
            {/* Column 1 */}
            <div className="parallax-col flex flex-col gap-6 md:gap-10 md:translate-y-32" data-speed="-1.5">
              {[0, 3, 6].map(i => galleryImages[i]).filter(Boolean).map((src, i) => (
                <div key={i} className="group rounded-3xl overflow-hidden relative cursor-pointer shadow-2xl shrink-0">
                  <img src={src} alt="Gallery" className="w-full h-auto md:h-[450px] object-cover transform transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                    <span className="text-white border border-white/30 px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase backdrop-blur-md">View</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="parallax-col flex flex-col gap-6 md:gap-10 md:-translate-y-24" data-speed="1.2">
              {[1, 4].map(i => galleryImages[i]).filter(Boolean).map((src, i) => (
                <div key={i} className="group rounded-3xl overflow-hidden relative cursor-pointer shadow-2xl shrink-0">
                  <img src={src} alt="Gallery" className="w-full h-auto md:h-[550px] object-cover transform transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                    <span className="text-white border border-white/30 px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase backdrop-blur-md">View</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="parallax-col flex flex-col gap-6 md:gap-10 md:translate-y-20 sm:col-span-2 md:col-span-1" data-speed="-0.8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 md:gap-10">
                {[2, 5].map(i => galleryImages[i]).filter(Boolean).map((src, i) => (
                  <div key={i} className="group rounded-3xl overflow-hidden relative cursor-pointer shadow-2xl shrink-0">
                    <img src={src} alt="Gallery" className="w-full h-auto md:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                      <span className="text-white border border-white/30 px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase backdrop-blur-md">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* ══════════════════════════════════════
          6. EXPLORE MORE — Recommendations
      ══════════════════════════════════════ */}
      <section className="reveal-block py-24 sm:py-32 bg-white border-t border-b border-[#DFDDD8]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif text-[#222] mb-2 tracking-tight">
              Explore More
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif italic text-[#B4956C] ml-4 sm:ml-12 md:ml-32">
              Stone Products
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/[0.08]">
            {stoneProductsData.grid
              .filter(item => item.title !== "Wall Cladding")
              .slice(0, 8)
              .map((item, idx) => (
              <Link
                key={idx}
                to={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex flex-col items-center text-center group py-6 sm:py-12 px-3 sm:px-5 md:px-8 no-underline border-b border-black/[0.08] border-r border-r-black/[0.08] ${
                  (idx + 1) % 4 === 0 ? 'lg:border-r-0' : ''
                } ${
                  (idx + 1) % 2 === 0 ? 'max-lg:border-r-0' : ''
                } hover:bg-[#F4F3EF] transition-colors duration-700`}
              >
                <div className="relative w-full sm:w-[85%] md:w-[75%] aspect-[3/4] mb-4 sm:mb-8 overflow-hidden bg-[#DFDDD8] border border-black/5 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-[0.97] contrast-[0.95] group-hover:brightness-100 group-hover:contrast-100 saturate-[0.9] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-end justify-center pb-6">
                    <div className="px-6 py-2.5 border border-white/50 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-white font-semibold drop-shadow-sm">
                        Inquire
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="text-[10px] sm:text-[12px] md:text-[14px] font-serif text-[#111] uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-1 sm:mb-2 group-hover:text-[#B4956C] transition-colors duration-500">
                  {item.title}
                </h4>
                <div className="hidden sm:flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-4 h-[1px] bg-[#B4956C]/50" />
                  <p className="text-[8px] md:text-[9px] text-[#555] uppercase tracking-[0.3em] font-medium">
                    {item.desc}
                  </p>
                  <div className="w-4 h-[1px] bg-[#B4956C]/50" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. CRAFTING PROCESS — snap-scroll numbered cards
      ══════════════════════════════════════ */}
      <section className="reveal-block py-20 sm:py-28 px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Crafting Process</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2]">
              From Quarry to <span className="text-[#B8955D] italic">Finished Mosaic</span>
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {steps.map((s, i) => (
              <div key={s.title} className="relative snap-start flex-shrink-0 w-[80vw] sm:w-[320px] lg:w-auto bg-white border border-[#EDEDE9] rounded-3xl p-8 overflow-hidden">
                <span className="absolute -top-4 -right-2 text-[7rem] font-serif font-bold text-[#B8955D]/[0.06] leading-none select-none">
                  {`0${i + 1}`}
                </span>
                <div className="relative">
                  <span className="inline-block text-[11px] font-bold text-[#B8955D] bg-[#B8955D]/10 px-3 py-1 rounded-full tracking-widest font-mono mb-4">
                    STEP {`0${i + 1}`}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#111] mb-3">{s.title}</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed font-light">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. CTA BANNER — grout-line overlay
      ══════════════════════════════════════ */}
      <section id="contact" className="relative py-32 flex items-center justify-center overflow-hidden bg-[#111]">
        <div className="absolute inset-0 z-0">
          <img src={galleryImages[1]} alt="" className="w-full h-full object-cover opacity-25" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(223,186,115,0.06) 0px, rgba(223,186,115,0.06) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(223,186,115,0.06) 0px, rgba(223,186,115,0.06) 1px, transparent 1px, transparent 48px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <Gem size={44} className="text-[#B8955D] mb-8" />
          <h3 className="text-sm font-mono text-[#DFBA73] uppercase tracking-[0.3em] mb-4">Stone India</h3>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white mb-6 sm:mb-8">
            Elevate Your <span className="italic font-light">Interiors</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Available in bulk for wholesale buyers globally — the perfect choice for feature
            walls, bathrooms, and elegant exterior cladding.
          </p>
          <a href="mailto:info@stoneindia.co" className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-[#B8955D] hover:text-white transition-all duration-300 shadow-xl inline-flex items-center gap-2">
            Contact Us Today <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }
      `}</style>
    </div>
  );
};

export default WallCladdingView;
