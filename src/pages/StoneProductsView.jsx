import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { stoneProductsData } from '../data/stoneProductsData';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";

const StoneProductsView = () => {
  const { hero, trust, brands, grid } = stoneProductsData;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen font-sans text-[#111] overflow-x-hidden selection:bg-[#DFBA73] selection:text-white">
      
      {/* 1. Cinematic Fixed Hero - Light Premium Version */}
      <div className="fixed inset-0 w-full h-[100vh] flex items-center justify-center overflow-hidden z-0 pointer-events-none">
        {/* Background Image with Parallax & Fading */}
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
            opacity: Math.max(0.1, 1 - scrollY * 0.0015) 
          }}
        >
          <img 
            src={hero.image} 
            alt="Gwalior Stone" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/40 via-[#FAFAF8]/70 to-[#FAFAF8]"></div>
        </div>

        {/* Hero Text Overlay */}
        <div 
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start justify-center h-full pt-20"
          style={{
            transform: `translateY(${scrollY * -0.5}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.003)
          }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#B8955D]/30 bg-white/60 backdrop-blur-md mb-8 animate-fade-in-up shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B8955D] animate-pulse shadow-[0_0_10px_rgba(184,149,93,0.5)]"></span>
            <span className="text-xs tracking-[0.25em] text-[#B8955D] font-bold uppercase">Ultra-Premium Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#111] leading-[1.1] mb-6 tracking-tight animate-fade-in-up drop-shadow-sm" style={{ animationDelay: '100ms' }}>
            {hero.title.split('-')[0].trim()} <br/>
            <span className="text-[#B8955D] italic font-light">Natural Excellence</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-[#444] font-medium max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {hero.title.split('-')[1]?.trim() || "Get an Enticing Look with This Product"}
          </p>
        </div>
      </div>

      {/* Main Scrolling Content */}
      <div className="relative z-10 mt-[100vh] bg-[#FAFAF8] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        
        {/* Intro Text Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 border-b border-[#EDEDE9] relative">
          <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#B8955D]/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-[#111] leading-tight">
              An impressive aesthetic that adds <span className="text-[#B8955D] italic">luxury and beauty</span> to your space.
            </h2>
            <div className="flex flex-col gap-8">
              <p className="text-lg text-[#666] font-light leading-relaxed">
                {hero.desc1}
              </p>
              <div className="p-8 border border-[#EDEDE9] rounded-2xl bg-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#B8955D] to-[#DFBA73]"></div>
                <p className="text-[#444] leading-relaxed italic text-lg font-serif">
                  "{hero.desc2}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Parallax Section (Keeping this one slightly dark/rich for contrast, or light with strong shadow) */}
        <div className="relative py-40 flex items-center justify-center overflow-hidden border-b border-[#EDEDE9]">
          <div className="absolute inset-0 z-0">
            <img src={trust.image} alt="Trust Stone" className="w-full h-full object-cover opacity-15 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-transparent to-[#FAFAF8]"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
            <CheckCircle2 size={56} className="text-[#B8955D] mb-8" />
            <h3 className="text-sm font-mono text-[#B8955D] uppercase tracking-[0.4em] mb-6">{trust.subtitle}</h3>
            <h2 className="text-5xl md:text-7xl font-serif text-[#111] mb-10">
              {trust.title.replace('Trust!', '')} <span className="italic font-light text-[#B8955D]">Trust!</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#555] font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              {trust.text}
            </p>
            <a href="#contact" className="px-10 py-5 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-white font-bold text-sm tracking-widest uppercase hover:scale-105 hover:shadow-[0_15px_30px_rgba(184,149,93,0.3)] transition-all duration-500 flex items-center gap-3">
              Request A Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Brands Section (Asymmetric Bento) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 border-b border-[#EDEDE9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-10">
              <h2 className="text-4xl md:text-6xl font-serif text-[#111] leading-[1.1]">
                {brands.title.replace('Brands.', '')} <br />
                <span className="text-[#B8955D] italic">Brands.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-[#666] leading-relaxed text-lg font-light">
                  {brands.text1}
                </p>
                <p className="text-[#666] leading-relaxed text-lg font-light">
                  {brands.text2}
                </p>
              </div>
              <div className="pt-4">
                <a href="tel:+919425112100" className="inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 border-[#B8955D] text-[#B8955D] font-bold text-sm tracking-widest uppercase hover:bg-[#B8955D] hover:text-white transition-all duration-500 group">
                  <PhoneCall size={18} className="text-[#B8955D] group-hover:text-white transition-colors" /> 
                  +91 94251 12100
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] group">
              <img src={brands.image} alt="Top Gwalior Stone Brands" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-12 left-12 right-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white text-[#111] shadow-2xl">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-bold tracking-wide">Available for immediate dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. What We Do - Luxury Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B8955D]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#B8955D] mb-6 flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-[#B8955D]/50"></span>
                WHAT WE DO
                <span className="w-8 h-px bg-[#B8955D]/50"></span>
              </h3>
              <h2 className="text-5xl md:text-7xl font-serif text-[#111] mb-8">Our Main <span className="text-[#B8955D] italic">Category</span></h2>
              <p className="text-[#666] text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Explore our exquisite collection of premium stone products, meticulously crafted for architectural brilliance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {grid.map((item, idx) => (
              <div key={idx} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-[#EDEDE9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all duration-500 hover:-translate-y-2">
                
                {/* Image Container with inner shadow */}
                <div className="relative w-full h-72 overflow-hidden bg-[#FAFAF8]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
                  
                  {/* Floating Action Button on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-[#B8955D] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 ease-out z-20">
                    <ArrowRight size={24} className="-rotate-45" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-10 flex flex-col flex-grow items-start relative z-10 bg-white">
                  <h4 className="text-2xl font-serif text-[#111] mb-4 group-hover:text-[#B8955D] transition-colors">{item.title}</h4>
                  <p className="text-base text-[#666] font-light leading-relaxed mb-10 flex-grow">
                    {item.desc}
                  </p>
                  
                  <button className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#B8955D] group-hover:text-[#111] transition-colors mt-auto relative">
                    <span className="relative z-10">Discover More</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#111] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default StoneProductsView;
