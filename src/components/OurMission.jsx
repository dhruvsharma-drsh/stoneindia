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
      if (leftColRef.current) {
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
        <div className="max-w-[86rem] mx-auto flex flex-col items-center justify-center">
          {/* Centered Column: CEO Words & Mission */}
          <div ref={leftColRef} className="w-full max-w-4xl flex flex-col items-center justify-center text-center">
            {/* Green Wave & Subtitle */}
            <div className="flex flex-col items-center mb-6">
              <span className="text-[12px] sm:text-[13px] tracking-[0.22em] font-semibold text-[#333] uppercase">
                Our CEO's Words
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Libre_Baskerville',serif] text-[#1A1A1A] font-bold tracking-normal mb-8">
              Our Mission
            </h2>

            {/* Italic Quote */}
            <p className="italic font-['Libre_Baskerville',serif] text-[#333] text-[18px] sm:text-[20px] md:text-[24px] leading-[1.6] mb-8 px-4">
              "Our Organization is a closely knit group of dedicated professionals who are highly motivated and are always ready for any challenges that they might encounter."
            </p>

            {/* Main Description */}
            <p className="text-[#555] font-normal text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] mb-8 px-4 max-w-3xl">
              Natural stone is durable, readily available, and comes in a variety of textures and colors. Unlike other building materials that have to be fabricated or produced using harsh chemicals, natural stone is abundant in quantity, bountiful in colors and designs, and eco-friendly. We offer great selection of Indian Natural Stone to the world at affordable rates with great services to our clients. Let us open the beautiful world of natural stone for you and to make the world more beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* Video Part of Our Mission */}
      <section className="relative z-30 w-full h-[100vh] flex items-center justify-center bg-[#212322] overflow-hidden">
        {/* Centered Video Container - Portrait Mode */}
        <div className="relative h-[75vh] aspect-[9/16] bg-black shadow-2xl overflow-hidden">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/video/VID-20240208-WA0007.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

    </>
  );
};

export default OurMission;
