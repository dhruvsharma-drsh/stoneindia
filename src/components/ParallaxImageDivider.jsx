import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxImageDivider
 *
 * The background image is FIXED to the viewport (position: fixed, z-index: 1).
 * It never moves. The sections above and below (z-30) scroll over it like
 * sliding panels, creating a "window reveal" parallax effect.
 *
 * This wrapper just reserves scroll space so there's a gap between
 * the About section and Stone Collection where the fixed image is visible.
 */
const ParallaxImageDivider = () => {
  const wrapperRef = useRef(null);
  const fixedLayerRef = useRef(null);
  const taglineRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const subtextRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show / hide the fixed layer only while the wrapper is in viewport
      // so it doesn't bleed into other pages or sections
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => gsap.set(fixedLayerRef.current, { autoAlpha: 1 }),
        onLeave: () => gsap.set(fixedLayerRef.current, { autoAlpha: 0 }),
        onEnterBack: () => gsap.set(fixedLayerRef.current, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.set(fixedLayerRef.current, { autoAlpha: 0 }),
      });

      // Text reveal timeline — triggers when wrapper is in center of viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 60%",
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

      // Tagline fades up
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.7, ease: "power3.out" },
        0.2
      );

      // "Timeless" — clip reveal from left
      tl.fromTo(
        heading1Ref.current,
        { opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.out" },
        0.4
      );

      // "Elegance" — clip reveal from right
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
        { opacity: 0.6, y: 0, duration: 0.7, ease: "power3.out" },
        0.8
      );

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
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── FIXED BACKGROUND LAYER ──
          position: fixed, z-index: 1 → stuck to viewport, never moves.
          Visibility is toggled by ScrollTrigger so it only shows
          when the wrapper gap is scrolled into view. */}
      <div
        ref={fixedLayerRef}
        className="invisible" /* starts hidden, GSAP toggles via autoAlpha */
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
          src="/img/about_showroom_extended.png"
          alt="Premium stone quarry"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.7) 100%)",
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

        {/* Text content — also fixed, doesn't move */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Decorative lines + tagline */}
          <div className="flex items-center gap-4 mb-6">
            <div
              ref={lineLeftRef}
              className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#DFBA73]/70 origin-right"
            />
            <p
              ref={taglineRef}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#DFBA73]/80"
            >
              Crafted by Nature
            </p>
            <div
              ref={lineRightRef}
              className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#DFBA73]/70 origin-left"
            />
          </div>

          {/* Heading */}
          <h2
            ref={heading1Ref}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-[1.05]"
          >
            Timeless
          </h2>
          <h2
            ref={heading2Ref}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic text-[#DFBA73] font-light tracking-tight leading-[1.05] mt-1 sm:mt-2"
          >
            Elegance
          </h2>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="font-sans text-white/50 text-sm sm:text-base max-w-md mt-6 leading-relaxed tracking-wide"
          >
            Every slab tells a story millions of years in the making
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-mono">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── SCROLL SPACER ──
          This empty div reserves vertical space in the document flow.
          When the user scrolls through this gap, the About section (z-30)
          has already moved up and away, revealing the fixed image behind.
          Then the Stone Collection (z-30) comes up from below and covers it. */}
      <div
        ref={wrapperRef}
        style={{ height: "100vh", position: "relative", zIndex: 1 }}
      />
    </>
  );
};

export default ParallaxImageDivider;
