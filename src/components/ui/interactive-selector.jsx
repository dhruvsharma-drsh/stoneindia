import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const InteractiveSelector = ({ title, description, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  const [modalImageIndex, setModalImageIndex] = useState(null);

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      // If already active and clicked again, open the modal
      setModalImageIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];

    images.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 100 * i); // Faster stagger
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [images]);

  // Handle escape key and arrows for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalImageIndex(null);
      if (e.key === 'ArrowRight' && modalImageIndex !== null) {
        setModalImageIndex(prev => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft' && modalImageIndex !== null) {
        setModalImageIndex(prev => (prev - 1 + images.length) % images.length);
      }
    };
    if (modalImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImageIndex, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalImageIndex]);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden w-full border-b border-[#EDEDE9] bg-[#FAFAF8]">

        {/* Header Section */}
        <div className="w-full max-w-4xl px-6 mb-10 md:mb-14 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 tracking-tight drop-shadow-sm animate-fadeInTop">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-[#666] font-medium max-w-2xl mx-auto animate-fadeInTop delay-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Options Container */}
        <div className="options flex w-full max-w-[1400px] h-[400px] md:h-[600px] px-2 md:px-6 items-stretch relative z-10 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className={`
                option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 md:flex-shrink
                ${activeIndex === index ? 'active' : ''}
              `}
              style={{
                backgroundImage: `url('${imgUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-30px)',
                minWidth: activeIndex === index ? '200px' : '40px',
                minHeight: '100px',
                margin: '0 4px',
                borderRadius: '24px',
                cursor: 'zoom-in',
                backgroundColor: '#EDEDE9',
                boxShadow: activeIndex === index
                  ? '0 20px 50px rgba(184,149,93,0.3)'
                  : '0 10px 20px rgba(0,0,0,0.05)',
                flex: activeIndex === index ? '6 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
                willChange: 'flex-grow, box-shadow'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setModalImageIndex(index)}
            >
              {/* Shadow effect */}
              <div
                className="absolute left-0 right-0 bottom-0 pointer-events-none transition-all duration-700 ease-in-out z-0"
                style={{
                  height: '100%',
                  background: activeIndex === index
                    ? 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.0) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)',
                  opacity: 1
                }}
              ></div>

              {/* Expand Icon */}
              <div
                className="absolute left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 bottom-4 md:bottom-6 flex items-center justify-center z-10 hover:scale-110 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex(index);
                }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-transform duration-500 ease-in-out cursor-pointer"
                  style={{
                    transform: activeIndex === index ? 'scale(1)' : 'scale(0)'
                  }}
                >
                  <Maximize2 size={18} className="text-[#B8955D]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom animations */}
        <style>{`
          @keyframes fadeInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInTop {
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeInFromTop 0.8s ease-in-out forwards;
          }
          
          .delay-300 {
            animation-delay: 0.3s;
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @keyframes zoomInModal {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-zoomIn {
            animation: zoomInModal 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}</style>
      </div>

      {/* Fullscreen Modal */}
      {modalImageIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 transition-opacity duration-300"
          onClick={() => setModalImageIndex(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
            onClick={() => setModalImageIndex(null)}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setModalImageIndex(prev => (prev - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setModalImageIndex(prev => (prev + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={images[modalImageIndex]}
            alt="Project full view"
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-zoomIn"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default InteractiveSelector;
