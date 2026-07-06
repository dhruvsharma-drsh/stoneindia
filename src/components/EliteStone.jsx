import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight, ShieldCheck, Layers, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "01",
    name: "Onyx\n& Stones",
    title: "Onyx & Rare Stones",
    image: "img/onyxes-stones--products-tease.webp",
    origin: "Persian & Brazilian Quarries",
    finish: "Polished Backlit",
    desc: "Renowned for its luminous translucence and vibrant emerald bandings, bringing dramatic lighting capabilities to luxury interiors.",
  },
  {
    id: "02",
    name: "Marbles",
    title: "Italian Carrara Marbles",
    image: "img/marble_texture.png",
    origin: "Tuscany, Italy",
    finish: "Honed & Mirror Polished",
    desc: "Timeless white and grey veining extracted from historic Italian mountains. Epitomizes classical grandeur and structural perfection.",
  },
  {
    id: "03",
    name: "Mosaics",
    title: "Artisanal Stone Mosaics",
    image: "img/mosaics--products-tease.webp",
    origin: "Handcrafted in India",
    finish: "Textured Inlay",
    desc: "Precision-cut geometric tessellations crafted by master stone artisans, perfect for architectural feature walls and bespoke floors.",
  },
  {
    id: "04",
    name: "Furnishing",
    title: "Monolithic Furnishing",
    image: "img/furnishing--products-tease.webp",
    origin: "Global Selection",
    finish: "Architectural Matte",
    desc: "Solid stone statement pieces, custom vanity basins, and sculptural dining tables carved from single blocks of premium granite and quartzite.",
  },
  {
    id: "05",
    name: "Finitures",
    title: "Ribbed & Fluted Finitures",
    image: "img/finitures--products-tease.webp",
    origin: "Rajasthan, India",
    finish: "Ribbed & Bush-Hammered",
    desc: "Linear fluted textures and tactile surface treatments that introduce depth, acoustic dampening, and shadow play to modern facades.",
  },
];

