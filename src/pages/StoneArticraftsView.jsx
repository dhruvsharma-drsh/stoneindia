import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ArrowUpRight, ArrowRight, ArrowLeft, Globe, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stoneProductsData } from '../data/stoneProductsData';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Fractured stone edge — same as ProjectsPage ── */
const FractureEdge = ({ fill = '#FAFAF8' }) => (
  <svg
    className="absolute left-0 right-0 -top-[55px] w-full"
    height="56"
    viewBox="0 0 1440 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,40 L96,18 L188,34 L266,6 L344,28 L430,12 L512,36 L598,10 L676,30 L760,4 L842,26 L930,14 L1012,32 L1098,8 L1180,24 L1264,2 L1346,20 L1440,10 L1440,56 L0,56 Z"
      fill={fill}
    />
  </svg>
);

/* ── Scroll-driven vaporize (matches ProjectsPage exactly) ── */
const getVaporizeStyle = (scrollProgress, staggerStart = 0, staggerEnd = 1) => {
  const localProgress = Math.min(1, Math.max(0, (scrollProgress - staggerStart) / (staggerEnd - staggerStart)));
  const eased = localProgress < 0.5
    ? 4 * localProgress * localProgress * localProgress
    : 1 - Math.pow(-2 * localProgress + 2, 3) / 2;
  return {
    opacity: 1 - eased,
    transform: `translateY(${-eased * 60}px) scale(${1 + eased * 0.08})`,
    filter: `blur(${eased * 12}px)`,
    transition: 'none',
    willChange: 'opacity, transform, filter',
  };
};

/**
 * Signature element: a hand-drawn "vein" line — the fracture pattern you'd
 * trace on a slab of stone — that draws itself in on scroll wherever it
 * appears.
 */
