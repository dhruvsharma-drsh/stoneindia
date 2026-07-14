import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Stone Products", "Sandstone", "Stone Articrafts"];

const VerticalProductShowcase = () => {
  const gridRef = useRef(null);
  const headRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("Stone Products");
  
  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  const articraftPicks = stoneProductsData.stoneArticrafts.filter(
    item => ["Stone Figures", "Sandstone Jaali", "Stone Planters", "Sandstone Balls"].includes(item.title)
  );
  const allMixedProducts = [
    ...stoneProductsData.grid.slice(0, 4),
    ...articraftPicks,
    ...stoneProductsData.grid.slice(4, 12)
  ];

  let currentProducts = allMixedProducts;
  if (activeTab === "Sandstone") {
    currentProducts = stoneProductsData.sandstoneProducts;
  } else if (activeTab === "Stone Articrafts") {
    currentProducts = stoneProductsData.stoneArticrafts;
  }

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
            clearProps: "all"
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
            clearProps: "opacity,transform" // Clear inline styles so Tailwind hover/scroll animations take over
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [activeTab]);

  return (
    <>
      <section className="relative z-30 pt-8 md:pt-12 pb-8 md:pb-10 bg-[#DFDCD5] border-t border-[#BC9960]/20 shadow-[0_-25px_50px_rgba(0,0,0,0.25)] mt-16 md:mt-0">

        {/* Decorative Jaali image overlapping the section gap between Timeless Elegance & Stone Collection */}
        <img
          src="/img/drsh/vertical tile.png"
          alt="Decorative Stone Art"
          className="absolute top-0 right-2 sm:right-8 md:right-12 lg:right-10 -translate-y-[62%] w-[300px] sm:w-[360px] md:w-[460px] lg:w-[480px] h-auto object-contain z-[40] pointer-events-none drop-shadow-2xl"
        />


        <div className="max-w-[90rem] mx-auto px-6 md:px-12 pt-8 md:pt-16 relative z-10">
          {/* Heading — Stone Collection style */}
          <div ref={headRef} className="flex flex-col w-fit mx-auto mb-4 md:mb-6">
            <h2
              className="self-start text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-[#1A1A1A] leading-[0.85] uppercase font-['Cormorant_Garamond',serif] font-semibold"
              style={{ letterSpacing: '0.04em' }}
            >
              SIGNATURE
            </h2>
            <h2
              className="self-end text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-[#1A1A1A] leading-[0.85] uppercase ml-12 sm:ml-24 md:ml-32 lg:ml-40 font-['Cormorant_Garamond',serif] font-semibold"
              style={{ letterSpacing: '0.04em' }}
            >
              COLLECTION
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-4 md:mb-6 flex-wrap px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-base sm:text-lg font-['Cormorant_Garamond',serif] font-medium tracking-[-0.02em] capitalize transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-[#B7945D] text-white shadow-md scale-105"
                    : "bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#B7945D]/50 hover:bg-[#B7945D]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider Container Wrapper */}
          <div className="relative group/slider mt-4">
            {/* Horizontal Slider Layout */}
            <div
              ref={gridRef}
              className="flex items-stretch overflow-x-auto overflow-y-hidden snap-x snap-proximity scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 sm:gap-6 pb-4 pt-4 px-4 sm:px-8 max-w-full"
            >
              {currentProducts.map((item, idx) => (
                <Link
                  key={idx}
                  ref={addCardRef}
                  to={`/products/${activeTab === 'Stone Articrafts' || articraftPicks.includes(item) ? 'stone-articrafts/' : ''}${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex-shrink-0 w-[270px] md:w-[300px] lg:w-[calc(31.5%-1rem)] h-[400px] sm:h-[460px] lg:h-[530px] snap-center flex flex-col group no-underline bg-[#E5E5E5] border border-[#111]/[0.08] hover:bg-white transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden hover:-translate-y-2"
                >
                {/* Image Container with Panning Hover Effect */}
                <div className="relative w-full h-[75%] overflow-hidden bg-[#333] border-b border-white/10 transition-all duration-700 ease-out">
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
                  {/* Subtle Shimmer */}
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white/30 opacity-0 group-hover:animate-[shimmer-glass_0.35s_ease-out_forwards] z-20 pointer-events-none"></div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-between h-[25%] py-3 px-4 sm:px-5 w-full bg-gradient-to-b from-[#E5E5E5] to-[#F2F2F2] transition-colors duration-700">
                  <div className="flex flex-col items-start w-full">
                    {/* Refined Typography */}
                    <h4 className="text-[14px] md:text-[16px] font-['Libre_Baskerville',serif] text-[#1A1A1A] font-semibold tracking-normal group-hover:text-[#B4956C] transition-colors duration-500 line-clamp-2 text-left">
                      {item.title}
                    </h4>
                    {/* Subtitle / SKU style */}
                    <div className="hidden sm:block opacity-70 group-hover:opacity-100 transition-opacity duration-500 mt-1 w-full">
                      <p className="line-clamp-2 text-[10px] md:text-[11px] text-[#555] font-['Libre_Baskerville',serif] tracking-normal font-normal leading-relaxed text-left">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Always-visible Inquire Button on a New Row */}
                  <div className="w-full flex justify-center mt-2">
                    <div className="w-[85%] flex justify-center py-2 border border-[#B7945D]/60 rounded-full bg-transparent group-hover:bg-[#B7945D] transition-colors duration-500 shadow-sm cursor-pointer">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#B7945D] font-bold group-hover:text-white transition-colors duration-500">
                        Inquire
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={scrollLeft}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#B7945D] text-white flex items-center justify-center shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-40 hover:bg-[#111] hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#B7945D] text-white flex items-center justify-center shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-40 hover:bg-[#111] hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#111] font-bold text-sm tracking-widest uppercase hover:bg-[#B7945D] hover:text-white transition-colors duration-400"
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
