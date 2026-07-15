import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, MapPin, Layers, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const textPanels = gsap.utils.toArray(".text-panel");
      const imgPanels = gsap.utils.toArray(".img-panel");

      // Initial States
      gsap.set(textPanels[0], { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(imgPanels[0], { y: "0%" });

      gsap.set(textPanels.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imgPanels.slice(1), { y: "100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-container",
          start: "center center",
          end: "+=350%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate through projects
      textPanels.forEach((panel, i) => {
        if (i === 0) return;

        const prevText = textPanels[i - 1];
        const currentText = panel;
        const prevImg = imgPanels[i - 1];
        const currentImg = imgPanels[i];

        tl.to(
          prevText,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          `step${i}`
        )
          .to(
            currentText,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            `step${i}`
          )
          .to(
            prevImg,
            {
              y: "-100%",
              duration: 1.2,
              ease: "power4.inOut",
            },
            `step${i}`
          )
          .to(
            currentImg,
            {
              y: "0%",
              duration: 1.2,
              ease: "power4.inOut",
            },
            `step${i}`
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects-showcase" className="relative z-30 w-full bg-[#111111] text-white py-10 lg:py-20">
      {/* Pinned Viewer Frame */}
      <div className="pin-container h-[90vh] lg:h-[88vh] w-[98%] mx-auto rounded-[2rem] lg:rounded-[3rem] flex flex-col-reverse lg:flex-row overflow-hidden bg-[#0a0a0a] shadow-2xl border border-white/5">

        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 h-[60%] lg:h-full relative flex flex-col p-6 sm:p-10 lg:py-12 lg:px-16 overflow-hidden">

          {/* Persistent Header - in normal flow */}
          <div className="flex-shrink-0 mb-4 lg:mb-8 z-20">
            <h2
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}
              className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.1] whitespace-nowrap"
            >
              Our Global{" "}
              <span style={{ color: "#B8955D", fontStyle: "italic" }}>Projects.</span>
            </h2>
          </div>

          {/* Text Panels Container */}
          <div className="relative flex-1">
            {projects.map((item, index) => (
              <div
                key={item.id}
                className="text-panel absolute inset-0 flex flex-col justify-start"
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

        {/* Right Side: Images */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full relative overflow-hidden bg-[#0a0a0a]">
          {projects.map((item, index) => (
            <div
              key={`img-${item.id}`}
              className="img-panel absolute inset-0 w-full h-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 lg:from-[#111111]/30 via-transparent to-transparent" />

              {/* Image overlay badge */}
              <div className="absolute top-6 right-6 lg:top-12 lg:right-12 z-10">
                <span className="flex items-center gap-1.5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-black/60 backdrop-blur-md text-white font-sans text-[10px] lg:text-xs font-semibold tracking-wider uppercase border border-white/10 shadow-xl">
                  <CheckCircle2 className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-[#B8955D]" /> Verified Supply
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
