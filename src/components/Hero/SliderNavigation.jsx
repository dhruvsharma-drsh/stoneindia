import React from "react";
import { motion } from "framer-motion";
import "./hero.css";

const SliderNavigation = ({ totalSlides = 3, activeIndex = 0, onSelectSlide }) => {
  return (
    <div className="absolute right-6 sm:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0 pointer-events-auto">
      {Array.from({ length: totalSlides }).map((_, idx) => {
        const isActive = activeIndex === idx;
        const num = `0${idx + 1}`;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSlide && onSelectSlide(idx)}
            className="group flex flex-col items-center focus:outline-none"
            aria-label={`Go to slide ${num}`}
          >
            {/* Number */}
            <span
              className={`font-mono text-xs tracking-widest transition-all duration-500 ${
                isActive
                  ? "text-[#B8955D] font-bold"
                  : "text-white/40 group-hover:text-white/80"
              }`}
            >
              {num}
            </span>

            {/* Connecting Line */}
            {idx < totalSlides - 1 && (
              <div className="relative w-[1.5px] h-10 my-2 overflow-hidden">
                {/* Track */}
                <div className="absolute inset-0 bg-white/15 rounded-full" />
                {/* Active fill */}
                {isActive && (
                  <motion.div
                    layoutId="sliderActiveBar"
                    className="absolute inset-0 bg-[#B8955D] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SliderNavigation;
