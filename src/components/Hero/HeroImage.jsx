import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./hero.css";

export const slides = [
  { id: 1, image: "/img/hero%20section/ChatGPT%20Image%20Jul%209,%202026,%2004_30_22%20PM.png", alt: "Majestic Natural Stone Landscape & Architecture" },
  { id: 2, image: "/img/hero%20section/ChatGPT%20Image%20Jul%209,%202026,%2004_43_46%20PM.png", alt: "Timeless Gwalior Stone Heritage Palace" },
  { id: 3, image: "/img/hero%20section/ChatGPT%20Image%20Jul%209,%202026,%2004_51_42%20PM.png", alt: "Grand Sandstone Monument Showcase" },
  { id: 4, image: "/img/hero%20section/ChatGPT%20Image%20Jul%209,%202026,%2004_57_43%20PM.png", alt: "Architectural Elegance in Natural Stone" },
  { id: 5, image: "/img/hero%20section/ChatGPT%20Image%20Jul%209,%202026,%2005_03_38%20PM.png", alt: "Exquisite Sandstone Craftsmanship & Structure" },
];

// Preload all slide images immediately into browser cache
if (typeof window !== "undefined") {
  slides.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
  });
}

const HeroImage = ({ activeIndex = 0 }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 6;
      const y = (e.clientY / innerHeight - 0.5) * 4;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#111111] z-[1]">
      {/* Parallax container */}
      <motion.div
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        transition={{ type: "spring", stiffness: 35, damping: 25 }}
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex % slides.length;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: isActive ? 18 : 1.2, ease: "easeOut" },
              }}
              className={`absolute inset-0 w-full h-full transition-visibility ${
                isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{
                  filter: "brightness(0.85) contrast(1.08) saturate(0.95)",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeroImage;
