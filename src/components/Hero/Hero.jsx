import React, { useState, useEffect, useCallback } from "react";
import HeroContent from "./HeroContent";
import HeroCarousel from "./HeroCarousel";
import { slides } from "./slidesData";
import "./hero.css";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-cycle slides every 4 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectSlide = useCallback((idx) => {
    setActiveSlide(idx);
  }, []);

  return (
    <section
      id="hero"
      className="relative z-40 w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#111111] select-none"
    >
      {/* ── Background and Foreground Carousel ── */}
      <HeroCarousel activeIndex={activeSlide} onSelectSlide={handleSelectSlide} />

      {/* ── Cinematic Gradient Overlays ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* ── Ambient Glow ── */}
      <div
        className="absolute top-1/4 left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#B8955D]/[0.05] blur-[150px] pointer-events-none z-[5]"
      />

      {/* ── Hero Content (left overlay) ── */}
      <div className="absolute inset-0 z-20 flex items-start sm:items-center pointer-events-none">
        <div className="w-full pt-20 sm:pt-0 pb-28 sm:pb-12 pointer-events-auto">
          <HeroContent activeSlide={slides[activeSlide]} />
        </div>
      </div>
      
      {/* ── Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40">
        <div 
          className="h-full bg-[#B8955D] transition-all duration-[4000ms] ease-linear"
          key={activeSlide} // Changing key restarts the animation
          style={{ width: "100%", animation: "progress 4s linear" }}
        />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
};

export default Hero;
