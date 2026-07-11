// src/components/StoneVisualizer.jsx
import React, { useState, useRef, useCallback } from "react";
import {
  Upload,
  ImagePlus,
  Sparkles,
  Download,
  X,
  Loader2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-3.1-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Convert a File object to a base64 data string (without the prefix).
 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/**
 * Fetch a public image URL and return its base64 data.
 */
const urlToBase64 = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return fileToBase64(blob);
};

/**
 * StoneVisualizer — AI-powered stone pattern preview.
 *
 * Props:
 *   patterns  – array of { name, img, desc, ... } (pattern images from the product)
 *   stoneName – display name of the stone, e.g. "Desert Mint Sandstone"
 */
const StoneVisualizer = ({ patterns = [], stoneName = "Natural Stone" }) => {
  const [uploadedImage, setUploadedImage] = useState(null); // { file, preview }
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [generatedImage, setGeneratedImage] = useState(null); // base64 data URI
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // ── Upload handlers ──────────────────────────────────────────────
  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Image too large. Please use an image under 20 MB.");
      return;
    }
    setError(null);
    setGeneratedImage(null);
    const preview = URL.createObjectURL(file);
    setUploadedImage({ file, preview });
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer?.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setDragOver(false), []);

  const onFileChange = useCallback(
    (e) => handleFile(e.target.files?.[0]),
    [handleFile]
  );

  const removeUpload = useCallback(() => {
    if (uploadedImage?.preview) URL.revokeObjectURL(uploadedImage.preview);
    setUploadedImage(null);
    setGeneratedImage(null);
    setError(null);
  }, [uploadedImage]);

  // ── Generate with Gemini ─────────────────────────────────────────
  const handleGenerate = async () => {
    if (!uploadedImage?.file || patterns.length === 0) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Convert both images to base64
      const houseBase64 = await fileToBase64(uploadedImage.file);
      const patternImg = patterns[selectedPattern];
      const patternBase64 = await urlToBase64(patternImg.img);

      const prompt = `You are an expert architectural visualization AI. I'm providing two images:

1. FIRST IMAGE: A photo of a house, room, wall, pathway, or outdoor space where we want to apply stone.
2. SECOND IMAGE: A ${stoneName} natural stone pattern/texture sample called "${patternImg.name}".

Your task: Generate a SINGLE photorealistic image showing the FIRST IMAGE (the house/space) with the ${stoneName} stone texture from the SECOND IMAGE applied to the appropriate surfaces (walls, floors, pathways, facades, etc.).

Requirements:
- Maintain the exact same perspective, lighting, shadows, and proportions of the original house photo
- Apply the stone texture realistically — it should look like the stone was actually installed
- Match the scale of the stone pattern to the surface realistically
- Preserve windows, doors, furniture, vegetation, and other non-stone elements unchanged
- The result should look like a professional architectural render`;

      const body = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: uploadedImage.file.type || "image/jpeg",
                  data: houseBase64,
                },
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: patternBase64,
                },
              },
              { text: prompt },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      };

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData?.error?.message || `API request failed (${res.status})`
        );
      }

      const data = await res.json();

      // Find the image part in the response
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));

      if (!imagePart) {
        throw new Error(
          "The AI could not generate an image. Try a different photo or pattern."
        );
      }

      const mime = imagePart.inlineData.mimeType;
      const b64 = imagePart.inlineData.data;
      setGeneratedImage(`data:${mime};base64,${b64}`);
    } catch (err) {
      console.error("Stone Visualizer Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Download result ──────────────────────────────────────────────
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${stoneName.replace(/\s+/g, "-")}-visualization.png`;
    link.click();
  };

  // ── If no patterns, don't render ─────────────────────────────────
  if (!patterns || patterns.length === 0) return null;

  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B8955D]/[0.04] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* ── Section Header ── */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8955D]/30 bg-[#B8955D]/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-[#DFBA73]" />
            <span className="text-xs tracking-[0.25em] text-[#DFBA73] font-bold uppercase">
              AI Stone Visualizer
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4">
            Visualize Your{" "}
            <span className="italic font-light text-[#DFBA73]">Space</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your house, wall, or pathway and see how{" "}
            <span className="text-[#DFBA73] font-medium">{stoneName}</span>{" "}
            would look — powered by AI.
          </p>
        </div>

        {/* ── Main Layout: 2-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Upload + Pattern Selection */}
          <div className="space-y-8">
            {/* Upload Zone */}
            <div>
              <label className="text-xs font-mono text-[#DFBA73] uppercase tracking-[0.2em] mb-3 block">
                Step 1 — Upload Your Space
              </label>

              {!uploadedImage ? (
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center py-16 sm:py-20 px-6 group
                    ${
                      dragOver
                        ? "border-[#DFBA73] bg-[#DFBA73]/10 scale-[1.02]"
                        : "border-white/15 bg-white/[0.02] hover:border-[#DFBA73]/50 hover:bg-white/[0.04]"
                    }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                      dragOver
                        ? "bg-[#DFBA73]/20 scale-110"
                        : "bg-white/5 group-hover:bg-[#DFBA73]/10"
                    }`}
                  >
                    <Upload
                      className={`w-7 h-7 transition-colors duration-300 ${
                        dragOver ? "text-[#DFBA73]" : "text-white/40 group-hover:text-[#DFBA73]"
                      }`}
                    />
                  </div>
                  <p className="text-white/70 font-medium mb-1">
                    Drop your photo here or{" "}
                    <span className="text-[#DFBA73] underline underline-offset-4">browse</span>
                  </p>
                  <p className="text-white/30 text-sm">JPG, PNG, WEBP — up to 20MB</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                  <img
                    src={uploadedImage.preview}
                    alt="Uploaded space"
                    className="w-full h-auto max-h-[400px] object-cover"
                  />
                  <button
                    onClick={removeUpload}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-xs text-green-300 font-medium">Photo uploaded</span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </div>

            {/* Pattern Selector */}
            <div>
              <label className="text-xs font-mono text-[#DFBA73] uppercase tracking-[0.2em] mb-3 block">
                Step 2 — Choose Stone Pattern
              </label>

              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {patterns.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedPattern(i);
                      setGeneratedImage(null);
                    }}
                    className={`relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 group
                      ${
                        selectedPattern === i
                          ? "border-[#DFBA73] ring-2 ring-[#DFBA73]/30 scale-105"
                          : "border-white/10 hover:border-white/30"
                      }`}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {selectedPattern === i && (
                      <div className="absolute inset-0 bg-[#DFBA73]/10 flex items-end justify-center pb-1.5">
                        <span className="text-[9px] font-bold text-[#DFBA73] uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Selected
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  </button>
                ))}
              </div>

              {patterns[selectedPattern] && (
                <p className="text-white/40 text-sm mt-2">
                  <span className="text-white/60 font-medium">
                    {patterns[selectedPattern].name}
                  </span>
                  {patterns[selectedPattern].desc && (
                    <> — {patterns[selectedPattern].desc}</>
                  )}
                </p>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || isGenerating}
              className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300
                ${
                  !uploadedImage
                    ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                    : isGenerating
                    ? "bg-[#B8955D]/20 text-[#DFBA73] cursor-wait border border-[#B8955D]/30"
                    : "bg-gradient-to-r from-[#B8955D] to-[#DFBA73] text-black hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,149,93,0.4)] active:scale-[0.98]"
                }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Visualization...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Visualize with AI
                </>
              )}
            </button>
          </div>

          {/* RIGHT — Preview / Result */}
          <div className="flex flex-col">
            <label className="text-xs font-mono text-[#DFBA73] uppercase tracking-[0.2em] mb-3 block">
              Preview
            </label>

            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden relative min-h-[360px] flex items-center justify-center">
              {/* Error state */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center p-8 z-20 bg-[#0a0a0a]/80 backdrop-blur-sm">
                  <div className="text-center max-w-sm">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-7 h-7 text-red-400" />
                    </div>
                    <p className="text-red-300 text-sm mb-4">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="px-5 py-2 rounded-full bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Loading shimmer */}
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm">
                  {/* Shimmer bars */}
                  <div className="w-48 space-y-3 mb-8">
                    <div className="h-3 rounded-full bg-gradient-to-r from-white/5 via-[#B8955D]/20 to-white/5 animate-pulse" />
                    <div className="h-3 rounded-full bg-gradient-to-r from-white/5 via-[#B8955D]/20 to-white/5 animate-pulse w-3/4" />
                    <div className="h-3 rounded-full bg-gradient-to-r from-white/5 via-[#B8955D]/20 to-white/5 animate-pulse w-1/2" />
                  </div>
                  <Loader2 className="w-8 h-8 text-[#DFBA73] animate-spin mb-4" />
                  <p className="text-white/50 text-sm font-medium">Applying {stoneName}...</p>
                  <p className="text-white/25 text-xs mt-1">This may take 15–30 seconds</p>
                </div>
              )}

              {/* Generated result */}
              {generatedImage && !isGenerating ? (
                <div className="w-full h-full relative">
                  <img
                    src={generatedImage}
                    alt="AI Visualization Result"
                    className="w-full h-full object-contain bg-black"
                  />
                  {/* Action buttons overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#B8955D] hover:text-black transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                </div>
              ) : !isGenerating && !error ? (
                /* Empty / placeholder state */
                <div className="text-center px-8">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-5">
                    <Eye className="w-9 h-9 text-white/15" />
                  </div>
                  <p className="text-white/30 text-sm mb-1 font-medium">
                    Your visualization will appear here
                  </p>
                  <p className="text-white/15 text-xs">
                    Upload a photo and click "Visualize with AI"
                  </p>
                </div>
              ) : null}
            </div>

            {/* Before/After comparison when we have both */}
            {generatedImage && uploadedImage && !isGenerating && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-white/10 relative">
                  <img
                    src={uploadedImage.preview}
                    alt="Original"
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[9px] font-bold text-white/60 uppercase tracking-wider backdrop-blur-sm">
                    Before
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-[#B8955D]/30 relative">
                  <img
                    src={generatedImage}
                    alt="With Stone Applied"
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#B8955D]/80 text-[9px] font-bold text-black uppercase tracking-wider backdrop-blur-sm">
                    After
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoneVisualizer;
