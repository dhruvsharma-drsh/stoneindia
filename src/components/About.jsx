import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Globe, Gem, Layers, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const textures = [
  { src: "/img/product/Stone Products/Sandstone Jaali/image copy.png", label: "Floral Vine" },
  { src: "/img/product/Stone Products/Sandstone Jaali/image.png", label: "Geometric Grid" },
  { src: "/img/product/Stone Products/Sandstone Jaali/image copy 2.png", label: "Heritage Lattice" },
  { src: "/img/product/Stone Products/Sandstone Jaali/image copy 3.png", label: "Classic Arch" },
];

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const imageColRef = useRef(null);
  const statsBarRef = useRef(null);
  const [activeTexture, setActiveTexture] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slide in
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, x: -80, filter: "blur(6px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)",
          duration: 1.2, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      // Image column slide in
      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, x: 80, scale: 0.92 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      // Stats bar stagger
      if (statsBarRef.current) {
        gsap.fromTo(
          statsBarRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: statsBarRef.current, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 w-full bg-white overflow-hidden py-16 sm:py-20 lg:py-28 shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B8955D]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left Column ── */}
          <div ref={leftColRef} className="z-10 flex flex-col items-start">
            {/* Subtitle */}
            <div className="flex items-center gap-3.5 mb-6">
              <span className="font-sans text-xs sm:text-[13px] tracking-[0.28em] font-semibold text-[#B8955D] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" /> About Gwalior Stone
              </span>
              <span className="h-[1px] w-10 bg-[#B8955D]/50 block" />
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.2rem] leading-[1.12] tracking-tight text-[#1A1A1A] font-light mb-6">
              Nature's Strength,
              <br />
              <span className="italic font-normal text-[#B8955D]">Our Commitment.</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#6B6B6B] leading-relaxed max-w-[520px] mb-4">
              For over two decades, Gwalior Stone has been transforming 
              India's finest natural stones into timeless architectural 
              masterpieces — exported to 50+ countries worldwide.
            </p>
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#6B6B6B] leading-relaxed max-w-[520px] mb-6">
              From intricate jaali carvings to grand facade cladding,
              our artisans blend heritage techniques with modern precision
              to deliver stone solutions that stand the test of time.
            </p>

            {/* Quote */}
            <p className="font-sans text-sm text-[#888] leading-relaxed max-w-[480px] italic border-l-2 border-[#B8955D]/40 pl-4 mb-8">
              "Where centuries-old craftsmanship meets modern precision."
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[
                { icon: ShieldCheck, text: "ISO Certified" },
                { icon: Globe, text: "50+ Countries" },
                { icon: Gem, text: "200+ Varieties" },
                { icon: Layers, text: "20+ Years" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E8E5DE] text-xs font-medium text-[#7A7A7A] hover:border-[#B8955D]/40 hover:text-[#B8955D] transition-colors duration-300 cursor-default"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.text}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/about"
              className="group relative inline-flex items-center gap-4 bg-[#141414] text-white font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] pl-7 pr-3 py-3 rounded-full border border-[#B8955D]/35 overflow-hidden shadow-md transition-all duration-500 hover:border-[#B8955D] hover:shadow-[0_12px_30px_rgba(184,149,93,0.28)] hover:-translate-y-1 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#B8955D] via-[#C5A880] to-[#B8955D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
              <span className="relative z-10">Learn More About Us</span>
              <span className="relative z-10 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-105">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* ── Right Column: Interactive Texture Showcase ── */}
          <div ref={imageColRef} className="relative flex flex-col items-center">

            {/* ── Background texture behind image ── */}
            <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-[85%] h-[80%] rounded-3xl overflow-hidden pointer-events-none opacity-[0.08]">
              <img
                src="/img/product/Stone Products/Sandstone Jaali/image copy 2.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative pattern overlay */}
            <div
              className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-[80%] h-[75%] rounded-3xl pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #B8955D 0px, #B8955D 1px, transparent 1px, transparent 12px)`,
              }}
            />

            {/* Gold corner accents */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#B8955D]/30 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-[#B8955D]/30 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-[#B8955D]/30 rounded-bl-2xl pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#B8955D]/30 rounded-br-2xl pointer-events-none" />

            {/* Main image — swaps on texture selection */}
            <div className="relative w-full aspect-[5/4] max-w-[520px] rounded-2xl overflow-hidden shadow-2xl group">
              {textures.map((t, i) => (
                <img
                  key={t.label}
                  src={t.src}
                  alt={t.label}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: i === activeTexture ? 1 : 0,
                    transform: i === activeTexture ? "scale(1)" : "scale(1.08)",
                  }}
                />
              ))}

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Active texture label */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-full px-4 py-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                    {textures[activeTexture].label}
                  </span>
                </div>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#DFBA73] mb-0.5">
                    Handcrafted Heritage
                  </p>
                  <p className="font-serif text-sm sm:text-base text-white/90 font-light">
                    Sandstone Jaali — Gwalior
                  </p>
                </div>
              </div>
            </div>

            {/* ── Interactive Texture Selector ── */}
            <div className="w-full max-w-[480px] mt-4 sm:mt-5">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {textures.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setActiveTexture(i)}
                    className={`relative group/thumb rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                      i === activeTexture
                        ? "border-[#B8955D] shadow-lg shadow-[#B8955D]/20 scale-[1.02]"
                        : "border-transparent hover:border-[#B8955D]/40 grayscale-[40%] hover:grayscale-0"
                    }`}
                  >
                    <img
                      src={t.src}
                      alt={t.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      i === activeTexture
                        ? "bg-[#B8955D]/10"
                        : "bg-black/20 group-hover/thumb:bg-black/5"
                    }`} />

                    {/* Active dot indicator */}
                    {i === activeTexture && (
                      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#B8955D] border border-white shadow-sm" />
                    )}

                    {/* Label on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[8px] sm:text-[9px] text-white/90 uppercase tracking-wider block text-center">
                        {t.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Texture navigation label */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-[#B8955D]/30" />
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#B8955D]/50">
                  Click to explore textures
                </span>
                <span className="h-px flex-1 max-w-[40px] bg-gradient-to-l from-transparent to-[#B8955D]/30" />
              </div>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default About;