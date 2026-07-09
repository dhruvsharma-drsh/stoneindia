import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VerticalProductShowcase = () => {
  const gridRef = useRef(null);
  const headRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  // Use the first 12 items from the grid (3 rows × 4 columns)
  const products = stoneProductsData.grid.slice(0, 12);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      if (headRef.current) {
        gsap.fromTo(
          headRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate cards stagger
      if (cardRefs.current.length) {
        gsap.fromTo(
          cardRefs.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-30 py-24 md:py-32 bg-white border-t border-[#DFDDD8] shadow-[0_-25px_50px_rgba(0,0,0,0.25)] mt-16 md:mt-0">
      {/* Decorative Jaali image overlapping the section gap between Timeless Elegance & Stone Collection */}
      <img 
        src="/img/drsh/image copy 12.png" 
        alt="Decorative Stone Art" 
        className="absolute top-0 right-2 sm:right-8 md:right-12 lg:right-16 -translate-y-[62%] w-60 sm:w-76 md:w-[400px] lg:w-[440px] h-auto object-contain z-[40] pointer-events-none drop-shadow-2xl" 
      />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
      
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 pt-8 md:pt-16">
        {/* Heading — Stone Collection style */}
        <div ref={headRef} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#222] mb-2 tracking-tight">
            Stone
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif italic text-[#222] ml-4 sm:ml-12 md:ml-32">
            Collection
          </h2>
        </div>

        {/* Grid with ultra-subtle divider lines — 3 rows of 4 */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/[0.08]"
        >
          {products.map((item, idx) => (
            <Link
              key={idx}
              ref={addCardRef}
              to={`/products/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex flex-col items-center text-center group py-6 sm:py-12 px-3 sm:px-5 md:px-8 no-underline border-b border-black/[0.08] border-r border-r-black/[0.08] ${
                (idx + 1) % 4 === 0 ? "lg:border-r-0" : ""
              } ${
                (idx + 1) % 2 === 0 ? "max-lg:border-r-0" : ""
              } hover:bg-[#F4F3EF] transition-colors duration-700`}
            >
              {/* 3D hover effect on image */}
              <div className="relative w-full aspect-[3/4] mb-4 sm:mb-8 overflow-hidden bg-[#111] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                
                {/* Marquee Text - Revealed on hover */}
                <div className="absolute top-0 left-0 w-full h-[15%] flex items-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none">
                  <div className="flex w-max animate-marquee">
                    <div className="flex whitespace-nowrap px-2">
                      <span className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-['Libre_Baskerville',serif] text-white/90">
                        {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; 
                      </span>
                    </div>
                    <div className="flex whitespace-nowrap px-2">
                      <span className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-['Libre_Baskerville',serif] text-white/90">
                        {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; {item.title} &nbsp;•&nbsp; 
                      </span>
                    </div>
                  </div>
                </div>

                <img
                  src={item.img}
                  alt={item.title}
                  className="relative z-10 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.70] brightness-[0.97] contrast-[0.95] group-hover:brightness-100 group-hover:contrast-100 saturate-[0.9] group-hover:saturate-100"
                  loading="lazy"
                />

                {/* Premium frosted glass INQUIRE button */}
                <div className="absolute z-20 inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-end justify-center pb-6">
                  <div className="px-6 py-2.5 border border-white/50 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <span className="text-[9px] tracking-[0.4em] uppercase text-white font-semibold drop-shadow-sm">
                      Inquire
                    </span>
                  </div>
                </div>
              </div>

              {/* Refined Typography */}
              <h4 className="text-[14px] sm:text-[16px] md:text-[18px] font-['Libre_Baskerville',serif] text-[#111] font-semibold tracking-normal mb-1 sm:mb-2 group-hover:text-[#B4956C] transition-colors duration-500">
                {item.title}
              </h4>
              {/* Subtitle / SKU style */}
              <div className="hidden sm:flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                <div className="w-4 h-[1px] bg-[#B4956C]/50"></div>
                <p className="text-[11px] md:text-[12px] text-[#555] font-['Libre_Baskerville',serif] tracking-normal font-normal max-w-[220px] leading-relaxed">
                  {item.desc}
                </p>
                <div className="w-4 h-[1px] bg-[#B4956C]/50"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#111] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#B4956C] transition-colors duration-400"
          >
            <span>Explore Entire Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerticalProductShowcase;
