import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers, Sparkles, Hammer, ArrowUpRight, MapPin, Award, ShieldCheck } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";

import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealWaveImage from "./ui/reveal-wave-image";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "stoneProducts",
    name: "Stone Products",
    subtitle: "Architectural Surfaces",
    description: "Wall panels, cladding, cobbles, flagstones, palisades, and elevation stones.",
    icon: Layers,
    totalCount: stoneProductsData.grid.length,
    defaultOrigin: "Gwalior, India",
    defaultFinish: "Split & Matte",
    defaultQuality: "Grade A+ ISO 9001",
    catalogLink: "/products/stone-products",
    img: stoneProductsData.grid[0]?.img || "/img/stone_mint_sandstone.png",
    cardImg: "/img/product/Stone-product-image.webp",
    cardDesc: "Stone India offers a variety of manufactured stone products, thin brick, tile, and precast products. Architectural stone products can be used to greatly enhance the look and feel of your establishment.",
  },
  {
    id: "sandstone",
    name: "Sandstone Varieties",
    subtitle: "Natural Sandstone",
    description: "Shivpuri, Desert Mint, Rainbow, Teakwood, Sagar Black, Modak, and Lalitpur Yellow.",
    icon: Sparkles,
    totalCount: stoneProductsData.sandstoneProducts.length,
    defaultOrigin: "Rajasthan, India",
    defaultFinish: "Cleft & Honed",
    defaultQuality: "Grade A+ Certified",
    catalogLink: "/products/gwalior-sandstone",
    img: stoneProductsData.sandstoneProducts[0]?.img || "/img/stone_mint_sandstone.png",
    cardImg: "/img/product/pro-1.webp",
    cardDesc: "Among the most precious gift that nature offers, rocks and minerals stand tall. Sandstone is a sedimentary rock consisting of rock grains or minerals. They are available in a variety of colors including white, red, yellow, tan.",
  },
  {
    id: "articrafts",
    name: "Stone Articrafts",
    subtitle: "Handcrafted Sculptures",
    description: "Ornate stone figures, traditional jaalis, garden planters, benches, and waterfalls.",
    icon: Hammer,
    totalCount: stoneProductsData.stoneArticrafts.length,
    defaultOrigin: "Master Artisans",
    defaultFinish: "Hand-Carved",
    defaultQuality: "Bespoke Heritage",
    catalogLink: "/products/stone-articrafts",
    img: stoneProductsData.stoneArticrafts[0]?.img || "/img/stone_mint_sandstone.png",
    cardImg: "/img/product/last card image .webp",
    cardDesc: "STONE INDIA is a master in offering highly attractive and useful stone articrafts for our customers. We offer amazing varieties of products that are designed by following international manufacturing practices...",
  },
];

const CategoryShowcase = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pin the section when its bottom hits the bottom of the viewport
      // By setting pinSpacing: false, the next section (Stone Collection) 
      // will naturally scroll up and overlap this section.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      // 4. Reveal Text, then Cards sequentially after the section is in view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 45%", // Triggers when the section has comfortably emerged
          toggleActions: "play none none reverse",
        }
      });

      if (headerRef.current) {
        tl.fromTo(headerRef.current.children, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }

      if (cardsRef.current.length > 0) {
        tl.fromTo(cardsRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.4" // Overlap slightly with text animation
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="categories-showcase" 
      className="relative w-full bg-[#111111] text-white pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden"
    >
      
      {/* ── RevealWaveImage Background — desktop only ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Suspense fallback={null}>
          <RevealWaveImage
            src="/img/project_udaipur_palace.png"
            waveSpeed={0.2}
            waveFrequency={0.7}
            waveAmplitude={0.5}
            revealRadius={0.6}
            revealSoftness={0.9}
            pixelSize={2}
            mouseRadius={0.4}
            className="w-full h-full"
          />
        </Suspense>
      </div>

      <div ref={contentRef} className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        
        {/* Section Header — Stone Collection style */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <h2 
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#F8F8F8] mb-2 tracking-tight"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
          >
            Our
          </h2>
          <h2 
            className="text-3xl sm:text-5xl md:text-7xl font-serif italic text-[#B8955D] ml-4 sm:ml-12 md:ml-32"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
          >
            Categories
          </h2>
        </div>

        {/* ── CARD GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 lg:gap-10 mb-16 pointer-events-auto">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                ref={addToCardsRef}
                className="opacity-0" // Hidden initially, GSAP will reveal it
              >
                <Link
                  to={cat.catalogLink}
                  className="group block relative h-[200px] sm:h-[500px] rounded-xl sm:rounded-3xl overflow-hidden cursor-pointer no-underline shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent opacity-90" />
                  </div>

                  {/* ── Category Details (Always Visible) ── */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-7">
                    <h4 className="font-editorial text-xl sm:text-3xl text-white font-normal leading-tight drop-shadow-md">
                      {cat.name}
                    </h4>
                    <p className="hidden sm:block font-sans text-sm text-white/80 mt-1.5 mb-4">
                      {cat.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3 sm:mt-0 pt-3 border-t border-white/20 group-hover:border-[#DFBA73]/50 transition-colors duration-300">
                      <span className="font-sans text-[10px] sm:text-xs text-[#DFBA73] font-bold uppercase tracking-widest">
                        View Collection
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#DFBA73] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
