import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import Button from "../Button";
import "./hero.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Packaging", href: "/packaging" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.55;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.55;
    gsap.to(e.currentTarget, { x, y, scale: 1.08, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 pointer-events-auto ${
        scrolled
          ? "top-4 sm:top-6 px-4 sm:px-8 max-w-7xl mx-auto"
          : "top-0 left-0 right-0 px-0 max-w-full"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "luxury-glass-navbar rounded-full px-6 sm:px-8 py-3 shadow-2xl bg-white/95"
            : "bg-white/90 border-b border-black/5 px-6 sm:px-12 py-4 sm:py-5 rounded-none"
        }`}
      >
        {/* Logo Section */}
        <a
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#B8955D] rounded-lg p-1"
          aria-label="Gwalior Stone Homepage"
        >
          <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img
              src="/img/stone_logo_rock.png"
              alt="Gwalior Stone Logo"
              className="h-9 w-auto object-contain drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.src = "/img/logo.png";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial font-bold tracking-[0.18em] text-sm text-[#111111] uppercase leading-tight">
              Gwalior Stone
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#8A8A8A] uppercase font-medium">
              Natural Surfaces
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className={`relative px-3 py-1.5 text-[13px] font-sans font-medium tracking-wide transition-colors duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? "text-[#111111]"
                    : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#B8955D] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            title="Get a Quote"
            onClick={() => (window.location.href = "/contact")}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full text-[#111111] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#B8955D] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-3 luxury-glass-navbar rounded-3xl p-6 shadow-2xl overflow-hidden border border-white/80"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => {
                    setActiveLink(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-sm font-sans font-medium text-[#1E1E1E] hover:text-[#B8955D] hover:bg-[#FBC938]/10 rounded-xl transition-all duration-200 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] text-[#8A8A8A] uppercase font-mono tracking-widest">
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
              <div className="mt-4 pt-4 border-t border-black/5 flex flex-col sm:hidden">
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#B8955D] text-white text-xs font-sans font-semibold uppercase tracking-wider py-3.5 rounded-full gold-glow-shadow"
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
