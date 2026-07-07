import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import VaporizeTextCycle, { Tag } from "./ui/VaporizeText";
import { FONT_FAMILY } from "@/config/fonts";

// Subtle floating luxury golden stardust motes
const goldDustParticles = Array.from({ length: 16 }, (_, i) => ({
  left: `${Math.random() * 90 + 5}%`,
  top: `${Math.random() * 90 + 5}%`,
  size: Math.random() > 0.6 ? "w-[3px] h-[3px]" : "w-[2px] h-[2px]",
  opacity: Math.random() * 0.5 + 0.2,
  speed: Math.random() * 2 + 1,
  delay: Math.random() * 2,
}));

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);
  const vaporContainerRef = useRef(null);
  const particlesRef = useRef([]);
  const bgGlow1Ref = useRef(null);
  const bgGlow2Ref = useRef(null);

  useEffect(() => {
    // Entrance timeline
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    )
      .fromTo(
        vaporContainerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    // Animate floating gold stardust particles
    particlesRef.current.forEach((el, index) => {
      if (!el) return;
      const particle = goldDustParticles[index];

      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: particle.opacity,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: particle.delay * 0.5,
        }
      );

      gsap.to(el, {
        y: `+=${-30 * particle.speed}`,
        x: `+=${(index % 2 === 0 ? 15 : -15)}`,
        opacity: particle.opacity * 0.3,
        duration: 3 + particle.speed * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Animate background glow spheres
    if (bgGlow1Ref.current && bgGlow2Ref.current) {
      gsap.to(bgGlow1Ref.current, {
        x: 100,
        y: -80,
        scale: 1.3,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(bgGlow2Ref.current, {
        x: -90,
        y: 70,
        scale: 1.25,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Auto-dismiss after 10 seconds
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, 10000);

    return () => clearTimeout(dismissTimer);
  }, []);

  const handleDismiss = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setShow(false);
        onComplete && onComplete();
      },
    });
  };

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] overflow-hidden cursor-pointer select-none"
      style={{ willChange: "opacity" }}
    >
      {/* Animated Luxury Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gold Aura */}
        <div
          ref={bgGlow1Ref}
          className="absolute top-[25%] left-[25%] w-[550px] h-[550px] rounded-full bg-[#B8955D]/[0.07] blur-[150px]"
        />
        {/* Animated Obsidian/Navy Aura */}
        <div
          ref={bgGlow2Ref}
          className="absolute bottom-[25%] right-[25%] w-[600px] h-[600px] rounded-full bg-[#1e293b]/[0.09] blur-[160px]"
        />
        {/* Subtle Luxury Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Golden Stardust (Ultra Luxury Vibe) */}
      <div className="absolute inset-0 pointer-events-none">
        {goldDustParticles.map((p, idx) => (
          <div
            key={idx}
            ref={(el) => (particlesRef.current[idx] = el)}
            className={`absolute rounded-full bg-[#B8955D] shadow-[0_0_8px_#B8955D] ${p.size}`}
            style={{ left: p.left, top: p.top }}
          />
        ))}
      </div>

      {/* Gold accent line */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-4 mb-6">
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#B8955D] to-transparent rounded-full shadow-[0_0_12px_#B8955D]" />
      </div>

      {/* Vaporize text cycle */}
      <div ref={vaporContainerRef} className="relative z-10 w-full max-w-[700px] h-[120px] sm:h-[140px] flex items-center justify-center px-4">
        <VaporizeTextCycle
          texts={["Gwalior Stone", "Premium Marble", "Natural Granite", "Exotic Onyx", "Timeless Luxury"]}
          font={{
            fontFamily: FONT_FAMILY,
            fontSize: "60px",
            fontWeight: 700,
          }}
          color="rgb(255, 255, 255)"
          spread={4}
          density={6}
          animation={{
            initialWaitDuration: 3,
            vaporizeDuration: 1.8,
            fadeInDuration: 0.8,
            waitDuration: 1.2,
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H1}
        />
      </div>

      {/* Subtitle + CTA */}
      <div ref={subtitleRef} className="relative z-10 flex flex-col items-center gap-5 mt-4">
        <p className="font-sans text-[13px] sm:text-sm text-white/30 tracking-wide text-center max-w-sm leading-relaxed">
          India's Premier Exporter of Architectural Natural Stone
        </p>

        <div className="flex items-center gap-2 text-[#B8955D]/50 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
          <span>Click anywhere to enter</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8955D]/25 to-transparent" />
    </div>
  );
};

export default SplashScreen;
