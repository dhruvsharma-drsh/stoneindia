import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Star, ArrowRight, CheckCircle2, Quote, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const portraits = [
  { id: 0, name: "Alessandro Rossi", role: "Principal Architect, Milan", img: "img/person_1.png", quote: "Flawless book-matched Calacatta marble for our royal palace project in Dubai. The precision exceeded our highest standards." },
  { id: 1, name: "Elena Rostova", role: "Interior Design Head, Zurich", img: "img/person_2.png", quote: "Their custom fluted limestone vanities transformed our 200+ suite Swiss Alpine resort into an architectural sanctuary." },
  { id: 2, name: "Sir Marcus Sterling", role: "Managing Director, London", img: "img/person_3.png", quote: "The custom backlit emerald onyx wall is the undisputed centerpiece of our London corporate headquarters." },
  { id: 3, name: "Rajeshwar Singhania", role: "Chief Projects Officer", img: "img/person_4.png", quote: "From quarry selection to export packaging, their engineering precision made complex installations effortless." },
  { id: 4, name: "Camille Laurent", role: "Luxury Hospitality Director", img: "img/person_5.png", quote: "Sourcing direct from quarries gave us unmatched color consistency across our international villas." },
  { id: 5, name: "Hendrik Van Der Berg", role: "Facade Engineering Lead", img: "img/project_dubai_palace.png", quote: "The structural acoustics and bush-hammered finitures on our Dubai facade withstood intense desert heat flawlessly." },
  { id: 6, name: "Sophia Al-Mansoor", role: "Palace Development Chief", img: "img/project_london_tower.png", quote: "Direct access to rare Persian onyx and Indian marble blocks gave our royal interior unique luminosity." },
];

