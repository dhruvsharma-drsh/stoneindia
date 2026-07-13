import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InteractiveSelector from '@/components/ui/interactive-selector';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link2,
  Globe,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const projects = [
  {
    id: "germany",
    title: "Germany Europe Project",
    description: "Premium stone supply for luxury European estates.",
    images: [
      "img/Germany Europe Project/germany-europe-project-1.webp",
      "img/Germany Europe Project/germany-europe-project-2.webp",
      "img/Germany Europe Project/germany-europe-project-3.webp"
    ]
  },
  {
    id: "ombirla",
    title: "OM Birla Residence",
    description: "We successfully completed the project of Shri Om Birla Ji, Lok Sabha Speaker of India. In this project, we have supplied Gwalior Mint White Sandstone inside.",
    images: Array.from({length: 6}).map((_, i) => `img/OM Birla/om-birla-${i+1}.webp`)
  },
  {
    id: "gwalior-mint",
    title: "Gwalior Mint Stone",
    description: "Signature mint sandstone applications in high-end projects.",
    images: Array.from({length: 15}).map((_, i) => `img/Gwalior Mint Stone/gwalior-mint-stone-ke-project-${i+1}.webp`)
  },
  {
    id: "gwalior",
    title: "Gwalior Stone",
    description: "This project uses Gwalior stone, which was used in a project in London, UK. The supply of the stone was provided by our company 'Stone India'.",
    images: Array.from({length: 7}).map((_, i) => `img/Gwalior Stone/gwalior-stone-${i+1}.webp`)
  }
];

/* Fractured stone edge — sits at the top of the scrolling content, pointing upward */
const FractureEdge = ({ fill = '#FFFFFF' }) => (
  <svg
    className="absolute left-0 right-0 -top-[55px] w-full"
    height="56"
    viewBox="0 0 1440 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,40 L96,18 L188,34 L266,6 L344,28 L430,12 L512,36 L598,10 L676,30 L760,4 L842,26 L930,14 L1012,32 L1098,8 L1180,24 L1264,2 L1346,20 L1440,10 L1440,56 L0,56 Z"
      fill={fill}
    />
  </svg>
);

/* ── Scroll-driven vaporize style calculator ──
   Each element gets a staggered "start" point so they dissolve in sequence.
   As scrollProgress (0→1) advances past an element's start, that element
   fades out, blurs, scales up, and drifts upward — like particles scattering. */
const getVaporizeStyle = (scrollProgress, staggerStart = 0, staggerEnd = 1) => {
  // Clamp element's own local progress within its stagger window
  const localProgress = Math.min(1, Math.max(0, (scrollProgress - staggerStart) / (staggerEnd - staggerStart)));
  
  // Eased progress for smoother animation (ease-in-out cubic)
  const eased = localProgress < 0.5
    ? 4 * localProgress * localProgress * localProgress
    : 1 - Math.pow(-2 * localProgress + 2, 3) / 2;

  return {
    opacity: 1 - eased,
    transform: `translateY(${-eased * 60}px) scale(${1 + eased * 0.08})`,
    filter: `blur(${eased * 12}px)`,
    transition: 'none', // Driven by scroll, not CSS transitions
    willChange: 'opacity, transform, filter',
  };
};



