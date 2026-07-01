import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowRight, Quote, ChevronLeft, ChevronRight, X, Volume2, VolumeX, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Inject animations once ── */
if (typeof document !== "undefined" && !document.getElementById("fb-css")) {
  const s = document.createElement("style");
  s.id = "fb-css";
  s.textContent = `
    @keyframes fb-reveal { 0%{opacity:0;transform:translateY(30px) scale(0.97)} 100%{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes fb-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
    @keyframes fb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes fb-glow { 0%,100%{opacity:0.4;box-shadow:0 0 20px rgba(184,149,93,0.15)} 50%{opacity:1;box-shadow:0 0 40px rgba(184,149,93,0.35)} }
    @keyframes fb-counter { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
    @keyframes equalizer { 0%, 100% { height: 4px; } 50% { height: 16px; } }
    .fb-reveal{animation:fb-reveal .7s cubic-bezier(.22,1,.36,1) both}
    .fb-shimmer{animation:fb-shimmer 3s ease-in-out infinite}
    .fb-float{animation:fb-float 4s ease-in-out infinite}
    .fb-glow{animation:fb-glow 3s ease-in-out infinite}
    .fb-counter{animation:fb-counter .5s cubic-bezier(.22,1,.36,1) both}
    .eq-bar-1 { animation: equalizer 0.6s ease-in-out infinite; }
    .eq-bar-2 { animation: equalizer 0.4s ease-in-out infinite 0.1s; }
    .eq-bar-3 { animation: equalizer 0.5s ease-in-out infinite 0.2s; }
    .eq-bar-4 { animation: equalizer 0.7s ease-in-out infinite 0.15s; }
  `;
  document.head.appendChild(s);
}

const audioCache = {};

const testimonials = [
  { id: 0, name: "Alessandro Rossi", role: "Principal Architect", location: "Milan, Italy", img: "img/person_1.png", quote: "Flawless book-matched Calacatta marble for our royal palace project in Dubai. The precision exceeded our highest standards.", project: "Royal Palace, Dubai", sarvamSpeaker: "ashutosh" },
  { id: 1, name: "Elena Rostova", role: "Interior Design Head", location: "Zurich, Switzerland", img: "img/person_2.png", quote: "Their custom fluted limestone vanities transformed our 200+ suite Swiss Alpine resort into an architectural sanctuary.", project: "Alpine Resort, Switzerland", sarvamSpeaker: "priya" },
  { id: 2, name: "Sir Marcus Sterling", role: "Managing Director", location: "London, UK", img: "img/person_3.png", quote: "The custom backlit emerald onyx wall is the undisputed centerpiece of our London corporate headquarters.", project: "Sterling Tower, London", sarvamSpeaker: "advait" },
  { id: 3, name: "Rajeshwar Singhania", role: "Chief Projects Officer", location: "New Delhi, India", img: "img/person_4.png", quote: "From quarry selection to export packaging, their engineering precision made complex installations effortless.", project: "National Centre, Delhi", sarvamSpeaker: "aditya" },
  { id: 4, name: "Camille Laurent", role: "Luxury Hospitality Director", location: "Paris, France", img: "img/person_5.png", quote: "Sourcing direct from quarries gave us unmatched color consistency across our international villas.", project: "Laurent Villas, Côte d'Azur", sarvamSpeaker: "shreya" },
  { id: 5, name: "Hendrik Van Der Berg", role: "Facade Engineering Lead", location: "Cape Town, SA", img: "img/person_6.png", quote: "The structural acoustics and bush-hammered finitures on our Dubai facade withstood intense desert heat flawlessly.", project: "Dubai Marina Tower", sarvamSpeaker: "mani" },
  { id: 6, name: "Sophia Al-Mansoor", role: "Palace Development Chief", location: "Abu Dhabi, UAE", img: "img/person_7.png", quote: "Direct access to rare Persian onyx and Indian marble blocks gave our royal interior unique luminosity.", project: "Al-Mansoor Palace", sarvamSpeaker: "suhani" },
];

