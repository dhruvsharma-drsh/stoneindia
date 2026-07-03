import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowRight, PhoneCall, ShieldCheck, Gem, Layers, ChevronRight, CheckCircle2, ZoomIn, Globe } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = "/img/product/Stone Products/Mint Stone Blocks/img1.png";
const TEXTURE_IMG = "/img/product/Stone Products/Mint Stone Blocks/img2.png";
const CTA_IMG = "/img/product/Stone Products/Mint Stone Blocks/img3.png";

const TILE_COLS = 8;
const TILE_ROWS = 5;
const TILE_INDICES = Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => i);

const galleryImages = [
  "/img/product/Stone Products/Mint Stone Blocks/img1.png",
  "/img/product/Stone Products/Mint Stone Blocks/img2.png",
  "/img/product/Stone Products/Mint Stone Blocks/img3.png",
  "/img/product/Stone Products/Mint Stone Blocks/img4.png",
  "/img/product/Stone Products/Mint Stone Blocks/img5.png",
  "/img/product/Stone Products/Mint Stone Blocks/img1.png",
];

const featuresList = [
  { text: "Supreme finish" },
  { text: "High durability" },
  { text: "Uniform grain size" },
  { text: "Appealing shades" },
  { text: "Ornamental application" },
  { text: "Economical price" },
];

const steps = [
  { title: "Premium Selection", body: "We use high-grade materials and perform rigorous quality checks to ensure the potential of our supplied sandstone." },
  { title: "Precision Quarrying", body: "Mint sandstone blocks made in Madhya Pradesh provide a beautiful natural look with a mixture of colors." },
  { title: "Natural Finishing", body: "We supply Gwalior Mint Stone blocks in their natural shades without any artificial agents to fade." },
  { title: "Quality Inspection", body: "Every piece has its specific look and undergoes inspection to ensure dense, strong, and acid-resistant properties." },
];

const LENS_SIZE = 180;
const ZOOM = 2.4;

