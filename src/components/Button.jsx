import React, { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, onClick }) => {
  const btnRef = useRef(null);
  const circleRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.6;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.6;
    gsap.to(btnRef.current, {
      x,
      y,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    <button
      ref={btnRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "group relative z-10 inline-flex items-center justify-between gap-5 cursor-pointer overflow-hidden rounded-full bg-[#111111] pl-7 pr-2 py-2 text-white border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#B8955D]/60 hover:shadow-[0_0_30px_rgba(245,214,62,0.35)]",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white/90 group-hover:text-[#B8955D] transition-colors duration-300">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-[#B8955D]">
          {title}
        </div>
      </span>

      <div
        ref={circleRef}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#222222] group-hover:bg-[#B7945D] group-hover:text-[#0A0A0A] text-white/80 flex items-center justify-center transition-all duration-300 shadow-inner"
      >
        {rightIcon || <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:scale-110" />}
      </div>
    </button>
  );
};

export default Button;
