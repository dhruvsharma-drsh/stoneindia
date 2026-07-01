import React, { useEffect, useState, useRef } from 'react';
import Footer from '@/components/Footer';
import DotGrid from '@/components/ui/DotGrid';
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

const PackagingPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [floatingIcons, setFloatingIcons] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Generate background floating icons (boxes for packaging theme)
    const icons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 30 + 15,
      animationDuration: `${Math.random() * 20 + 15}s`,
      animationDelay: `-${Math.random() * 15}s`,
    }));
    setFloatingIcons(icons);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen font-sans text-[#111] relative" onMouseMove={handleMouseMove}>
      
      {/* GLOBAL INTERACTIVE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dynamic Cursor Light Flare */}
        <div 
          className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(184,149,93,0.04)_0%,transparent_50%)] rounded-full transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          }}
        />
        {/* Floating Packaging Icons */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute animate-float-up opacity-20"
            style={{
              left: icon.left,
              top: icon.top,
              animationDuration: icon.animationDuration,
              animationDelay: icon.animationDelay,
              transform: `translate(${(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth/2 : 0)) * (icon.size * -0.002)}px, ${(mousePos.y - (typeof window !== 'undefined' ? window.innerHeight/2 : 0)) * (icon.size * -0.002)}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Box size={icon.size} className="text-[#B8955D]" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative pt-40 pb-28 md:pt-56 md:pb-40 px-6 overflow-hidden bg-white border-b border-[#EDEDE9] min-h-[75vh] flex flex-col justify-center">
        
        {/* Interactive Dot Grid Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <DotGrid 
            dotSize={3}
            gap={24}
            baseColor="#B8955D"
            activeColor="#B8955D"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        
        {/* Floating Interactive Badges (Left & Right) */}
        <div className="absolute top-[20%] left-[5%] hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#EDEDE9] shadow-sm animate-float hover:shadow-[0_15px_30px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-2.5 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <ShieldCheck size={20} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-bold text-sm">Secure Packing</div>
            <div className="text-[#666] text-xs font-medium">Zero Damage</div>
          </div>
        </div>

        <div className="absolute top-[35%] right-[5%] hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#EDEDE9] shadow-sm animate-float-delayed hover:shadow-[0_15px_30px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-2.5 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <Globe size={20} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-bold text-sm">Global Export</div>
            <div className="text-[#666] text-xs font-medium">Worldwide Shipping</div>
          </div>
        </div>
        
        <div className="absolute bottom-[15%] left-[10%] hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#EDEDE9] shadow-sm animate-float-fast hover:shadow-[0_15px_30px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-2.5 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <Box size={20} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-bold text-sm">Custom Crates</div>
            <div className="text-[#666] text-xs font-medium">ISPM-15 Certified</div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EDEDE9] bg-white mb-6 shadow-sm animate-fade-in-up hover:scale-105 hover:border-[#B8955D]/40 transition-all duration-300">
            <Package size={12} className="text-[#B8955D]" />
            <span className="text-[10px] tracking-[0.2em] text-[#B8955D] font-bold uppercase">
              Global Standards
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 animate-fade-in-up animation-delay-200">
            Our <span className="text-[#B8955D] inline-block hover:scale-105 transition-transform duration-300">Packaging</span>
          </h1>
          
          <p className="max-w-3xl text-base md:text-lg text-[#666] leading-relaxed animate-fade-in-up animation-delay-400">
            At Stone India, we have a dedicated stone packaging unit with skilled staff ensuring that every stone is packed with extreme care and in compliance with international packaging standards. We understand that our business is built on aesthetics and quality, making secure and reliable packaging a top priority.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        
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
                className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm hover:shadow-[0_15px_30px_rgba(184,149,93,0.1)] hover:border-[#B8955D]/30 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-5 group-hover:bg-[#B8955D] group-hover:text-white text-[#B8955D] transition-colors duration-300 group-hover:scale-110">
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
              <div className="p-3 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:bg-[#B8955D] group-hover:text-white transition-colors duration-300">
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
              <div className="p-3 rounded-xl bg-[#FAFAF8] text-[#B8955D] group-hover:bg-[#B8955D] group-hover:text-white transition-colors duration-300">
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
        <div className="bg-[#111] rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-lg group hover:shadow-[0_20px_50px_rgba(184,149,93,0.15)] transition-shadow duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[300px] bg-[#B8955D]/20 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#B8955D]/10 flex items-center justify-center mb-6 border border-[#B8955D]/30 group-hover:scale-110 transition-transform duration-500">
               <CheckCircle2 size={32} className="text-[#B8955D]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">Commitment to Excellence</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
              At Stone India, we go the extra mile to ensure safe, secure, and premium-quality packaging, reinforcing our commitment to excellence in every shipment.
            </p>
          </div>
        </div>

      </div>

      <Footer />
      
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: floatUp linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 2s infinite; }
        .animate-float-fast { animation: float 4s ease-in-out 1s infinite; }
      `}</style>
    </div>
  );
};

export default PackagingPage;
