import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroContent = ({ activeSlide }) => {
  return (
    <div className="relative z-20 flex flex-col justify-center px-5 sm:px-12 lg:px-16 xl:px-24 max-w-2xl xl:max-w-4xl pointer-events-none">
      {/* Spacer to align content properly vertically */}
      <div className="h-[20vh] sm:h-[25vh] lg:h-[30vh]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          {/* Subtitle / Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-[#B8955D]" />
            <span className="text-[#B8955D] font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              {activeSlide.subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-['Libre_Baskerville',serif] text-white font-bold leading-[1.1] mb-10 drop-shadow-2xl">
            {activeSlide.title.split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {word} <br className="hidden sm:block" />
              </React.Fragment>
            ))}
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-[#b3b8be] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#a4aab1] shadow-lg hover:shadow-xl"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-transparent text-white font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.15em] px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#111111] hover:border-white"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroContent;
