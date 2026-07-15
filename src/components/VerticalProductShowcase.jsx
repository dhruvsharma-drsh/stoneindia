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
      <section className="relative z-30 pt-8 md:pt-12 pb-8 md:pb-10 bg-white border-t border-[#BC9960]/20 shadow-[0_-25px_50px_rgba(0,0,0,0.25)] mt-16 md:mt-0">

        <div className="max-w-[90rem] mx-auto px-6 md:px-12 pt-16 md:pt-28 lg:pt-36 relative z-10">
          {/* Heading — Stone Collection style */}
          <div ref={headRef} className="flex flex-col w-fit mx-auto mb-4 md:mb-6">
            <h2
              className="about-heading self-start uppercase"
              style={{ letterSpacing: '0.04em' }}
            >
              SIGNATURE
            </h2>
            <h2
              className="about-heading self-end uppercase ml-12 sm:ml-24 md:ml-32 lg:ml-40"
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
              className="flex items-stretch overflow-x-auto overflow-y-hidden snap-x snap-proximity scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 sm:gap-6 pb-4 pt-4 max-w-full"
            >
              {currentProducts.map((item, idx) => (
                <Link
                  key={idx}
                  ref={addCardRef}
                  to={`/products/${activeTab === 'Stone Articrafts' || articraftPicks.includes(item) ? 'stone-articrafts/' : ''}${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="relative flex-shrink-0 w-[250px] md:w-[280px] lg:w-[calc(25%-1.125rem)] h-[350px] sm:h-[400px] lg:h-[460px] snap-center flex flex-col group no-underline bg-white border border-[#111]/[0.08] hover:bg-white transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden hover:-translate-y-2"
                >
                {/* Image Container with Panning Hover Effect */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#333] transition-all duration-700 ease-out z-0">
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
                <div className="absolute bottom-0 flex flex-col justify-between h-auto py-4 px-4 sm:px-5 w-full bg-black/60 backdrop-blur-md transition-all duration-700 group-hover:bg-black/80 z-10">
                  <div className="flex flex-col items-start w-full">
                    {/* Refined Typography */}
                    <h4 className="text-[18px] md:text-[22px] font-['Libre_Baskerville',serif] text-white font-semibold tracking-normal group-hover:text-[#B4956C] transition-colors duration-500 line-clamp-2 text-left">
                      {item.title}
                    </h4>
                    {/* Subtitle / SKU style */}
                    <div className="hidden sm:block opacity-80 group-hover:opacity-100 transition-opacity duration-500 mt-1 w-full">
                      <p className="line-clamp-2 text-[10px] md:text-[11px] text-gray-200 font-['Libre_Baskerville',serif] tracking-normal font-normal leading-relaxed text-left">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full flex justify-center mt-3">
                    <div className="w-[85%] flex justify-center py-2 border border-[#B7945D]/60 rounded-full bg-[#B7945D] group-hover:bg-[#9a7b49] transition-colors duration-500 shadow-sm cursor-pointer">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white font-bold transition-colors duration-500">
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
              className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white text-[#111] border border-[#111]/10 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-80 transition-all duration-300 z-40 hover:opacity-100 hover:bg-[#B7945D] hover:text-white hover:scale-110 hover:border-[#B7945D]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white text-[#111] border border-[#111]/10 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-80 transition-all duration-300 z-40 hover:opacity-100 hover:bg-[#B7945D] hover:text-white hover:scale-110 hover:border-[#B7945D]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#B7945D] border border-[#B7945D] text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#B7945D] transition-colors duration-400"
            >
              <span>Explore Entire Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </section>
    </>
  );
};

export default VerticalProductShowcase;