const Feedback = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);

  const active = testimonials[activeIndex];

  const stopSpeech = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setIsGeneratingVoice(false);
  }, []);

  const toggleSpeak = useCallback(async () => {
    if (isSpeaking || isGeneratingVoice) {
      stopSpeech();
      return;
    }

    const t = active;

    // Check memory cache first
    if (audioCache[t.id]) {
      const audio = new Audio(audioCache[t.id]);
      audioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      audio.play();
      setIsSpeaking(true);
      return;
    }

    setIsGeneratingVoice(true);
    const textToSpeak = `Hi, I am ${t.name}, ${t.role} in ${t.location}. Here is my feedback: ${t.quote}`;

    try {
      const res = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "api-subscription-key": "sk_2eq54hoe_cI8n82QmbGNe2OC9gFLteJLe",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [textToSpeak],
          target_language_code: "en-IN",
          speaker: t.sarvamSpeaker || "priya",
          model: "bulbul:v3",
        }),
      });

      const data = await res.json();
      if (data.audios && data.audios[0]) {
        const base64Audio = `data:audio/wav;base64,${data.audios[0]}`;
        audioCache[t.id] = base64Audio;
        setIsGeneratingVoice(false);

        const audio = new Audio(base64Audio);
        audioRef.current = audio;
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
        audio.play();
        setIsSpeaking(true);
      } else {
        setIsGeneratingVoice(false);
        console.error("Sarvam API error response:", data);
      }
    } catch (err) {
      console.error("Sarvam TTS fetch failure:", err);
      setIsGeneratingVoice(false);
    }
  }, [isSpeaking, isGeneratingVoice, active, stopSpeech]);

  // Stop speech when activeIndex changes or unmounts
  useEffect(() => {
    stopSpeech();
  }, [activeIndex, stopSpeech]);

  // Auto-rotate (pause when speaking or generating voice)
  useEffect(() => {
    if (isSpeaking || isGeneratingVoice) return;
    const timer = setInterval(() => {
      goNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex, isSpeaking, isGeneratingVoice]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection(1);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection(-1);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const goTo = useCallback((idx) => {
    if (isTransitioning || idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, activeIndex]);

  // Magnetic button physics
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.65;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.65;
    gsap.to(e.currentTarget, {
      x,
      y,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <section
      ref={sectionRef}
      id="feedback"
      className="relative w-full bg-[#0A0A0A] overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════
          HERO SPLIT — Left Image | Right Content
      ═══════════════════════════════════════════════ */}
      <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col lg:flex-row">

        {/* ── LEFT: Cinematic Portrait ── */}
        <div className="relative w-full lg:w-[42%] h-[40vh] lg:h-auto overflow-hidden">
          {/* Image with cross-fade */}
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                idx === activeIndex
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A] z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/20 z-10" />

          {/* Noise texture overlay */}
          <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

          {/* Gold accent line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8955D]/40 to-transparent z-20 lg:hidden" />
          
          {/* Gold accent line at right edge (desktop) */}
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#B8955D]/30 to-transparent z-20 hidden lg:block" />

          {/* Counter badge */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#B8955D] fb-counter" key={activeIndex}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm text-white/20 mx-1">/</span>
              <span className="font-mono text-sm text-white/30">
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Project name floating tag */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
            <div key={active.project} className="px-3 py-1.5 rounded-lg bg-[#B8955D]/10 backdrop-blur-md border border-[#B8955D]/20 fb-reveal">
              <span className="font-mono text-[10px] sm:text-xs text-[#B8955D] uppercase tracking-[0.2em] font-bold">
                {active.project}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-8 lg:py-10">

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8955D]/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#B8955D]/[0.02] rounded-full blur-[100px] pointer-events-none" />

          {/* Section label */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-8 h-[1px] bg-[#B8955D]" />
            <span className="font-mono text-[11px] text-[#B8955D] uppercase tracking-[0.3em] font-bold">
              Client Stories
            </span>
          </div>

          {/* Quote content with transition */}
          <div className="relative min-h-[200px] sm:min-h-[220px] mb-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  idx === activeIndex
                    ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                    : idx > activeIndex || (activeIndex === testimonials.length - 1 && idx === 0)
                      ? "opacity-0 translate-y-8 z-0 pointer-events-none"
                      : "opacity-0 -translate-y-8 z-0 pointer-events-none"
                }`}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B8955D] text-[#B8955D]" />
                  ))}
                  <span className="ml-3 font-mono text-[10px] text-white/25 uppercase tracking-[0.2em]">5.0</span>
                </div>

                {/* Large quote */}
                <div className="relative">
                  <Quote className="absolute -top-3 -left-2 w-8 h-8 sm:w-10 sm:h-10 text-[#B8955D]/10 rotate-180" />
                  <p ref={idx === activeIndex ? quoteRef : null} className="font-editorial text-lg sm:text-xl md:text-2xl text-white/85 font-light italic leading-[1.5] pl-6 pr-2">
                    {t.quote}
                  </p>
                </div>

                {/* Person + Speak Endorsement Button */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-[#B8955D] to-[#D4A95C] opacity-50 blur-[2px]" />
                      <img
                        src={t.img}
                        alt={t.name}
                        className="relative w-10 h-10 rounded-full object-cover border-2 border-[#0A0A0A]"
                      />
                    </div>
                    <div>
                      <h4 className="font-editorial text-sm sm:text-base font-bold text-white tracking-tight">
                        {t.name}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-white/30 mt-0.5">
                        {t.role} <span className="text-[#B8955D]/50">·</span> {t.location}
                      </p>
                    </div>
                  </div>

                  {/* Speak button (interactive when active slide) */}
                  {idx === activeIndex && (
                    <button
                      onClick={toggleSpeak}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                      disabled={isGeneratingVoice}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                        isSpeaking
                          ? "bg-[#B8955D] text-[#0A0A0A] font-bold border-[#B8955D] shadow-[0_0_20px_rgba(184,149,93,0.4)] scale-105 animate-pulse"
                          : isGeneratingVoice
                          ? "bg-[#B8955D]/20 text-[#B8955D] border-[#B8955D]/50 cursor-wait"
                          : "bg-white/[0.04] text-white/70 hover:text-[#B8955D] border-white/10 hover:border-[#B8955D]/40 hover:bg-[#B8955D]/10"
                      }`}
                      aria-label="Listen to Voice Endorsement"
                    >
                      {isGeneratingVoice ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B8955D]" />
                          <span>Generating Voice...</span>
                        </>
                      ) : isSpeaking ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                          <span>Speaking...</span>
                          <div className="flex items-end gap-[2px] h-3 ml-1">
                            <div className="w-[2px] bg-[#0A0A0A] eq-bar-1" />
                            <div className="w-[2px] bg-[#0A0A0A] eq-bar-2" />
                            <div className="w-[2px] bg-[#0A0A0A] eq-bar-3" />
                            <div className="w-[2px] bg-[#0A0A0A] eq-bar-4" />
                          </div>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#B8955D]" />
                          <span>Listen Voice</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Navigation Controls ── */}
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
            
            {/* Avatar selector dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => goTo(idx)}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className={`relative rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    idx === activeIndex
                      ? "w-9 h-9 ring-2 ring-[#B8955D] ring-offset-2 ring-offset-[#0A0A0A]"
                      : "w-7 h-7 opacity-40 hover:opacity-70 grayscale hover:grayscale-0"
                  }`}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  {idx === activeIndex && (
                    <div className="absolute inset-0 rounded-full fb-glow pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="w-9 h-9 rounded-full border border-white/[0.08] hover:border-[#B8955D]/40 bg-white/[0.02] hover:bg-[#B8955D]/10 flex items-center justify-center transition-all duration-300 group cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-white/40 group-hover:text-[#B8955D] transition-colors" />
              </button>
              <button
                onClick={goNext}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="w-9 h-9 rounded-full border border-white/[0.08] hover:border-[#B8955D]/40 bg-white/[0.02] hover:bg-[#B8955D]/10 flex items-center justify-center transition-all duration-300 group cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#B8955D] transition-colors" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B8955D] to-[#D4A95C] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM: Stats bar
      ═══════════════════════════════════════════════ */}
      <div className="relative border-t border-white/[0.04]">
        {/* Shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <div className="fb-shimmer w-1/4 h-full bg-gradient-to-r from-transparent via-[#B8955D]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-7 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "40+", label: "Countries Served" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "25+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left group">
                <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-light text-[#B8955D] tracking-tight mb-1 transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </div>
                <div className="font-sans text-xs sm:text-sm text-white/25 uppercase tracking-[0.15em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          CTA Strip
      ═══════════════════════════════════════════════ */}
      <div className="relative border-t border-white/[0.04] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-editorial text-xl sm:text-2xl text-white font-light mb-1">
              Ready to start your project?
            </h3>
            <p className="font-sans text-sm text-white/30">
              Join 500+ satisfied clients across 40+ countries.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#B8955D] text-[#0A0A0A] font-sans text-sm font-bold hover:bg-[#D4A95C] transition-all duration-300 shadow-[0_0_30px_rgba(184,149,93,0.2)] hover:shadow-[0_0_50px_rgba(184,149,93,0.35)] group active:scale-95"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
