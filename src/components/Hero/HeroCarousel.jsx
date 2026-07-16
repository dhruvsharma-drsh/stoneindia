import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "./slidesData";

const transition = { duration: 0.7, ease: "easeIn" }; // Slow start, fast end, increased speed

const HeroCarousel = ({ activeIndex, onSelectSlide }) => {
  const activeSlide = slides[activeIndex];

  // Determine the next 3 slides to show in the foreground queue
  const queue = [];
  for (let i = 1; i <= 3; i++) {
    queue.push(slides[(activeIndex + i) % slides.length]);
  }

  return (
    <>
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0 w-full h-full transform-gpu z-0 overflow-hidden"
            initial={{ opacity: 1, zIndex: 30 }}
            animate={{ 
              opacity: 0.6,
              transitionEnd: { zIndex: 0 }
            }}
            exit={{ opacity: 0, zIndex: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <motion.img 
              layoutId={`slide-image-${activeSlide.id}`}
              src={activeSlide.image} 
              alt={activeSlide.title} 
              className="w-full h-full object-cover pointer-events-none" 
              style={{ borderRadius: 0 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Foreground Cards Layer ── */}
      <div className="absolute z-30 bottom-16 right-8 sm:right-16 lg:right-24 flex gap-4 lg:gap-6 items-end pointer-events-auto">
        <AnimatePresence>
          {queue.map((slide, index) => (
            <motion.div
              key={slide.id}
              layout // Ensures the cards slide over smoothly when a sibling is removed
              onClick={() => onSelectSlide(slides.findIndex(s => s.id === slide.id))}
              className="relative overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transform-gpu"
              style={{
                width: "clamp(140px, 15vw, 220px)",
                aspectRatio: "3/4",
                borderRadius: "20px",
                willChange: "transform, opacity"
              }}
              initial={{ opacity: 0, x: 300, scale: 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ ...transition, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.img 
                layoutId={`slide-image-${slide.id}`}
                src={slide.image} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                style={{ borderRadius: "20px" }}
              />

              {/* Overlay gradient on small cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B8955D] mb-1.5 line-clamp-1">{slide.subtitle}</p>
                <h4 className="text-sm sm:text-base font-['Libre_Baskerville',serif] leading-tight line-clamp-2">{slide.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default HeroCarousel;