const EliteStone = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const cardsRef = useRef(null);
  const detailBoxRef = useRef(null);
  const floatingLinesRef = useRef(null);

  // Active stone index for interactive showcase panel
  const [activeIndex, setActiveIndex] = useState(1); // Default to Marbles

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Tag line entrance
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Diamond cards entrance
      const cards = cardsRef.current.querySelectorAll(".diamond-wrapper");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Detail showcase box entrance
      gsap.fromTo(
        detailBoxRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. GSAP Architectural Floating Elements in Background
      const decorativeOrbits = floatingLinesRef.current.querySelectorAll(".decor-element");
      decorativeOrbits.forEach((el, index) => {
        gsap.to(el, {
          y: (index % 2 === 0 ? -1 : 1) * 28,
          x: (index % 3 === 0 ? -1 : 1) * 15,
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 7 + index * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 5. ScrollTrigger Parallax on Coordinate Tags & Crosshairs
      const parallaxElements = floatingLinesRef.current.querySelectorAll(".scroll-parallax");
      parallaxElements.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -80 : 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Interactive Section Mouse Parallax ── */
  const handleSectionMouseMove = (e) => {
    if (!floatingLinesRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const moveX = (clientX / innerWidth - 0.5) * 40;
    const moveY = (clientY / innerHeight - 0.5) * 40;

    gsap.to(floatingLinesRef.current.querySelectorAll(".mouse-parallax"), {
      x: (i) => (i % 2 === 0 ? moveX : -moveX * 1.5),
      y: (i) => (i % 2 === 0 ? moveY : -moveY * 1.5),
      duration: 1.2,
      ease: "power2.out",
    });
  };

  /* ── Card Hover & Shimmer Beam Animation ── */
  const handleCardMouseEnter = (e, idx) => {
    setActiveIndex(idx);
    const target = e.currentTarget.querySelector(".diamond-card");
    const shimmerBeam = e.currentTarget.querySelector(".shimmer-beam");

    // Lift stone up smoothly
    gsap.to(target, {
      y: -14,
      scale: 1.12,
      duration: 0.4,
      ease: "power2.out",
    });

    // Flash light shimmer sweep across stone image
    if (shimmerBeam) {
      gsap.fromTo(
        shimmerBeam,
        { x: "-160%", opacity: 0.8 },
        {
          x: "160%",
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
        }
      );
    }
  };

  /* ── Card 3D Tilt on Mouse Move ── */
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget.querySelector(".diamond-card");
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -12;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleCardMouseLeave = (e) => {
    const target = e.currentTarget.querySelector(".diamond-card");
    // Elastic bounce settling animation back to zero & flat rotation
    gsap.to(target, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 1.1,
      ease: "elastic.out(1.2, 0.35)",
    });
  };

  const currentCategory = categories[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="elite-stone"
      onMouseMove={handleSectionMouseMove}
      className="relative w-full bg-white overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-10">
        <div className="w-[1px] h-full bg-black" />
        <div className="w-[1px] h-full bg-black hidden sm:block" />
        <div className="w-[1px] h-full bg-black hidden lg:block" />
        <div className="w-[1px] h-full bg-black" />
      </div>

      {/* ── Additional GSAP Decorative Architectural Elements around section ── */}
      <div ref={floatingLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Left Floating Diamond Wireframe */}
        <div className="decor-element mouse-parallax absolute top-16 left-[5%] sm:left-[8%] w-16 h-16 sm:w-20 sm:h-20 border border-[#B8955D]/30 rotate-45 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 border border-black/10 rounded-full" />
        </div>

        {/* Top Right Architectural Coordinates Tag */}
        <div className="scroll-parallax mouse-parallax absolute top-20 right-[4%] sm:right-[7%] hidden md:flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#B8955D]/60 bg-[#FAF9F5]/80 px-3 py-1.5 rounded-full border border-black/[0.04]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8955D] animate-pulse" />
          <span>[ 27.1751° N, 78.0421° E ] QUARRY ORIGIN</span>
        </div>

        {/* Bottom Left Dashed Orbit Ring */}
        <div className="decor-element mouse-parallax absolute bottom-24 left-[4%] sm:left-[10%] w-24 h-24 border border-dashed border-[#B8955D]/25 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#B8955D]/40 shadow-sm shadow-[#B8955D]" />
        </div>

        {/* Bottom Right Floating Golden Shard */}
        <div className="decor-element scroll-parallax mouse-parallax absolute bottom-32 right-[6%] sm:right-[12%] w-14 h-14 bg-gradient-to-br from-[#B8955D]/15 to-transparent rotate-12 rounded-lg border border-[#B8955D]/20 backdrop-blur-sm" />

        {/* Center Architectural Crosshairs */}
        <div className="scroll-parallax absolute top-1/3 left-[2%] text-[#B8955D]/30 font-light text-2xl select-none">+</div>
        <div className="scroll-parallax absolute bottom-1/3 right-[3%] text-[#B8955D]/30 font-light text-2xl select-none">+</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Subtitle Tag & Header */}
        <div ref={tagRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 sm:mb-20">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-10 bg-[#B8955D]/70 block" />
            <span className="font-sans text-xs sm:text-sm tracking-[0.3em] font-semibold text-[#B8955D] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8955D]" /> Elite Stone Collection
            </span>
          </div>
          <span className="font-sans text-xs text-[#8A8A8A] tracking-wider uppercase">
            Hover stones to inspect specifications & shimmer
          </span>
        </div>

        {/* ── Diamond Grid (items-start ensures straight horizontal line) ── */}
        <div
          ref={cardsRef}
          className="flex overflow-x-auto sm:overflow-visible sm:flex-wrap justify-start sm:justify-center items-start gap-6 sm:gap-12 lg:gap-16 mb-20 sm:mb-24 pt-4 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x snap-mandatory"
        >
          {categories.map((cat, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={cat.name}
                onMouseEnter={(e) => handleCardMouseEnter(e, idx)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="diamond-wrapper flex-shrink-0 snap-center flex flex-col items-center gap-5 sm:gap-6 cursor-pointer select-none group"
              >
                {/* Index Number Tag */}
                <span className={`font-sans text-[11px] font-bold tracking-widest transition-colors duration-300 ${
                  isActive ? "text-[#B8955D]" : "text-[#B3B3B3] group-hover:text-[#1A1A1A]"
                }`}>
                  {cat.id}
                </span>

                {/* Diamond Shape Container */}
                <div className="diamond-card relative z-10 my-2">
                  {/* Surrounding 3D Ambient Shadow Glow */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl rotate-45 blur-xl transition-all duration-500 pointer-events-none ${
                    isActive ? "opacity-80 bg-[#B8955D]/35 scale-110" : "opacity-60 bg-black/25 group-hover:opacity-80 group-hover:bg-[#B8955D]/25 group-hover:scale-110"
                  }`} />

                  {/* Diamond Image Frame with Rich 3D Box Shadow */}
                  <div className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rotate-45 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ${
                    isActive ? "border-2 border-[#B8955D] shadow-[0_20px_45px_-10px_rgba(184,149,93,0.45)] ring-2 ring-[#B8955D]/20" : "border border-white/80 shadow-[0_16px_38px_-8px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.08] group-hover:border-[#B8955D]/60 group-hover:shadow-[0_22px_48px_-8px_rgba(184,149,93,0.35)]"
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover -rotate-45 scale-[1.45] transition-transform duration-700 group-hover:scale-[1.65]"
                    />

                    {/* ── GSAP Shimmer Light Beam (flashes across on hover) ── */}
                    <div className="shimmer-beam absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none" />
                  </div>
                </div>

                {/* Label (Fixed height ensures consistent card level) */}
                <div className="min-h-[56px] flex items-start justify-center pt-2">
                  <span className={`font-editorial text-lg sm:text-xl lg:text-2xl text-center leading-tight font-light whitespace-pre-line tracking-tight transition-colors duration-300 ${
                    isActive ? "text-[#B8955D] font-normal" : "text-[#1A1A1A] group-hover:text-[#B8955D]"
                  }`}>
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Interactive Showcase Panel (Updates on Hover) ── */}
        <div
          ref={detailBoxRef}
          className="relative rounded-3xl bg-[#FAF9F5] border border-black/[0.06] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm transition-all duration-500"
        >
          {/* Decorative background watermark */}
          <span className="absolute -right-6 -bottom-10 font-editorial text-[9rem] leading-none text-[#B8955D]/[0.05] pointer-events-none select-none font-light">
            {currentCategory.id}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8955D]/10 border border-[#B8955D]/25 text-[#B8955D] font-sans text-xs font-semibold uppercase tracking-widest mb-4">
                <span>Category Showcase</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-light mb-4">
                {currentCategory.title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-2xl mb-8">
                {currentCategory.desc}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 border-t border-black/[0.06] w-full">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#B8955D]" />
                  <div>
                    <span className="block font-sans text-[11px] text-[#9A9A9A] uppercase tracking-wider">Origin</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1A1A1A]">{currentCategory.origin}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Layers className="w-4.5 h-4.5 text-[#B8955D]" />
                  <div>
                    <span className="block font-sans text-[11px] text-[#9A9A9A] uppercase tracking-wider">Finish</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1A1A1A]">{currentCategory.finish}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Award className="w-4.5 h-4.5 text-[#B8955D]" />
                  <div>
                    <span className="block font-sans text-[11px] text-[#9A9A9A] uppercase tracking-wider">Quality</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1A1A1A]">Grade A+ Certified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="/products"
                className="group relative inline-flex items-center gap-3 bg-[#1A1A1A] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] px-7 py-4 rounded-full border border-black transition-all duration-300 hover:bg-[#B8955D] hover:border-[#B8955D] hover:shadow-lg hover:shadow-[#B8955D]/25 active:scale-95"
              >
                <span>Explore {currentCategory.name.replace("\n", " ")}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EliteStone;
