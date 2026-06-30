import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, ctaText = "explore" }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const isVideo = src.endsWith(".mp4");

  return (
    <div className="relative size-full">
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={typeof title === "string" ? title : "Stone Product"}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-gray-300">{description}</p>
          )}
        </div>

        {ctaText && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/50"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(197, 168, 128, 0.4), #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">{ctaText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="products" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-300">
          Our Signature Collections
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Explore our wide range of premium natural stones, meticulously quarried and processed to match global standards. Our stones add raw strength and natural elegance to any interior or exterior space.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="img/kota_blue.png"
          title={
            <>
              KOTA BL<b>U</b>E
            </>
          }
          description="A premium limestone with a natural slate-blue finish. Highly durable, slip-resistant, and ideal for modern indoor flooring and outdoor paving."
          ctaText="View Details"
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="img/gwalior_mint.png"
            title={
              <>
                GWALI<b>O</b>R MINT
              </>
            }
            description="Warm, textured Mint Sandstone wall panels. Offers a striking, natural, and rustic face that makes an architectural statement."
            ctaText="View Sandstone"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/teakwood_sandstone.png"
            title={
              <>
                TEAKW<b>O</b>OD
              </>
            }
            description="Stunning Sandstone with a wood-grain texture and rich warm bands of gold and ochre. Perfect for decorative and focal installations."
            ctaText="View Textures"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="img/sagar_black.png"
            title={
              <>
                SAGAR BL<b>A</b>CK
              </>
            }
            description="Deep charcoal tones with natural split-face textures. Robust, dense, and ideal for high-traffic paving, steps, and copings."
            ctaText="View Slabs"
          />
        </BentoTilt>

        <BentoTilt id="quarries" className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-yellow-300 p-5 text-blue-200">
            <h1 className="bento-title special-font max-w-64">
              Over 1M+ <b>s</b>q. meters <b>a</b>nnually.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="img/stone_craft.png"
            title={
              <>
                CRAFT<b>S</b>MANSHIP
              </>
            }
            description="Bespoke hand-carved stone jaalis and planters."
            ctaText="View Artifacts"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
