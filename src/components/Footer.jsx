import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaWhatsapp, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF, FaPinterestP, FaXTwitter } from "react-icons/fa6";
import { Sparkles, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#111111] text-white overflow-hidden border-t border-white/10 pt-8 pb-6 group/footer">
      {/* Subtle background ambient lighting - pulses smoothly on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] bg-[#B8955D]/10 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 group-hover/footer:bg-[#DFBA73]/20 group-hover/footer:blur-[120px]" />

      {/* Giant Watermark - stacked on two lines in a zig-zag manner */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-end font-editorial text-[15vw] sm:text-[12vw] lg:text-[10vw] text-white/[0.02] font-light select-none pointer-events-none leading-[0.85] transition-all duration-700 group-hover/footer:text-white/[0.04]">
        <span className="-translate-x-[25%] sm:-translate-x-[35%]">GWALIOR</span>
        <span className="translate-x-[25%] sm:translate-x-[35%]">STONE</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 lg:gap-8 pb-6 border-b border-white/10">

          {/* Brand & Heritage Col */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-3 group">
              <img 
                src="/img/stone_logo_rock.png" 
                alt="Gwalior Stone Logo" 
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-110" 
                onError={(e) => { e.currentTarget.src = "/img/logo.png"; }}
              />
              <div>
                <h3 className="font-editorial text-lg tracking-widest text-white uppercase font-bold">
                  Gwalior Stone
                </h3>
                <span className="font-sans text-[8px] tracking-[0.3em] text-[#B8955D] uppercase block font-semibold">
                  Natural Luxury Surfaces
                </span>
              </div>
            </div>

            <p className="font-sans text-[11px] sm:text-xs text-white/70 font-light max-w-sm leading-relaxed mb-4">
              Mastering quarry direct excavation and precision engineering of India's finest Sandstone, Marble, Granite, and Bespoke Architectural Surfaces since 1984.
            </p>

            {/* Glowing Social Icons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:info@stoneindia.co"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#DFBA73] hover:border-[#DFBA73] hover:text-[#111111] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(223,186,115,0.4)]"
                aria-label="Email Us"
              >
                <FaEnvelope className="text-xs" />
              </a>
              <a
                href="https://wa.me/919371013666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#DFBA73] hover:border-[#DFBA73] hover:text-[#111111] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(223,186,115,0.4)]"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3">
            <h4 className="font-editorial text-sm text-[#B8955D] font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Navigation
            </h4>
            <ul className="space-y-2 font-sans text-[11px] sm:text-xs font-light text-white/80">
              <li><Link to="/" className="group flex items-center gap-2 hover:text-[#DFBA73] transition-all duration-300 hover:translate-x-1.5"><ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#DFBA73]" /> Home</Link></li>
              <li><Link to="/about" className="group flex items-center gap-2 hover:text-[#DFBA73] transition-all duration-300 hover:translate-x-1.5"><ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#DFBA73]" /> Our Quarry Heritage</Link></li>
              <li><Link to="/products" className="group flex items-center gap-2 hover:text-[#DFBA73] transition-all duration-300 hover:translate-x-1.5"><ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#DFBA73]" /> Natural Stone Collection</Link></li>
              <li><Link to="/design-system" className="group flex items-center gap-2 hover:text-[#DFBA73] transition-all duration-300 hover:translate-x-1.5"><ArrowUpRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#DFBA73]" /> Design System</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4">
            <h4 className="font-editorial text-sm text-[#B8955D] font-semibold uppercase tracking-wider mb-3">
              Headquarter
            </h4>
            <div className="space-y-3 sm:space-y-2.5 font-sans text-[11px] sm:text-xs font-light text-white/80">
              <a
                href="https://www.google.com/maps/search/?api=1&query=C-56+industrial+area+banmore,+Morena,+Madhya+Pradesh+476444"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-white transition-colors duration-300 relative z-20"
              >
                <FaMapMarkerAlt className="text-[#B8955D] mt-0.5 flex-shrink-0 text-[10px] transition-transform duration-300 group-hover:scale-125 group-hover:text-[#DFBA73]" />
                <span className="group-hover:underline underline-offset-4 decoration-white/30">C-56 industrial area banmore, Morena, Madhya Pradesh 476444</span>
              </a>
              
              <div className="flex items-center gap-2 group relative z-20">
                <FaPhoneAlt className="text-[#B8955D] flex-shrink-0 text-[10px] transition-transform duration-300 group-hover:scale-125 group-hover:text-[#DFBA73]" />
                <span className="transition-colors duration-300 group-hover:text-white flex flex-wrap gap-x-1">
                  <a href="tel:+919371013666" className="hover:underline underline-offset-4 decoration-white/50">+91 937 101 3666</a> 
                  <span className="hidden sm:inline">/</span>
                  <a href="tel:+919826058456" className="hover:underline underline-offset-4 decoration-white/50">+91 982 605 8456</a>
                </span>
              </div>
              
              <a
                href="mailto:info@stoneindia.co"
                className="flex items-center gap-2 group hover:text-white transition-colors duration-300 relative z-20"
              >
                <FaEnvelope className="text-[#B8955D] flex-shrink-0 text-[10px] transition-transform duration-300 group-hover:scale-125 group-hover:text-[#DFBA73]" />
                <span className="group-hover:underline underline-offset-4 decoration-white/30">info@stoneindia.co</span>
              </a>
            </div>

            <div className="mt-5 sm:mt-4 pt-4 sm:pt-3 border-t border-white/10 group">
              <span className="font-mono text-[9px] text-[#B8955D] font-semibold uppercase tracking-widest block mb-1.5 sm:mb-1 transition-colors duration-300 group-hover:text-[#DFBA73]">
                Quarry Operations
              </span>
              <p className="font-sans text-[10px] text-white/60 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                Direct export shipments from Mundra & Mumbai Port to over 50 countries worldwide.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-5 sm:pt-4 flex items-center justify-center sm:justify-start text-[10px] sm:text-[11px] font-sans text-white/50 text-center sm:text-left">
          <p>© 2026 Gwalior Stone Pvt. Ltd. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
