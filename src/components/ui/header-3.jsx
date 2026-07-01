"use client";
import React from "react";
import { Link } from "react-router-dom";
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
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Rajasthan · India
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
                <NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-[#B8955D] font-medium text-sm">
                  Our Product
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#141414] p-3 border border-white/10 shadow-2xl rounded-xl">
                  <div className="grid w-[620px] grid-cols-2 gap-3 p-1">
                    {productMegaLinks.map((item, i) => (
                      <ListItem key={i} {...item} />
                    ))}
                  </div>
                  <div className="mt-3 border-t border-white/10 pt-3 px-3 pb-1 flex items-center justify-between bg-white/[0.02] rounded-b-lg">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">Need bespoke stone cutting?</span>
                      <span className="text-[11px] text-white/50">Custom CNC architectural fabrication available.</span>
                    </div>
                    <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#B8955D] hover:underline"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#B8955D] transition-colors" asChild>
                <Link to="/infrastructure">Infrastructure</Link>
              </NavigationMenuLink>

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
          
          <div className="border-y border-white/10 py-3 my-1">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">Our Product</span>
            <div className="grid grid-cols-1 gap-2">
              {productMegaLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                >
                  <link.icon className="w-4 h-4 text-[#B8955D]" />
                  <span className="text-sm font-medium text-white/90">{link.title}</span>
                </a>
              ))}
            </div>
          </div>

          <Link to="/infrastructure" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#B8955D] py-1">Infrastructure</Link>
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

function ListItem({ title, description, icon: Icon, className, href, ...props }) {
  return (
    <NavigationMenuLink
      className={cn(
        "w-full flex flex-row gap-x-3 hover:bg-white/5 focus:bg-white/5 rounded-lg p-3 transition-colors group",
        className
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-white/5 group-hover:bg-[#B8955D]/20 flex aspect-square size-11 items-center justify-center rounded-lg border border-white/10 transition-colors">
          <Icon className="text-[#B8955D] size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium text-sm text-white group-hover:text-[#B8955D] transition-colors">{title}</span>
          <span className="text-white/40 text-xs line-clamp-1">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

const productMegaLinks = [
  {
    title: "Makrana White Marble",
    href: "/#products",
    description: "Ultra-pure white marble for luxury flooring",
    icon: Gem,
  },
  {
    title: "Royal Granite Slabs",
    href: "/#products",
    description: "High-density granite with lustrous finish",
    icon: Layers,
  },
  {
    title: "Exotic Onyx & Quartzite",
    href: "/#products",
    description: "Translucent backlit natural masterpieces",
    icon: Sparkles,
  },
  {
    title: "Architectural Sandstone",
    href: "/#products",
    description: "Weather-resistant facade & exterior stone",
    icon: Building2,
  },
  {
    title: "Custom CNC Sculptures",
    href: "/#products",
    description: "Intricate 3D carving & bespoke artifacts",
    icon: Hammer,
  },
  {
    title: "Landscaping & Cobbles",
    href: "/#products",
    description: "Premium exterior paving & garden stone",
    icon: Trees,
  },
];

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
