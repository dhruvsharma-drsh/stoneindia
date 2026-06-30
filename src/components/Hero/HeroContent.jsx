import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import "./hero.css";

/* ── Split text into individual character spans ── */
const splitIntoChars = (text, activeColor = "#ffffff") => {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      data-active-color={activeColor}
      data-revealed="false"
      style={{
        color: activeColor === "#B8955D" ? "rgba(184,149,93,0.18)" : "rgba(255,255,255,0.15)",
        willChange: "color, transform, text-shadow",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const HeroContent = () => {
  const headingRef = useRef(null);
  const descRef = useRef(null);

  /* ── GSAP: Cinematic entry animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading chars stagger in from below with 3D flip
      gsap.fromTo(
        headingRef.current.querySelectorAll(".hero-char"),
        {
          opacity: 0,
          y: 60,
          rotateX: -90,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.018,
          ease: "back.out(1.4)",
          delay: 0.5,
        }
      );

      // Description words fade in
      gsap.fromTo(
        descRef.current.querySelectorAll(".desc-word"),
        { opacity: 0, y: 15, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.025,
          ease: "power2.out",
          delay: 1.4,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  /* ── GSAP: Hover reveals chars permanently (paint effect) ── */
  const handleCharHover = useCallback((e) => {
    const target = e.target;
    if (!target.classList.contains("hero-char")) return;

    const allChars = Array.from(
      headingRef.current.querySelectorAll(".hero-char")
    );
    const idx = allChars.indexOf(target);
    const radius = 4;

    allChars.forEach((char, i) => {
      const distance = Math.abs(i - idx);
      if (distance > radius) return;

      // Mark as permanently revealed
      char.dataset.revealed = "true";

      const intensity = 1 - distance / (radius + 1);
      const activeColor = char.dataset.activeColor || "#ffffff";
      const isGold = activeColor === "#B8955D";

      gsap.to(char, {
        color: activeColor,
        textShadow: isGold
          ? `0 0 ${30 * intensity}px rgba(184,149,93,${0.5 * intensity}), 0 0 ${60 * intensity}px rgba(184,149,93,${0.15 * intensity})`
          : `0 0 ${25 * intensity}px rgba(255,255,255,${0.4 * intensity}), 0 0 ${50 * intensity}px rgba(255,255,255,${0.1 * intensity})`,
        scale: 1 + 0.06 * intensity,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, []);

  /* ── On mouse leave: only un-revealed chars stay muted ── */
  const handleMouseLeave = useCallback(() => {
    const allChars = headingRef.current.querySelectorAll(".hero-char");

    allChars.forEach((char) => {
      const wasRevealed = char.dataset.revealed === "true";
      const activeColor = char.dataset.activeColor || "#ffffff";
      const isGold = activeColor === "#B8955D";

      if (wasRevealed) {
        // Stay colored — just remove the glow & scale
        gsap.to(char, {
          color: activeColor,
          textShadow: isGold
            ? "0 0 8px rgba(184,149,93,0.2)"
            : "0 0 6px rgba(255,255,255,0.1)",
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });
      }
      // Un-revealed chars stay muted — no change needed
    });
  }, []);

  /* ── Description text ── */
  const descText =
    "Discover the beauty, strength and versatility of natural stone for every space and style.";
  const descWords = descText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 max-w-2xl xl:max-w-3xl"
    >
      {/* ── Subtitle Tag ── */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <span className="font-sans text-xs sm:text-[13px] tracking-[0.3em] font-semibold text-[#B8955D] uppercase italic">
          Natural By Nature
        </span>
        <span className="h-[1px] w-10 sm:w-14 bg-[#B8955D]/60 block" />
      </motion.div>

      {/* ── Interactive Heading — hover to paint/reveal ── */}
      <motion.h1
        ref={headingRef}
        variants={itemVariants}
        onMouseMove={handleCharHover}
        onMouseLeave={handleMouseLeave}
        className="font-editorial text-[2.75rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-tight font-light mb-8 lg:mb-10 cursor-default select-none"
        style={{ perspective: "800px" }}
      >
        <span className="block">
          {splitIntoChars("Timeless Stones.", "#ffffff")}
        </span>
        <span className="block">
          {splitIntoChars("Endless ", "#ffffff")}
          <span className="italic font-normal relative inline-block">
            {splitIntoChars("Possibilities.", "#B8955D")}
            <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-[#B8955D]/40 gold-underline-anim" />
          </span>
        </span>
      </motion.h1>

      {/* ── Description ── */}
      <motion.p
        ref={descRef}
        variants={itemVariants}
        className="font-sans font-light text-[#9A9A9A] text-sm sm:text-base md:text-lg leading-relaxed max-w-[440px] mb-10 lg:mb-12"
      >
        {descWords.map((word, i) => (
          <span key={i} className="desc-word inline-block mr-[0.3em] opacity-0">
            {word}
          </span>
        ))}
      </motion.p>

      {/* ── CTA Buttons ── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
      >
        <motion.a
          href="#products"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group flex items-center justify-center gap-3 bg-[#B8955D] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-full gold-glow-shadow transition-all duration-300 hover:bg-[#a6834d]"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group flex items-center justify-center gap-3 bg-transparent text-white font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.15em] px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#111111] hover:border-white"
        >
          <span>Get a Quote</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
