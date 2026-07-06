import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, Hammer, ArrowUpRight, ArrowRight, ShieldCheck, Award, MapPin, RefreshCw } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";

// Curated top 3 signature varieties per category in a spacious 3-column layout
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
    catalogLink: "/products",
    img: stoneProductsData.sandstoneProducts[0]?.img || "/img/stone_mint_sandstone.png",
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
  },
];

const CategoryShowcase = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  return (
    <section id="categories-showcase" className="relative w-full bg-[#FAF9F5] text-[#111111] pt-24 pb-12 sm:pt-36 sm:pb-16 overflow-hidden border-t border-black/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75vw] h-[45vw] bg-[#B8955D]/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">

          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111] leading-[1.08] mb-6">
            Explore <span className="font-normal italic text-[#B8955D]">Our Collections.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#666666] font-light leading-relaxed max-w-2xl mx-auto">
            Hover over any collection card below to flip it 180° in 3D space. Click anywhere on the card to browse the complete category catalog.
          </p>
        </div>

        {/* ── SPACIOUS 3-COLUMN FLIP CARDS ARENA (WHOLE CARD IS CLICKABLE!) ── */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key="categories-grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
            >
              {categories.map((cat, idx) => {
                const isFlipped = flippedCardIndex === idx;

                return (
                  /* WHOLE CARD IS WRAPPED IN A LINK -> EVERY PIXEL IS CLICKABLE! */
                  <Link
                    key={cat.id}
                    to={cat.catalogLink}
                    onMouseEnter={() => setFlippedCardIndex(idx)}
                    onMouseLeave={() => setFlippedCardIndex(null)}
                    className="group block h-[500px] sm:h-[540px] w-full [perspective:1200px] cursor-pointer no-underline"
                  >
                    {/* Inner 3D Rotating Box */}
                    <div
                      className={`relative w-full h-full rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] shadow-lg group-hover:shadow-2xl ${
                        isFlipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
                      }`}
                    >
                      {/* ══════════════════════════════════════════════
                          FRONT FACE (Photograph & Title)
                      ══════════════════════════════════════════════ */}
                      <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#111111] [backface-visibility:hidden] border border-black/10 flex flex-col justify-between">
                        {/* Photo */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={cat.img}
                            alt={cat.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-center brightness-[0.9] transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-90" />
                        </div>

                        {/* Top Bar on Front */}
                        <div className="relative z-10 p-7 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-white/90 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
                            [ {cat.totalCount} ITEMS ]
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#DFBA73] bg-[#111111]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#DFBA73]/30 shadow-lg">
                            <RefreshCw className="w-3.5 h-3.5 text-[#DFBA73] animate-spin-slow" /> Hover to Flip
                          </span>
                        </div>

                        {/* Bottom Content on Front */}
                        <div className="relative z-10 p-7 flex flex-col justify-end">
                          <h4 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2 leading-tight drop-shadow-md">
                            {cat.name}
                          </h4>
                          
                          <p className="font-sans text-xs sm:text-sm text-white/80 font-light line-clamp-2 mb-6 leading-relaxed">
                            {cat.subtitle}
                          </p>

                          <div className="pt-5 border-t border-white/15 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-[#DFBA73]">
                            <span>View Full Collection</span>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#DFBA73] transition-colors duration-300">
                              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#111111]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ══════════════════════════════════════════════
                          BACK FACE (Specifications)
                      ══════════════════════════════════════════════ */}
                      <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#111111] text-white p-8 sm:p-10 [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-[#B8955D] shadow-[0_20px_50px_-10px_rgba(184,149,93,0.35)] flex flex-col justify-between">
                        
                        {/* Top Bar on Back */}
                        <div className="flex items-center justify-between pb-5 border-b border-white/15 relative z-10">
                          <span className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#DFBA73]">
                            <ShieldCheck className="w-4 h-4 text-[#DFBA73]" /> SPECIFICATIONS
                          </span>
                          <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full">
                            [ {cat.totalCount} ITEMS ]
                          </span>
                        </div>

                        {/* Middle Spec Details */}
                        <div className="my-auto py-2 relative z-10">
                          <h4 className="font-editorial text-3xl sm:text-4xl text-[#DFBA73] font-light mb-3 leading-tight">
                            {cat.name}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-white/70 font-light mb-4 leading-relaxed line-clamp-2">
                            {cat.description}
                          </p>

                          <div className="space-y-3 text-sm sm:text-base font-sans">
                            {/* ORIGIN */}
                            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                              <span className="text-white/60 font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 font-medium whitespace-nowrap">
                                <MapPin className="w-4 h-4 text-[#DFBA73]" /> ORIGIN
                              </span>
                              <span className="font-semibold text-white text-right whitespace-nowrap pl-4">
                                {cat.defaultOrigin}
                              </span>
                            </div>

                            {/* FINISH */}
                            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                              <span className="text-white/60 font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 font-medium whitespace-nowrap">
                                <Award className="w-4 h-4 text-[#DFBA73]" /> FINISH
                              </span>
                              <span className="font-semibold text-white text-right whitespace-nowrap pl-4">
                                {cat.defaultFinish}
                              </span>
                            </div>

                            {/* QUALITY */}
                            <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                              <span className="text-white/60 font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 font-medium whitespace-nowrap">
                                <ShieldCheck className="w-4 h-4 text-[#DFBA73]" /> QUALITY
                              </span>
                              <span className="font-semibold text-[#DFBA73] text-right whitespace-nowrap pl-4">
                                {cat.defaultQuality}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Full Catalog Button */}
                        <div className="pt-2 relative z-10 mt-auto">
                          <div className="group/btn relative w-full rounded-full border border-[#B8955D] bg-transparent py-3 px-6 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#B8955D] transition-all duration-500 overflow-hidden hover:border-white hover:text-[#111111] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            {/* The sweeping gradient fill background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white to-white translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0" />
                            
                            <span className="relative z-10 transition-colors duration-500">
                              Open Category
                            </span>
                            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
