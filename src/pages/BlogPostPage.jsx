import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Link2
} from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { FONT_FAMILY, GOOGLE_FONTS_URL } from '@/config/fonts';

/* -----------------------------------------------------------------------
   DESIGN SYSTEM — "Core Sample"
   The signature idea: a stone exporter's blog post is a document that gets
   READ THROUGH, the way a geologist reads a drilled core sample top to
   bottom. The reading-progress rail on the left is styled as a core sample
   with strata bands; the hero/content seam is a fractured stone edge
   instead of a rounded card; the pull-quote carries a marble vein; and the
   closing CTA is textured with a topographic contour pattern — the same
   language you'd find on a quarry survey map.

   Tokens
   ink        #14140F  near-black, warm
   cream      #F7F5F0  quarry paper
   basalt     #1F3A30  deep green (site brand)
   brass      #B8955D  brand accent
   pale gold  #E8CB92  brass, lightened
   stone      #8A8580  captions / muted meta
------------------------------------------------------------------------ */

const FONTS_HREF = GOOGLE_FONTS_URL;

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById('bp-fonts')) return;
    const link = document.createElement('link');
    link.id = 'bp-fonts';
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);
}

/* Contour / topographic pattern — reused on the closing CTA band */
const ContourPattern = ({ className = '', opacity = 0.14 }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 800 400"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <g fill="none" stroke="#DFBA73" strokeWidth="1" opacity={opacity}>
      <path d="M-20 60 Q 200 10, 420 70 T 860 40" />
      <path d="M-20 110 Q 220 60, 440 120 T 860 90" />
      <path d="M-20 160 Q 240 100, 460 170 T 860 140" />
      <path d="M-20 210 Q 200 260, 420 200 T 860 230" />
      <path d="M-20 260 Q 220 320, 440 250 T 860 280" />
      <path d="M-20 310 Q 240 360, 460 300 T 860 330" />
      <path d="M-20 360 Q 220 400, 440 350 T 860 380" />
    </g>
  </svg>
);

