import React from "react";

const VideoSection = () => {
  return (
    <section className="relative w-screen h-[100vh] flex items-center justify-center bg-[#212322] overflow-hidden">
      {/* Centered Video Container */}
      <div className="relative w-[90%] md:w-[80%] lg:w-[70%] max-w-7xl aspect-video bg-black shadow-2xl overflow-hidden group">
        <video
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/video/VID-20240208-WA0007.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Floating Action Button (like the reference) */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10">
          <a
            href="/products"
            className="inline-flex items-center gap-4 px-8 py-3.5 bg-[#F2EDE4] text-[#1A1A1A] rounded-full font-serif font-medium text-[15px] shadow-lg hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
          >
            Discover more
            <span className="font-sans font-light">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
