import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { stoneProductsData } from "../data/stoneProductsData";
import { ArrowRight } from "lucide-react";
import SocialCards from "./ui/card-fan-carousel";

const VerticalProductShowcase = () => {
  // Get a random selection of products from all categories
  const randomProducts = useMemo(() => {
    const allProducts = [
      ...stoneProductsData.grid,
      ...stoneProductsData.sandstoneProducts,
      ...stoneProductsData.stoneArticrafts,
    ];

    // Shuffle and pick 10 items for the beautiful fan carousel
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10).map((product) => ({
      imgUrl: product.img,
      alt: product.title,
      linkUrl: `/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: product.title,
      desc: product.desc
    }));
  }, []);

  return (
    <section className="w-full bg-[#FAF9F5] py-24 relative overflow-hidden">
      {/* Light Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B8955D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[100rem] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 px-6 sm:px-10 text-center">
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-[#111111] font-light leading-tight mb-4">
            Curated <span className="italic text-[#B8955D] font-normal">Selection.</span>
          </h2>
          <p className="font-sans text-[#666666] text-sm sm:text-base max-w-2xl font-light">
            Swipe through a hand-picked, interactive showcase of our most exquisite natural stone surfaces and architectural elements.
          </p>
        </div>

        {/* 3D Fan Carousel */}
        <SocialCards cards={randomProducts} />

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center px-6">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-transparent border border-[#DFBA73] text-[#DFBA73] font-sans text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#DFBA73] hover:text-[#111111] shadow-[0_0_20px_rgba(223,186,115,0.1)] hover:shadow-[0_0_30px_rgba(223,186,115,0.3)]"
          >
            <span>Explore Entire Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VerticalProductShowcase;
