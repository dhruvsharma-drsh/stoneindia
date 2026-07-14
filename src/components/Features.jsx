import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, Layers, CheckCircle2 } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Germany Europe Project",
    category: "Luxury European Estates",
    description:
      "Premium stone supply for luxury European estates and residential villas. Engineered for extreme European weather conditions while maintaining timeless aesthetic warmth.",
    location: "Germany, Europe",
    stoneUsed: "Premium Mint Sandstone",
    image: "img/Germany Europe Project/germany-europe-project-1.webp",
    link: "/projects",
  },
  {
    id: "02",
    title: "OM Birla Residence",
    category: "Government & VIP Residence",
    description:
      "We successfully completed the prestigious residence project of Shri Om Birla Ji, Hon'ble Lok Sabha Speaker of India. We supplied flawless Gwalior Mint White Sandstone for intricate interior and exterior installations.",
    location: "New Delhi / Kota, India",
    stoneUsed: "Gwalior Mint White Sandstone",
    image: "img/OM Birla/om-birla-1.webp",
    link: "/projects",
  },
  {
    id: "03",
    title: "Gwalior Mint Stone Projects",
    category: "High-End Architectural Applications",
    description:
      "Signature mint sandstone applications across luxury hotels, resorts, and private estates. Renowned for its natural non-slip texture and soothing color palette.",
    location: "Pan India & Export",
    stoneUsed: "Gwalior Mint Sandstone",
    image: "img/Gwalior Mint Stone/gwalior-mint-stone-ke-project-1.webp",
    link: "/projects",
  },
  {
    id: "04",
    title: "London UK Heritage Project",
    category: "International Facade & Paving",
    description:
      "This prestigious project in London, UK features authentic Gwalior natural stone, meticulously quarried and supplied directly by our company 'Stone India' to meet stringent British architectural standards.",
    location: "London, United Kingdom",
    stoneUsed: "Gwalior Natural Stone",
    image: "img/Gwalior Stone/gwalior-stone-1.webp",
    link: "/projects",
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section id="projects-showcase" className="relative z-30 w-full bg-white text-[#111111] pt-10 sm:pt-14 pb-10 sm:pb-14 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#B8955D]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#B8955D]/30 text-[#B8955D] font-sans text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Installations</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] leading-[1.1]">
              Our Global <span className="font-normal italic text-[#B8955D]">Projects.</span>
            </h2>
          </div>
        </div>

        {/* Vertical Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Vertical List of Projects (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col border-t border-black/10 min-h-[650px] xl:min-h-[700px]">
            {projects.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative py-6 sm:py-8 border-b border-black/10 cursor-pointer transition-all duration-300 ${
                    isActive ? "pl-4 sm:pl-6 bg-[#FAF9F5]/80" : "hover:pl-3"
                  }`}
                >
                  {/* Active Left Gold Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVerticalBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#B8955D]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-xs sm:text-sm font-semibold tracking-widest transition-colors duration-300 ${
                          isActive ? "text-[#B8955D]" : "text-[#999999] group-hover:text-[#111111]"
                        }`}
                      >
                        {item.id}
                      </span>
                      <div>
                        <h3
                          className={`font-editorial text-xl sm:text-2xl lg:text-3xl transition-colors duration-300 ${
                            isActive
                              ? "text-[#B8955D] font-normal"
                              : "text-[#111111] font-light group-hover:text-[#B8955D]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="font-sans text-xs text-[#888888] tracking-wider uppercase mt-1 block">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isActive
                          ? "bg-[#B8955D] text-white rotate-45 shadow-md shadow-[#B8955D]/20"
                          : "bg-black/5 text-[#111111] group-hover:bg-black/10"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Expandable Details for Active Item */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-8 sm:pl-11 pr-4">
                          <p className="font-sans text-xs sm:text-sm text-[#555555] leading-relaxed mb-4 max-w-xl">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#777777]">
                            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-black/5 shadow-2xs">
                              <MapPin className="w-3.5 h-3.5 text-[#B8955D]" /> {item.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-black/5 shadow-2xs">
                              <Layers className="w-3.5 h-3.5 text-[#B8955D]" /> {item.stoneUsed}
                            </span>
                          </div>

                          {/* ── MOBILE ONLY: Inline image dropdown ── */}
                          <div className="lg:hidden mt-5 rounded-2xl overflow-hidden border border-black/10 shadow-lg aspect-[4/3] relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                              <span className="font-sans text-[10px] text-[#DFBA73] tracking-widest uppercase font-semibold">
                                {item.location}
                              </span>
                              <h4 className="font-editorial text-lg text-white font-light leading-tight mt-0.5">
                                {item.title}
                              </h4>
                            </div>
                            <div className="absolute top-3 right-3 z-10">
                              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B8955D] text-white font-sans text-[10px] font-semibold tracking-wider uppercase shadow-lg">
                                <CheckCircle2 className="w-3 h-3" /> Verified
                              </span>
                            </div>
                          </div>

                          {/* Mobile CTA */}
                          <a
                            href="/projects"
                            className="lg:hidden mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#FAF9F5] border border-[#B8955D]/30 text-[#B8955D] font-sans text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-300 hover:bg-[#B7945D] hover:text-[#111]"
                          >
                            <span>View All Projects</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Image Showcase (5 Cols) — DESKTOP/TABLET ONLY */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative rounded-3xl overflow-hidden bg-[#FAF9F5] border border-black/10 shadow-xl aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] group">
              
              {/* Image Transition Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-xs tracking-wider uppercase border border-white/15">
                  Project #{activeProject.id}
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B8955D] text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Supply
                </span>
              </div>

              {/* Floating Bottom Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[11px] text-[#DFBA73] tracking-widest uppercase font-semibold">
                    {activeProject.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-sans text-[10px] text-white/80 tracking-widest uppercase font-semibold flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#DFBA73]" /> {activeProject.stoneUsed}
                  </span>
                </div>
                <h4 className="font-editorial text-2xl sm:text-3xl text-white font-light leading-tight mb-3">
                  {activeProject.title}
                </h4>
                <p className="font-sans text-xs text-white/80 line-clamp-2 leading-relaxed mb-6">
                  {activeProject.description}
                </p>

                <a
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#111111] hover:bg-[#B7945D] hover:text-[#111] font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 shadow-lg text-center"
                >
                  <span>Explore All Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