const MintStoneBlocksView = () => {
  const pageRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);

  const zoomRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [lens, setLens] = useState({ x: 0, y: 0, rectW: 0, rectH: 0, show: false });

  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Hero Animation ── */
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

  /* ── Generic scroll reveals ── */
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

  return (
    <div ref={pageRef} className="bg-[#FAFAF8] min-h-screen font-sans text-[#111]">

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#111]">
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

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
          <div ref={heroBadgeRef} className="opacity-0 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse" />
            <span className="text-xs tracking-[0.2em] text-[#DFBA73] font-bold uppercase">Architectural Excellence</span>
          </div>

          <h1 ref={heroTitleRef} className="opacity-0 text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-6 drop-shadow-2xl">
            Mint Stone Blocks
          </h1>

          <p ref={heroSubRef} className="opacity-0 text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Dense, strong, and visually appealing natural blocks for discerning architects and builders.
          </p>

          <div ref={heroCtaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-bold text-sm tracking-wider uppercase hover:scale-105 hover:shadow-[0_0_40px_rgba(184,149,93,0.5)] transition-all duration-300 flex items-center gap-2">
              <PhoneCall size={18} /> Request Wholesale Quote
            </a>
            <a href="#patterns" className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-black transition-colors backdrop-blur-sm flex items-center gap-2">
              Explore More <ArrowRight size={16} />
            </a>
          </div>
        </div>

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

      {/* 2. INTRO & TRUST */}
      <section className="reveal-block py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="split-left space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111] leading-[1.2]">
              If you have been looking for the best quality <span className="text-[#B8955D] italic">Natural Stone</span>, you can trust Stone India.
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              The durable Mint Stone Blocks withstand heat, scratch, and stains, these properties make them fit for use in commercial and institutional buildings and monuments. They are incomparable for use in fireplaces, steps, road, driveway, and terraces. We offer Mint Stone Blocks in India in unique colors and patterns.
            </p>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              Mint stone blocks are dense, strong, acid-resistant, and non-absorptive. They are used in construction and are a prime choice of discerning architects, designers, contractors, and builders. We supply Gwalior Mint Stone blocks in their natural shades without any artificial agents to fade. The outlook of blocks improves as they age.
            </p>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              We perform rigorous quality checks and other inspections to ensure the potential of our supplied sandstone. The range is ideal for covering the walls to provide an attractive appearance. We use high-grade materials for manufacturing Mint sandstone.
            </p>
            <div className="pt-4">
              <a href="tel:+919826058456" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#A88B5D] text-white font-medium text-sm tracking-wider hover:bg-[#8A7148] transition-colors duration-300">
                <PhoneCall size={18} /> +91 982 605 8456
              </a>
            </div>
          </div>
          <div className="split-right relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAFAF8] border border-[#EDEDE9] shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-center gap-4 sm:gap-5 py-6">
            <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '40s' }}>
              {[...galleryImages, ...galleryImages].map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>

            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '50s', animationDirection: 'reverse' }}>
              {[...galleryImages, ...galleryImages].reverse().map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>

            <div className="flex gap-4 sm:gap-5 w-max animate-marquee" style={{ animationDuration: '45s' }}>
              {[...galleryImages, ...galleryImages].map((img, idx) => (
                <div key={idx} className="w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PATTERNS WIDE RANGE */}
      <section id="patterns" className="reveal-block py-20 sm:py-28 px-6 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="split-left space-y-8">
            <div>
              <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Our Collection</p>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2] mb-6">
                We Offer A Wide Range <span className="text-[#B8955D] italic">Of Patterns</span>
              </h2>
            </div>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              Mint sandstone blocks made in Madhya Pradesh provide a beautiful natural look with a mixture of colors. The natural tones and shades offer paving blends in and around surrounding. Due to the specific properties of natural stone, every piece has its specific look and may vary in color, texture, and thickness from other pieces of the same type of stone.
            </p>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light">
              These sandstone blocks are perfectly smooth and offer stunning look when in use. They add an unmistakable sense of style and warmth to your decor as nature designed. We are a popular supplier of Mint sandstone blocks in India for use as flooring, walling and exterior landscapes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#EDEDE9] shadow-sm">
                  <CheckCircle2 size={18} className="text-[#B8955D]" />
                  <span className="font-medium text-[#111] text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="split-right relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img src={galleryImages[2]} alt="Mint Stone Blocks Pattern" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
              <h3 className="text-white font-serif text-3xl mb-3">Natural Beauty</h3>
              <p className="text-white/80 font-light text-sm">Perfect for flooring, walling and exterior landscapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MACRO TEXTURE ZOOM */}
      <section className="py-20 sm:py-28 px-6 bg-white border-y border-[#EDEDE9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center reveal-block">
          <div className="split-left">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Up Close</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2] mb-6">
              Texture You Can <span className="text-[#B8955D] italic">Feel Through the Screen</span>
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.85] font-light mb-5">
              Hover over the stone to inspect the uniform grain size, natural shades, and exquisite texture up close —
              the same detail you'll find in every Mint Stone block.
            </p>
            <div className="hidden lg:flex items-center gap-2 text-[#B8955D] text-sm font-medium">
              <ZoomIn size={16} /> Move your cursor over the image
            </div>
          </div>

          <div
            ref={zoomRef}
            onMouseMove={handleLensMove}
            onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
            className="split-right relative aspect-square rounded-3xl overflow-hidden shadow-2xl lg:cursor-none"
          >
            <img src={TEXTURE_IMG} alt="Stone texture detail" className="w-full h-full object-cover" />
            {lens.show && (
              <div
                className="hidden lg:block absolute pointer-events-none rounded-full border-4 border-white shadow-2xl"
                style={{
                  width: LENS_SIZE,
                  height: LENS_SIZE,
                  left: lens.x - LENS_SIZE / 2,
                  top: lens.y - LENS_SIZE / 2,
                  backgroundImage: `url('${TEXTURE_IMG}')`,
                  backgroundSize: `${lens.rectW * ZOOM}px ${lens.rectH * ZOOM}px`,
                  backgroundPosition: `-${lens.x * ZOOM - LENS_SIZE / 2}px -${lens.y * ZOOM - LENS_SIZE / 2}px`,
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* 5. STAGGERED PARALLAX GALLERY */}
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
              {[0, 3].map(i => galleryImages[i]).filter(Boolean).map((src, i) => (
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
                {[2, 0].map(i => galleryImages[i]).filter(Boolean).map((src, i) => (
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

      {/* 6. CRAFTING PROCESS */}
      <section className="reveal-block py-20 sm:py-28 px-6 bg-[#FAFAF8] pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] font-bold text-[#B8955D] uppercase mb-4 font-mono">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111] leading-[1.2]">
              Delivering <span className="text-[#B8955D] italic">Supreme Quality</span>
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

      {/* 7. EXPLORE MORE */}
      <section className="reveal-block py-24 sm:py-32 bg-white border-t border-b border-[#DFDDD8]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-serif text-[#222] mb-2 tracking-tight">
              Explore More
            </h2>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#B4956C] ml-12 md:ml-32">
              Stone Products
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/[0.08]">
            {stoneProductsData.grid
              .filter(item => item.title !== "Mint Stone Blocks")
              .slice(0, 8)
              .map((item, idx) => (
              <Link
                key={idx}
                to={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex flex-col items-center text-center group py-12 px-5 md:px-8 no-underline border-b border-black/[0.08] border-r border-r-black/[0.08] ${
                  (idx + 1) % 4 === 0 ? 'lg:border-r-0' : ''
                } ${
                  (idx + 1) % 2 === 0 ? 'max-lg:border-r-0' : ''
                } hover:bg-[#F4F3EF] transition-colors duration-700`}
              >
                <div className="relative w-[85%] md:w-[75%] aspect-[3/4] mb-8 overflow-hidden bg-[#DFDDD8] border border-black/5 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
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
                <h4 className="text-[12px] md:text-[14px] font-serif text-[#111] uppercase tracking-[0.2em] mb-2 group-hover:text-[#B4956C] transition-colors duration-500">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
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

      {/* 8. CTA BANNER */}
      <section id="contact" className="relative py-32 flex items-center justify-center overflow-hidden bg-[#111]">
        <div className="absolute inset-0 z-0">
          <img src={CTA_IMG} alt="" className="w-full h-full object-cover opacity-25" />
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
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
            Elevate Your <span className="italic font-light">Architecture</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Available in bulk for wholesale buyers globally — the perfect choice for feature
            walls, fireplaces, steps, driveways, and elegant exterior landscapes.
          </p>
          <a href="mailto:info@stoneindia.com" className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-[#B8955D] hover:text-white transition-all duration-300 shadow-xl inline-flex items-center gap-2">
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

export default MintStoneBlocksView;
