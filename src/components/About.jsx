import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Map } from "./ui/flightcn-flight-multi-route";

gsap.registerPlugin(ScrollTrigger);

const useCountUp = (end, duration = 2000, trigger = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
};

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const countYears = useCountUp(25, 2000, statsVisible);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(".about-main-img", { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.6, ease: "power4.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(".about-card-1", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(".about-card-2", { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(".about-stats", { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          onStart: () => setStatsVisible(true),
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="relative z-30 w-full overflow-hidden min-h-[100vh] py-16 lg:py-0"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* ▸ MAIN large building image — full right half of screen */}
        <div
          className="about-main-img absolute top-0 right-0 h-full hidden lg:block overflow-hidden"
          style={{ width: "52vw", zIndex: 0 }}
        >
          <img
            src="/img/big.png"
            alt="Royal Gwalior Stone Facade"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        <div
          className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-14 flex flex-col lg:flex-row items-stretch min-h-[100vh]"
        >
          {/* ── LEFT: TEXT ── */}
          <div
            ref={leftColRef}
            className="w-full lg:w-[42%] flex flex-col justify-center items-start py-8 lg:py-10 relative z-10"
          >
            <span
              className="text-[#B8955D] font-bold tracking-[0.3em] text-[11px] uppercase mb-6"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              About Us
            </span>

            <h2 className="about-heading mb-6">
              Every Stone<br />
              Tells a Story.
            </h2>

            <div
              className="space-y-3 text-[#4A4A4A] leading-[1.75] mb-7"
              style={{
                fontSize: "clamp(12px, 0.95vw, 14px)",
                maxWidth: "390px",
                fontFamily: "'Libre Baskerville', serif",
              }}
            >
              <p>
                For over two decades, <strong className="text-[#1A1A1A] font-bold">Gwalior Stone</strong> has been transforming India's finest natural stones into timeless architectural masterpieces — exported to <strong className="text-[#1A1A1A] font-bold">50+ countries</strong> worldwide.
              </p>
              <p>
                From intricate jaali carvings to grand facade cladding, our artisans blend heritage techniques with modern precision to deliver stone solutions that stand the test of time.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-5 border border-[#1A1A1A]/80 px-7 py-3.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 ease-out"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              <span>Discover Our Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* ── RIGHT: COLLAGE ── */}
          <div className="hidden lg:block w-[58%] relative h-full">

            {/* ▸ Top-left card — jaali carving (PORTRAIT) */}
            <div
              className="about-card-1 absolute overflow-hidden"
              style={{
                top: "1%",
                left: "6%",
                width: "24%",
                aspectRatio: "3/4",
                border: "6px solid white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                zIndex: 20,
              }}
            >
              <img
                src="/img/s1.png"
                alt="Intricate Jaali Carving"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>

            {/* ▸ Bottom-left card — stone texture (PORTRAIT) */}
            <div
              className="about-card-2 absolute overflow-hidden"
              style={{
                top: "38%",
                left: "-4%",
                width: "32%",
                aspectRatio: "1/1",
                border: "6px solid white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                zIndex: 20,
              }}
            >
              <img
                src="/img/s2.png"
                alt="Natural Stone Texture"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>

            {/* ▸ Stats Card — bottom right overlapping main image and stone texture */}
            <div
              className="about-stats absolute bg-white"
              style={{
                top: "51%",
                left: "22%",
                width: "270px",
                padding: "16px 20px 12px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                zIndex: 30,
              }}
            >
              {/* Layout matching exact reference design */}
              <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 items-center">
                
                {/* Top left: Pillar Icon */}
                <div className="text-[#B8955D] flex justify-center">
                  <svg width="40" height="48" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="8" r="4" stroke="#B8955D" strokeWidth="1.2" fill="none" />
                    <circle cx="6" cy="8" r="1.5" fill="#B8955D" opacity="0.3" />
                    <circle cx="30" cy="8" r="4" stroke="#B8955D" strokeWidth="1.2" fill="none" />
                    <circle cx="30" cy="8" r="1.5" fill="#B8955D" opacity="0.3" />
                    <rect x="5" y="11" width="26" height="2" fill="#B8955D" opacity="0.4" />
                    <rect x="8"  y="13" width="3" height="22" fill="#B8955D" opacity="0.3" />
                    <rect x="14" y="13" width="3" height="22" fill="#B8955D" opacity="0.3" />
                    <rect x="20" y="13" width="3" height="22" fill="#B8955D" opacity="0.3" />
                    <rect x="26" y="13" width="3" height="22" fill="#B8955D" opacity="0.3" />
                    <rect x="5" y="35" width="26" height="2" fill="#B8955D" opacity="0.4" />
                    <rect x="3" y="37" width="30" height="3" fill="#B8955D" opacity="0.3" />
                  </svg>
                </div>
                
                {/* Top right: 25+ */}
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: "2.8rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#1A1A1A", lineHeight: 0.9 }}>
                    {countYears}
                  </span>
                  <span style={{ fontSize: "2.0rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#B8955D", lineHeight: 0.9 }}>
                    +
                  </span>
                </div>

                {/* Bottom left: Gold line */}
                <div className="flex justify-center w-full">
                  <div className="w-8 h-[2px] bg-[#B8955D]" />
                </div>

                {/* Bottom right: YEARS OF EXCELLENCE */}
                <div style={{ fontSize: "9px", fontFamily: "'Libre Baskerville', serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#333" }}>
                  Years of Excellence
                </div>

              </div>

              {/* Description */}
              <p style={{ fontSize: "11px", fontFamily: "'Libre Baskerville', serif", color: "#777", lineHeight: 1.75, marginTop: "10px" }}>
                Crafting premium natural stone<br />
                for timeless architecture across<br />
                India and global markets.
              </p>

              {/* World Map Component */}
              <div className="mt-4 flex justify-center w-full h-[90px] relative pointer-events-auto rounded-md overflow-hidden border border-gray-100">
                <Map 
                  theme="light"
                  viewport={{ center: [78.9629, 20.5937], zoom: 0.5 }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;
