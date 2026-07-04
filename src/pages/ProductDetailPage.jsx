import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight, PhoneCall, ShieldCheck, Gem, Layers, ChevronRight, Play } from 'lucide-react';
import StoneProductsView from './StoneProductsView';

const DefaultProductView = () => {
  const { slug } = useParams();
  
  // Parallax scroll effect for hero
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen font-sans text-[#111] overflow-hidden">
      
      {/* 1. ULTRA-PREMIUM HERO SECTION */}
      <div ref={heroRef} className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#111]">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img 
            src="/img/teakwood_sandstone.png" 
            alt="Sandstone Circle Background" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/40 to-[#FAFAF8]"></div>
        </div>

        {/* Floating Particles/Dust (CSS animated) */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url("/img/finitures_texture.png")', backgroundSize: 'cover' }}></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse"></span>
            <span className="text-xs tracking-[0.2em] text-[#DFBA73] font-bold uppercase">Premium Stone Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-6 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Sandstone Circle
          </h1>
          
          <p className="text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Create breathtaking focal points in gardens and pathways with our masterfully crafted natural stone circles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <a href="#contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-bold text-sm tracking-wider uppercase hover:scale-105 hover:shadow-[0_0_40px_rgba(184,149,93,0.5)] transition-all duration-300 flex items-center gap-2">
              <PhoneCall size={18} /> Request Wholesale Quote
            </a>
            <button className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-black transition-colors backdrop-blur-sm flex items-center gap-2 group">
              <Play size={18} className="group-hover:scale-110 transition-transform" /> Watch Crafting Process
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-[#FAFAF8] border-b border-[#EDEDE9] py-4 sticky top-0 z-40 backdrop-blur-xl bg-[#FAFAF8]/90">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888]">
          <Link to="/" className="hover:text-[#B8955D] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-[#B8955D] transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-[#B8955D] font-bold">Sandstone Circle</span>
        </div>
      </div>

      {/* 2. MAIN INTRODUCTION - ASYMMETRIC BENTO LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-serif text-[#111] leading-[1.1]">
              If you have been looking for the <span className="text-[#B8955D] italic">best quality</span> Natural Stone.
            </h2>
            
            <div className="prose prose-lg prose-stone text-[#666] font-light">
              <p>
                Serving diverse construction project requirements, we offer Sandstone circles in India in various types: Green, Grey, Kandla Grey, Mint, Modak, Yellow, and more. These circles come in different sizes, patterns, and colors with a flawless, seamless finish.
              </p>
              <p>
                Sandstone circles look stunning in a paving area, and when laid on their own in a garden, they create a breathtaking appearance. They are widely popular for supreme strength, UV resistance, and the prevention of abrasion and weather impacts.
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#EDEDE9]">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-[#111]">15+</span>
                <span className="text-xs font-mono text-[#888] uppercase tracking-wider">Color Variations</span>
              </div>
              <div className="w-px bg-[#EDEDE9]"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-[#111]">100%</span>
                <span className="text-xs font-mono text-[#888] uppercase tracking-wider">Natural Stone</span>
              </div>
              <div className="w-px bg-[#EDEDE9]"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-serif text-[#111]">UV</span>
                <span className="text-xs font-mono text-[#888] uppercase tracking-wider">Resistant Finish</span>
              </div>
            </div>
          </div>

          {/* Right Images (Overlapping Bento) */}
          <div className="lg:col-span-7 relative h-[600px]">
            {/* Main large image */}
            <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10 group">
              <img src="/img/sagar_black.png" alt="Sagar Black Sandstone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            {/* Floating small image */}
            <div className="absolute bottom-0 left-0 w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-20 border-8 border-[#FAFAF8] group animate-float-slow">
              <img src="/img/gwalior_mint.png" alt="Gwalior Mint" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            </div>
            {/* Trust Badge */}
            <div className="absolute top-12 left-8 z-30 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float-delayed">
              <div className="w-12 h-12 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#B8955D]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-mono text-[#888] uppercase">Certified</p>
                <p className="font-bold text-[#111]">Wholesale Supplier</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PARALLAX CTA BANNER */}
      <div className="relative py-32 flex items-center justify-center overflow-hidden bg-[#111]">
        <div className="absolute inset-0 z-0">
          <img src="/img/stone_showroom_1782890436816.png" alt="Stone Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[#111]/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <ShieldCheck size={48} className="text-[#B8955D] mb-8" />
          <h3 className="text-sm font-mono text-[#DFBA73] uppercase tracking-[0.3em] mb-4">Stone India</h3>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">A Name To <span className="italic font-light">Trust!</span></h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            We supply top-notch quality natural stone to customers across India and globally. Dealing in bulk orders allows us to provide unmatched quality at the most reasonable charges.
          </p>
          <a href="#contact" className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-[#B8955D] hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2">
            Contact Us Today <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* 4. FEATURES SECTION - MODERN GLASSMORPHISM */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B8955D]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Feature Image with interactive hotspots */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
             <img src="/img/kota_blue.png" alt="Sandstone Patterns" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#111]/60 to-transparent"></div>
             
             {/* Overlay Text */}
             <div className="absolute bottom-12 left-12 right-12">
               <h3 className="text-3xl font-serif text-white mb-4">Masterful Craftsmanship</h3>
               <p className="text-white/80 font-light">Every circle is precisely cut to ensure a seamless interlocking pattern upon installation.</p>
             </div>
          </div>

          {/* Right Features List */}
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-serif text-[#111] leading-[1.1]">
              We Offer A Wide Range <br/><span className="text-[#B8955D] italic">Of Patterns</span>
            </h2>
            
            <p className="text-[#666] font-light leading-relaxed text-lg">
              Stone India sandstone circles upgrade any property with stunning color blends. They are the ultimate product for decorative landscaping, introducing cultural and architectural significance to your outdoor spaces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {[
                { icon: Layers, text: "Lightweight & Easy to lay" },
                { icon: Gem, text: "Beautiful natural shine" },
                { icon: ShieldCheck, text: "Extremely durable structure" },
                { icon: CheckCircle2, text: "Creates vibrant landscaping" },
                { icon: CheckCircle2, text: "Uniform texture & color" },
                { icon: CheckCircle2, text: "Available in custom sizes" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#EDEDE9] hover:border-[#B8955D]/50 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-full bg-[#FAFAF8] flex items-center justify-center group-hover:bg-[#B8955D] group-hover:text-white text-[#B8955D] transition-colors">
                    <feature.icon size={18} />
                  </div>
                  <span className="font-medium text-[#111] text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="text-[#B8955D] font-bold tracking-widest uppercase text-sm flex items-center gap-2 hover:gap-4 transition-all">
                Download Product Catalog <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out 4s infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

import MosaicStoneTilesView from './MosaicStoneTilesView';
import WallCladdingView from './WallCladdingView';
import SandstoneCircleView from './SandstoneCircleView';
import GwaliorMintCobblesView from './GwaliorMintCobblesView';
import SteppingStoneTilesView from './SteppingStoneTilesView';
import MintFlagstoneTilesView from './MintFlagstoneTilesView';
import GwaliorMintStoneElevationView from './GwaliorMintStoneElevationView';
import MintStoneBlocksView from './MintStoneBlocksView';
import SandstonePalisadeView from './SandstonePalisadeView';
import GwaliorMintSandstoneSlabsView from './GwaliorMintSandstoneSlabsView';
import WallPanelView from './WallPanelView';
import FossilMintNaturalStoneView from './FossilMintNaturalStoneView';
import StoneFiguresView from './StoneFiguresView';
import SandstoneJaaliView from './SandstoneJaaliView';
import StonePlantersView from './StonePlantersView';
import SandstoneBallsView from './SandstoneBallsView';
import SandstoneBenchesView from './SandstoneBenchesView';
import StoneWaterfallsView from './StoneWaterfallsView';

import GwaliorSandstoneView from './GwaliorSandstoneView';
import GwaliorMintWhiteSandstoneView from './GwaliorMintWhiteSandstoneView';
import GwaliorMintYellowSandstoneView from './GwaliorMintYellowSandstoneView';
import KatniGreySandstoneView from './KatniGreySandstoneView';
import KatniYellowSandstoneView from './KatniYellowSandstoneView';
import LalitpurYellowSandstoneView from './LalitpurYellowSandstoneView';
import MintFossilIndianSandstoneView from './MintFossilIndianSandstoneView';
import ModakSandstoneView from './ModakSandstoneView';
import SagarBlackSandstoneView from './SagarBlackSandstoneView';
import TeakwoodSandstoneView from './TeakwoodSandstoneView';
import RainbowSandstoneView from './RainbowSandstoneView';
import DesertMintSandstoneView from './DesertMintSandstoneView';
import ShivpuriSandstoneView from './ShivpuriSandstoneView';

const ProductDetailPage = () => {
  const { slug } = useParams();
  
  if (slug === 'stone-products') {
    return <StoneProductsView />;
  }

  if (slug === 'shivpuri-sandstone') {
    return <ShivpuriSandstoneView />;
  }

  if (slug === 'desert-mint-sandstone') {
    return <DesertMintSandstoneView />;
  }

  if (slug === 'rainbow-sandstone') {
    return <RainbowSandstoneView />;
  }

  if (slug === 'teakwood-sandstone') {
    return <TeakwoodSandstoneView />;
  }

  if (slug === 'sagar-black-sandstone') {
    return <SagarBlackSandstoneView />;
  }

  if (slug === 'modak-sandstone') {
    return <ModakSandstoneView />;
  }

  if (slug === 'mint-fossil-indian-sandstone') {
    return <MintFossilIndianSandstoneView />;
  }

  if (slug === 'lalitpur-yellow-sandstone') {
    return <LalitpurYellowSandstoneView />;
  }

  if (slug === 'katni-yellow-sandstone') {
    return <KatniYellowSandstoneView />;
  }

  if (slug === 'katni-grey-sandstone') {
    return <KatniGreySandstoneView />;
  }

  if (slug === 'gwalior-mint-yellow-sandstone') {
    return <GwaliorMintYellowSandstoneView />;
  }

  if (slug === 'gwalior-mint-white-sandstone') {
    return <GwaliorMintWhiteSandstoneView />;
  }

  if (slug === 'gwalior-sandstone') {
    return <GwaliorSandstoneView />;
  }

  if (slug === 'mosaic-stone-tiles') {
    return <MosaicStoneTilesView />;
  }

  if (slug === 'wall-cladding') {
    return <WallCladdingView />;
  }

  if (slug === 'sandstone-circle') {
    return <SandstoneCircleView />;
  }

  if (slug === 'gwalior-mint-cobbles' || slug === 'mint-cobbles') {
    return <GwaliorMintCobblesView />;
  }

  if (slug === 'stepping-stone-tiles' || slug === 'stepping-stones') {
    return <SteppingStoneTilesView />;
  }

  if (slug === 'mint-flagstone-tiles' || slug === 'mint-flagstones-tiles' || slug === 'mint-flagstones') {
    return <MintFlagstoneTilesView />;
  }

  if (slug === 'gwalior-mint-stone-elevation' || slug === 'mint-stone-elevation') {
    return <GwaliorMintStoneElevationView />;
  }

  if (slug === 'wall-panel') {
    return <WallPanelView />;
  }

  if (slug === 'fossil-mint-natural-stone') {
    return <FossilMintNaturalStoneView />;
  }
  
  if (slug === 'mint-stone-blocks') {
    return <MintStoneBlocksView />;
  }

  if (slug === 'sandstone-palisade') {
    return <SandstonePalisadeView />;
  }

  if (slug === 'gwalior-mint-sandstone-slabs' || slug === 'mint-sandstone-slabs') {
    return <GwaliorMintSandstoneSlabsView />;
  }

  if (slug === 'stone-figures') {
    return <StoneFiguresView />;
  }

  if (slug === 'sandstone-jaali') {
    return <SandstoneJaaliView />;
  }

  if (slug === 'stone-planters') {
    return <StonePlantersView />;
  }

  if (slug === 'sandstone-balls') {
    return <SandstoneBallsView />;
  }

  if (slug === 'sandstone-benches') {
    return <SandstoneBenchesView />;
  }

  if (slug === 'stone-waterfalls') {
    return <StoneWaterfallsView />;
  }

  return <DefaultProductView />;
};

export default ProductDetailPage;
