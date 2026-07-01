import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/ui/header-3";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Animated Counter
───────────────────────────────────────── */
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let n = 0;
        const step = target / (duration * 60);
        const t = setInterval(() => {
          n += step;
          if (n >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(n));
        }, 1000 / 60);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const facilities = [
  {
    id: "01",
    label: "Processing Unit",
    title: "State-of-the-Art Stone Processing",
    body: "Our Gwalior-based processing unit is equipped with advanced CNC bridge saws, edge-profiling machines, and waterjet cutters that handle every stone variety with surgical precision — delivering hand-cut and machine-cut edges of exceptional quality.",
    img: "img/infra_cutting.png",
    tags: ["CNC Bridge Saws", "Waterjet Cutting", "Edge Profiling", "Surface Finishing"],
  },
  {
    id: "02",
    label: "Quality Control",
    title: "Rigorous Multi-Stage Inspection",
    body: "Every stone batch passes through our dedicated quality inspection zone before dispatch. Trained inspectors check for dimensional accuracy, surface finish, colour consistency, and structural integrity — ensuring zero compromise on standards.",
    img: "img/infra_quality.png",
    tags: ["Dimensional Accuracy", "Finish Grading", "Colour Matching", "Structural Testing"],
  },
  {
    id: "03",
    label: "Warehousing",
    title: "Large-Scale Storage & Inventory",
    body: "Our expansive warehouse facilities in Northern India safely store thousands of tonnes of finished and semi-finished stone slabs, ready for swift dispatch. Organised rack systems ensure zero damage and quick order fulfilment.",
    img: "img/infra_warehouse.png",
    tags: ["Slab Racking Systems", "Inventory Management", "Climate-Adapted Storage", "Swift Dispatch"],
  },
  {
    id: "04",
    label: "Packaging",
    title: "Export-Grade Packaging",
    body: "Stones are packed in seasoned wooden crates with foam-padded interiors, ensuring zero damage during transit. Our export-grade packaging meets international shipping standards for sea freight, ensuring safe delivery to all ports worldwide.",
    img: "img/infra_packaging.png",
    tags: ["Wooden Crating", "Foam Padding", "Sea-Freight Standards", "Custom Pack Sizes"],
  },
];

const capabilities = [
  { icon: "⚙️", title: "CNC Precision Cutting", desc: "Computer-controlled bridge saws for millimetre-perfect cuts on any stone type" },
  { icon: "🔬", title: "Quality Inspection Lab", desc: "Multi-point quality checks at quarry, factory, and pre-shipment stages" },
  { icon: "🏗️", title: "Large-Format Processing", desc: "Handling slabs up to 3m × 1.5m with consistent thickness calibration" },
  { icon: "🎨", title: "Multi-Finish Capability", desc: "Natural, honed, polished, sandblasted, tumbled, calibrated — all in-house" },
  { icon: "📦", title: "Export Packaging Unit", desc: "ISO-compliant wooden crating for safe ocean and air freight dispatch" },
  { icon: "🚢", title: "Port Logistics Network", desc: "Direct ties to Mundra, Chennai, and Mumbai ports for fastest global dispatch" },
];

