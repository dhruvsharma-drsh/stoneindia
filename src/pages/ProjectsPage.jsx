import React, { useEffect, useState, useRef } from 'react';
import InteractiveSelector from '@/components/ui/interactive-selector';
import Footer from '@/components/Footer';
import { Globe, Award, ShieldCheck, Sparkles } from 'lucide-react';

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

const ProjectsPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [elements, setElements] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Generate particles (drifting left to right)
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: `p-${i}`,
      type: 'particle',
      top: `${Math.random() * 100}%`,
      left: `-${Math.random() * 20}%`,
      size: Math.random() * 4 + 2,
      animationDuration: `${Math.random() * 20 + 20}s`,
      animationDelay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Generate bubbles (floating bottom to top)
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: `b-${i}`,
      type: 'bubble',
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 20}%`,
      size: Math.random() * 15 + 8, // larger size for bubbles
      animationDuration: `${Math.random() * 15 + 15}s`,
      animationDelay: `-${Math.random() * 15}s`,
      opacity: Math.random() * 0.3 + 0.05,
    }));

    setElements([...newParticles, ...newBubbles]);
  }, []);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Interactive Light Luxury Hero */}
      <div 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full text-center pt-36 pb-24 md:pt-48 md:pb-32 bg-white overflow-hidden border-b border-[#EDEDE9]"
      >
        
        {/* Dynamic Cursor Light Flare */}
        <div 
          className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(184,149,93,0.04)_0%,transparent_60%)] rounded-full pointer-events-none transition-transform duration-75 ease-out z-0"
          style={{
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          }}
        />

        {/* Animated Background Elements (Light Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#B8955D]/10 blur-[100px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-[#FAFAF8] blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          
          {/* INTERACTIVE SPOTLIGHT GRID: Only reveals the grid where the mouse is */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(184,149,93,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(184,149,93,0.15)_1px,transparent_1px)] bg-[size:50px_50px] transition-all duration-75 ease-out"
            style={{
              WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
            }}
          ></div>
          
          {/* Interactive Floating Particles and Bubbles */}
          {elements.map((el) => (
            <div
              key={el.id}
              className={`absolute ${el.type === 'particle' ? 'animate-float-right' : 'animate-float-up'}`}
              style={{
                left: el.left,
                top: el.type === 'particle' ? el.top : 'auto',
                bottom: el.type === 'bubble' ? el.bottom : 'auto',
                animationDuration: el.animationDuration,
                animationDelay: el.animationDelay,
              }}
            >
              <div
                className={`rounded-full ${el.type === 'particle' ? 'bg-[#B8955D] shadow-[0_0_10px_rgba(184,149,93,0.5)]' : 'border border-[#B8955D]/30 bg-[#B8955D]/5 backdrop-blur-sm'}`}
                style={{
                  width: `${el.size}px`,
                  height: `${el.size}px`,
                  opacity: el.opacity,
                  // Parallax effect based on mouse
                  transform: `translate(${(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth/2 : 0)) * (el.size * -0.005)}px, ${(mousePos.y - (typeof window !== 'undefined' ? window.innerHeight/2 : 0)) * (el.size * -0.005)}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Interactive Badges (Light Theme) */}
        <div className="absolute top-[25%] left-[8%] hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-[#EDEDE9] shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-float hover:shadow-[0_20px_50px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-3 rounded-full bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <Globe size={24} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-extrabold text-sm tracking-wide">25+ Countries</div>
            <div className="text-[#666] text-xs font-medium">Global Reach</div>
          </div>
        </div>

        <div className="absolute top-[35%] right-[8%] hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-[#EDEDE9] shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-float-delayed hover:shadow-[0_20px_50px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-3 rounded-full bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <Award size={24} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-extrabold text-sm tracking-wide">Award Winning</div>
            <div className="text-[#666] text-xs font-medium">Premium Quality</div>
          </div>
        </div>
        
        <div className="absolute bottom-[20%] left-[15%] hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-[#EDEDE9] shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-float-fast hover:shadow-[0_20px_50px_rgba(184,149,93,0.15)] hover:border-[#B8955D]/30 transition-all cursor-pointer group z-10 hover:scale-105">
          <div className="p-3 rounded-full bg-[#FAFAF8] text-[#B8955D] group-hover:scale-110 group-hover:bg-[#B8955D] group-hover:text-white transition-all">
            <ShieldCheck size={24} />
          </div>
          <div className="text-left">
            <div className="text-[#111] font-extrabold text-sm tracking-wide">100% Verified</div>
            <div className="text-[#666] text-xs font-medium">Authentic Stone</div>
          </div>
        </div>

        {/* Main Content (Stationary Text, No Parallax) */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 mt-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#EDEDE9] bg-white mb-8 shadow-[0_4px_15px_rgba(0,0,0,0.03)] animate-fade-in-up hover:scale-105 hover:border-[#B8955D]/40 hover:shadow-[0_4px_15px_rgba(184,149,93,0.1)] transition-all duration-300 cursor-pointer group">
            <Sparkles size={14} className="text-[#B8955D]" />
            <span className="text-[11px] tracking-[0.25em] text-[#B8955D] font-bold uppercase">
              Interactive Portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#111] mb-6 tracking-tighter animate-fade-in-up animation-delay-200 leading-tight">
            Our <span className="text-[#B8955D] hover:drop-shadow-[0_0_15px_rgba(184,149,93,0.4)] inline-block transition-all duration-300 cursor-default hover:scale-105">Projects</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#666] font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Discover our award-winning natural stone applications across premier residential and commercial destinations worldwide.
          </p>
        </div>

        <style>{`
          @keyframes floatRight {
            0% { transform: translateX(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(120vw) scale(1.5); opacity: 0; }
          }
          .animate-float-right {
            animation: floatRight linear infinite;
          }

          @keyframes floatUpBubble {
            0% { transform: translateY(0) scale(0.8); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
          }
          .animate-float-up {
            animation: floatUpBubble linear infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s infinite ease-in-out;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 7s ease-in-out infinite 2s;
          }
          .animate-float-fast {
            animation: float 5s ease-in-out infinite 1s;
          }
          
          @keyframes pan-bg-light {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          .animate-pan-bg-light {
            animation: pan-bg-light 40s linear infinite;
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-600 { animation-delay: 0.6s; }
          
          @keyframes gradientX {
            0%, 100% { background-size: 200% 200%; background-position: left center; }
            50% { background-size: 200% 200%; background-position: right center; }
          }
          .animate-gradient-x {
            animation: gradientX 4s ease-in-out infinite;
          }
        `}</style>
      </div>

      {/* Project Sections */}
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
  );
};

export default ProjectsPage;
