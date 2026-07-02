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

/* ── Hover-Reveal Project Index ──
   Minimal text list with cursor-following image reveal on hover.
   Inspired by luxury stone/marble collection galleries. */
const ProjectHoverIndex = ({ projects }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState({});
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // Smooth cursor-following via lerp (spring-like)
  useEffect(() => {
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mousePos]);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      const center = rect.width / 2;
      
      let clampedX = rawX;

      if (hoveredId) {
        const projectIndex = projects.findIndex(p => p.id === hoveredId);
        const isRightSide = projectIndex % 2 !== 0;

        if (isRightSide) {
          // Right side zig-zag: keep image STRICTLY on the right, away from centered text
          const minAllowedX = Math.min(center + 440, rect.width - 150);
          clampedX = Math.max(rawX, minAllowedX);
          clampedX = Math.min(clampedX, rect.width - 150); // keep on screen
        } else {
          // Left side zig-zag: keep image STRICTLY on the left
          const maxAllowedX = Math.max(center - 440, 150);
          clampedX = Math.min(rawX, maxAllowedX);
          clampedX = Math.max(clampedX, 150); // keep on screen
        }
      }

      setMousePos({
        x: clampedX,
        y: rawY,
      });
    }
  }, [hoveredId, projects]);

  const handleHoverEnter = (projectId, images) => {
    setHoveredId(projectId);
    // Cycle to next image each time user hovers
    setImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % images.length,
    }));
  };

  const handleHoverLeave = () => {
    setHoveredId(null);
  };

  const hoveredProject = projects.find(p => p.id === hoveredId);
  const currentImageSrc = hoveredProject
    ? hoveredProject.images[imageIndex[hoveredId] || 0]
    : null;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] flex flex-col justify-center py-16 md:py-20 overflow-hidden bg-white"
    >
      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-14 px-6 shrink-0">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-[#1A1A18] tracking-tight"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 400 }}
        >
          Our <em className="not-italic" style={{ fontStyle: 'italic' }}>Projects</em>
        </h2>
      </div>

      {/* Project List */}
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col justify-center shrink-0">
        {projects.map((project, index) => (
          <div key={project.id}>
            {/* Divider line */}
            {index === 0 && (
              <div className="h-px w-full" style={{ background: 'rgba(26,26,24,0.12)' }} />
            )}

            {/* Project Row */}
            <div
              className="group cursor-pointer block w-full hover:bg-black/[0.02] transition-colors duration-500"
              onMouseEnter={() => handleHoverEnter(project.id, project.images)}
              onMouseLeave={handleHoverLeave}
            >
              <div className="py-5 md:py-8 lg:py-10 flex items-center justify-center relative">
                <span
                  className="text-2xl md:text-3xl lg:text-4xl text-center transition-all duration-500 ease-out"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontWeight: 400,
                    color: hoveredId === project.id ? '#1A1A18' : 'rgba(26,26,24,0.25)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                  <sup
                    className="ml-1 text-xs md:text-sm relative -top-4 md:-top-6 transition-colors duration-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      color: hoveredId === project.id ? '#B8955D' : 'rgba(26,26,24,0.2)',
                    }}
                  >
                    {project.images.length}
                  </sup>
                </span>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-px w-full" style={{ background: 'rgba(26,26,24,0.12)' }} />
          </div>
        ))}
      </div>

      {/* Floating Hover Image */}
      <div
        className="absolute pointer-events-none z-30"
        style={{
          left: `${smoothPos.x}px`,
          top: `${smoothPos.y}px`,
          transform: 'translate(-50%, -70%)',
          willChange: 'left, top, opacity, transform',
        }}
      >
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl"
          style={{
            width: '280px',
            height: '200px',
            opacity: hoveredId ? 1 : 0,
            transform: hoveredId ? 'scale(1) rotate(-2deg)' : 'scale(0.7) rotate(0deg)',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {currentImageSrc && (
            <img
              src={currentImageSrc}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredId ? 'scale(1.05)' : 'scale(1.2)',
              }}
            />
          )}
          {/* Subtle border overlay */}
          <div className="absolute inset-0 rounded-lg border border-white/20" />
        </div>
      </div>

    </section>
  );
};

const ProjectsPage = () => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      <div className="fixed inset-0 w-full h-screen flex flex-col justify-end overflow-hidden z-0">
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
        <div ref={heroContentRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20 md:pb-28 pt-32">
          
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
            className="text-4xl md:text-5xl lg:text-[4.5rem] text-white tracking-tight mb-8 leading-[1.08] max-w-4xl drop-shadow-lg"
            style={{ fontWeight: 500, ...getVaporizeStyle(scrollProgress, 0.1, 0.65) }}
          >
            Our Award-Winning
            <br />
            Stone Projects Worldwide
          </h1>

          {/* Meta Info Row — dissolves last (0.15 → 0.75) */}
          <div
            className="flex flex-wrap items-center gap-6 text-sm text-white/80 font-mono border-t border-white/20 pt-6 max-w-3xl"
            style={getVaporizeStyle(scrollProgress, 0.15, 0.75)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DFBA73]/20 flex items-center justify-center border border-[#DFBA73]/30">
                <User size={14} className="text-[#DFBA73]" />
              </div>
              <span className="font-medium">Stone India Team</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#DFBA73]" />
              25+ Countries
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
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#B8955D] hover:text-white hover:border-[#B8955D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8955D]"
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
      <div className="h-screen" aria-hidden="true" />

      {/* ---------------------------------------------------------------
          SCROLLABLE CONTENT — Slides up over the fixed hero
      ---------------------------------------------------------------- */}
      <div className="relative z-10 bg-white">
        {/* Fractured Stone Edge — top of the white content */}
        <FractureEdge fill="#FFFFFF" />

        {/* ── PROJECT INDEX — Hover-reveal gallery ── */}
        <ProjectHoverIndex projects={projects} />

        {/* ── Detailed Project Sections ── */}
        {projects.map((project, index) => (
          <InteractiveSelector 
            key={project.id}
            title={project.title}
            description={project.description}
            images={project.images}
          />
        ))}

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