const stats = [
  { value: 50000, suffix: "+", label: "Sq Ft Production Area", color: "#B8955D" },
  { value: 15,    suffix: "+", label: "CNC Processing Machines", color: "#2E7D52" },
  { value: 500,   suffix: "+", label: "Tonnes Monthly Capacity", color: "#1565C0" },
  { value: 25,    suffix: "+", label: "Years of Operations", color: "#C0392B" },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const InfrastructurePage = () => {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      /* Hero */
      gsap.fromTo(".infra-badge",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".infra-h1",     { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1,   ease: "power3.out", delay: 0.4 });
      gsap.fromTo(".infra-sub",    { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.7 });
      gsap.fromTo(".infra-metrics",{ opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.9 });

      /* Scroll reveals */
      gsap.utils.toArray(".reveal").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" },
        });
      });

      /* Capability cards stagger */
      gsap.fromTo(".cap-card",
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".cap-grid", start: "top 84%", toggleActions: "play none none reverse" } }
      );

      /* Stat cards stagger */
      gsap.fromTo(".stat-c",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-wrap", start: "top 85%", toggleActions: "play none none reverse" } }
      );

      /* Tab image cross-fade handled in JSX */
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-white min-h-screen font-sans">
      <Header />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center overflow-hidden bg-[#FAFAF8]">
        
        {/* Luxury Watermark Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
          <span className="text-[20vw] font-black tracking-tighter whitespace-nowrap text-black select-none pointer-events-none" style={{ transform: "rotate(-5deg)" }}>
            INFRASTRUCTURE
          </span>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-1/2 h-[80vh] bg-[radial-gradient(ellipse_at_top_right,rgba(184,149,93,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="infra-badge inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#B8955D]/30 bg-transparent mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8955D] animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-[#B8955D] font-bold uppercase">
                World-Class Facilities
              </span>
            </div>

            <h1 className="infra-h1 text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-extrabold text-[#111] leading-[0.95] tracking-tighter mb-8">
              Built <br />
              <span className="italic font-light text-[#B8955D]">for</span> Scale.
            </h1>

            <p className="infra-sub text-lg text-[#666] leading-relaxed mb-12 max-w-md">
              Our manufacturing infrastructure spans processing units, quality labs, and export packaging facilities — all engineered to deliver premium natural stone with zero compromise.
            </p>

            {/* Scroll Indicator */}
            <div className="infra-sub flex items-center gap-4 text-[#888] text-[10px] font-bold tracking-[0.2em] uppercase">
              <div className="w-12 h-[1px] bg-[#B8955D]" />
              Explore Facilities
            </div>
          </div>

          {/* Right Metrics - Interactive Expanding Accordion */}
          <div className="lg:col-span-7 infra-metrics">
            <div className="flex w-full h-[350px] md:h-[420px] gap-2 md:gap-3 group/accordion">
              {stats.map((s, i) => (
                <div 
                  key={i} 
                  className="relative flex-1 bg-[#FAFAF8] border border-[#EDEDE9] rounded-2xl md:rounded-[2rem] overflow-hidden transition-[flex,box-shadow,background] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[3.5] hover:shadow-[0_20px_60px_rgba(184,149,93,0.15)] group cursor-default"
                >
                  {/* Expanded Dark Background */}
                  <div className="absolute inset-0 bg-[#111] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,149,93,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75" />
                  
                  {/* Default Collapsed State */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-lg md:text-2xl font-extrabold text-[#111] mb-6 transform -rotate-90 whitespace-nowrap tracking-wider">
                      {s.value}{s.suffix}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#B8955D]/40 flex items-center justify-center text-[#B8955D] group-hover:scale-0 transition-transform duration-300 bg-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>

                  {/* Expanded Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none group-hover:pointer-events-auto">
                     <span className="text-[2.5rem] md:text-[4.5rem] font-bold text-white leading-none mb-2 md:mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 whitespace-nowrap">
                       <Counter target={s.value} suffix={s.suffix} />
                     </span>
                     <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#B8955D] uppercase transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-150">
                       {s.label}
                     </span>
                     <div className="w-0 h-[2px] bg-[#B8955D] mt-4 md:mt-6 group-hover:w-16 transition-all duration-700 delay-300" />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FACILITY TABS — Interactive, frostrek-phase-style
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-3">Our Facilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Inside Our <span className="text-[#B8955D]">Production World</span>
            </h2>
          </div>

          {/* Tab layout — left list, right detail panel */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left: Tab buttons */}
            <div className="lg:w-72 flex-shrink-0 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {facilities.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(i)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink w-48 lg:w-full ${
                    activeTab === i
                      ? "bg-[#B8955D]/8 border-[#B8955D]/40 shadow-md"
                      : "bg-[#FAFAF8] border-[#EDEDE9] hover:border-[#B8955D]/25"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    activeTab === i ? "bg-[#B8955D] text-white" : "bg-[#EDEDE9] text-[#888]"
                  }`}>
                    <span className="text-[11px] font-bold tracking-wider">{f.id}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-wider font-semibold mb-0.5 transition-colors ${
                      activeTab === i ? "text-[#B8955D]" : "text-[#AAA]"
                    }`}>Phase {f.id}</span>
                    <span className={`text-[13px] font-semibold transition-colors ${
                      activeTab === i ? "text-[#1A1A1A]" : "text-[#555]"
                    }`}>{f.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Detail panel */}
            <div className="flex-1 bg-[#FAFAF8] border border-[#EDEDE9] rounded-3xl overflow-hidden shadow-sm">
              {facilities.map((f, i) => (
                <div
                  key={f.id}
                  className={`${activeTab === i ? "block tab-image-in" : "hidden"}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56 sm:h-72 lg:h-80">
                    <img
                      src={f.img}
                      alt={f.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#B8955D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Phase {f.id} — {f.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 sm:p-9">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4">{f.title}</h3>
                    <p className="text-[15px] text-[#555] leading-relaxed mb-6">{f.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {f.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#B8955D]/8 border border-[#B8955D]/20 text-[#B8955D]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CAPABILITIES GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-28 px-6 bg-[#FAFAF8] border-y border-[#EDEDE9]">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-3">What We Built</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
              Core <span className="text-[#B8955D]">Capabilities</span>
            </h2>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto leading-relaxed">
              Our infrastructure is purpose-built to handle every stage of stone processing — 
              from raw quarry blocks to perfectly packed export-ready slabs.
            </p>
          </div>

          <div className="cap-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="cap-card group bg-white border border-[#EDEDE9] rounded-2xl p-7 hover:border-[#B8955D]/35 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#B8955D]/8 flex items-center justify-center mb-5 text-2xl group-hover:bg-[#B8955D]/15 transition-colors duration-300">
                  {cap.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#B8955D] transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESS TIMELINE — frostrek "Our Journey" style
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              From <span className="text-[#B8955D]">Quarry</span> to Your Door
            </h2>
            <p className="text-[15px] text-[#666] max-w-2xl mx-auto mt-4 leading-relaxed">
              Our streamlined end-to-end process ensures every stone you receive meets our
              exacting standards — from the quarry face to your project site.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B8955D]/60 via-[#B8955D]/30 to-transparent sm:-translate-x-px" />

            {[
              { step:"01", title:"Quarry Sourcing",  icon:"⛏️", body:"Field teams select premium quarry blocks across India, evaluating colour, grain, structural integrity, and finish suitability before procurement." },
              { step:"02", title:"Raw Processing",   icon:"🔩", body:"Blocks are transported to our Gwalior facility (or quarry-side factories) where CNC saws calibrate slabs to precise thickness and size specifications." },
              { step:"03", title:"Surface Finishing", icon:"✨", body:"Slabs are sent through finish lines — natural, sawn, honed, polished, sandblasted, tumbled, or calibrated — based on order specifications." },
              { step:"04", title:"Quality Inspection", icon:"🔬", body:"Every batch goes through multi-point inspection: dimensional checks, finish grading, colour consistency, and structural testing before release." },
              { step:"05", title:"Export Packaging",  icon:"📦", body:"Approved stones are packed in foam-padded seasoned wooden crates, labelled, and palletised for sea freight from Mundra, Chennai, or Mumbai port." },
              { step:"06", title:"Global Delivery",   icon:"🚢", body:"Consignments are dispatched via India's fastest export ports, with full documentation support for customs clearance in 50+ destination countries." },
            ].map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <div
                  key={item.step}
                  className={`reveal relative flex flex-col sm:flex-row ${!isRight ? "sm:flex-row-reverse" : ""} gap-0 sm:gap-0 mb-12 last:mb-0`}
                >
                  {/* Step node */}
                  <div className="absolute left-6 sm:left-1/2 top-5 sm:top-4 -translate-x-[11px] sm:-translate-x-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#B8955D] border-4 border-white shadow-lg">
                    <span className="sr-only">{item.step}</span>
                  </div>

                  {/* Text card */}
                  <div className={`sm:w-[46%] pl-14 sm:pl-0 ${isRight ? "sm:pr-14" : "sm:pl-14"}`}>
                    <div className="bg-[#FAFAF8] border border-[#EDEDE9] rounded-2xl p-6 hover:border-[#B8955D]/30 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-bold text-[#B8955D] bg-[#B8955D]/10 px-2.5 py-1 rounded-full tracking-widest uppercase">
                          Step {item.step}
                        </span>
                      </div>
                      <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#B8955D] transition-colors">{item.title}</h3>
                      <p className="text-[13px] text-[#666] leading-relaxed">{item.body}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-[8%]" />
                  <div className="hidden sm:block sm:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          IMAGE GALLERY STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-[#FAFAF8] border-t border-[#EDEDE9]">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-10">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-2">Our Facility</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">A Glimpse Inside</h2>
          </div>
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { img: "img/infra_cutting.png", cap: "CNC Cutting" },
              { img: "img/stone_craft.png", cap: "Stone Crafting" },
              { img: "img/infra_warehouse.png", cap: "Warehousing" },
              { img: "img/infra_packaging.png", cap: "Packaging" },
            ].map((g, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer">
                <img
                  src={g.img}
                  alt={g.cap}
                  className="w-full h-40 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-[13px] font-semibold">{g.cap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal bg-gradient-to-br from-[#B8955D]/8 via-[#FAFAF8] to-white border border-[#B8955D]/20 rounded-3xl px-10 py-16 shadow-sm">
            <p className="text-[11px] tracking-[0.25em] font-semibold text-[#B8955D] uppercase mb-4">Ready to Order?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 leading-[1.2]">
              Premium Stone,{" "}
              <span className="text-[#B8955D]">Precision Delivered</span>
            </h2>
            <p className="text-[15px] text-[#666] max-w-xl mx-auto leading-relaxed mb-10">
              Our infrastructure is designed to handle bulk orders, custom specifications,
              and time-sensitive shipments — with quality guaranteed at every step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#B8955D] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Request a Quote
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-[#EDEDE9] text-[#555] font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:border-[#B8955D]/40 hover:text-[#B8955D] transition-all duration-300 hover:-translate-y-1"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InfrastructurePage;
