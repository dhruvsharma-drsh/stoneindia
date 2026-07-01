import React, { useState, useEffect, useCallback } from "react";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import SliderNavigation from "./SliderNavigation";
import "./hero.css";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  // Auto-cycle slides every 6 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectSlide = useCallback((idx) => {
    setActiveSlide(idx);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#111111] select-none"
    >
      {/* ── Full-screen Background Slideshow ── */}
      <HeroImage activeIndex={activeSlide} />

      {/* ── Cinematic Gradient Overlays ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-[70%] hero-vignette-left" />
        <div className="absolute inset-x-0 top-0 h-44 hero-vignette-top" />
        <div className="absolute inset-x-0 bottom-0 h-40 hero-vignette-bottom" />
      </div>

      {/* ── Film Grain + Grid Texture ── */}
      <div className="absolute inset-0 hero-noise-overlay z-[11] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-20 z-[11] pointer-events-none" />

      {/* ── Ambient Gold Glow ── */}
      <div
        className="absolute top-1/4 left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#B8955D]/[0.06] blur-[160px] pointer-events-none z-[5]"
      />



      {/* ── Hero Content (left overlay) ── */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="w-full lg:w-[55%] xl:w-[50%] pt-20 sm:pt-24 pb-12 pointer-events-auto">
          <HeroContent />
        </div>
      </div>

      {/* ── Vertical Slide Navigation (right side) ── */}
      <SliderNavigation
        totalSlides={totalSlides}
        activeIndex={activeSlide}
        onSelectSlide={handleSelectSlide}
      />
    </section>
  );
};

export default Hero;

