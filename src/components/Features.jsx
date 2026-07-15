import React, { useState, useEffect } from "react";
import { ArrowUpRight, MapPin, Layers } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Germany Europe Project",
    category: "Luxury European Estates",
    description:
      "Premium stone supply for luxury European estates and residential villas. Engineered for extreme European weather conditions while maintaining timeless aesthetic warmth.",
    location: "Germany, Europe",
    stoneUsed: "Premium Mint Sandstone",
    image: "/img/Germany Europe Project/germany-europe-project-1.webp",
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
    image: "/img/OM Birla/om-birla-6.webp",
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
    image: "/img/Gwalior Mint Stone/gwalior-mint-stone-ke-project-1.webp",
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
    image: "/img/Gwalior Stone/gwalior-stone-4.webp",
    link: "/projects",
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="projects-showcase" className="relative z-0 w-full text-white bg-transparent pointer-events-none">
      {/* Viewer Frame - Strictly limited to remaining height (100vh - 96px navbar). pointer-events-none on section to allow scrolling past fixed background, but auto on content */}
      <div className="w-full h-[calc(100vh-6rem)] flex flex-col lg:flex-row shadow-2xl border-y border-white/5 bg-transparent pointer-events-auto">

        {/* Left Side: Content (Normal z-index) */}
        {/* mt-auto pushes it to the bottom on mobile to leave the top space transparent and show the fixed image */}
        <div className="w-full lg:w-1/2 h-[60%] lg:h-full mt-auto lg:mt-0 relative flex flex-col p-5 sm:p-8 lg:py-10 lg:px-12 z-10 bg-[#0a0a0a]">
          
          {/* Persistent Header */}
          <div className="flex-shrink-0 mb-10 lg:mb-20 z-20">
            <h2
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
              className="text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] whitespace-nowrap"
            >
              Our Global{" "}
              <span style={{ color: "#B8955D" }}>Projects.</span>
            </h2>
          </div>

          {/* Text Panels Container */}
          <div className="relative flex-1">
            {projects.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex flex-col justify-start transition-all duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100 translate-y-0 pointer-events-auto delay-100" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <div className="w-full max-w-xl">
                  <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-[#B8955D] block mb-2 lg:mb-4">
                    {item.id} — {item.category}
                  </span>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
                    className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl text-white mb-3 lg:mb-5 leading-tight"
                  >
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-4 lg:mb-6 line-clamp-4 min-h-[4.5rem] sm:min-h-[5.5rem]">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[10px] sm:text-xs font-sans text-white/80 mb-5 lg:mb-8">
                    <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                      <MapPin className="w-3 h-3 text-[#B8955D]" /> {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                      <Layers className="w-3 h-3 text-[#B8955D]" /> {item.stoneUsed}
                    </span>
                  </div>

                  <a
                    href={item.link}
                    className="inline-flex items-center justify-center gap-2 lg:gap-3 bg-[#B8955D] text-white hover:bg-white hover:text-[#111] font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest px-6 lg:px-8 py-3 lg:py-4 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(184,149,93,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] group"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Images (Fixed Negative z-index for Shutter Reveal) */}
        <div className="fixed top-24 right-0 w-full lg:w-1/2 h-[calc(100vh-6rem)] bg-[#0a0a0a] z-[-10]">
          {projects.map((item, index) => (
            <div
              key={`img-${item.id}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 lg:from-[#111111]/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
