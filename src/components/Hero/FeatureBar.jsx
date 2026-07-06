import React from "react";
import { motion } from "framer-motion";
import { Gem, Leaf, Globe, ShieldCheck } from "lucide-react";
import "./hero.css";

const features = [
  {
    icon: Gem,
    title: "Premium Quality",
  },
  {
    icon: Leaf,
    title: "Natural & Sustainable",
  },
  {
    icon: Globe,
    title: "Global Export",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Worldwide",
  },
];

const FeatureBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 inset-x-0 z-40 luxury-glass-strip pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group flex items-center gap-2 sm:gap-4 cursor-default ${idx >= 2 ? 'hidden sm:flex' : 'flex'} lg:flex`}
              >
                {/* Icon Container */}
                <div className="feature-icon-box p-1.5 sm:p-2.5 rounded-lg text-[#B8955D]">
                  <Icon className="w-4 h-4 sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                </div>

                {/* Title */}
                <h4 className="font-sans text-[11px] sm:text-sm text-white/90 font-medium tracking-wide group-hover:text-[#B8955D] transition-colors duration-300">
                  {item.title}
                </h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureBar;
