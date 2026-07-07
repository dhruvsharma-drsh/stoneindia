import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers, Sparkles, Hammer, ArrowUpRight, MapPin, Award, ShieldCheck } from "lucide-react";
import { stoneProductsData } from "../data/stoneProductsData";

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
  return (
    <section id="categories-showcase" className="relative w-full bg-[#FAF9F5] text-[#111111] pt-24 pb-12 sm:pt-36 sm:pb-16 overflow-hidden border-t border-black/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75vw] h-[45vw] bg-[#B8955D]/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#111111] leading-[1.08] mb-6">
            Explore <span className="font-normal italic text-[#B8955D]">Our Collections.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#666666] font-light leading-relaxed max-w-2xl mx-auto">
            Tap on any collection to browse the complete category catalog with detailed specifications and pricing.
          </p>
        </div>

        {/* ── CARD GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 lg:gap-10 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
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

                  {/* Top Bar — hidden on mobile */}
                  <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-7 flex items-center justify-between">
                    <span className="hidden sm:inline font-mono text-xs font-bold text-white/90 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
                      [ {cat.totalCount} ITEMS ]
                    </span>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 group-hover:bg-[#B8955D] group-hover:border-[#B8955D] transition-all duration-300 ml-auto">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>

                  {/* ── MOBILE: Simple bottom name ── */}
                  <div className="sm:hidden absolute inset-x-0 bottom-0 z-10 p-3 pb-4">
                    <h4 className="font-editorial text-lg text-white font-normal leading-tight drop-shadow-md">
                      {cat.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15">
                      <span className="font-sans text-[10px] text-[#DFBA73] font-bold uppercase tracking-wider">View</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#DFBA73]" />
                    </div>
                  </div>

                  {/* ── DESKTOP: Specs Overlay — slides up on hover ── */}
                  <div className="hidden sm:block absolute inset-x-0 bottom-0 z-10 translate-y-[calc(100%-160px)] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    
                    {/* Always visible bottom content */}
                    <div className="p-7 pb-4">
                      <h4 className="font-editorial text-3xl lg:text-4xl text-white font-normal mb-1.5 leading-tight drop-shadow-md">
                        {cat.name}
                      </h4>
                      <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Specs (revealed on hover) */}
                    <div className="bg-[#111111]/95 backdrop-blur-xl px-7 pt-5 pb-7 border-t border-white/10">
                      <p className="font-sans text-xs text-white/60 mb-4 leading-relaxed line-clamp-2">{cat.description}</p>
                      
                      <div className="space-y-2.5 mb-5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#B8955D]" /> Origin
                          </span>
                          <span className="font-semibold text-white text-sm">{cat.defaultOrigin}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-[#B8955D]" /> Finish
                          </span>
                          <span className="font-semibold text-white text-sm">{cat.defaultFinish}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#B8955D]" /> Quality
                          </span>
                          <span className="font-semibold text-[#B8955D] text-sm">{cat.defaultQuality}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-sans font-bold uppercase tracking-wider text-[#DFBA73]">
                        <span>View Collection</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#DFBA73] transition-colors duration-300">
                          <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#111111]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
