import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InkReveal from '@/components/ui/ink-reveal';
import Footer from '@/components/Footer';

const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] overflow-hidden">

      {/* ── Full Page InkReveal Background ── */}
      <div
        className="group"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background image that gets revealed */}
        <img
          src="/img/project_udaipur_palace.png"
          alt="Stone craftsmanship"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.4)"
          }}
        />

        {/* InkReveal mask overlay */}
        <InkReveal
          maskColor={[250, 250, 248]}
          brushSize={300}
          lifetime={800}
          rStart={12}
          rVary={0.5}
          stampStep={8}
          maxStamps={300}
        />

        {/* All page content sits on top */}
        <div className="relative" style={{ zIndex: 2, pointerEvents: "none" }}>

          {/* Header Content on top of the ink reveal */}
          <div className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
            <div className="flex flex-col items-center mb-4">
              {/* Squiggly Line */}
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                <path d="M 0 6 Q 5 0, 10 6 T 20 6 T 30 6 T 40 6" stroke="#22c55e" strokeWidth="2" fill="none" />
              </svg>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1f2937]" style={{ textShadow: "0px 0px 10px rgba(250,250,248,0.8)" }}>WHAT WE DO</h3>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#B4956C] mb-6 relative" style={{ textShadow: "0px 2px 15px rgba(0,0,0,0.3), 0px 0px 20px rgba(250,250,248,0.5)" }}>
              <span className="absolute -left-4 -top-2 w-6 h-6 rounded-full bg-[#fef08a] opacity-50 -z-10"></span>
              Our Main Category
            </h1>
            
            <p className="text-[#1f2937] text-sm md:text-base italic max-w-2xl mx-auto leading-relaxed font-serif font-medium" style={{ textShadow: "0px 0px 15px rgba(250,250,248,0.9), 0px 0px 5px rgba(250,250,248,1)" }}>
              Our mission is to find the most trustworthy science and practical knowledge about health, make it inspiring and simple to use, and accessible and free for everyone.
            </p>
          </div>

          {/* Products Grid */}
          <div className="w-full max-w-6xl mx-auto px-6 pb-24" style={{ pointerEvents: "auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              
              {/* Card 1: Stone Products */}
              <Link to="/products/stone-products" className="block bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-10 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] duration-300 group">
                <div className="w-full h-56 mb-8 overflow-hidden">
                  <img src="/img/product/Stone-product-image.webp" alt="Stone Products" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-4">Stone Products</h4>
                <p className="text-sm text-[#6b7280] leading-relaxed px-8 mb-8 flex-grow">
                  Stone India offers a variety of manufactured stone products, thin brick, tile, and precast products. Architectural stone products can be used to greatly enhance the look and feel of your establishment.
                </p>
                <div className="px-8 py-3 bg-[#B4956C] group-hover:bg-[#a3835c] text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
                  READ MORE
                </div>
              </Link>

              {/* Card 2: Sandstone */}
              <Link to="/products/sandstone" className="block bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-10 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] duration-300 group">
                <div className="w-full h-56 mb-8 overflow-hidden">
                  <img src="/img/product/pro-1.webp" alt="Sandstone" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-4">Sandstone</h4>
                <p className="text-sm text-[#6b7280] leading-relaxed px-8 mb-8 flex-grow">
                  Among the most precious gift that nature offers, rocks and minerals stand tall. Sandstone is a sedimentary rock consisting of rock grains or minerals.They are available in a variety of colors including white, red, yellow, tan.
                </p>
                <div className="px-8 py-3 bg-[#B4956C] group-hover:bg-[#a3835c] text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
                  READ MORE
                </div>
              </Link>

              {/* Card 3: Stone Articrafts */}
              <Link to="/products/stone-articrafts" className="block bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-10 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] duration-300 group">
                <div className="w-full h-56 mb-8 overflow-hidden">
                  <img src="/img/product/last card image .webp" alt="Stone Articrafts" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-xl font-bold text-[#1f2937] mb-4">Stone Articrafts</h4>
                <p className="text-sm text-[#6b7280] leading-relaxed px-8 mb-8 flex-grow">
                  STONE INDIA is a master in offering highly attractive and useful stone articrafts for our customers. We offer amazing varieties of products that are designed by following international manufacturing practices...
                </p>
                <div className="px-8 py-3 bg-[#B4956C] group-hover:bg-[#a3835c] text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
                  READ MORE
                </div>
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;
