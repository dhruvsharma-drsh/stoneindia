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
        {/* BASE LAYER: Clear sharp image — always visible behind the canvas on desktop, and colorful with overlay on mobile */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/project_udaipur_palace.png"
            alt="Stone craftsmanship"
            className="w-full h-full object-cover object-center brightness-[0.6] md:brightness-[0.4]"
          />
          {/* Mobile premium dark gradient overlay so text is readable but image colors pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/60 to-[#111111]/95 md:hidden" />
        </div>

        {/* TOP LAYER: InkReveal Canvas. 
            Hidden on mobile for better performance and clear background. 
            Visible on desktop for the interactive mouse effect. */}
        <div className="hidden md:block absolute inset-0 z-10 pointer-events-auto">
          <InkReveal
            imageSrc="/img/project_udaipur_palace.png"
            imageFilter="opacity(25%) grayscale(80%)"
            maskColor={[250, 250, 248]}
            brushSize={300}
            lifetime={1200}
            rStart={12}
            rVary={0.5}
            stampStep={8}
            maxStamps={400}
          />
        </div>

        {/* All page content sits on top */}
        <div className="relative z-20 pointer-events-none">

          {/* Header Content on top of the background */}
          <div className="relative flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 pb-12 md:pb-24">
            <div className="flex flex-col items-center mb-4">
              {/* Squiggly Line */}
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                <path d="M 0 6 Q 5 0, 10 6 T 20 6 T 30 6 T 40 6" className="stroke-[#DFBA73] md:stroke-[#22c55e]" strokeWidth="2" fill="none" />
              </svg>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/90 md:text-[#1f2937] drop-shadow-md md:drop-shadow-none">WHAT WE DO</h3>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#DFBA73] md:text-[#B4956C] mb-6 relative drop-shadow-lg md:drop-shadow-none">
              <span className="absolute -left-4 -top-2 w-6 h-6 rounded-full bg-[#fef08a] opacity-30 md:opacity-50 -z-10"></span>
              Our Main Category
            </h1>
            
            <p className="text-white/90 md:text-[#1f2937] text-sm md:text-base italic max-w-2xl mx-auto leading-relaxed font-serif font-medium drop-shadow-md md:drop-shadow-none">
              Our mission is to provide the finest quality natural stone products, meticulously crafted to elevate architectural and interior spaces worldwide with timeless elegance.
            </p>
          </div>

          {/* Products Grid / Carousel */}
          <div className="w-full max-w-6xl mx-auto px-0 md:px-6 pb-24" style={{ pointerEvents: "auto" }}>
            <div className="flex md:grid flex-nowrap overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-10 pb-8 px-6 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid-cols-3">
              
              {/* Card 1: Stone Products */}
              <Link to="/products/stone-products" className="snap-center shrink-0 w-[85vw] md:w-auto block bg-white/10 md:bg-white backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none rounded-2xl md:rounded-xl overflow-hidden shadow-2xl md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-8 md:pb-10 group">
                <div className="relative w-full aspect-[3/4] mb-5 md:mb-8 overflow-hidden bg-[#DFDDD8] border-b border-black/5 transition-all duration-700 ease-out">
                  <img
                    src="/img/product/Stone-product-image.webp"
                    alt="Stone Products"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-0 group-hover:-translate-x-full"
                  />
                  <img
                    src="/img/product/Stone-product-image.webp"
                    alt="Stone Products Secondary"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0" 
                  />
                  {/* Glass Reflection Shimmer */}
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white/50 opacity-0 group-hover:animate-[shimmer-glass_0.35s_ease-out_forwards] z-20 pointer-events-none"></div>
                </div>
                <h4 className="text-xl md:text-xl font-bold text-white md:text-[#1f2937] mb-3 md:mb-4">Stone Products</h4>
                <p className="text-sm md:text-sm text-white/70 md:text-[#6b7280] leading-relaxed px-6 md:px-8 mb-6 md:mb-8 flex-grow">
                  Stone India offers a variety of manufactured stone products, thin brick, tile, and precast products. Architectural stone products can be used to greatly enhance the look and feel of your establishment.
                </p>
                <div className="px-8 py-3 bg-[#DFBA73] md:bg-[#B4956C] group-hover:bg-[#C8A05D] md:group-hover:bg-[#a3835c] text-black md:text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
                  READ MORE
                </div>
              </Link>

              {/* Card 2: Sandstone */}
              <Link to="/products/gwalior-sandstone" className="snap-center shrink-0 w-[85vw] md:w-auto block bg-white/10 md:bg-white backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none rounded-2xl md:rounded-xl overflow-hidden shadow-2xl md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-8 md:pb-10 group">
                <div className="relative w-full aspect-[3/4] mb-5 md:mb-8 overflow-hidden bg-[#DFDDD8] border-b border-black/5 transition-all duration-700 ease-out">
                  <img
                    src="/img/product/pro-1.webp"
                    alt="Sandstone"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-0 group-hover:-translate-x-full"
                  />
                  <img
                    src="/img/product/pro-1.webp"
                    alt="Sandstone Secondary"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0" 
                  />
                  {/* Glass Reflection Shimmer */}
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white/50 opacity-0 group-hover:animate-[shimmer-glass_0.35s_ease-out_forwards] z-20 pointer-events-none"></div>
                </div>
                <h4 className="text-xl md:text-xl font-bold text-white md:text-[#1f2937] mb-3 md:mb-4">Sandstone</h4>
                <p className="text-sm md:text-sm text-white/70 md:text-[#6b7280] leading-relaxed px-6 md:px-8 mb-6 md:mb-8 flex-grow">
                  Among the most precious gift that nature offers, rocks and minerals stand tall. Sandstone is a sedimentary rock consisting of rock grains or minerals.They are available in a variety of colors including white, red, yellow, tan.
                </p>
                <div className="px-8 py-3 bg-[#DFBA73] md:bg-[#B4956C] group-hover:bg-[#C8A05D] md:group-hover:bg-[#a3835c] text-black md:text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
                  READ MORE
                </div>
              </Link>

              {/* Card 3: Stone Articrafts */}
              <Link to="/products/stone-articrafts" className="snap-center shrink-0 w-[85vw] md:w-auto block bg-white/10 md:bg-white backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-none rounded-2xl md:rounded-xl overflow-hidden shadow-2xl md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center text-center pb-8 md:pb-10 group">
                <div className="relative w-full aspect-[3/4] mb-5 md:mb-8 overflow-hidden bg-[#DFDDD8] border-b border-black/5 transition-all duration-700 ease-out">
                  <img
                    src="/img/product/last card image .webp"
                    alt="Stone Articrafts"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-0 group-hover:-translate-x-full"
                  />
                  <img
                    src="/img/product/last card image .webp"
                    alt="Stone Articrafts Secondary"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0" 
                  />
                  {/* Glass Reflection Shimmer */}
                  <div className="absolute w-[200%] h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white/50 opacity-0 group-hover:animate-[shimmer-glass_0.35s_ease-out_forwards] z-20 pointer-events-none"></div>
                </div>
                <h4 className="text-xl md:text-xl font-bold text-white md:text-[#1f2937] mb-3 md:mb-4">Stone Articrafts</h4>
                <p className="text-sm md:text-sm text-white/70 md:text-[#6b7280] leading-relaxed px-6 md:px-8 mb-6 md:mb-8 flex-grow">
                  STONE INDIA is a master in offering highly attractive and useful stone articrafts for our customers. We offer amazing varieties of products that are designed by following international manufacturing practices...
                </p>
                <div className="px-8 py-3 bg-[#DFBA73] md:bg-[#B4956C] group-hover:bg-[#C8A05D] md:group-hover:bg-[#a3835c] text-black md:text-white text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors">
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
