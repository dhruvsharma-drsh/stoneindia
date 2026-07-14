import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated Counter Hook ── */
const useCountUp = (end, duration = 2000, trigger = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
};

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const collageRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const countYears = useCountUp(25, 2000, statsVisible);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column stagger
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // Right column images entrance
      gsap.fromTo(
        ".collage-img-3", // Large right image
        { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.6, ease: "power4.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".collage-img-1", // Top left image
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2, ease: "back.out(1.2)", delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".collage-img-2", // Bottom left image
        { opacity: 0, y: -40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2, ease: "back.out(1.2)", delay: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".stats-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.2, ease: "power3.out", delay: 1.0,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          onStart: () => setStatsVisible(true) // Trigger counter
        }
      );

      // Animate gold map dots
      gsap.to(".map-dot-gold", {
        opacity: 0.3,
        scale: 0.6,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        ease: "sine.inOut"
      });

      // Mouse Parallax Effect
      const handleMouseMove = (e) => {
        if (!collageRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30; // Max move 15px
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(".collage-img-1", { x: xPos * 1.5, y: yPos * 1.5, duration: 1, ease: "power2.out" });
        gsap.to(".collage-img-2", { x: -xPos * 1.2, y: -yPos * 1.2, duration: 1, ease: "power2.out" });
        gsap.to(".collage-img-3", { x: xPos * 0.5, y: yPos * 0.5, duration: 1, ease: "power2.out" });
        gsap.to(".stats-card", { x: -xPos * 0.8, y: -yPos * 0.8, duration: 1, ease: "power2.out" });
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        if (sectionRef.current) sectionRef.current.removeEventListener("mousemove", handleMouseMove);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 w-full bg-[#FAFAFA] py-16 lg:py-20 overflow-hidden"
    >
      {/* --- Ambient Background --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#B8955D]/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#1A1A1A]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold text-[#111] opacity-[0.015] pointer-events-none whitespace-nowrap z-0 tracking-[-0.05em] select-none">
        HERITAGE
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between relative z-10">

        {/* LEFT COLUMN: TEXT */}
        <div ref={leftColRef} className="w-full lg:w-[45%] flex flex-col items-start xl:pr-16 z-10 relative">

          <div className="flex flex-col items-start mb-6">
            <svg
              width="80"
              height="16"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2"
            >
              <path
                d="M2 12C8 4 16 4 22 12C28 20 36 20 42 12C48 4 56 4 62 12C68 20 76 20 82 12C88 4 96 4 98 12"
                stroke="#B8955D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[#B8955D] font-bold tracking-[0.25em] text-xs lg:text-[13px] uppercase">
              About Us
            </span>
          </div>

          <h2 className="text-5xl lg:text-[4.5rem] font-serif text-[#111] mb-6 leading-[1.05] tracking-tight">
            Every Stone<br />
            <span className="font-light italic text-[#B8955D] pr-2">Tells</span>
            a Story.
          </h2>

          <div className="space-y-4 text-[#555] text-[15px] lg:text-[16px] leading-[1.75] mb-8 font-medium">
            <p>
              For over two decades, <strong className="text-[#1A1A1A] font-bold">Gwalior Stone</strong> has been transforming India's finest natural stones into timeless architectural masterpieces — exported to <strong className="text-[#1A1A1A] font-bold">50+ countries</strong> worldwide.
            </p>
            <p>
              From intricate jaali carvings to grand facade cladding, our artisans blend heritage techniques with modern precision to deliver stone solutions that stand the test of time.
            </p>
          </div>

          {/* Enhanced Button */}
          <Link
            to="/collection"
            className="relative overflow-hidden group inline-flex items-center gap-4 border border-[#B8955D] px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase text-[#B8955D] transition-colors duration-500 hover:text-white hover:border-transparent hover:shadow-[0_15px_30px_rgba(184,149,93,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#C2A370] to-[#B8955D] transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 -z-10"></span>
            <span className="relative z-10">Discover Our Collection</span>
            <span className="relative z-10 w-8 h-8 rounded-full border border-current flex items-center justify-center transition-transform duration-500 group-hover:bg-white group-hover:text-[#B8955D] group-hover:border-white group-hover:rotate-[-45deg]">
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

        </div>

        {/* RIGHT COLUMN: COLLAGE */}
        <div ref={collageRef} className="w-full lg:w-[50%] h-[500px] lg:h-[600px] relative mt-16 lg:mt-8 z-0">

          {/* Main Large Image (Building) */}
          <div className="collage-img-3 absolute top-0 right-0 w-[75%] h-[95%] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
            <img
              src="/img/drsh/image copy 11.png"
              alt="Royal Gwalior Facade"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>

          {/* Top Left Small Image (Carving) */}
          <div className="collage-img-1 absolute top-0 left-0 w-[45%] h-[40%] border-[4px] lg:border-[6px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-10 overflow-hidden group">
            <img
              src="/img/drsh/image copy 12.png"
              alt="Master Carved Jaali"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          {/* Bottom Left Small Image (Texture) */}
          <div className="collage-img-2 absolute top-[48%] left-[-8%] w-[42%] h-[38%] border-[4px] lg:border-[6px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-20 overflow-hidden group">
            <img
              src="/img/drsh/9bb3928c-5874-4806-a749-94e644f55e79.jpg"
              alt="Stone Texture"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          {/* Stats Overlay Card */}
          <div className="stats-card absolute -bottom-6 -right-6 w-auto bg-white/95 backdrop-blur-md p-3 lg:p-4 lg:pr-5 shadow-[0_40px_80px_rgba(184,149,93,0.15)] z-30 overflow-hidden border border-white/50">
            <div className="flex items-center gap-2 relative z-10">
              <div className="text-[#B8955D] shrink-0 transform transition-transform duration-500 hover:scale-110">
                <svg width="14" height="18" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
                  <path d="M2 6 L12 2 L22 6 Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M2 6 L22 6" />
                  <path d="M4 8 L20 8" />
                  <path d="M2 28 L22 28" />
                  <path d="M4 26 L20 26" />
                  <path d="M6 8 L6 26" />
                  <path d="M10 8 L10 26" />
                  <path d="M14 8 L14 26" />
                  <path d="M18 8 L18 26" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <div className="text-xl lg:text-2xl font-serif text-[#111] leading-none tracking-tight">
                    {countYears}
                  </div>
                  <div className="text-lg lg:text-xl font-serif text-[#B8955D] leading-none ml-0.5">+</div>
                </div>
                <div className="text-[6px] lg:text-[7px] font-bold tracking-[0.2em] text-[#333] mt-0.5">YEARS OF EXCELLENCE</div>
              </div>
            </div>

            {/* Dotted Map Pattern */}
            <div className="absolute bottom-[-5%] right-[-5%] opacity-[0.06] pointer-events-none z-0 w-[95%]">
              <svg viewBox="0 0 100 60" className="w-full h-auto fill-current text-[#111]">
                <circle cx="20" cy="20" r="1" /> <circle cx="23" cy="18" r="1" /> <circle cx="25" cy="22" r="1" />
                <circle cx="22" cy="25" r="1" /> <circle cx="27" cy="19" r="1" /> <circle cx="30" cy="21" r="1" />
                <circle cx="18" cy="28" r="1" /> <circle cx="24" cy="29" r="1" /> <circle cx="28" cy="26" r="1" />
                <circle cx="32" cy="24" r="1" /> <circle cx="35" cy="20" r="1" /> <circle cx="38" cy="23" r="1" />
                <circle cx="31" cy="29" r="1" /> <circle cx="36" cy="28" r="1" /> <circle cx="40" cy="26" r="1" />
                <circle cx="43" cy="21" r="1" /> <circle cx="45" cy="18" r="1" /> <circle cx="48" cy="22" r="1" />
                <circle cx="42" cy="29" r="1" /> <circle cx="47" cy="27" r="1" /> <circle cx="50" cy="24" r="1" />
                <circle cx="53" cy="20" r="1" /> <circle cx="55" cy="25" r="1" /> <circle cx="58" cy="22" r="1" />
                <circle cx="62" cy="18" r="1" /> <circle cx="65" cy="21" r="1" /> <circle cx="60" cy="25" r="1" />
                <circle cx="68" cy="24" r="1" /> <circle cx="72" cy="20" r="1" /> <circle cx="75" cy="25" r="1" />
                <circle cx="70" cy="28" r="1" /> <circle cx="78" cy="22" r="1" /> <circle cx="82" cy="26" r="1" />
                <circle cx="80" cy="30" r="1" /> <circle cx="85" cy="32" r="1" /> <circle cx="88" cy="35" r="1" />
                <circle cx="75" cy="32" r="1" /> <circle cx="72" cy="35" r="1" /> <circle cx="68" cy="33" r="1" />
                <circle cx="65" cy="38" r="1" /> <circle cx="62" cy="34" r="1" /> <circle cx="58" cy="30" r="1" />
                <circle cx="55" cy="36" r="1" /> <circle cx="52" cy="32" r="1" /> <circle cx="48" cy="35" r="1" />
                <circle cx="45" cy="39" r="1" /> <circle cx="40" cy="33" r="1" /> <circle cx="35" cy="37" r="1" />
                <circle cx="30" cy="34" r="1" /> <circle cx="28" cy="38" r="1" /> <circle cx="25" cy="42" r="1" />
                <circle cx="22" cy="36" r="1" /> <circle cx="18" cy="40" r="1" /> <circle cx="20" cy="45" r="1" />
                <circle cx="26" cy="48" r="1" /> <circle cx="32" cy="45" r="1" /> <circle cx="38" cy="42" r="1" />
                <circle cx="42" cy="46" r="1" /> <circle cx="48" cy="43" r="1" /> <circle cx="52" cy="48" r="1" />
                <circle cx="58" cy="45" r="1" /> <circle cx="62" cy="42" r="1" /> <circle cx="68" cy="46" r="1" />
                <circle cx="75" cy="40" r="1" /> <circle cx="80" cy="44" r="1" /> <circle cx="85" cy="40" r="1" />
                <circle cx="88" cy="46" r="1" /> <circle cx="92" cy="42" r="1" /> <circle cx="95" cy="38" r="1" />
                <circle cx="78" cy="48" r="1" /> <circle cx="82" cy="52" r="1" /> <circle cx="88" cy="50" r="1" />

                {/* Gold highlights - animated via GSAP */}
                <circle cx="25" cy="22" r="2" className="map-dot-gold fill-[#B8955D] opacity-100" />
                <circle cx="48" cy="22" r="2" className="map-dot-gold fill-[#B8955D] opacity-100" />
                <circle cx="68" cy="33" r="2" className="map-dot-gold fill-[#B8955D] opacity-100" />
                <circle cx="38" cy="42" r="2" className="map-dot-gold fill-[#B8955D] opacity-100" />
                <circle cx="82" cy="26" r="2" className="map-dot-gold fill-[#B8955D] opacity-100" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ── Wave blend divider at bottom of About section ── */}
    <div className="relative z-40 -mt-px -mb-px pointer-events-none">
      <svg className="w-full block" viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25 L1440,0 Z" fill="#FAFAFA" />
        <path d="M0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25 L1440,50 L0,50 Z" fill="transparent" />
        <path d="M0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25" fill="none" stroke="#BC9960" strokeWidth="2" opacity="0.35" />
      </svg>
    </div>
    </>
  );
};

export default About;