const VeinDivider = ({ className = '', flip = false }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: path,
        start: 'top 85%',
      },
    });
  }, []);

  return (
    <svg
      viewBox="0 0 400 24"
      className={`w-24 h-6 ${flip ? 'scale-x-[-1]' : ''} ${className}`}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M0 12 L38 12 L52 4 L68 18 L84 6 L102 16 L124 12 L146 20 L168 4 L190 12 L400 12"
        stroke="#B4956C"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StoneArticraftsView = () => {
  const { hero, trust, brands, stoneArticrafts } = stoneProductsData;

  const rootRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroImgRef = useRef(null);
  const trustBgRef = useRef(null);
  const trustCopyRef = useRef(null);
  const brandsImgRef = useRef(null);
  const brandsCopyRef = useRef(null);
  const gridHeadRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const [scrollProgress, setScrollProgress] = useState(0);

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── Track scroll progress for vaporize (same as ProjectsPage) ── */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const dissolveDistance = viewportHeight * 0.6;
    const progress = Math.min(1, Math.max(0, scrollY / dissolveDistance));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── GSAP animations for scrolling content sections ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero copy + image */
      gsap.from(heroCopyRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: heroCopyRef.current, start: 'top 80%' },
      });

      gsap.fromTo(
        heroImgRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: heroImgRef.current, start: 'top 80%' },
        }
      );

      /* Trust banner: parallax bg + copy reveal */
      gsap.to(trustBgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: trustBgRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from(trustCopyRef.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: trustCopyRef.current, start: 'top 78%' },
      });

      /* Brands: image scale-reveal + copy */
      gsap.fromTo(
        brandsImgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: brandsImgRef.current, start: 'top 78%' },
        }
      );

      gsap.from(brandsCopyRef.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: brandsCopyRef.current, start: 'top 78%' },
      });

      /* Category grid: heading + staggered cards */
      gsap.from(gridHeadRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridHeadRef.current, start: 'top 82%' },
      });

      gsap.from(cardRefs.current, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRefs.current[0], start: 'top 85%' },
      });

      /* Card hover: magnetic tilt */
      cardRefs.current.forEach((card) => {
        const img = card.querySelector('img');
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateX: py * -4,
            rotateY: px * 4,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
          });
          gsap.to(img, { x: px * 8, y: py * 8, duration: 0.6, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
          gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-[100svh]">

      {/* ═══════════════════════════════════════════════════════
          FIXED HERO — Stays in place while content scrolls over it
          (Identical pattern to ProjectsPage)
      ═══════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 w-full h-[100svh] flex flex-col justify-end overflow-hidden z-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/product/Stone Products/Gwalior Stone/Stone-Product03.jpg"
            alt="Gwalior Stone — Stone India"
            className="w-full h-full object-cover brightness-[0.55] contrast-[0.9] grayscale-[15%] motion-safe:animate-[projectHeroIn_1.4s_ease-out]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/60 to-[#0A0A08]/10" />
        </div>

        {/* Hero Content — each element vaporizes on scroll with staggered timing */}
        <div ref={heroContentRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24 md:pb-32 pt-32">

          {/* Back button — dissolves first (0.0 → 0.4) */}
          <div style={getVaporizeStyle(scrollProgress, 0.0, 0.4)}>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium mb-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73] rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 shadow-sm"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              All Products
            </Link>
          </div>

          {/* Category Tags — dissolves second (0.05 → 0.5) */}
          <div className="flex items-center gap-3 mb-6 flex-wrap" style={getVaporizeStyle(scrollProgress, 0.05, 0.5)}>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.2em] text-[#DFBA73] font-bold uppercase font-mono">
                Natural Stone
              </span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.2em] text-white/90 font-bold uppercase font-mono">
                Gwalior
              </span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hidden md:block">
              <span className="text-[10px] tracking-[0.2em] text-white/90 font-bold uppercase font-mono">
                Premium Quality
              </span>
            </div>
          </div>

          {/* Main Title — dissolves third (0.1 → 0.65) */}
          <h1
            className="text-4xl md:text-5xl lg:text-[4.5rem] text-white tracking-tight mb-8 leading-[1.08] max-w-4xl drop-shadow-lg"
            style={{ fontWeight: 500, ...getVaporizeStyle(scrollProgress, 0.1, 0.65) }}
          >
            Gwalior Stone —
            <br />
            <span className="italic font-light text-[#DFBA73]">Natural Excellence</span>
          </h1>

          {/* Meta Info Row — dissolves last (0.15 → 0.75) */}
          <div
            className="flex flex-wrap items-center gap-6 text-sm text-white/80 font-mono border-t border-white/20 pt-6 max-w-3xl"
            style={getVaporizeStyle(scrollProgress, 0.15, 0.75)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DFBA73]/20 flex items-center justify-center border border-[#DFBA73]/30">
                <Globe size={14} className="text-[#DFBA73]" />
              </div>
              <span className="font-medium">25+ Countries</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#DFBA73]" />
              {stoneArticrafts.length} Products
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="font-medium">20+ Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer — pushes scrollable content below the fixed hero */}
      <div className="h-[100svh]" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SCROLLABLE CONTENT — Slides up over the fixed hero
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 bg-[#FAFAF8]">
        {/* Fractured Stone Edge — top of the content */}
        <FractureEdge fill="#FAFAF8" />

        {/* ═══════════════════════════════════════
            ABOUT SECTION — Big typography + clip-path image
        ═══════════════════════════════════════ */}
        <section className="py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              <div ref={heroCopyRef} className="flex flex-col gap-7">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-[#B4956C]"></span>
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B4956C]">About This Stone</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#111] leading-[1.12]">
                  {hero.title.split('-')[0].trim()} —{' '}
                  <span className="italic text-[#B4956C]">{hero.title.split('-')[1]?.trim()}</span>
                </h2>
                <p className="text-[17px] text-[#555] font-light leading-[1.9]">
                  {hero.desc1}
                </p>
                <blockquote className="relative pl-8 py-5 border-l-[3px] border-[#B4956C]/30 bg-gradient-to-r from-[#B4956C]/[0.04] to-transparent rounded-r-xl">
                  <p className="text-[16px] text-[#444] italic leading-[1.85] font-serif">
                    "{hero.desc2}"
                  </p>
                </blockquote>
                <VeinDivider className="mt-2" />
              </div>

              <div className="w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <img
                  ref={heroImgRef}
                  src={hero.image}
                  alt="Gwalior Stone"
                  className="w-full h-[450px] lg:h-[580px] object-cover will-change-[clip-path]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TRUST BANNER — Cinematic parallax
        ═══════════════════════════════════════ */}
        <div className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              ref={trustBgRef}
              src={trust.image}
              alt="Trust Background"
              className="w-full h-[130%] object-cover brightness-[0.35] will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">
            <div ref={trustCopyRef} className="flex flex-col items-start text-left max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#DFBA73] mb-3">{trust.subtitle}</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                {trust.title.replace('Trust!', '')}
                <span className="italic text-[#DFBA73]">Trust!</span>
              </h2>
              <p className="text-lg text-white/60 font-light leading-relaxed">{trust.text}</p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#DFBA73] hover:bg-white text-[#111] font-bold text-xs tracking-widest uppercase transition-all duration-400 shadow-[0_0_30px_rgba(223,186,115,0.25)] whitespace-nowrap flex-shrink-0"
            >
              CONTACT US
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            BRANDS SECTION — Clip-path image + editorial text
        ═══════════════════════════════════════ */}
        <section className="py-28 md:py-36 bg-[#f9f9f7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              <div className="w-full order-2 lg:order-1 overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <img
                  ref={brandsImgRef}
                  src={brands.image}
                  alt="Top Gwalior Stone Brands"
                  className="w-full h-[450px] lg:h-[580px] object-cover will-change-[clip-path]"
                />
              </div>

              <div ref={brandsCopyRef} className="flex flex-col gap-7 order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-[#B4956C]"></span>
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B4956C]">Why Choose Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#111] leading-[1.12]">
                  {brands.title.replace('Brands.', '')}
                  <span className="italic text-[#B4956C]">Brands.</span>
                </h2>
                <p className="text-[17px] text-[#555] font-light leading-[1.9]">{brands.text1}</p>
                <p className="text-[17px] text-[#555] font-light leading-[1.9]">{brands.text2}</p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="tel:+919425112100"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#B4956C] text-[#B4956C] font-bold text-xs tracking-widest uppercase hover:bg-[#B4956C] hover:text-white transition-all duration-400 group"
                  >
                    <PhoneCall size={16} className="group-hover:animate-pulse" />
                    +91 94251 12100
                  </a>
                </div>
                <VeinDivider flip className="mt-2" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            PRODUCT GRID — Stone Collection Style
        ═══════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-white border-t border-b border-[#DFDDD8]">
          <div className="max-w-[90rem] mx-auto px-6 md:px-12">
            <div ref={gridHeadRef} className="text-center mb-16 md:mb-24">
              <h2 className="text-6xl md:text-8xl font-serif text-[#222] mb-2 tracking-tight">
                Stone
              </h2>
              <h2 className="text-5xl md:text-7xl font-serif italic text-[#222] ml-12 md:ml-32">
                Articrafts
              </h2>
            </div>

            {/* Grid with ultra-subtle divider lines */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/[0.08]">
              {stoneArticrafts.map((item, idx) => (
                <Link
                  key={idx}
                  ref={addCardRef}
                  to={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex flex-col items-center text-center group py-12 px-5 md:px-8 no-underline border-b border-black/[0.08] border-r border-r-black/[0.08] ${
                    (idx + 1) % 4 === 0 ? 'lg:border-r-0' : ''
                  } ${
                    (idx + 1) % 2 === 0 ? 'max-lg:border-r-0' : ''
                  } hover:bg-[#F4F3EF] transition-colors duration-700`}
                >
                  {/* 3D hover effect on image */}
                  <div className="relative w-[85%] md:w-[75%] aspect-[3/4] mb-8 overflow-hidden bg-[#DFDDD8] border border-black/5 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-[0.97] contrast-[0.95] group-hover:brightness-100 group-hover:contrast-100 saturate-[0.9] group-hover:saturate-100"
                    />
                    
                    {/* Premium frosted glass INQUIRE button */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-end justify-center pb-6">
                      <div className="px-6 py-2.5 border border-white/50 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        <span className="text-[9px] tracking-[0.4em] uppercase text-white font-semibold drop-shadow-sm">
                          Inquire
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Refined Typography */}
                  <h4 className="text-[12px] md:text-[14px] font-serif text-[#111] uppercase tracking-[0.2em] mb-2 group-hover:text-[#B4956C] transition-colors duration-500">
                    {item.title}
                  </h4>
                  {/* Subtitle / SKU style */}
                  <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-4 h-[1px] bg-[#B4956C]/50"></div>
                    <p className="text-[8px] md:text-[9px] text-[#555] uppercase tracking-[0.3em] font-medium">
                      {item.desc}
                    </p>
                    <div className="w-4 h-[1px] bg-[#B4956C]/50"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CTA STRIP
        ═══════════════════════════════════════ */}
        <section className="py-28 md:py-36">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <VeinDivider className="mx-auto mb-8" />
            <h3 className="text-5xl md:text-6xl font-serif text-[#111] mb-6 leading-tight">
              Ready to transform <span className="italic text-[#B4956C]">your space?</span>
            </h3>
            <p className="text-lg text-[#888] font-light max-w-xl mx-auto mb-12 leading-relaxed">
              Contact our expert team for a personalized consultation and premium stone selection.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#111] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#B4956C] transition-colors duration-400"
              >
                Get Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+919425112100"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-[#ddd] text-[#111] font-bold text-sm tracking-widest uppercase hover:border-[#B4956C] hover:text-[#B4956C] transition-all duration-400"
              >
                <PhoneCall size={16} /> Call Now
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes projectHeroIn {
          from { transform: scale(1.06); opacity: 0.85; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[projectHeroIn_1\\.4s_ease-out\\] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default StoneArticraftsView;