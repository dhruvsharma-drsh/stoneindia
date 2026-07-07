import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gem, Globe, Layers, Sparkles, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Update these to match your actual asset paths.
// VIDEO_SRC should be the RE-ENCODED, web-optimized version (see notes below) —
// not the raw WhatsApp export.
const VIDEO_SRC = "/video/VID-20240208-WA0007.mp4";
const POSTER_SRC = "/video/about-poster.jpg";

const statsData = [
  {
    icon: Gem,
    targetValue: 20,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: Globe,
    targetValue: 50,
    suffix: "+",
    label: "Countries Exported",
  },
  {
    icon: Layers,
    targetValue: 200,
    suffix: "+",
    label: "Natural Stone Varieties",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const statsRef = useRef(null);
  const shapesContainerRef = useRef(null);
  const videoRef = useRef(null);
  const wantsToPlayRef = useRef(false);

  // Counter state for numbers
  const [counts, setCounts] = useState([0, 0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false); // gate: don't touch the network until we're near viewport
  const [isBuffering, setIsBuffering] = useState(false); // true while actively waiting on data (not just "not yet mounted")
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Column slides from LEFT
      const leftElements = leftColRef.current.children;
      gsap.fromTo(
        leftElements,
        { opacity: 0, x: -110, filter: "blur(6px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)",
          duration: 1.2, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      // 2. Stats cards
      const statCards = statsRef.current.querySelectorAll(".stat-card");
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      // 3. Video entrance
      gsap.fromTo(
        videoWrapperRef.current,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.3, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // 4. Floating shapes
      const shapes = shapesContainerRef.current.querySelectorAll(".auto-shape");
      shapes.forEach((shape) => {
        gsap.to(shape, {
          y: `random(-12, 12)`, x: `random(-6, 6)`, rotation: `random(-8, 8)`,
          duration: `random(3, 5.5)`, ease: "sine.inOut", repeat: -1, yoyo: true,
        });
      });

      // 5. Counter animation
      const counterTrigger = ScrollTrigger.create({
        trigger: statsRef.current, start: "top 85%",
        onEnter: () => {
          statsData.forEach((stat, i) => {
            gsap.to({}, {
              duration: 2, ease: "power2.out",
              onUpdate: function () {
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(this.progress() * stat.targetValue);
                  return next;
                });
              },
            });
          });
        },
        once: true,
      });
      return () => counterTrigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Format time utility
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Lazy-mount the <video> only once we're near the viewport, so the browser
  // never even opens a connection to the video file until it's actually needed.
  useEffect(() => {
    if (!videoContainerRef.current || shouldLoadVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // start loading a bit before it scrolls into view
    );
    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  // If the user clicked "play" on the poster before the video had mounted,
  // honor that request as soon as the <video> element exists.
  useEffect(() => {
    if (shouldLoadVideo && wantsToPlayRef.current && videoRef.current) {
      wantsToPlayRef.current = false;
      setIsBuffering(true);
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsBuffering(false));
    }
  }, [shouldLoadVideo]);

  const handlePosterClick = () => {
    wantsToPlayRef.current = true;
    setShouldLoadVideo(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsBuffering(true);
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsBuffering(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100 || 0);
    setCurrentTime(formatTime(current));
  };

  const handleProgress = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const total = video.duration;
      if (total > 0) {
        setBufferedProgress((bufferedEnd / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Optimization: Pause video when not in viewport
  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isPlaying, shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white overflow-hidden py-12 sm:py-16 lg:py-20"
    >

      {/* Background elements contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B8955D]/[0.05] rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Floating Geometric Shapes Background ── */}
        <div ref={shapesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="auto-shape absolute top-12 left-[12%] w-14 h-14 border border-[#B8955D]/25 rotate-45 rounded-md backdrop-blur-[1px]" />
          
          <div className="auto-shape absolute bottom-16 left-[28%] w-16 h-16 rounded-full border border-black/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#B8955D]/10 rounded-full" />
          </div>

          <div className="auto-shape absolute top-20 right-[15%] w-10 h-10 bg-gradient-to-br from-[#B8955D]/20 to-transparent rotate-12 rounded" />
          
          <div className="auto-shape absolute bottom-20 right-[35%] w-6 h-6 rounded-full border-2 border-[#B8955D]/30" />

          <div className="auto-shape absolute top-1/3 left-[45%] w-12 h-12 flex items-center justify-center opacity-40">
            <div className="absolute w-full h-[1px] bg-[#B8955D]/40" />
            <div className="absolute h-full w-[1px] bg-[#B8955D]/40" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* ── Left Column: Content ── */}
          <div ref={leftColRef} className="z-10 flex flex-col items-start">
            {/* Subtitle */}
            <div className="flex items-center gap-3.5 mb-6">
              <span className="font-sans text-xs sm:text-[13px] tracking-[0.28em] font-semibold text-[#B8955D] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" /> About Gwalior Stone
              </span>
              <span className="h-[1px] w-10 bg-[#B8955D]/50 block" />
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.2rem] leading-[1.12] tracking-tight text-[#1A1A1A] font-light mb-6">
              Nature's Strength,
              <br />
              <span className="italic font-normal text-[#B8955D]">Our Commitment.</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#6B6B6B] leading-relaxed max-w-[460px] mb-8">
              Gwalior Stone is a leading manufacturer and exporter
              of premium natural stones. We bring the finest
              quality stones from nature to create timeless
              spaces around the world.
            </p>

            {/* Stats Row - inline */}
            <div
              ref={statsRef}
              className="flex flex-wrap gap-3 sm:gap-4 mb-8 w-full"
            >
              {statsData.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="stat-card group relative overflow-hidden flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#FAF9F5] border border-black/[0.06] shadow-sm hover:shadow-lg hover:border-[#B8955D]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-default flex-1 min-w-[140px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8955D]/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F7F3ED] border border-[#B8955D]/20 flex items-center justify-center group-hover:bg-[#B8955D] group-hover:border-[#B8955D] transition-all duration-300">
                      <Icon className="w-4 h-4 text-[#B8955D] group-hover:text-white stroke-[1.75] transition-colors duration-300" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-editorial text-xl sm:text-2xl font-light text-[#1A1A1A] leading-tight group-hover:text-[#B8955D] transition-colors duration-300">
                        {counts[idx]}
                        {stat.suffix}
                      </span>
                      <span className="font-sans text-[10px] sm:text-xs text-[#7A7A7A] tracking-wide font-medium">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/about"
                className="group relative inline-flex items-center gap-4 bg-[#141414] text-white font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] pl-7 pr-3 py-3 rounded-full border border-[#B8955D]/35 overflow-hidden shadow-md transition-all duration-500 hover:border-[#B8955D] hover:shadow-[0_12px_30px_rgba(184,149,93,0.28)] hover:-translate-y-1 active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#B8955D] via-[#C5A880] to-[#B8955D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                <span className="relative z-10 transition-colors duration-300">
                  Learn More About Us
                </span>
                <span className="relative z-10 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>

          {/* ── Right Column: Premium Video Player ── */}
          <div ref={videoWrapperRef} className="relative z-10 flex items-center justify-center">
            
            {/* Background Texture & Decor for Video Column */}
            {!isFullscreen && (
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                
                {/* Offset Solid Backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[45%] w-[85%] max-w-[440px] h-[105%] bg-[#F2F1EC] rounded-[2rem] border border-[#E5E4DE] shadow-sm" />
                
                {/* Architectural Lines */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-black" />
                  <div className="absolute bottom-[20%] left-[-10%] w-[120%] h-[1px] bg-black" />
                  <div className="absolute top-[-10%] right-[15%] w-[1px] h-[120%] bg-black" />
                </div>
                
                {/* Floating Gold Frame */}
                <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[55%] w-[90%] max-w-[460px] h-[110%] border border-[#B8955D]/40 rounded-[2rem]" />
                
                {/* Typography Accent */}
                <div className="absolute right-[0%] bottom-[15%] rotate-90 origin-bottom-right text-[10px] font-mono tracking-[0.4em] text-black/50 uppercase">
                  Gwalior Stone Exporter
                </div>

                {/* Soft ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B8955D]/15 rounded-full blur-[80px]" />
              </div>
            )}

            <div 
              ref={videoContainerRef}
              className={`relative w-full ${isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-[400px] lg:max-w-[460px] mx-auto rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/[0.08]'} overflow-hidden group bg-black transition-all duration-300`}
            >

              {shouldLoadVideo ? (
                <>
                  {/* Video Element — only exists in the DOM once we're near viewport */}
                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    poster={POSTER_SRC}
                    className={`w-full ${isFullscreen ? 'h-full' : 'aspect-[4/5]'} object-cover cursor-pointer`}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onProgress={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onWaiting={() => setIsBuffering(true)}
                    onPlaying={() => setIsBuffering(false)}
                    onCanPlay={() => setIsBuffering(false)}
                    onClick={togglePlay}
                  />

                  {/* Buffering spinner — shows whenever we're actually waiting on network/data */}
                  {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      </div>
                    </div>
                  )}

                  {/* Big Center Play Button Overlay */}
                  {!isPlaying && !isBuffering && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white shadow-xl transition-transform duration-300 hover:scale-110">
                        <Play size={32} className="fill-current ml-2" />
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay at bottom for controls */}
                  <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

                  {/* Custom Controls */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-3 z-10 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 w-full group/slider cursor-pointer">
                      <span className="text-white/90 text-[10px] sm:text-xs font-medium w-8 text-right font-mono tracking-wider">{currentTime}</span>
                      <div className="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        {/* Buffered Progress (YouTube-style grey bar) */}
                        <div 
                          className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${bufferedProgress}%` }}
                        />
                        {/* Playback Progress */}
                        <div 
                          className="absolute top-0 left-0 h-full bg-[#B8955D] rounded-full transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleSeek}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                      </div>
                      <span className="text-white/50 text-[10px] sm:text-xs font-medium w-8 font-mono tracking-wider">{duration}</span>
                    </div>

                    {/* Bottom Controls Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Play/Pause */}
                        <button
                          onClick={togglePlay}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                          {isPlaying ? <Pause size={16} className="fill-current" /> : <Play size={16} className="fill-current ml-0.5" />}
                        </button>

                        {/* Volume Toggle */}
                        <button
                          onClick={toggleMute}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>

                      {/* Fullscreen Toggle */}
                      <button
                        onClick={toggleFullscreen}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Poster-only placeholder — zero video network requests until this scrolls near view */
                <div
                  className="relative w-full aspect-[4/5] cursor-pointer"
                  onClick={handlePosterClick}
                >
                  <img
                    src={POSTER_SRC}
                    alt="Gwalior Stone showcase preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white shadow-xl transition-transform duration-300 hover:scale-110">
                      <Play size={32} className="fill-current ml-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Decorative corner accent (hide in fullscreen) */}
              <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#B8955D]/50 rounded-tr-lg pointer-events-none transition-opacity ${isFullscreen ? 'opacity-0' : 'opacity-100'}`} />
              <div className={`absolute bottom-20 left-4 w-8 h-8 border-b-2 border-l-2 border-[#B8955D]/50 rounded-bl-lg pointer-events-none transition-opacity ${isFullscreen ? 'opacity-0' : 'opacity-100'}`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;