const Feedback = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // null means no image is currently hovered by user
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Auto-spotlight index rotates every 4.5s when user isn't hovering
  const [autoIndex, setAutoIndex] = useState(0);

  // Auto-loop spotlight when idle
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const interval = setInterval(() => {+
      setAutoIndex((prev) => (prev + 1) % portraits.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [hoveredIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating sine animation on cards
      const cards = gridRef.current.querySelectorAll(".portrait-wrapper");
      cards.forEach((card, idx) => {
        gsap.to(card, {
          y: (idx % 2 === 0 ? -1 : 1) * 12,
          duration: 3.5 + (idx % 2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.fromTo(
        sectionRef.current.querySelector(".content-stage"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Active item is either user hovered item OR auto rotating item
  const activeIdx = hoveredIndex !== null ? hoveredIndex : autoIndex;
  const activeItem = portraits[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="feedback"
      className="relative w-full min-h-screen bg-white overflow-hidden py-16 lg:py-24 flex flex-col justify-between border-t border-black/[0.06]"
    >
      {/* Background Vertical Dashed Grid Lines matching reference */}
      <div className="absolute inset-0 pointer-events-none flex justify-around px-4 sm:px-12 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-[1px] h-full border-l border-dashed border-black/20" />
        ))}
      </div>

      {/* Subtle radial ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] bg-[#B8955D]/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* ── Top Cascading Floating Portraits Grid with Interactive Popup ── */}
        <div
          ref={gridRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="w-full flex flex-wrap justify-center items-center gap-5 sm:gap-8 lg:gap-10 mb-14 sm:mb-18 pt-20 pb-8 relative"
        >
          {portraits.map((item, idx) => {
            const isActive = activeIdx === idx;
            const isUserHovered = hoveredIndex === idx;
            const isAnyActive = hoveredIndex !== null || autoIndex !== null;

            // Initially all dull (opacity 50%, grayscale 60%). Active one pops up (opacity 100%, color), others become very dull (opacity 25%)
            let cardStyle = "opacity-50 grayscale-[60%] scale-95 border-white/80 shadow-md";
            if (isActive) {
              cardStyle = "opacity-100 grayscale-0 scale-125 z-50 border-2 border-[#B8955D] shadow-2xl shadow-[#B8955D]/30 !rotate-0 ring-4 ring-[#B8955D]/20";
            } else if (isAnyActive) {
              cardStyle = "opacity-25 grayscale-[80%] scale-90 blur-[1px] border-white/40 shadow-none";
            }

            // Stagger elevation along the arch
            const translateY = idx === 0 || idx === 6 ? "translate-y-8 sm:translate-y-10" : idx === 1 || idx === 5 ? "translate-y-3 sm:translate-y-4" : idx === 3 ? "-translate-y-6 sm:-translate-y-8" : "translate-y-0";
            const rotation = idx === 0 ? "-rotate-6" : idx === 6 ? "rotate-6" : idx === 5 ? "rotate-4" : idx === 1 ? "-rotate-4" : "-rotate-1";

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`portrait-wrapper relative cursor-pointer transition-all duration-500 transform ${translateY}`}
              >
                {/* ── Floating Speech Bubble Comment Box attached above active image ── */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 sm:w-72 bg-black/90 backdrop-blur-xl text-white p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#B8955D]/60 pointer-events-none transition-all duration-300 z-50 ${
                  isActive
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-90"
                }`}>
                  {/* Subtle gold top glow */}
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#B8955D] to-transparent" />

                  {/* Star rating */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B8955D] text-[#B8955D]" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-[#B8955D] uppercase tracking-wider">Verified</span>
                  </div>

                  {/* Comment text */}
                  <p className="font-editorial text-sm sm:text-base leading-snug text-white/95 font-light mb-3 text-left">
                    “{item.quote}”
                  </p>

                  {/* Person info */}
                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/10 text-left">
                    <img src={item.img} alt={item.name} className="w-7 h-7 rounded-full object-cover border border-[#B8955D]" />
                    <div>
                      <h6 className="font-editorial text-xs font-semibold text-white leading-none">
                        {item.name}
                      </h6>
                      <span className="font-sans text-[10px] text-[#B8955D] block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Downward triangle tail pointing to portrait */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-black/90" />
                </div>

                {/* Card Frame */}
                <div className={`relative w-24 sm:w-28 lg:w-32 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-400 ${rotation} ${cardStyle}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Center Content Stage (Exact Reference Match) ── */}
        <div className="content-stage flex flex-col items-center max-w-4xl mx-auto mt-4 sm:mt-6">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF9F5] border border-black/10 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" />
            <span className="font-sans text-xs font-bold text-[#1A1A1A] tracking-widest uppercase">
              Testimonials
            </span>
          </div>

          {/* Clean Bold Heading exactly matching image */}
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-tight mb-4">
            Trusted by leaders <br />
            <span className="text-[#8A8A8A] font-normal">from various industries</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#6B6B6B] max-w-2xl font-light leading-relaxed mb-8">
            Learn why world-class architects, real estate developers, and interior designers trust Gwalior Stone for bespoke natural surfaces.
          </p>

          {/* Dynamic Active Review Banner at bottom */}
          <div className="w-full max-w-3xl bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-black/[0.06] shadow-sm mb-8 transition-all duration-300">
            <div key={activeItem.id} className="flex flex-col sm:flex-row items-center gap-5 text-left animate-in fade-in duration-300">
              <img src={activeItem.img} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-[#B8955D] shadow-md flex-shrink-0" />
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8955D] text-[#B8955D]" />
                  ))}
                  <span className="text-xs font-bold text-[#1A1A1A] ml-2 uppercase">Verified Client Endorsement</span>
                </div>
                <p className="font-editorial text-lg sm:text-xl text-[#1A1A1A] font-light italic mb-2">
                  “{activeItem.quote}”
                </p>
                <span className="font-sans text-xs font-semibold text-[#B8955D]">
                  {activeItem.name} — {activeItem.role}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Pill Button exactly like image */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-sans text-sm font-semibold hover:bg-[#B8955D] hover:text-black transition-all duration-300 shadow-xl group active:scale-95"
          >
            <span>Read Success Stories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Feedback;
