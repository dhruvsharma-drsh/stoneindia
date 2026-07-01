import React, { useEffect, useState, useRef } from 'react';

export const Typewriter = ({ text, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(elementRef.current);
      }
    });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    // Add initial delay
    const startTimeoutId = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(intervalId);
      }, 40); // Typewriting speed
      
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeoutId);
  }, [isVisible, text, delay]);

  return (
    <span ref={elementRef} className={`relative inline-block ${className}`}>
      {displayedText}
      <span className={`inline-block w-[2px] h-[0.9em] ml-1 align-middle bg-[#B8955D] ${displayedText.length === text.length ? 'animate-pulse' : ''}`}></span>
    </span>
  );
};