const ProjectsPage = () => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedProjectIds, setExpandedProjectIds] = useState([]);
  const heroContentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll progress (0 at top → 1 when hero is fully scrolled past)
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    // Hero dissolve completes within 60% of viewport scroll
    const dissolveDistance = viewportHeight * 0.6;
    const progress = Math.min(1, Math.max(0, scrollY / dissolveDistance));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* ---------------------------------------------------------------
          FIXED HERO — Stays in place while content scrolls over it
      ---------------------------------------------------------------- */}
      <div className="fixed inset-0 w-full h-[100svh] flex flex-col justify-end overflow-hidden z-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="img/project_udaipur_palace.png"
            alt="Our Projects — Stone India"
            className="w-full h-full object-cover brightness-[0.55] contrast-[0.9] grayscale-[15%] motion-safe:animate-[projectHeroIn_1.4s_ease-out]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/60 to-[#0A0A08]/10" />
        </div>

        {/* Hero Content — each element vaporizes on scroll with staggered timing */}
        <div ref={heroContentRef} className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32 pt-24 sm:pt-32">
          
          {/* Back button — dissolves first (0.0 → 0.4) */}
          <div style={getVaporizeStyle(scrollProgress, 0.0, 0.4)}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium mb-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73] rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 shadow-sm"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>
          </div>

          {/* Category Tags — dissolves second (0.05 → 0.5) */}
          <div className="flex items-center gap-3 mb-6 flex-wrap" style={getVaporizeStyle(scrollProgress, 0.05, 0.5)}>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.2em] text-[#DFBA73] font-bold uppercase font-mono">
                Global Projects
              </span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.2em] text-white/90 font-bold uppercase font-mono">
                Natural Stone
              </span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hidden md:block">
              <span className="text-[10px] tracking-[0.2em] text-white/90 font-bold uppercase font-mono">
                Premium Quality
              </span>
            </div>
          </div>

          {/* Main Title — dissolves third (0.1 → 0.65) */}
          <h1
            className="text-3xl sm:text-5xl md:text-[4.5rem] text-white tracking-tight leading-[1.08] max-w-4xl drop-shadow-lg"
            style={{ fontWeight: 500, ...getVaporizeStyle(scrollProgress, 0.1, 0.65) }}
          >
            Our Award-Winning
            <br />
            Stone Projects Worldwide
          </h1>

          {/* Meta Info Row — dissolves last (0.15 → 0.75) */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 font-mono border-t border-white/20 pt-4 sm:pt-6 max-w-3xl"
            style={getVaporizeStyle(scrollProgress, 0.15, 0.75)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DFBA73]/20 flex items-center justify-center border border-[#DFBA73]/30">
                <Globe size={14} className="text-[#DFBA73]" />
              </div>
              <span className="font-medium">25+ Countries</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#DFBA73]" />
              {projects.length} Featured Projects
            </div>

            {/* Share / Copy Link */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider mr-1 hidden md:inline">
                Share
              </span>
              <button
                onClick={handleCopyLink}
                aria-label="Copy link to this page"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#FBC938] hover:text-[#111] hover:border-[#B8955D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8955D]"
              >
                <Link2 size={16} />
              </button>
              {copied && (
                <span className="text-xs font-mono text-[#DFBA73] ml-1">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer — pushes scrollable content below the fixed hero */}
      <div className="h-[100svh]" aria-hidden="true" />

      {/* ---------------------------------------------------------------
          SCROLLABLE CONTENT — Slides up over the fixed hero
      ---------------------------------------------------------------- */}
      <div className="relative z-10 bg-white">
        {/* Fractured Stone Edge — top of the white content */}
        <FractureEdge fill="#FFFFFF" />


        {/* ── Detailed Project Sections (Accordion) ── */}
        <div className="text-center pt-20 pb-10 sm:pt-28 sm:pb-16 px-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#111] mb-4">
            Featured Global Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-2xl mx-auto font-light mb-8 sm:mb-12">
            Explore our portfolio of premium natural stone installations across residential, commercial, and hospitality sectors.
          </p>
        </div>
        <div className="flex flex-col border-t border-gray-200 min-h-[100vh]">
          {projects.map((project, index) => {
            const isExpanded = expandedProjectIds.includes(project.id);
            return (
              <div key={project.id} className="border-b border-black/[0.06] bg-white">
                {/* Accordion Header */}
                <button
                  onClick={() => {
                    setExpandedProjectIds(prev => 
                      prev.includes(project.id) 
                        ? prev.filter(id => id !== project.id)
                        : [...prev, project.id]
                    );
                  }}
                  className="w-full text-left py-10 md:py-16 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-[#FAF9F6] transition-colors duration-1000"
                >
                  <div className="flex items-center gap-8 md:gap-12 transform group-hover:translate-x-4 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                    <span className="text-sm font-mono font-bold text-black/20 group-hover:text-[#B8955D] transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`text-3xl md:text-5xl font-editorial tracking-tight transition-colors duration-500 ${isExpanded ? 'text-[#B8955D]' : 'text-[#1A1A18]'}`}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-8 text-gray-500 w-full md:w-auto transform group-hover:-translate-x-2 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                    <span className="text-sm font-medium hidden md:block max-w-sm truncate text-black/40 group-hover:text-black/60 transition-colors duration-500">{project.description}</span>
                    <div className={`ml-auto md:ml-0 relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 shrink-0 ${isExpanded ? 'border-[#B8955D] text-[#B8955D] bg-[#B8955D]/5' : 'border-black/10 text-black/40 group-hover:border-[#B8955D] group-hover:text-[#B8955D] group-hover:bg-[#FBC938]/5'}`}>
                      {/* Horizontal line */}
                      <div className={`absolute w-3.5 h-[1px] bg-current transition-transform duration-500 ease-[0.16,1,0.3,1] ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                      {/* Vertical line (cross) */}
                      <div className={`absolute w-3.5 h-[1px] bg-current transition-all duration-500 ease-[0.16,1,0.3,1] ${isExpanded ? 'rotate-0 opacity-0 scale-50' : 'rotate-90 opacity-100 scale-100'}`} />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="-mt-16 md:-mt-24 pb-8">
                    <InteractiveSelector 
                      title=""
                      description=""
                      images={project.images}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Footer />
      </div>

      <style>{`
        @keyframes projectHeroIn {
          from { transform: scale(1.06); opacity: 0.85; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[projectHeroIn_1\\.4s_ease-out\\] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;

