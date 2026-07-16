import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./hero.css";

const HeroContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-20 flex flex-col justify-center px-5 sm:px-12 lg:px-16 xl:px-24 max-w-2xl xl:max-w-3xl"
    >
      {/* Spacer to keep buttons in their original position */}
      <div className="h-[280px] sm:h-[350px] lg:h-[420px] pointer-events-none" />

      {/* ── CTA Buttons ── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5"
      >
        <motion.a
          href="/products"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group flex items-center justify-center gap-3 bg-[#b3b8be] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:bg-[#a4aab1] shadow-lg hover:shadow-xl"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>

        <motion.a
          href="/contact"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group flex items-center justify-center gap-3 bg-transparent text-white font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.15em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#111111] hover:border-white"
        >
          <span>Get a Quote</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
