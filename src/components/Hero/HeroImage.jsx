import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./hero.css";

const slides = [
  { id: 1, image: "img/1.png", alt: "Luxury stone villa interior with mountain view" },
  { id: 2, image: "img/2.png", alt: "Premium sandstone terrace with panoramic landscape" },
  { id: 3, image: "img/3.png", alt: "Elegant marble living space with natural light" },
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
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[1]">
      {/* Parallax container */}
      <motion.div
        animate={{ x: -mousePos.x, y: -mousePos.y }}
        transition={{ type: "spring", stiffness: 35, damping: 25 }}
        className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
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
                  filter: "brightness(0.82) contrast(1.08) saturate(0.95)",
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
