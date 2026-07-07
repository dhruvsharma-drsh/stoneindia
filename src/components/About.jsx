import React, { useRef, useEffect, useState, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gem, Globe, Layers, Sparkles } from "lucide-react";

const About3D = lazy(() => import("./About3D"));

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    icon: Gem,
    targetValue: 20,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: Globe,
    targetValue: 50,
    suffix: "+",
    label: "Countries Exported",
  },
  {
    icon: Layers,
    targetValue: 200,
    suffix: "+",
    label: "Natural Stone Varieties",
  },
];

/* Fractured stone edge — sits at the top, pointing upward */
const FractureEdge = ({ fill = '#FFFFFF' }) => (
  <svg
    className="absolute left-0 right-0 -top-[55px] w-full z-20 pointer-events-none"
    height="56"
    viewBox="0 0 1440 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,40 L96,18 L188,34 L266,6 L344,28 L430,12 L512,36 L598,10 L676,30 L760,4 L842,26 L930,14 L1012,32 L1098,8 L1180,24 L1264,2 L1346,20 L1440,10 L1440,56 L0,56 Z"
      fill={fill}
    />
  </svg>
);

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const stoneImgRef = useRef(null);
  const statsRef = useRef(null);
  const shapesContainerRef = useRef(null);

  // Counter state for numbers
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Column: Subtitle, Heading, Description, CTA slide smoothly FROM THE LEFT
      const leftElements = leftColRef.current.children;
      gsap.fromTo(
        leftElements,
        {
          opacity: 0,
          x: -110,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Right Column: Stat Cards slide smoothly FROM THE RIGHT
      const statCards = statsRef.current.querySelectorAll(".stat-card");
      gsap.fromTo(
        statCards,
        {
          opacity: 0,
          x: 110,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Center image entrance with parallax scale
      gsap.fromTo(
        imageWrapperRef.current,
        { opacity: 0, scale: 0.75, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Removed static image oscillation (now handled natively by <Float> in 3D)

      // 5. Dynamic GSAP Geometric Shapes Animations
      const shapes = shapesContainerRef.current.querySelectorAll(".auto-shape");
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          x: (index % 2 === 0 ? 1 : -1) * (30 + index * 15),
          y: (index % 3 === 0 ? -1 : 1) * (25 + index * 12),
          rotation: index % 2 === 0 ? 360 : -360,
          scale: index % 2 === 0 ? 1.15 : 0.85,
          duration: 5 + index * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        });
      });

      // Rotating orbit rings around the rock
      gsap.to(".orbit-ring-1", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-ring-2", {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      // 6. Animated Number Counters
      const counterObj = { val0: 0, val1: 0, val2: 0 };
      gsap.to(counterObj, {
        val0: statsData[0].targetValue,
        val1: statsData[1].targetValue,
        val2: statsData[2].targetValue,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          setCounts([
            Math.floor(counterObj.val0),
            Math.floor(counterObj.val1),
            Math.floor(counterObj.val2),
          ]);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── 3D Interactive Mouse Tilt (Removed, now using OrbitControls) ── */

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white overflow-hidden py-12 sm:py-16 lg:py-20"
    >

      {/* Background elements contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B8955D]/[0.05] rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── GSAP Automatically Floating Geometric Shapes Background ── */}
        <div ref={shapesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="auto-shape absolute top-12 left-[12%] w-14 h-14 border border-[#B8955D]/25 rotate-45 rounded-md backdrop-blur-[1px]" />
          
          <div className="auto-shape absolute bottom-16 left-[28%] w-16 h-16 rounded-full border border-black/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#B8955D]/10 rounded-full" />
          </div>

          <div className="auto-shape absolute top-20 right-[15%] w-10 h-10 bg-gradient-to-br from-[#B8955D]/20 to-transparent rotate-12 rounded" />
          
          <div className="auto-shape absolute bottom-20 right-[35%] w-6 h-6 rounded-full border-2 border-[#B8955D]/30" />

          <div className="auto-shape absolute top-1/3 left-[45%] w-12 h-12 flex items-center justify-center opacity-40">
            <div className="absolute w-full h-[1px] bg-[#B8955D]/40" />
            <div className="absolute h-full w-[1px] bg-[#B8955D]/40" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ── Left Column: Content sliding in from LEFT ── */}
          <div ref={leftColRef} className="lg:col-span-4 xl:col-span-4 z-10 flex flex-col items-start">
            {/* Subtitle */}
            <div className="flex items-center gap-3.5 mb-6">
              <span className="font-sans text-xs sm:text-[13px] tracking-[0.28em] font-semibold text-[#B8955D] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" /> About Gwalior Stone
              </span>
              <span className="h-[1px] w-10 bg-[#B8955D]/50 block" />
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.2rem] leading-[1.12] tracking-tight text-[#1A1A1A] font-light mb-6">
              Nature's Strength,
              <br />
              <span className="italic font-normal text-[#B8955D]">Our Commitment.</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#6B6B6B] leading-relaxed max-w-[460px] mb-8">
              Gwalior Stone is a leading manufacturer and exporter
              of premium natural stones. We bring the finest
              quality stones from nature to create timeless
              spaces around the world.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/about"
                className="group relative inline-flex items-center gap-4 bg-[#141414] text-white font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] pl-7 pr-3 py-3 rounded-full border border-[#B8955D]/35 overflow-hidden shadow-md transition-all duration-500 hover:border-[#B8955D] hover:shadow-[0_12px_30px_rgba(184,149,93,0.28)] hover:-translate-y-1 active:scale-95"
              >
                {/* Expanding Luxury Gold Sheen Background on Hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#B8955D] via-[#C5A880] to-[#B8955D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                {/* Text Label */}
                <span className="relative z-10 transition-colors duration-300">
                  Learn More About Us
                </span>

                {/* Circular Arrow Badge */}
                <span className="relative z-10 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>

          {/* ── Center Column: Interactive 3D Stone Image with Orbit Shapes ── */}
          <div className="lg:col-span-4 xl:col-span-4 flex items-center justify-center my-6 lg:my-0 relative">
            <div className="orbit-ring-1 absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#B8955D]/25 pointer-events-none flex items-center justify-start">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B8955D]/60 -ml-1" />
            </div>
            <div className="orbit-ring-2 absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-black/[0.06] pointer-events-none flex items-start justify-center">
              <div className="w-2 h-2 rounded-full bg-black/30 -mt-1" />
            </div>

            <div
              ref={imageWrapperRef}
              className="relative z-10 w-full max-w-[320px] h-[320px] sm:max-w-[400px] sm:h-[400px] cursor-grab active:cursor-grabbing"
            >
              <Suspense fallback={null}>
                <About3D />
              </Suspense>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent mix-blend-overlay rounded-full blur-xl pointer-events-none"
              />
            </div>
          </div>

          {/* ── Right Column: Interactive Animated Stats sliding in from RIGHT ── */}
          <div
            ref={statsRef}
            className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 sm:gap-5 z-10"
          >
            {statsData.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="stat-card group relative overflow-hidden flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] shadow-sm hover:shadow-lg hover:border-[#B8955D]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8955D]/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  <div className="flex-shrink-0 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#F7F3ED] border border-[#B8955D]/20 flex items-center justify-center group-hover:bg-[#B8955D] group-hover:border-[#B8955D] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#B8955D] group-hover:text-white stroke-[1.75] transition-colors duration-300" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#B8955D] transition-colors duration-300">
                      {counts[idx]}
                      {stat.suffix}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-[#7A7A7A] tracking-wide mt-0.5 font-medium">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