/* Fractured stone edge — sits at the hero / content seam */
const FractureEdge = ({ fill = '#F7F5F0' }) => (
  <svg
    className="absolute left-0 right-0 -bottom-px w-full"
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

/* Vein squiggle used beside the pull-quote */
const VeinMark = () => (
  <svg width="40" height="120" viewBox="0 0 40 120" fill="none" aria-hidden="true">
    <path
      d="M20 0 C 8 20, 32 30, 18 48 C 6 64, 30 74, 16 92 C 6 104, 22 112, 20 120"
      stroke="#B8955D"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CircularProgressButton = ({ progress }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 lg:right-10 lg:bottom-10 z-50 flex items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EDEDE9] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8955D] ${progress > 0.05 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      aria-label="Scroll to top"
    >
      <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 52 52">
        {/* Background track */}
        <circle cx="26" cy="26" r={radius} fill="none" stroke="#F3F0EA" strokeWidth="3" />
        {/* Progress stroke */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#B8955D"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
        />
      </svg>
      <div className="absolute flex items-center justify-center inset-0 text-[#14140F]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
};

gsap.registerPlugin(ScrollTrigger);

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef(null);
  const articleContentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useGoogleFonts();

  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = postIndex !== -1 ? blogPosts[postIndex] : null;
  const nextPost =
    postIndex !== -1 ? blogPosts[(postIndex + 1) % blogPosts.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setProgress(0);
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [post]);

  useGSAP(() => {
    if (!articleContentRef.current) return;

    // Select all the main text blocks to animate
    const elements = gsap.utils.toArray(articleContentRef.current.querySelectorAll('p, h2, h3, ul, .faq-container'));

    elements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { dependencies: [post], scope: articleContentRef });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard may be unavailable; fail silently */
    }
  };

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#F7F5F0', fontFamily: FONT_FAMILY }}
      >
        <span className="font-mono text-xs tracking-[0.3em] text-[#8A8580] mb-4">
          404 — NO SAMPLE FOUND
        </span>
        <h1
          className="text-4xl mb-4 text-[#14140F]"
          style={{ fontFamily: FONT_FAMILY }}
        >
          This page isn&apos;t in the archive.
        </h1>
        <p className="text-[#66605A] mb-8 max-w-sm">
          The article you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 rounded-full bg-[#14140F] text-white font-medium text-sm hover:bg-[#B8955D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8955D]"
        >
          Back to the journal
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-[#14140F]"
      style={{ background: '#F7F5F0', fontFamily: FONT_FAMILY }}
    >
      <CircularProgressButton progress={progress} />

      {/* ---------------------------------------------------------------
          HERO
      ---------------------------------------------------------------- */}
      <div className="relative w-full min-h-[72vh] md:min-h-[88vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover brightness-[0.55] contrast-[0.9] grayscale-[15%] motion-safe:animate-[heroIn_1.4s_ease-out]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/60 to-[#0A0A08]/10" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20 md:pb-28 pt-32">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-all text-sm font-medium mb-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73] rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 shadow-sm"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to the journal
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.2em] text-[#DFBA73] font-bold uppercase font-mono">
                {post.tag}
              </span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hidden md:block">
              <span className="text-[10px] tracking-[0.2em] text-white/90 font-bold uppercase font-mono">
                {post.category}
              </span>
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-[4.5rem] text-white tracking-tight mb-8 leading-[1.08] max-w-4xl drop-shadow-lg"
            style={{ fontFamily: FONT_FAMILY, fontWeight: 500 }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/80 font-mono border-t border-white/20 pt-6 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DFBA73]/20 flex items-center justify-center border border-[#DFBA73]/30">
                <User size={14} className="text-[#DFBA73]" />
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#DFBA73]" />
              {post.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#DFBA73]" />
              {post.readTime}
            </div>
          </div>
        </div>

        <FractureEdge fill="#F7F5F0" />
      </div>

      {/* ---------------------------------------------------------------
          ARTICLE BODY
      ---------------------------------------------------------------- */}
      <div ref={articleRef} className="relative bg-[#F7F5F0] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Pull-quote with marble vein */}
          <div className="flex items-start gap-5 mb-14">
            <VeinMark />
            <p
              className="text-2xl md:text-3xl text-[#1F3A30] leading-snug"
              style={{ fontFamily: FONT_FAMILY, fontStyle: 'italic', fontWeight: 500 }}
            >
              {post.excerpt}
            </p>
          </div>

          <div
            ref={articleContentRef}
            className="[&_p]:mb-6 [&_p]:text-[#3A3630] [&_p]:leading-[1.85] [&_p]:text-[1.125rem] [&_p]:font-sans
                       [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:pb-4 [&_h2]:border-b [&_h2]:border-[#E4E0D8]
                       [&_h2]:text-[#14140F] [&_h2]:text-[2.2rem] [&_h2]:font-medium
                       [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-[#14140F] [&_h3]:text-[1.5rem] [&_h3]:font-medium
                       [&_a]:text-[#B8955D] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#14140F]
                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:text-[#3A3630] [&_li]:mb-2 [&_li]:leading-[1.8] [&_li]:font-sans
                       [&_strong]:text-[#14140F] [&_strong]:font-semibold
                       [&>p:first-of-type]:first-letter:text-[5rem]
                       [&>p:first-of-type]:first-letter:font-medium [&>p:first-of-type]:first-letter:text-[#1F3A30]
                       [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3
                       [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:leading-[0.85]"
          >
            {post.content}
          </div>

          {/* Ruler-style divider */}
          <div className="mt-16 mb-10 flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#D8D3C8]"
                style={{ width: '1px', height: i % 5 === 0 ? '10px' : '5px' }}
              />
            ))}
          </div>

          {/* Author + share */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EDEAE3] flex items-center justify-center border border-[#E4E0D8]">
                <User size={20} className="text-[#B8955D]" />
              </div>
              <div>
                <p className="font-semibold text-[#14140F] text-sm">
                  Written by {post.author}
                </p>
                <p className="text-[#8A8580] text-sm font-mono">{post.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-[#8A8580] uppercase tracking-wider mr-1">
                Share
              </span>
              <button
                onClick={handleCopyLink}
                aria-label="Copy link to this article"
                className="w-10 h-10 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14140F] hover:bg-[#B8955D] hover:text-white hover:border-[#B8955D] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8955D]"
              >
                <Link2 size={16} />
              </button>
              {copied && (
                <span className="text-xs font-mono text-[#1F3A30] ml-1">
                  Copied
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          NEXT ARTICLE — real prev/next flow, not a generic CTA
      ---------------------------------------------------------------- */}
      {nextPost && (
        <Link
          to={`/blog/${nextPost.id}`}
          className="group relative block bg-[#14140F] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DFBA73]"
        >
          <ContourPattern opacity={0.16} />
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#DFBA73] uppercase">
                Next in the journal
              </span>
              <h3
                className="text-3xl md:text-4xl text-white mt-4 leading-tight max-w-xl"
                style={{ fontFamily: FONT_FAMILY, fontWeight: 500 }}
              >
                {nextPost.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black font-semibold text-sm shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(184,149,93,0.4)] transition-all">
              Continue reading
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      )}

      <Footer />

      <style>{`
        @keyframes heroIn {
          from { transform: scale(1.06); opacity: 0.85; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[heroIn_1\\.4s_ease-out\\] { animation: none !important; }
        }
        .scroll-reveal-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal-item.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default BlogPostPage;