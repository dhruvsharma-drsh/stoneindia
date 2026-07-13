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

  // Use the first 12 items from the grid (3 rows × 4 columns) + 4 stone articrafts (4th row)
  const articraftPicks = stoneProductsData.stoneArticrafts.filter(
    item => ["Stone Figures", "Sandstone Jaali", "Stone Planters", "Sandstone Balls"].includes(item.title)
  );
  const products = [
    ...stoneProductsData.grid.slice(0, 4),
    ...articraftPicks,
    ...stoneProductsData.grid.slice(4, 12)
  ];

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
    <>
      <section className="relative z-30 pt-20 md:pt-28 pb-8 md:pb-12 bg-[#F5F5F2] border-t border-[#BC9960]/20 shadow-[0_-25px_50px_rgba(0,0,0,0.25)] mt-16 md:mt-0">
        {/* ── Subtle Tile Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
          <img
            src="/img/drsh/image copy 13.png"
            alt=""
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* Decorative Jaali image overlapping the section gap between Timeless Elegance & Stone Collection */}
        <img
          src="/img/drsh/vertical tile.png"
          alt="Decorative Stone Art"
          className="absolute top-0 right-2 sm:right-8 md:right-12 lg:right-10 -translate-y-[62%] w-[300px] sm:w-[360px] md:w-[460px] lg:w-[480px] h-auto object-contain z-[40] pointer-events-none drop-shadow-2xl"
        />


        <div className="max-w-[90rem] mx-auto px-6 md:px-12 pt-8 md:pt-16 relative z-10">
          {/* Heading — Stone Collection style */}
          <div ref={headRef} className="flex flex-col w-fit mx-auto mb-20 md:mb-30">
            <h2
              className="architectural-heading self-start text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[11rem] text-[#1A1A1A] leading-[0.85] uppercase"
              style={{ letterSpacing: '0.04em' }}
            >
              STONE
            </h2>
            <h2
              className="architectural-heading self-end text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[11rem] text-[#1A1A1A] leading-[0.85] uppercase ml-16 sm:ml-32 md:ml-48 lg:ml-64"
              style={{ letterSpacing: '0.04em' }}
            >
              COLLECTION
            </h2>
          </div>

          {/* Grid with ultra-subtle divider lines — 3 rows of 4 */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.15]"
          >
            {products.map((item, idx) => (
              <Link
                key={idx}
                ref={addCardRef}
                to={`/products/${articraftPicks.includes(item) ? 'stone-articrafts/' : ''}${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex flex-col items-center text-center group py-6 sm:py-12 px-3 sm:px-5 md:px-8 no-underline bg-[#111111] border-b border-white/[0.15] border-r border-r-white/[0.15] ${(idx + 1) % 4 === 0 ? "lg:border-r-0" : ""
                  } ${(idx + 1) % 2 === 0 ? "max-lg:border-r-0" : ""
                  } hover:bg-[#1a1a1a] transition-colors duration-700`}
              >
                {/* Image Container with Panning Hover Effect */}
                <div className="relative w-full aspect-[3/4] mb-4 sm:mb-8 overflow-hidden bg-[#333] border border-white/10 transition-all duration-700 ease-out">
                  {/* Image 1 - Pans left on hover */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-0 group-hover:-translate-x-full"
                    loading="lazy"
                  />
                  {/* Image 2 - Pans in from right on hover */}
                  <img
                    src={item.img2 || item.img}
                    alt={item.title + " Secondary"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0"
                  />
                  {/* Glass Reflection Shimmer */}
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white/50 opacity-0 group-hover:animate-[shimmer-glass_0.35s_ease-out_forwards] z-20 pointer-events-none"></div>

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
                <h4 className="text-[14px] sm:text-[16px] md:text-[18px] font-['Libre_Baskerville',serif] text-white/90 font-semibold tracking-normal mb-1 sm:mb-2 group-hover:text-[#B4956C] transition-colors duration-500">
                  {item.title}
                </h4>
                {/* Subtitle / SKU style */}
                <div className="hidden sm:flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                  <div className="w-4 h-[1px] bg-[#FBC938]/50"></div>
                  <p className="text-[11px] md:text-[12px] text-white/50 font-['Libre_Baskerville',serif] tracking-normal font-normal max-w-[220px] leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="w-4 h-[1px] bg-[#FBC938]/50"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#111] font-bold text-sm tracking-widest uppercase hover:bg-[#FBC938] hover:text-white transition-colors duration-400"
            >
              <span>Explore Entire Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </section>

      {/* ── Wave blend divider between Stone Collection (grey) & Global Projects (white) ── */}
      <div className="relative z-40 -mt-px -mb-px bg-white pointer-events-none">
        <svg className="w-full block" viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25 L1440,0 Z" fill="#F5F5F2" />
          <path d="M0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25 L1440,50 L0,50 Z" fill="white" />
          <path d="M0,25 Q90,50 180,25 Q270,0 360,25 Q450,50 540,25 Q630,0 720,25 Q810,50 900,25 Q990,0 1080,25 Q1170,50 1260,25 Q1350,0 1440,25" fill="none" stroke="#BC9960" strokeWidth="1.5" opacity="0.25" />
        </svg>
      </div>
    </>
  );
};

export default VerticalProductShowcase;
