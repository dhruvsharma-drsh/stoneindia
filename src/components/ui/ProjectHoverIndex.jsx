import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── Hover-Reveal Project Index ──
   Minimal text list with cursor-following image reveal on hover.
   Inspired by luxury stone/marble collection galleries. */
const ProjectHoverIndex = ({ projects }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState({});
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // Smooth cursor-following via lerp (spring-like)
  useEffect(() => {
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mousePos]);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      const center = rect.width / 2;
      
      let clampedX = rawX;

      if (hoveredId) {
        const projectIndex = projects.findIndex(p => p.id === hoveredId);
        const isRightSide = projectIndex % 2 !== 0;

        if (isRightSide) {
          // Right side zig-zag: keep image STRICTLY on the right, away from centered text
          const minAllowedX = Math.min(center + 440, rect.width - 150);
          clampedX = Math.max(rawX, minAllowedX);
          clampedX = Math.min(clampedX, rect.width - 150); // keep on screen
        } else {
          // Left side zig-zag: keep image STRICTLY on the left
          const maxAllowedX = Math.max(center - 440, 150);
          clampedX = Math.min(rawX, maxAllowedX);
          clampedX = Math.max(clampedX, 150); // keep on screen
        }
      }

      setMousePos({
        x: clampedX,
        y: rawY,
      });
    }
  }, [hoveredId, projects]);

  const handleHoverEnter = (projectId, images) => {
    setHoveredId(projectId);
    // Cycle to next image each time user hovers
    setImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % images.length,
    }));
  };

  const handleHoverLeave = () => {
    setHoveredId(null);
  };

  const hoveredProject = projects.find(p => p.id === hoveredId);
  const currentImageSrc = hoveredProject
    ? hoveredProject.images[imageIndex[hoveredId] || 0]
    : null;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] flex flex-col justify-center py-16 md:py-20 overflow-hidden bg-white"
    >
      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-14 px-6 shrink-0">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-[#1A1A18] tracking-tight"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontWeight: 400 }}
        >
          Our <em className="not-italic" style={{ fontStyle: 'italic' }}>Projects</em>
        </h2>
      </div>

      {/* Project List */}
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col justify-center shrink-0">
        {projects.map((project, index) => (
          <div key={project.id}>
            {/* Divider line */}
            {index === 0 && (
              <div className="h-px w-full" style={{ background: 'rgba(26,26,24,0.12)' }} />
            )}

            {/* Project Row */}
            <div
              className="group cursor-pointer block w-full hover:bg-black/[0.02] transition-colors duration-500"
              onMouseEnter={() => handleHoverEnter(project.id, project.images)}
              onMouseLeave={handleHoverLeave}
            >
              <div className="py-5 md:py-8 lg:py-10 flex items-center justify-center relative">
                <span
                  className="text-2xl md:text-3xl lg:text-4xl text-center transition-all duration-500 ease-out"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontWeight: 400,
                    color: hoveredId === project.id ? '#1A1A18' : 'rgba(26,26,24,0.25)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                  <sup
                    className="ml-1 text-xs md:text-sm relative -top-4 md:-top-6 transition-colors duration-500"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      color: hoveredId === project.id ? '#B8955D' : 'rgba(26,26,24,0.2)',
                    }}
                  >
                    {project.images.length}
                  </sup>
                </span>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-px w-full" style={{ background: 'rgba(26,26,24,0.12)' }} />
          </div>
        ))}
      </div>

      {/* Floating Hover Image */}
      <div
        className="absolute pointer-events-none z-30"
        style={{
          left: `${smoothPos.x}px`,
          top: `${smoothPos.y}px`,
          transform: 'translate(-50%, -70%)',
          willChange: 'left, top, opacity, transform',
        }}
      >
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl"
          style={{
            width: '280px',
            height: '200px',
            opacity: hoveredId ? 1 : 0,
            transform: hoveredId ? 'scale(1) rotate(-2deg)' : 'scale(0.7) rotate(0deg)',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {currentImageSrc && (
            <img
              src={currentImageSrc}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hoveredId ? 'scale(1.05)' : 'scale(1.2)',
              }}
            />
          )}
          {/* Subtle border overlay */}
          <div className="absolute inset-0 rounded-lg border border-white/20" />
        </div>
      </div>

    </section>
  );
};

export default ProjectHoverIndex;
