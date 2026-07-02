import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaWhatsapp, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Sparkles, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#111111] text-white overflow-hidden border-t border-white/10 pt-16 sm:pt-24 pb-12">
      {/* Subtle background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-[#B8955D]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Giant Watermark */}
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-editorial text-[10rem] sm:text-[15rem] lg:text-[20rem] text-white/[0.02] font-light select-none pointer-events-none whitespace-nowrap leading-none">
        GWALIOR
      </span>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">

          {/* Brand & Heritage Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <img src="img/stone_logo_rock.png" alt="Gwalior Stone Logo" className="h-11 w-auto object-contain" />
                <div>
                  <h3 className="font-editorial text-2xl tracking-widest text-white uppercase font-bold">
                    Gwalior Stone
                  </h3>
                  <span className="font-sans text-[10px] tracking-[0.3em] text-[#B8955D] uppercase block font-semibold">
                    Natural Luxury Surfaces
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-white/70 font-light max-w-sm leading-relaxed mb-8">
                Mastering quarry direct excavation and precision engineering of India's finest Sandstone, Marble, Granite, and Bespoke Architectural Surfaces since 1984.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:info@gwaliorstone.com"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#B8955D] hover:border-[#B8955D] hover:text-black transition-all shadow-md"
                aria-label="Email Us"
              >
                <FaEnvelope className="text-base" />
              </a>
              <a
                href="https://wa.me/919425112100"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#B8955D] hover:border-[#B8955D] hover:text-black transition-all shadow-md"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#B8955D] hover:border-[#B8955D] hover:text-black transition-all shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#B8955D] hover:border-[#B8955D] hover:text-black transition-all shadow-md"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3">
            <h4 className="font-editorial text-lg text-[#B8955D] font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Navigation
            </h4>
            <ul className="space-y-3.5 font-sans text-sm font-light text-white/80">
              <li><Link to="/" className="hover:text-[#B8955D] transition-colors flex items-center gap-1.5">Home <ArrowUpRight className="w-3.5 h-3.5 opacity-50" /></Link></li>
              <li><Link to="/about" className="hover:text-[#B8955D] transition-colors flex items-center gap-1.5">Our Quarry Heritage <ArrowUpRight className="w-3.5 h-3.5 opacity-50" /></Link></li>
              <li><Link to="/products" className="hover:text-[#B8955D] transition-colors flex items-center gap-1.5">Natural Stone Collection <ArrowUpRight className="w-3.5 h-3.5 opacity-50" /></Link></li>
              <li><Link to="/design-system" className="hover:text-[#B8955D] transition-colors flex items-center gap-1.5">Design System <ArrowUpRight className="w-3.5 h-3.5 opacity-50" /></Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4">
            <h4 className="font-editorial text-lg text-[#B8955D] font-semibold uppercase tracking-wider mb-6">
              Global Export Office
            </h4>
            <div className="space-y-4 font-sans text-sm font-light text-white/80">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#B8955D] mt-1 flex-shrink-0" />
                <span>Stone Industrial Area, AB Road, Gwalior (M.P.) — 474001 India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#B8955D] flex-shrink-0" />
                <span>+91 94251 12100 / +91 751 240 5500</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#B8955D] flex-shrink-0" />
                <span>export@gwaliorstone.com</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-mono text-xs text-[#B8955D] font-semibold uppercase tracking-widest block mb-1">
                Quarry Operations
              </span>
              <p className="font-sans text-xs text-white/60">
                Direct export shipments from Mundra & Mumbai Port to over 50 countries worldwide.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/50">
          <p>© 2026 Gwalior Stone Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Export Terms</a>
            <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
