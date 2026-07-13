"use client";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Gem,
  Layers,
  Sparkles,
  Building2,
  Hammer,
  Trees,
  Compass,
  Box,
  PhoneCall,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(20);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-auto",
        "bg-[#0a0a0a]/90 border-b border-white/10 backdrop-blur-xl shadow-2xl"
      )}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/img/logo.png" alt="Stone India Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif font-bold tracking-wider text-white text-lg leading-tight">
                GWALIOR <span className="text-[#B8955D] font-light">STONE</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/about' ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/about">About Us</Link>
              </NavigationMenuLink>

              {/* Mega Menu for Our Product */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`bg-transparent font-medium text-sm cursor-pointer transition-colors ${pathname.startsWith('/products') ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`}
                  onClick={() => navigate('/products')}
                >
                  Our Product
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#141414] border border-white/10 shadow-2xl rounded-xl">
                  <div className="grid grid-cols-[repeat(3,auto)_repeat(2,auto)_auto] gap-x-8 gap-y-2 p-8" style={{width: 'max-content'}}>
                    {/* ── Stone Products heading (spans 3 cols) ── */}
                    <h4 className="col-span-3 text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-2 pb-3 border-b border-white/10">Stone Products</h4>
                    {/* ── Sandstone heading (spans 2 cols) ── */}
                    <h4 className="col-span-2 text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-2 pb-3 border-b border-white/10">Sandstone</h4>
                    {/* ── Stone Articrafts heading (spans 1 col) ── */}
                    <h4 className="col-span-1 text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-2 pb-3 border-b border-white/10">Stone Articrafts</h4>

                    {/* ── Stone Products items (3 columns) ── */}
                    <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-2">
                      {megaMenuData.stoneProducts.map(item => (
                        <NavigationMenuLink key={item} asChild>
                          <Link to={`/products/stone-products/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[13px] font-medium text-white/70 hover:text-white hover:translate-x-0.5 transition-all block py-1 leading-snug whitespace-nowrap">{item}</Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    {/* ── Sandstone items (2 columns) ── */}
                    <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-2">
                      {megaMenuData.sandstone.map(item => (
                        <NavigationMenuLink key={item} asChild>
                          <Link to={`/products/sandstone/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[13px] font-medium text-white/70 hover:text-white hover:translate-x-0.5 transition-all block py-1 leading-snug whitespace-nowrap">{item}</Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    {/* ── Stone Articrafts items (1 column) ── */}
                    <div className="col-span-1 flex flex-col gap-2">
                      {megaMenuData.stoneArticrafts.map(item => (
                        <NavigationMenuLink key={item} asChild>
                          <Link to={`/products/stone-articrafts/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[13px] font-medium text-white/70 hover:text-white hover:translate-x-0.5 transition-all block py-1 leading-snug whitespace-nowrap">{item}</Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/10 py-3 px-8 flex items-center justify-between bg-white/[0.02] rounded-b-xl">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">Looking for something specific?</span>
                      <span className="text-xs text-white/50">Contact us for custom sizes and finishes.</span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-sm font-mono text-[#B8955D] hover:underline"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/projects' ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/projects">Our Projects</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/packaging' ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/packaging">Packaging</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/blog">Blog</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/contact' ? 'text-[#B8955D]' : 'text-white/80 hover:text-[#B8955D]'}`} asChild>
                <Link to="/contact">Contact Us</Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(184,149,93,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white hover:bg-white/10"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-6" duration={300} />
        </Button>
      </nav>

      {/* Mobile Portal Menu */}
      <MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-2xl px-6 py-8" style={{ WebkitBackdropFilter: 'blur(40px)' }}>
        <div className="flex flex-col gap-1 mt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-3">Menu</span>
          <Link to="/" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname === '/' ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname === '/about' ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>About Us</Link>
          
          {/* ── Our Products Accordion ── */}
          <MobileAccordion label="Our Products" linkTo="/products" onNavigate={() => setOpen(false)}>
            <MobileAccordion label="Stone Products" nested>
              {megaMenuData.stoneProducts.map((item) => (
                <Link key={item} to={`/products/stone-products/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setOpen(false)} className="block text-sm text-white/70 hover:text-white py-1.5 pl-4 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
              ))}
            </MobileAccordion>
            <MobileAccordion label="Sandstone" nested>
              {megaMenuData.sandstone.map((item) => (
                <Link key={item} to={`/products/sandstone/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setOpen(false)} className="block text-sm text-white/70 hover:text-white py-1.5 pl-4 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
              ))}
            </MobileAccordion>
            <MobileAccordion label="Stone Articrafts" nested>
              {megaMenuData.stoneArticrafts.map((item) => (
                <Link key={item} to={`/products/stone-articrafts/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setOpen(false)} className="block text-sm text-white/70 hover:text-white py-1.5 pl-4 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
              ))}
            </MobileAccordion>
          </MobileAccordion>

          <Link to="/projects" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname === '/projects' ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>Our Projects</Link>
          <Link to="/packaging" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname === '/packaging' ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>Packaging</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname.startsWith('/blog') ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>Blog</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className={`text-lg font-medium py-2.5 border-b border-white/5 transition-colors ${pathname === '/contact' ? 'text-[#B8955D]' : 'text-white hover:text-[#B8955D]'}`}>Contact Us</Link>
        </div>

        <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-semibold text-sm tracking-wider uppercase"
          >
            Get Instant Quote
          </a>
        </div>
      </MobileMenu>
    </header>
  );
}

function MobileMenu({ open, children, className, ...props }) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "fixed top-20 right-0 bottom-0 left-0 z-40 flex flex-col lg:hidden border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "size-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function MobileAccordion({ label, children, nested = false, linkTo, onNavigate }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className={cn(
      nested ? "" : "border-b border-white/5"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between py-2.5 text-left transition-colors",
          nested
            ? "text-xs font-mono uppercase tracking-widest text-[#B8955D] hover:text-[#DFBA73] pl-2 py-2"
            : "text-lg font-medium text-white hover:text-[#B8955D]"
        )}
      >
        <span className="flex items-center gap-2">
          {label}
          {linkTo && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(linkTo);
                onNavigate?.();
              }}
              className="text-xs font-mono text-[#B8955D]/60 hover:text-[#B8955D] underline underline-offset-2 cursor-pointer"
            >
              View All
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            nested ? "text-[#B8955D]/50" : "text-white/40",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100 pb-3" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn(
          "flex flex-col gap-0.5",
          nested ? "pl-2 mt-1" : "pl-1 mt-1 flex flex-col gap-3"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}

const megaMenuData = {
  stoneProducts: [
    "Wall Panel", "Wall Cladding", "Mint Flagstone Tiles", "Sandstone Palisade",
    "Sandstone Circle", "Mint Stone Blocks", "Mosaic Stone Tiles", "Gwalior Mint Cobbles",
    "Stepping Stone Tiles", "Fossil Mint Natural Stone", "Gwalior Mint Stone Elevation",
    "Gwalior Mint Sandstone Slabs", "Gwalior Mint Wall Panels Stone"
  ],
  sandstone: [
    "Modak Sandstone", "Rainbow Sandstone", "Shivpuri Sandstone", "Teakwood Sandstone",
    "Katni Grey Sandstone", "Sagar Black Sandstone", "Desert Mint Sandstone", 
    "Katni Yellow Sandstone", "Lalitpur Yellow Sandstone", "Gwalior Mint White Sandstone",
    "Gwalior Mint Yellow Sandstone", "Mint Fossil Indian Sandstone"
  ],
  stoneArticrafts: [
    "Stone Figures", "Sandstone Jaali", "Stone Planters", "Sandstone Balls",
    "Sandstone Benches", "Stone Waterfalls"
  ]
};

function useScroll(threshold) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
