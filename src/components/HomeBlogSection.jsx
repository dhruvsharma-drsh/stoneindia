import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogCards = [
  {
    id: "2",
    title: "Sagar Black Sandstone: A Premium Natural Stone For Patios, Pathways & Modern Facades",
    image: "/img/packaging/Sagar Black Sandstone.webp",
    theme: "stone", // grey stone border
    link: "/blog/2"
  },
  {
    id: "1",
    title: "Top Granite Sandstone Balls Manufacturer Delivering Precision Worldwide",
    image: "/img/packaging/1.webp",
    theme: "sage", // sage green border like screenshot
    link: "/blog/1"
  },
  {
    id: "3",
    title: "Gwalior Mint Sand Stone: A Perfect Blend Of Style And Strength",
    image: "/img/packaging/Gwalior Mint Sand Stone.webp",
    theme: "stone", // grey stone border
    link: "/blog"
  }
];

const HomeBlogSection = () => {
  const sectionRef = useRef(null);
  const fixedLayerRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const taglineRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const subtextRef = useRef(null);
  const cardsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show / hide the fixed background layer only while this section is in viewport
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => gsap.set(fixedLayerRef.current, { autoAlpha: 1 }),
        onLeave: () => gsap.set(fixedLayerRef.current, { autoAlpha: 0 }),
        onEnterBack: () => gsap.set(fixedLayerRef.current, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.set(fixedLayerRef.current, { autoAlpha: 0 }),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Decorative lines expand outward
      tl.fromTo(
        [lineLeftRef.current, lineRightRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        0
      );

      // Tagline fades up & expands letter spacing exactly like Crafted by Nature
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.7, ease: "power3.out" },
        0.2
      );

      // "Recent" — clip reveal from left exactly like "Timeless"
      tl.fromTo(
        heading1Ref.current,
        { opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.out" },
        0.4
      );

      // "Blog" — clip reveal from right exactly like "Elegance"
      tl.fromTo(
        heading2Ref.current,
        { opacity: 0, y: 40, clipPath: "inset(0 0 0 100%)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0 0%)", duration: 0.9, ease: "power4.out" },
        0.55
      );

      // Subtext fades up
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.8
      );

      // Stagger reveal the 3 blog cards
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out" },
          0.95
        );
      }

      // Floating particles — continuous upward drift
      const particles = particlesRef.current?.querySelectorAll(".particle");
      if (particles) {
        particles.forEach((p, i) => {
          gsap.to(p, {
            y: -(80 + i * 30),
            x: (i % 2 === 0 ? 1 : -1) * (15 + i * 8),
            opacity: 0,
            duration: 4 + i * 1.2,
            repeat: -1,
            delay: i * 0.6,
            ease: "power1.out",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── FIXED BACKGROUND LAYER (Exactly like ParallaxImageDivider) ──
          position: fixed, z-index: 1 → stuck to viewport, never moves.
          Visibility is toggled by ScrollTrigger so it only shows
          when this section is scrolled into view. */}
      <div
        ref={fixedLayerRef}
        className="invisible"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Background image — completely fixed, no movement */}
        <img
          src="/img/stone-11.webp"
          alt="Natural Stone Background"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay for contrast exactly like Timeless Elegance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full"
              style={{
                width: `${3 + (i % 3) * 2}px`,
                height: `${3 + (i % 3) * 2}px`,
                background:
                  i % 2 === 0
                    ? "rgba(223, 186, 115, 0.5)"
                    : "rgba(255, 255, 255, 0.3)",
                left: `${12 + i * 11}%`,
                bottom: `${5 + (i % 4) * 8}%`,
                boxShadow:
                  i % 2 === 0
                    ? "0 0 8px rgba(223, 186, 115, 0.3)"
                    : "0 0 6px rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── SCROLLING SECTION CONTENT (Transparent so you see fixed bg) ── */}
      <section
        ref={sectionRef}
        className="relative z-30 pt-12 pb-24 sm:pt-16 sm:pb-32 bg-transparent border-b border-[#DFDDD8]/20 overflow-hidden select-none min-h-[100vh] flex flex-col justify-center"
      >
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-16 text-center relative z-10">

          {/* Top Decorative Lines & Tagline exactly like Crafted by Nature */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              ref={lineLeftRef}
              className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#DFBA73]/70 origin-right"
            />
            <p
              ref={taglineRef}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#DFBA73]/90 font-semibold"
            >
              CRAFTED BY NATURE
            </p>
            <div
              ref={lineRightRef}
              className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#DFBA73]/70 origin-left"
            />
          </div>

          {/* Heading exactly matching Timeless Elegance layout & animation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3">
            <h2
              ref={heading1Ref}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-[1.05]"
            >
              Recent
            </h2>
            <h2
              ref={heading2Ref}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic text-[#DFBA73] font-light tracking-tight leading-[1.05] mt-1 sm:mt-0"
            >
              Blog
            </h2>
          </div>

          {/* Italic Subtitle */}
          <p
            ref={subtextRef}
            className="italic font-serif text-white/70 text-[16px] sm:text-[18px] max-w-2xl mx-auto leading-relaxed mb-16"
          >
            The sandstone wall panel is used for both internal as well as external purposes of wall cladding.
          </p>

          {/* 3-Column Cards Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {blogCards.map((card) => {
              const isSage = card.theme === "sage";
              return (
                <Link
                  key={card.id}
                  to={card.link}
                  className={`group block p-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden ${isSage
                      ? "bg-gradient-to-br from-[#DCECD8] via-[#C9E0C3] to-[#A8C6A0] border-2 border-[#8BB382]"
                      : "bg-gradient-to-br from-[#EAEAE6] via-[#DDDCD7] to-[#C8C7C1] border-2 border-[#B8B7B0]"
                    }`}
                >
                  {/* Image & Overlay Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#222]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />

                    {/* Top Left Logo Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center bg-white/95 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-black/5">
                      <img
                        src="/img/logo.png"
                        alt="Stone India"
                        className="h-4 sm:h-5 w-auto object-contain"
                      />
                    </div>

                    {/* Gradient & Title Overlay below image exactly like screenshot */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 flex items-end p-4 sm:p-5 text-left">
                      <h3 className="text-white font-['Libre_Baskerville',serif] text-[14px] sm:text-[16px] font-medium leading-snug drop-shadow-md group-hover:text-[#B8955D] transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default HomeBlogSection;
