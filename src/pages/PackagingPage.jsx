import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Header } from "@/components/ui/header-3";
import { Package, ShieldCheck, Truck, Tag, Box, Settings, CheckCircle2, Globe } from 'lucide-react';

const packagingFeatures = [
  {
    title: "High-Quality Crates",
    description: "All products are packed in high-quality wooden crates that are chemically treated to prevent termite damage and ensure long-term durability.",
    icon: Box,
  },
  {
    title: "Reinforced Strapping",
    description: "Each crate is reinforced with sturdy belts for added strength and shrink-wrapped to protect against dust, moisture, and external elements.",
    icon: Settings,
  },
  {
    title: "Thermocol Shielding",
    description: "Thermocol sheets are placed on all sides of the crates to provide extra protection, especially for sawn and shot-blasted paving stones.",
    icon: ShieldCheck,
  },
  {
    title: "Clear Labeling",
    description: "Every crate is properly labeled before being loaded into the container for seamless identification and handling.",
    icon: Tag,
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

/* ── Scroll-driven vaporize style calculator ── */
const getVaporizeStyle = (scrollProgress, staggerStart = 0, staggerEnd = 1) => {
  const localProgress = Math.min(1, Math.max(0, (scrollProgress - staggerStart) / (staggerEnd - staggerStart)));
  const eased = localProgress < 0.5
    ? 4 * localProgress * localProgress * localProgress
    : 1 - Math.pow(-2 * localProgress + 2, 3) / 2;

  return {
    opacity: 1 - eased,
    transform: `translateY(${-eased * 60}px) scale(${1 + eased * 0.08})`,
    filter: `blur(${eased * 12}px)`,
    transition: 'none',
    willChange: 'opacity, transform, filter',
  };
};

const PackagingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const dissolveDistance = viewportHeight * 0.6;
    const progress = Math.min(1, Math.max(0, scrollY / dissolveDistance));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#111] relative">
      <Header />

      {/* ══════════════════════════════════════
          FIXED HERO — Stays in place while content scrolls over it
      ══════════════════════════════════════ */}
      <div className="fixed inset-0 w-full h-[100svh] flex flex-col justify-end overflow-hidden z-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="img/packaging_hero_premium.png"
            alt="Packaging and Export"
            className="w-full h-full object-cover brightness-[0.55] contrast-[0.9] grayscale-[15%] motion-safe:animate-[projectHeroIn_1.4s_ease-out]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/60 to-[#0A0A08]/10" />
        </div>

        {/* Hero Content — each element vaporizes on scroll with staggered timing */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 md:pb-32 pt-24 sm:pt-32">
          
          {/* Back button — dissolves first (0.0 → 0.4) */}
          <div style={getVaporizeStyle(scrollProgress, 0.0, 0.4)}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium mb-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73] rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 shadow-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Badges — dissolves next (0.1 → 0.6) */}
          <div 
            className="flex flex-wrap gap-3 mb-6"
            style={getVaporizeStyle(scrollProgress, 0.1, 0.6)}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-[#DFBA73] uppercase">
              Global Standards
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-white uppercase">
              ISPM-15 Certified
            </span>
          </div>

          {/* Main Headline — dissolves late (0.3 → 0.8) */}
          <h1 
            className="text-[2.2rem] sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 sm:mb-8 drop-shadow-lg max-w-4xl"
            style={getVaporizeStyle(scrollProgress, 0.3, 0.8)}
          >
            Premium
            <br />
            <span className="text-[#DFBA73]">Packaging.</span>
          </h1>

          {/* Subtext and stats — dissolves last (0.5 → 1.0) */}
          <div 
            className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between border-t border-white/10 pt-8"
            style={getVaporizeStyle(scrollProgress, 0.5, 1.0)}
          >
            <p className="text-white/70 max-w-xl text-sm leading-relaxed">
              At Stone India, we have a dedicated stone packaging unit with skilled staff ensuring that every stone is packed with extreme care and in compliance with international packaging standards. We understand that our business is built on aesthetics and quality, making secure and reliable packaging a top priority.
            </p>
            <div className="flex gap-6 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#DFBA73]" />
                </div>
                <span className="text-white/90 text-sm font-medium">Zero Damage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SCROLLING CONTENT — Slides up over the hero
      ══════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-white mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <FractureEdge fill="#ffffff" />
        
        {/* Main Content Grid */}
        <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 max-w-5xl mx-auto px-6 text-center">
        
        {/* Secure and Durable Section */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Secure & Durable Packaging</h2>
            <div className="w-16 h-1 bg-[#B8955D] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packagingFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm hover:shadow-[0_15px_30px_rgba(245,214,62,0.1)] hover:border-[#B8955D]/30 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-5 group-hover:bg-[#B7945D] group-hover:text-white text-[#B8955D] transition-colors duration-300 group-hover:scale-110">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Split Section: Factory Stuffing & Customization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          
          {/* Factory Stuffing */}
          <div className="bg-white flex flex-col h-full rounded-2xl p-8 border border-[#EDEDE9] shadow-sm relative overflow-hidden group hover:border-[#B8955D]/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:bg-[#B7945D] group-hover:text-white transition-colors duration-300">
                <Truck size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight">Factory Stuffing <br/>& Safe Transit</h3>
            </div>
            <p className="text-[#666] text-base leading-relaxed mb-8 flex-grow">
              We have in-house factory stuffing facilities at our yard, ensuring that stones are carefully packed to minimize breakage during transportation. This guarantees that our materials reach clients in pristine condition, no matter the destination.
            </p>
            <div className="w-full h-56 rounded-xl overflow-hidden shadow-sm mt-auto">
              <img src="/img/packaging/1.webp" alt="Factory Stuffing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Customization & Branding */}
          <div className="bg-white flex flex-col h-full rounded-2xl p-8 border border-[#EDEDE9] shadow-sm relative overflow-hidden group hover:border-[#B8955D]/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:bg-[#B7945D] group-hover:text-white transition-colors duration-300">
                <Tag size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight">Customization <br/>& Branding</h3>
            </div>
            <p className="text-[#666] text-base leading-relaxed mb-8 flex-grow">
              For clients who require custom branding, we offer logo and name printing on crates at a nominal charge, helping businesses maintain their identity even during shipment.
            </p>
            <div className="w-full h-56 rounded-xl overflow-hidden grid grid-cols-2 gap-3 mt-auto">
               <div className="overflow-hidden rounded-lg shadow-sm"><img src="/img/packaging/m1.webp" alt="Custom Branding 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
               <div className="overflow-hidden rounded-lg shadow-sm"><img src="/img/packaging/m2.webp" alt="Custom Branding 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            </div>
          </div>

        </div>

        {/* Image Gallery */}
        <div className="mb-20">
           <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Packaging Gallery</h2>
            <div className="w-12 h-1 bg-[#B8955D] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="rounded-2xl overflow-hidden h-56 shadow-sm border border-[#EDEDE9]"><img src="/img/packaging/m3.webp" alt="Packaging 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
             <div className="rounded-2xl overflow-hidden h-56 shadow-sm border border-[#EDEDE9]"><img src="/img/packaging/m4.webp" alt="Packaging 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
             <div className="rounded-2xl overflow-hidden h-56 shadow-sm border border-[#EDEDE9] md:col-span-1 col-span-2"><img src="/img/packaging/m5.webp" alt="Packaging 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-[#111] rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-lg group hover:shadow-[0_20px_50px_rgba(245,214,62,0.15)] transition-shadow duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[300px] bg-[#B8955D]/20 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#B8955D]/10 flex items-center justify-center mb-6 border border-[#B8955D]/30 group-hover:scale-110 transition-transform duration-500">
               <CheckCircle2 size={32} className="text-[#B8955D]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.12]">Commitment to Excellence</h2>
            <p className="text-sm sm:text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
              At Stone India, we go the extra mile to ensure safe, secure, and premium-quality packaging, reinforcing our commitment to excellence in every shipment.
            </p>
          </div>
        </div>
        </section>
      </div>

      <Footer />
      
      {/* End of scrolling content overlay */}
    </div>
  );
};

export default PackagingPage;
