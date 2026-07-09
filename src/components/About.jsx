import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Globe, Gem, Layers, ShieldCheck, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const sliderImages = [
  { src: "/img/drsh/image copy 10.png", label: "Master Carved Jaali", subtitle: "Intricate Geometric Stone Carving" },
  { src: "/img/drsh/image.png", label: "Heritage Sandstone", subtitle: "Timeless Architectural Craft" },
  { src: "/img/drsh/image copy 9.png", label: "Ornate Lattice Panel", subtitle: "Precision Laser Cut Stone Art" },
  { src: "/img/drsh/9bb3928c-5874-4806-a749-94e644f55e79.jpg", label: "Royal Gwalior Facade", subtitle: "Elevating Exterior & Interior Spaces" },
];

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const imageColRef = useRef(null);
  const statsBarRef = useRef(null);
  const [activeTexture, setActiveTexture] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slider loop every 3 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTexture((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

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

      {/* ── Right Side Texture Bleed ── */}
      <div className="absolute top-0 right-0 bottom-0 w-[45%] max-w-[650px] pointer-events-none overflow-hidden z-0 opacity-[0.07]">
        <img
          src="/img/drsh/image copy 10.png"
          alt=""
          className="w-full h-full object-cover object-left select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Left Column (6/12 width on desktop) ── */}
          <div ref={leftColRef} className="lg:col-span-6 z-10 flex flex-col items-start">
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

            {/* CTA — optimized, lag-free hardware-accelerated button */}
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-4 bg-[#141414] text-white font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] pl-7 pr-3 py-3 rounded-full border border-[#B8955D]/40 shadow-md hover:bg-[#B8955D] hover:border-[#B8955D] hover:shadow-[0_10px_25px_rgba(184,149,93,0.3)] hover:-translate-y-0.5 transition-all duration-300 ease-out active:scale-95 transform-gpu"
            >
              <span className="relative z-10">Learn More About Us</span>
              <span className="relative z-10 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-105">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* ── Right Column: Classy Auto Slider (6/12 width on desktop) ── */}
          <div ref={imageColRef} className="lg:col-span-6 relative flex flex-col items-center w-full">

            {/* Gold corner accents */}
            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-[#B8955D]/30 rounded-tl-2xl pointer-events-none z-10" />
            <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-[#B8955D]/30 rounded-tr-2xl pointer-events-none z-10" />
            <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-[#B8955D]/30 rounded-bl-2xl pointer-events-none z-10" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-[#B8955D]/30 rounded-br-2xl pointer-events-none z-10" />

            {/* Main Slider Box — refined, classy gallery frame with clean dimensions */}
            <div
              className="relative w-full h-[430px] sm:h-[530px] lg:h-[580px] max-w-[560px] rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.18)] group border border-[#B8955D]/25 bg-[#FAF9F6]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Top Progress Line */}
              <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#B8955D] via-[#DFBA73] to-[#B8955D] transition-all duration-500 z-30 pointer-events-none"
                style={{ width: `${((activeTexture + 1) / sliderImages.length) * 100}%` }}
              />

              {/* Horizontal Slider Track — clean right-to-left panning */}
              <div
                className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${activeTexture * 100}%)` }}
              >
                {sliderImages.map((t) => (
                  <div key={t.label} className="w-full h-full flex-shrink-0 relative overflow-hidden bg-[#FAF9F6]">
                    {/* Ambient blurred backdrop to frame uncropped images beautifully */}
                    <img
                      src={t.src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                    />
                    {/* Full uncropped image */}
                    <img
                      src={t.src}
                      alt={t.label}
                      className="relative z-10 w-full h-full object-contain object-center select-none"
                    />
                  </div>
                ))}
              </div>

              {/* Slider Navigation Arrows on Hover (Previous / Next) */}
              <button
                onClick={() => setActiveTexture((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 border border-white/25 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#B8955D] hover:border-[#B8955D] hover:scale-110 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTexture((prev) => (prev + 1) % sliderImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 border border-white/25 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#B8955D] hover:border-[#B8955D] hover:scale-110 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Minimal Bottom Dots Indicator right inside image container */}
              <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2 pointer-events-auto">
                {sliderImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTexture(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                      dotIdx === activeTexture ? "w-7 bg-[#DFBA73]" : "w-1.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;