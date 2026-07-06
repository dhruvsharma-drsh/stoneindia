"use client";
import { useEffect, useRef, useCallback, useState } from "react";

export default function InkReveal({
  maskColor = [252, 250, 248],
  imageSrc,
  imageFilter = "none",
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const stampsRef = useRef([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const mc = maskColor;

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        imgRef.current = img;
        setImgLoaded(true);
      };
    }
  }, [imageSrc]);

  const drawBackground = useCallback((ctx, w, h) => {
    ctx.globalCompositeOperation = "source-over";
    
    // Always fill with solid mask color first (so we have an opaque base and clear previous frames)
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);

    // Then draw the image on top (allowing opacity/filters to blend with the mask color)
    if (imgRef.current) {
      if (imageFilter !== "none") ctx.filter = imageFilter;
      ctx.drawImage(imgRef.current, 0, 0, w, h);
      ctx.filter = "none";
    }
  }, [mc, imageFilter]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBackground(ctx, w, h);
  }, [drawBackground]);

  const carveInk = useCallback(
    (ctx, x, y, r, seed, alpha) => {
      const g = ctx.createRadialGradient(
        x, y, r * gradientInnerRadius,
        x, y, r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const addStamp = useCallback(
    (x, y) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x, y) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    drawBackground(ctx, w, h);
    
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, [drawBackground, carveInk, lifetime, rStart]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize, imgLoaded]);

  const getRelativePos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        cursor: "crosshair",
        ...style,
      }}
      onMouseEnter={(e) => {
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
