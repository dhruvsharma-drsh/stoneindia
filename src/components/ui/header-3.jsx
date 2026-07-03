"use client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(20);
  const navigate = useNavigate();

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
              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/about">About Us</Link>
              </NavigationMenuLink>

              {/* Mega Menu for Our Product */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent text-white/80 hover:text-[#B8955D] font-medium text-sm cursor-pointer"
                  onClick={() => navigate('/products')}
                >
                  Our Product
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#141414] border border-white/10 shadow-2xl rounded-xl">
                  <div className="flex w-[1050px] gap-10 p-8">
                    {/* Column 1 (Wider) */}
                    <div className="flex-[2]">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-4 pb-3 border-b border-white/10">Stone Products</h4>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {megaMenuData.stoneProducts.map(item => (
                          <li key={item}>
                            <Link to="/products" className="text-[13px] font-medium text-white/70 hover:text-white hover:pl-1 transition-all">{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Column 2 (Wider) */}
                    <div className="flex-[2]">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-4 pb-3 border-b border-white/10">Sandstone</h4>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {megaMenuData.sandstone.map(item => (
                          <li key={item}>
                            <Link to="/products" className="text-[13px] font-medium text-white/70 hover:text-white hover:pl-1 transition-all">{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Column 3 (Normal) */}
                    <div className="flex-[1]">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#B8955D] mb-4 pb-3 border-b border-white/10">Stone Articrafts</h4>
                      <ul className="flex flex-col gap-3">
                        {megaMenuData.stoneArticrafts.map(item => (
                          <li key={item}>
                            <Link to="/products" className="text-[13px] font-medium text-white/70 hover:text-white hover:pl-1 transition-all">{item}</Link>
                          </li>
                        ))}
                      </ul>
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

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/projects">Our Projects</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/packaging">Packaging</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/blog">Blog</Link>
              </NavigationMenuLink>

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/contact">Contact Us</Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/#contact"
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
      <MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-2xl px-6 py-8">
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8955D]">Menu</span>
          <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">About Us</Link>
          
          <div className="border-y border-white/10 py-4 my-2 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8955D] block mb-3 pb-2 border-b border-white/10">Stone Products</span>
              <div className="grid grid-cols-1 gap-2.5">
                {megaMenuData.stoneProducts.map((item) => (
                  <Link key={item} to="/products" onClick={() => setOpen(false)} className="text-sm font-medium text-white/80 hover:text-white pl-2 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8955D] block mb-3 pb-2 border-b border-white/10">Sandstone</span>
              <div className="grid grid-cols-1 gap-2.5">
                {megaMenuData.sandstone.map((item) => (
                  <Link key={item} to="/products" onClick={() => setOpen(false)} className="text-sm font-medium text-white/80 hover:text-white pl-2 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8955D] block mb-3 pb-2 border-b border-white/10">Stone Articrafts</span>
              <div className="grid grid-cols-1 gap-2.5">
                {megaMenuData.stoneArticrafts.map((item) => (
                  <Link key={item} to="/products" onClick={() => setOpen(false)} className="text-sm font-medium text-white/80 hover:text-white pl-2 border-l border-white/10 hover:border-[#B8955D] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/projects" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Our Projects</Link>
          <Link to="/packaging" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Packaging</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Blog</Link>
          <a href="/#contact" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Contact Us</a>
        </div>

        <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
          <a
            href="/#contact"
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
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "fixed top-20 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden lg:hidden border-t border-white/10"
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out size-full",
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
