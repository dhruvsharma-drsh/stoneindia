import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      className="relative z-30 pt-6 sm:pt-10 pb-10 sm:pb-14 bg-white px-6 sm:px-12 lg:px-20 overflow-hidden min-h-[100vh] flex items-center"
    >
      <div className="max-w-[86rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: CEO Words & Mission */}
        <div ref={leftColRef} className="lg:col-span-6 flex flex-col justify-center text-left">
          {/* Green Wave & Subtitle */}
          <div className="flex flex-col items-start mb-4">
            <svg
              width="80"
              height="16"
              viewBox="0 0 100 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-1"
            >
              <path
                d="M2 12C8 4 16 4 22 12C28 20 36 20 42 12C48 4 56 4 62 12C68 20 76 20 82 12C88 4 96 4 98 12"
                stroke="#4BAE4F"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[12px] sm:text-[13px] tracking-[0.22em] font-semibold text-[#333] uppercase">
              Our CEO's Words
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Libre_Baskerville',serif] text-[#1A1A1A] font-bold tracking-normal mb-6">
            Our Mission
          </h2>

          {/* Italic Quote */}
          <p className="italic font-['Libre_Baskerville',serif] text-[#333] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.6] mb-6">
            Our Organization is a closely knit group of dedicated professionals who are highly motivated and are always ready for any challenges that they might encounter.
          </p>

          {/* Main Description */}
          <p className="text-[#555] font-normal text-[14px] sm:text-[15px] leading-[1.8] mb-8 max-w-2xl">
            Natural stone is durable, readily available, and comes in a variety of textures and colors. Unlike other building materials that have to be fabricated or produced using harsh chemicals, natural stone is abundant in quantity, bountiful in colors and designs, and eco-friendly. We offer great selection of Indian Natural Stone to the world at affordable rates with great services to our clients. Let us open the beautiful world of natural stone for you and to make the world more beautiful
          </p>


        </div>

        {/* Right Column: Video Showcase with Right-side Bleeding Texture */}
        <div ref={rightColRef} className="lg:col-span-6 relative flex items-center justify-center">
          {/* Subtle Texture Bleeding out to the Right Edge */}
          <div className="absolute -right-20 lg:-right-32 top-1/2 -translate-y-1/2 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] bg-[radial-gradient(#B8955D_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-40 rounded-full pointer-events-none -z-10" />
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#B8955D]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Clean Video Container — scales up on hover */}
          <div className="relative z-10 w-full max-w-[240px] mx-auto rounded-2xl overflow-visible shadow-2xl border border-black/10 transition-all duration-500 ease-out hover:scale-110 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:z-30">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto block rounded-2xl"
            >
              <source src="/video/VID-20240208-WA0007.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default OurMission;
