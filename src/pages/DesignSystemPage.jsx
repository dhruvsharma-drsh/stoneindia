import React, { useEffect, useState, useCallback } from 'react';
import Footer from '@/components/Footer';
import { Copy, CheckCircle2, Type, PaintBucket, LayoutTemplate, MousePointerClick, Sparkles } from 'lucide-react';

/* ── Suggested font families for the website ── */
const suggestedFonts = [
  // ── TOP 10 RECOMMENDED ──
  { name: 'Outfit', google: 'Outfit:wght@300;400;500;700;900', category: 'Geometric Sans', vibe: '★ RECOMMENDED · Friendly, rounded, contemporary', stars: 5, recommended: true, why: 'Our #1 pick for Gwalior Stone. Soft geometric shapes give a welcoming yet highly premium feel. The rounded terminals add warmth to cold stone surfaces.' },
  { name: 'Plus Jakarta Sans', google: 'Plus+Jakarta+Sans:wght@300;400;500;700;800', category: 'Sans-Serif', vibe: '★ RECOMMENDED · Polished, balanced, premium', stars: 5, recommended: true, why: 'Top-tier luxury choice. A beautifully crafted geometric sans-serif with slightly rounded corners that feel premium without being childish.' },
  { name: 'Cormorant Garamond', google: 'Cormorant+Garamond:wght@300;400;500;700', category: 'Serif', vibe: '★ RECOMMENDED · Elegant, editorial, classical', stars: 5, recommended: true, why: 'The best serif option. High-contrast with old-style elegance. Perfect for luxury branding that emphasizes heritage and centuries-old craftsmanship.' },
  { name: 'Sora', google: 'Sora:wght@300;400;500;700;800', category: 'Sans-Serif', vibe: '★ RECOMMENDED · Futuristic, crisp, geometric', stars: 5, recommended: true, why: 'Highly architectural. Its slightly condensed letterforms give headings a strong, towering presence — ideal for a construction/stone brand.' },
  { name: 'Playfair Display', google: 'Playfair+Display:wght@400;500;700;900', category: 'Display Serif', vibe: '★ RECOMMENDED · Dramatic, high-contrast, editorial', stars: 5, recommended: true, why: 'The editorial standard. Bold transitional serif ideal for large hero headings. Favoured by luxury hotels and architecture firms.' },
  { name: 'Space Grotesk', google: 'Space+Grotesk:wght@300;400;500;700', category: 'Sans-Serif', vibe: '★ RECOMMENDED · Technical, architectural, bold', stars: 5, recommended: true, why: 'A distinctly industrial feel. Proportional sans-serif with open apertures that pairs flawlessly with architectural and engineering contexts.' },
  { name: 'Syne', google: 'Syne:wght@400;500;700;800', category: 'Display', vibe: '★ RECOMMENDED · Avant-garde, quirky, bold', stars: 5, recommended: true, why: 'For a bold, modern edge. Brings a truly unique, contemporary, and edgy look to typography that stands out from typical corporate sites.' },
  { name: 'DM Sans', google: 'DM+Sans:wght@300;400;500;700', category: 'Sans-Serif', vibe: '★ RECOMMENDED · Minimal, geometric, premium', stars: 5, recommended: true, why: 'Sleek and tech-forward. Low-contrast geometric sans with subtle warmth. Looks incredibly clean across all sizes.' },
  { name: 'Montserrat', google: 'Montserrat:wght@300;400;500;700;900', category: 'Geometric Sans', vibe: '★ RECOMMENDED · Urban, typographic, bold', stars: 5, recommended: true, why: 'Inspired by urban typography, offers a highly legible design perfect for modern, spacious, luxury interfaces.' },
  { name: 'Inter', google: 'Inter:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: '★ RECOMMENDED · Clean, modern, highly readable', stars: 5, recommended: true, why: 'The safe, perfect default. Extremely versatile with excellent readability. Used by the world\'s top tech companies for UI.' },

  // ── REMAINING 70 FONTS ──
  { name: 'Libre Baskerville', google: 'Libre+Baskerville:wght@400;700', category: 'Classic Serif', vibe: 'Timeless, authoritative, trustworthy', stars: 4, why: 'Optimised for body text. Carries centuries of typographic heritage and institutional quality.' },
  { name: 'Unbounded', google: 'Unbounded:wght@300;400;500;700;900', category: 'Display', vibe: 'Bold, expressive, futuristic', stars: 3, why: 'Striking variable display font with super-rounded letterforms. Best for avant-garde hero headlines.' },
  { name: 'Lora', google: 'Lora:wght@400;500;600;700', category: 'Serif', vibe: 'Warm, calligraphic, balanced', stars: 4, why: 'Well-balanced contemporary serif with roots in calligraphy. Excellent for editorial layouts.' },
  { name: 'Poppins', google: 'Poppins:wght@300;400;500;700;900', category: 'Geometric Sans', vibe: 'Friendly, geometric, versatile', stars: 4, why: 'Extremely popular geometric sans-serif. Clean letterforms work well for both headings and body.' },
  { name: 'Roboto', google: 'Roboto:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Pragmatic, mechanical, versatile', stars: 4, why: 'Highly legible, neutral, and blends seamlessly into functional UIs. Extremely reliable.' },
  { name: 'Open Sans', google: 'Open+Sans:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Neutral, friendly, legible', stars: 4, why: 'Optimized for print, web, and mobile interfaces. Extremely reliable for readable body text.' },
  { name: 'Lato', google: 'Lato:wght@300;400;700;900', category: 'Sans-Serif', vibe: 'Warm, elegant, stable', stars: 4, why: 'Semi-rounded details give Lato a feeling of warmth, while strong structure provides stability.' },
  { name: 'Oswald', google: 'Oswald:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Condensed, bold, impactful', stars: 4, why: 'A reworking of the classic gothic typeface style. Excellent for strong, tight, uppercase headlines.' },
  { name: 'Raleway', google: 'Raleway:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Elegant, thin, geometric', stars: 4, why: 'An elegant sans-serif family intended for headings and other large size usage.' },
  { name: 'Ubuntu', google: 'Ubuntu:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Quirky, distinct, rounded', stars: 3, why: 'Distinctive rounded terminals and unique character shapes. Great for tech-focused or friendly brands.' },
  { name: 'Merriweather', google: 'Merriweather:wght@300;400;700;900', category: 'Serif', vibe: 'Highly readable, sturdy, pleasant', stars: 4, why: 'Designed specifically to be highly legible on screens. A very robust serif for editorial content.' },
  { name: 'Nunito', google: 'Nunito:wght@300;400;500;700;900', category: 'Rounded Sans', vibe: 'Soft, approachable, clean', stars: 4, why: 'A well-balanced sans serif typeface superfamily, with rounded terminals that create a friendly tone.' },
  { name: 'Rubik', google: 'Rubik:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Sturdy, slightly rounded, modern', stars: 4, why: 'Slightly rounded corners give it a soft but solid feel. Great for both tech interfaces and playful branding.' },
  { name: 'Work Sans', google: 'Work+Sans:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Grotesque, functional, robust', stars: 4, why: 'Based loosely on early Grotesques. Ideal for medium to large text sizes in web design.' },
  { name: 'Fira Sans', google: 'Fira+Sans:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Legible, open, energetic', stars: 4, why: 'Designed for legibility across various screen qualities. Distinctive lowercase g and open counters.' },
  { name: 'Quicksand', google: 'Quicksand:wght@300;400;500;700', category: 'Rounded Sans', vibe: 'Geometric, rounded, airy', stars: 5, why: 'Display sans serif with rounded terminals. Offers a very light and airy feel for elegant, minimalist designs.' },
  { name: 'Barlow', google: 'Barlow:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Grotesk, low-contrast, Californian', stars: 4, why: 'A slightly rounded, low-contrast grotesk. Shares qualities with California highway signs.' },
  { name: 'Manrope', google: 'Manrope:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Crossover, clean, geometric', stars: 5, why: 'An open-source modern sans-serif offering excellent legibility in small sizes.' },
  { name: 'Epilogue', google: 'Epilogue:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Clean, variable, robust', stars: 4, why: 'A sans-serif variable font with a weight axis. Great for creating consistent yet flexible typographic hierarchies.' },
  { name: 'Archivo', google: 'Archivo:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Grotesque, solid, objective', stars: 4, why: 'A grotesque sans-serif typeface meant to be used simultaneously in print and digital platforms.' },
  { name: 'Josefin Sans', google: 'Josefin+Sans:wght@300;400;500;700', category: 'Geometric Sans', vibe: 'Vintage, geometric, elegant', stars: 4, why: 'Geometric, elegant, with a vintage feeling. Inspired by geometric sans serifs from the 1920s.' },
  { name: 'Anton', google: 'Anton', category: 'Display', vibe: 'Bold, condensed, impactful', stars: 3, why: 'A reworking of traditional advertising sans serifs. Perfect for large, striking, uppercase-only headlines.' },
  { name: 'Bebas Neue', google: 'Bebas+Neue', category: 'Display', vibe: 'Clean, condensed, towering', stars: 4, why: 'A popular display family with clean lines, elegant shapes, and a towering condensed structure.' },
  { name: 'Cinzel', google: 'Cinzel:wght@400;500;700;900', category: 'Serif', vibe: 'Classic, monumental, Roman', stars: 5, why: 'Inspired by first-century roman inscriptions. Conveys a sense of epic grandeur, perfect for luxury themes.' },
  { name: 'Marcellus', google: 'Marcellus', category: 'Serif', vibe: 'Flared, elegant, refined', stars: 5, why: 'A flared serif typeface inspired by classic Roman lettering. Extremely elegant and sophisticated.' },
  { name: 'EB Garamond', google: 'EB+Garamond:wght@400;500;700', category: 'Serif', vibe: 'Classic, humanist, refined', stars: 4, why: 'A revival of the famous 16th-century typeface. Delivers unparalleled elegance for long-form reading.' },
  { name: 'Fraunces', google: 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,700', category: 'Serif', vibe: 'Soft, vintage, expressive', stars: 5, why: 'An old style soft serif inspired by early 20th-century typefaces. Distinctive and highly expressive.' },
  { name: 'Zilla Slab', google: 'Zilla+Slab:wght@300;400;500;700', category: 'Slab Serif', vibe: 'Contemporary, industrial, friendly', stars: 4, why: 'Mozilla core font. A contemporary slab serif offering a smooth, industrial yet friendly look.' },
  { name: 'Bitter', google: 'Bitter:wght@300;400;500;700;900', category: 'Slab Serif', vibe: 'Legible, robust, screen-first', stars: 4, why: 'A slab serif designed specifically for reading on screens. Features thick, robust serifs.' },
  { name: 'Cabin', google: 'Cabin:wght@400;500;700', category: 'Sans-Serif', vibe: 'Humanist, clean, modern', stars: 3, why: 'A humanist sans with a touch of geometric structure. Modern proportions make it very clean and easy to read.' },
  { name: 'Inconsolata', google: 'Inconsolata:wght@300;400;500;700;900', category: 'Monospace', vibe: 'Technical, clean, coding', stars: 3, why: 'A humanist monospace font. Clean and highly legible, perfect for technical or data-driven designs.' },
  { name: 'Mukta', google: 'Mukta:wght@300;400;500;700;800', category: 'Sans-Serif', vibe: 'Versatile, harmonious, multi-script', stars: 4, why: 'A versatile, harmonious, and highly legible multi-script sans-serif, widely used in modern web development.' },
  { name: 'Noto Sans', google: 'Noto+Sans:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Global, clean, harmonious', stars: 4, why: 'Google\'s massive global font project. Neutral but extremely well-made for maximum international readability.' },
  { name: 'Noto Serif', google: 'Noto+Serif:wght@300;400;500;700', category: 'Serif', vibe: 'Classic, global, harmonious', stars: 4, why: 'The serif companion to Noto Sans, offering elegant reading experiences across dozens of languages.' },
  { name: 'Source Sans 3', google: 'Source+Sans+3:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Corporate, legible, UI-focused', stars: 4, why: 'Adobe\'s first open-source typeface family, designed well for user interfaces.' },
  { name: 'Source Serif 4', google: 'Source+Serif+4:wght@300;400;500;700', category: 'Serif', vibe: 'Transitional, readable, sturdy', stars: 4, why: 'Highly readable serif design created to work well alongside Source Sans.' },
  { name: 'Libre Franklin', google: 'Libre+Franklin:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Sturdy, American gothic, bold', stars: 4, why: 'An interpretation and expansion of the classic American gothic typeface, Franklin Gothic.' },
  { name: 'Crimson Pro', google: 'Crimson+Pro:wght@300;400;500;700', category: 'Serif', vibe: 'Bookish, traditional, refined', stars: 5, why: 'A highly professional serif designed for book production. Provides a deeply traditional feel.' },
  { name: 'IBM Plex Sans', google: 'IBM+Plex+Sans:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Corporate, engineered, crisp', stars: 5, why: 'IBM\'s bespoke typeface. Blends humanistic strokes with rational engineering beautifully.' },
  { name: 'IBM Plex Serif', google: 'IBM+Plex+Serif:wght@300;400;500;700', category: 'Serif', vibe: 'Literary, engineered, sharp', stars: 4, why: 'A serif that retains the sharpness and engineered qualities of the Plex super-family.' },
  { name: 'IBM Plex Mono', google: 'IBM+Plex+Mono:wght@300;400;500;700', category: 'Monospace', vibe: 'Code, terminal, precise', stars: 4, why: 'Crisp, highly legible monospace font that gives a high-tech engineering feel to data.' },
  { name: 'PT Serif', google: 'PT+Serif:wght@400;700', category: 'Serif', vibe: 'Transitional, Russian heritage, crisp', stars: 4, why: 'A pan-Cyrillic font designed for the web. Very sharp serifs with an authoritative tone.' },
  { name: 'Karla', google: 'Karla:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Grotesque, quirky, airy', stars: 4, why: 'A grotesque sans serif typeface family that supports Latin and Tamil scripts.' },
  { name: 'Varela Round', google: 'Varela+Round', category: 'Rounded Sans', vibe: 'Soft, playful, approachable', stars: 3, why: 'A rounded sans serif with a soft, friendly demeanor. Keeps things light and accessible.' },
  { name: 'ABeeZee', google: 'ABeeZee', category: 'Sans-Serif', vibe: 'Children, friendly, clear', stars: 3, why: 'A children\'s learning font, extremely clear and legible. Less corporate, more educational.' },
  { name: 'Antic Slab', google: 'Antic+Slab', category: 'Slab Serif', vibe: 'Newspaper, sturdy, large x-height', stars: 3, why: 'Designed specifically for newspaper and magazine headlines on the web.' },
  { name: 'Fira Sans Condensed', google: 'Fira+Sans+Condensed:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Compact, legible, energetic', stars: 4, why: 'The condensed width of Fira Sans, perfect for fitting more text into tight UI spaces.' },
  { name: 'Roboto Condensed', google: 'Roboto+Condensed:wght@300;400;700', category: 'Sans-Serif', vibe: 'Compact, mechanical, pragmatic', stars: 4, why: 'Roboto\'s condensed sibling, widely used in data-dense dashboards and mobile interfaces.' },
  { name: 'Roboto Mono', google: 'Roboto+Mono:wght@300;400;500;700', category: 'Monospace', vibe: 'Code, legible, mechanical', stars: 4, why: 'Optimized for readability and readability across various programming environments.' },
  { name: 'Vollkorn', google: 'Vollkorn:wght@400;500;700;900', category: 'Serif', vibe: 'Dark, meaty, traditional', stars: 4, why: 'Intended as a quiet, modest and well-working text face for bread and butter use.' },
  { name: 'Cardo', google: 'Cardo:wght@400;700', category: 'Serif', vibe: 'Old-style, scholarly, historic', stars: 4, why: 'Designed for the needs of classicists, Biblical scholars, and medievalists. Very historic.' },
  { name: 'Alegreya', google: 'Alegreya:wght@400;500;700;900', category: 'Serif', vibe: 'Dynamic, varied, literary', stars: 4, why: 'Chosen as one of 53 "Fonts of the Decade" at the ATypI Letter2 competition.' },
  { name: 'Alegreya Sans', google: 'Alegreya+Sans:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Humanist, calligraphic, dynamic', stars: 4, why: 'Provides a humanist sans serif family with a calligraphic feeling.' },
  { name: 'Titillium Web', google: 'Titillium+Web:wght@300;400;600;700', category: 'Sans-Serif', vibe: 'Square, technological, structured', stars: 4, why: 'Born as an academic project, features a squarish, technological aesthetic.' },
  { name: 'Exo 2', google: 'Exo+2:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Technological, futuristic, legible', stars: 4, why: 'A complete redesign of Exo, much more legible at small sizes while retaining a sci-fi feel.' },
  { name: 'Asap', google: 'Asap:wght@400;500;700', category: 'Sans-Serif', vibe: 'Standardized, rounded, clean', stars: 4, why: 'A contemporary sans-serif with subtle rounded corners. Character widths are standardized across weights.' },
  { name: 'Mulish', google: 'Mulish:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Minimalist, geometric, spacious', stars: 4, why: 'A versatile minimalist font designed for both display and text typography.' },
  { name: 'Heebo', google: 'Heebo:wght@300;400;500;700;900', category: 'Sans-Serif', vibe: 'Hebrew, clean, modern', stars: 4, why: 'An extension of Roboto to include Hebrew, offering a very clean, crisp reading experience.' },
  { name: 'Fjalla One', google: 'Fjalla+One', category: 'Display', vibe: 'Condensed, bold, impactful', stars: 4, why: 'A medium-contrast display sans serif. It\'s been carefully adjusted to the restrictions of the screen.' },
  { name: 'Signika', google: 'Signika:wght@300;400;500;700', category: 'Sans-Serif', vibe: 'Wayfinding, clear, gentle', stars: 4, why: 'A sans-serif with a gentle character, developed for wayfinding, signage, and other media.' },
  { name: 'Domine', google: 'Domine:wght@400;500;700', category: 'Serif', vibe: 'Newspaper, friendly, readable', stars: 4, why: 'Designed for web typography, blending classic typography elements with friendly curves.' },
  { name: 'Spectral', google: 'Spectral:wght@300;400;500;700', category: 'Serif', vibe: 'Screen-first, elegant, functional', stars: 5, why: 'A beautiful, versatile serif font designed specifically for Google Docs and Sheets environments.' },
  { name: 'Eczar', google: 'Eczar:wght@400;500;700', category: 'Serif', vibe: 'Expressive, striking, multi-script', stars: 5, why: 'Offers strong character and high impact. Originally designed to support Devanagari alongside Latin.' },
  { name: 'Yrsa', google: 'Yrsa:wght@400;500;700', category: 'Serif', vibe: 'Continuous reading, robust, sharp', stars: 4, why: 'Supports Gujarati and Latin. Intended for continuous reading with a sharp, crisp profile.' },
  { name: 'Alice', google: 'Alice', category: 'Serif', vibe: 'Quirky, old-fashioned, ornate', stars: 3, why: 'Eclectic and quaint, old-fashioned, having widened proportions, open aperture, and soft rounded features.' },
  { name: 'Taviraj', google: 'Taviraj:wght@300;400;500;700', category: 'Serif', vibe: 'Thai, elegant, formal', stars: 4, why: 'A formal serif supporting Thai and Latin, providing a very crisp and refined aesthetic.' },
  { name: 'Tinos', google: 'Tinos:wght@400;700', category: 'Serif', vibe: 'Metric-compatible, classic, clean', stars: 4, why: 'An innovative, refreshing serif design that is metrically compatible with Times New Roman.' },
  { name: 'Arvo', google: 'Arvo:wght@400;700', category: 'Slab Serif', vibe: 'Geometric, slab, monolinear', stars: 4, why: 'A geometric slab-serif typeface family suited for screen and print, with nearly monolinear contrast.' },
  { name: 'Rokkitt', google: 'Rokkitt:wght@300;400;500;700;900', category: 'Slab Serif', vibe: 'Display, geometric, bold', stars: 4, why: 'Inspired by the type forms of a number of distinctive geometric slab serifs, strong and assertive.' },
  { name: 'Courier Prime', google: 'Courier+Prime:wght@400;700', category: 'Monospace', vibe: 'Typewriter, screenwriter, classic', stars: 4, why: 'A monospace font designed for screenplays. It\'s Courier, just better.' },
  { name: 'Crimson Text', google: 'Crimson+Text:wght@400;600;700', category: 'Serif', vibe: 'Old-style, book, classic', stars: 4, why: 'Produced specifically for book production in the tradition of beautiful oldstyle typefaces.' }
];


/* ── Load a Google Font dynamically ── */
const loadedFonts = new Set();
const loadGoogleFont = (fontGoogle) => {
  if (loadedFonts.has(fontGoogle)) return;
  loadedFonts.add(fontGoogle);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontGoogle}&display=swap`;
  document.head.appendChild(link);
};

const typographySizes = [
  { name: 'text-xs', label: '12px', lh: '16px', class: 'text-xs', usage: 'Labels, tags, small captions' },
  { name: 'text-sm', label: '14px', lh: '20px', class: 'text-sm', usage: 'Metadata, small body text' },
  { name: 'text-base', label: '16px', lh: '24px', class: 'text-base', usage: 'Default body text' },
  { name: 'text-lg', label: '18px', lh: '28px', class: 'text-lg', usage: 'Descriptions, large body' },
  { name: 'text-xl', label: '20px', lh: '28px', class: 'text-xl', usage: 'Subheadings' },
  { name: 'text-2xl', label: '24px', lh: '32px', class: 'text-2xl', usage: 'Section headings' },
  { name: 'text-3xl', label: '30px', lh: '36px', class: 'text-3xl', usage: 'Card titles' },
  { name: 'text-4xl', label: '36px', lh: '40px', class: 'text-4xl', usage: 'Page headings (mobile)' },
  { name: 'text-5xl', label: '48px', lh: '1.15', class: 'text-5xl', usage: 'Hero text (small screens)' },
  { name: 'text-7xl', label: '72px', lh: '1.1', class: 'text-7xl', usage: 'Hero text (large screens)' },
];

const fontWeights = [
  { weight: 'font-light', label: '300', class: 'font-light', usage: 'Subtle descriptions' },
  { weight: 'font-normal', label: '400', class: 'font-normal', usage: 'Standard body text' },
  { weight: 'font-medium', label: '500', class: 'font-medium', usage: 'Navigation, labels' },
  { weight: 'font-bold', label: '700', class: 'font-bold', usage: 'Headings, buttons' },
  { weight: 'font-black', label: '900', class: 'font-black', usage: 'Display text, hero' },
];

const brandColors = [
  { name: 'Luxury Gold', hex: '#B8955D', hsl: 'hsl(37, 40%, 54%)', class: 'bg-[#B8955D]', textClass: 'text-white' },
  { name: 'Gold Light', hex: '#D2AF75', hsl: 'hsl(38, 51%, 64%)', class: 'bg-[#D2AF75]', textClass: 'text-black' },
  { name: 'Gold Dark', hex: '#947444', hsl: 'hsl(36, 37%, 42%)', class: 'bg-[#947444]', textClass: 'text-white' },
  { name: 'Luxury Dark', hex: '#111111', hsl: 'hsl(0, 0%, 7%)', class: 'bg-[#111111]', textClass: 'text-white' },
  { name: 'Luxury Stone', hex: '#1A1A1A', hsl: 'hsl(0, 0%, 10%)', class: 'bg-[#1A1A1A]', textClass: 'text-white' },
  { name: 'Background Cream', hex: '#F7F6F0', hsl: 'hsl(51, 33%, 95%)', class: 'bg-[#F7F6F0]', textClass: 'text-black border border-gray-200' },
  { name: 'Pure White', hex: '#FFFFFF', hsl: 'hsl(0, 0%, 100%)', class: 'bg-[#FFFFFF]', textClass: 'text-black border border-gray-200' },
  { name: 'Text Dark', hex: '#1E1E1E', hsl: 'hsl(0, 0%, 12%)', class: 'bg-[#1E1E1E]', textClass: 'text-white' },
  { name: 'Text Muted', hex: '#8A8A8A', hsl: 'hsl(0, 0%, 54%)', class: 'bg-[#8A8A8A]', textClass: 'text-white' },
];

const ColorSwatch = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex flex-col gap-3">
      <div className={`h-40 rounded-2xl ${color.class} ${color.textClass} flex flex-col justify-between p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden`}>

        {/* Copy Overlay */}
        <div
          onClick={() => handleCopy(color.hex)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm"
        >
          {copied ? (
            <div className="flex flex-col items-center gap-2 text-white">
              <CheckCircle2 size={24} className="text-green-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Copied</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white">
              <Copy size={24} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Copy Hex</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-start">
          <span className="font-bold text-lg leading-none">{color.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm opacity-90">{color.hex}</span>
          <span className="font-mono text-[10px] opacity-60 uppercase tracking-widest">{color.hsl}</span>
        </div>
      </div>
    </div>
  );
};

const FontHoverElement = () => (
  <div className="relative group inline-block mt-8">
    <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 cursor-help hover:bg-white/20 transition-all">
      <MousePointerClick size={18} className="text-[#DFBA73]" />
      <span className="text-white font-mono text-sm tracking-widest uppercase">
        Hover to reveal core font stack
      </span>
    </div>

    <div className="absolute left-0 top-full mt-4 hidden group-hover:block w-[400px] bg-white text-black p-6 rounded-2xl shadow-2xl z-20 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2 mb-3">
        <Type size={16} className="text-[#B8955D]" />
        <h4 className="font-bold text-sm uppercase tracking-widest text-[#111]">Active Stack</h4>
      </div>
      <p className="font-mono text-xs leading-loose text-[#666] bg-gray-50 p-4 rounded-xl border border-gray-100">
        <span className="text-black font-bold">"Libre Baskerville"</span>, <br />
        serif
      </p>
    </div>
  </div>
);

const DesignSystemPage = () => {
  const [selectedFont, setSelectedFont] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Preload all suggested fonts immediately so previews are instant
    suggestedFonts.forEach((f) => loadGoogleFont(f.google));
  }, []);

  const handleSelectFont = useCallback((font) => {
    setSelectedFont((prev) => (prev?.name === font.name ? null : font));
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen font-sans text-[#1E1E1E]">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full py-32 bg-[#111111] overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#111111] to-[#111111]" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-[10px] tracking-[0.2em] text-[#DFBA73] font-bold uppercase font-mono">
              Live Reference Guide
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-6">
            Design <span className="text-[#B8955D] italic font-light">System</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
            A comprehensive, interactive showcase of the typography, color palettes, and thematic components that power the Gwalior Stone digital experience.
          </p>

          <FontHoverElement />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 flex flex-col gap-32">

        {/* ── COLORS SECTION ── */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8955D]/10 flex items-center justify-center text-[#B8955D]">
              <PaintBucket size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#111] tracking-tight">Color Palette</h2>
              <p className="text-[#666] font-medium mt-1">Click any swatch to copy its HEX value.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {brandColors.map((color, idx) => (
              <ColorSwatch key={idx} color={color} />
            ))}
          </div>
        </section>

        {/* ── TYPOGRAPHY SECTION ── */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8955D]/10 flex items-center justify-center text-[#B8955D]">
              <Type size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#111] tracking-tight">Typography Scale</h2>
              <p className="text-[#666] font-medium mt-1">System rounded font, optimized for all viewports.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex flex-col gap-12">
              {typographySizes.map((type, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 border-b border-gray-50 pb-10 last:border-0 last:pb-0">
                  <div className="w-full md:w-56 shrink-0 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold bg-[#FAFAF8] px-3 py-1 rounded-md text-[#B8955D] border border-gray-100">{type.name}</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest">Size: {type.label} / LH: {type.lh}</span>
                      <span className="text-xs text-[#666] font-medium">{type.usage}</span>
                    </div>
                  </div>
                  <div className="overflow-hidden w-full">
                    <p className={`${type.class} font-bold text-[#111] leading-tight truncate`}>
                      The quick brown fox jumps.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FONT WEIGHTS SECTION ── */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8955D]/10 flex items-center justify-center text-[#B8955D]">
              <Type size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#111] tracking-tight">Font Weights</h2>
              <p className="text-[#666] font-medium mt-1">Semantic weight distribution.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fontWeights.map((fw, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <p className={`${fw.class} text-4xl text-[#111] mb-6`}>Aa</p>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-bold text-[#B8955D] bg-[#FAFAF8] w-fit px-2 py-1 rounded border border-gray-100">{fw.weight} ({fw.label})</span>
                  <span className="text-sm text-[#666]">{fw.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── THEMES SECTION ── */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8955D]/10 flex items-center justify-center text-[#B8955D]">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#111] tracking-tight">Thematic Environments</h2>
              <p className="text-[#666] font-medium mt-1">Core surface treatments used across different page contexts.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Dark Theme */}
            <div className="bg-[#111111] rounded-[2rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8955D] opacity-10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <span className="text-[10px] tracking-[0.2em] text-[#DFBA73] font-bold uppercase font-mono block mb-6">Dark Theme</span>
              <h3 className="text-4xl font-black text-white tracking-tight mb-4">Cinematic <br />& Premium</h3>
              <p className="text-white/60 leading-relaxed text-sm mb-10 font-light">
                Used primarily on the Homepage, Hero sections, and footers to provide a luxurious and immersive architectural feel.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 rounded-full bg-[#B8955D] text-white text-sm font-bold hover:bg-[#D2AF75] transition-colors shadow-lg shadow-[#B8955D]/20">
                  Primary Action
                </button>
              </div>
            </div>

            {/* Light Theme */}
            <div className="bg-white rounded-[2rem] p-10 border border-gray-200 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 opacity-50 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <span className="text-[10px] tracking-[0.2em] text-[#B8955D] font-bold uppercase font-mono block mb-6">Light Theme</span>
              <h3 className="text-4xl font-black text-[#111] tracking-tight mb-4">Clean <br />& Readable</h3>
              <p className="text-[#666] leading-relaxed text-sm mb-10">
                Used across Projects, Infrastructure, and Contact pages for maximum legibility and highlighting visual content.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 rounded-full bg-[#111111] text-white text-sm font-bold hover:bg-[#FBC938] transition-colors shadow-lg shadow-black/10">
                  Secondary Action
                </button>
              </div>
            </div>

            {/* Cream Theme */}
            <div className="bg-[#F7F6F0] rounded-[2rem] p-10 border border-[#E8E6DF] shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-80 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <span className="text-[10px] tracking-[0.2em] text-[#B8955D] font-bold uppercase font-mono block mb-6">Cream Theme</span>
              <h3 className="text-4xl font-black text-[#1F3A30] tracking-tight mb-4">Warm <br />& Organic</h3>
              <p className="text-[#666] leading-relaxed text-sm mb-10">
                Used heavily in the Blog and Product pages to reduce eye strain for long-form reading and present a natural stone warmth.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-6 py-3 rounded-full bg-white border border-[#E8E6DF] text-[#111] text-sm font-bold hover:border-[#B8955D] hover:text-[#B8955D] transition-all shadow-sm">
                  Outline Action
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── FONT EXPLORER SECTION ── */}
        <section>
          <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8955D]/10 flex items-center justify-center text-[#B8955D]">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#111] tracking-tight">Font Explorer</h2>
              <p className="text-[#666] font-medium mt-1">12 curated font suggestions for the Gwalior Stone brand. Click any card to see a full live preview.</p>
            </div>
          </div>

          {/* Font Explorer Layout (2 Column Side-by-Side) */}
          <div className="flex flex-col lg:flex-row gap-8 items-start relative">

            {/* Left Column: Font List (Scrollable) */}
            <div className="w-full lg:w-1/3 xl:w-[30%] flex flex-col gap-3 max-h-[85vh] overflow-y-auto pr-2 pb-12 sticky top-8" style={{ scrollbarWidth: 'thin' }}>
              {suggestedFonts.map((font) => {
                const isActive = selectedFont?.name === font.name;
                return (
                  <button
                    key={font.name}
                    onClick={() => handleSelectFont(font)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 shrink-0 group ${isActive
                        ? 'border-[#B8955D] bg-[#B8955D]/5 shadow-md shadow-[#B8955D]/10'
                        : 'border-gray-100 bg-white hover:border-[#B8955D]/40 hover:shadow-sm'
                      }`}
                  >
                    <p
                      className="text-3xl font-bold text-[#111] mb-2 leading-tight truncate"
                      style={{ fontFamily: `"${font.name}", sans-serif` }}
                    >
                      Aa
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-[#111] truncate">{font.name}</h4>
                      {font.recommended && <span className="text-[8px] font-bold text-white bg-[#B8955D] px-2 py-0.5 rounded-full shrink-0">REC</span>}
                    </div>
                    <p className="text-[11px] text-[#888] mb-2 italic line-clamp-1">{font.vibe.replace('★ RECOMMENDED · ', '')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B8955D] text-[10px] tracking-tight">
                        {'★'.repeat(font.stars)}{'☆'.repeat(5 - font.stars)}
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isActive ? 'text-[#B8955D]' : 'text-[#aaa]'
                        }`}>
                        {font.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Preview Panel */}
            <div className="w-full lg:w-2/3 xl:w-[70%]">
              {selectedFont ? (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-8">

                  {/* Preview Header */}
                  <div className="bg-[#111111] px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: `"${selectedFont.name}", sans-serif` }}
                      >
                        {selectedFont.name}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">{selectedFont.vibe}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#B8955D] text-sm tracking-tight">
                        {'★'.repeat(selectedFont.stars)}{'☆'.repeat(5 - selectedFont.stars)}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#DFBA73] bg-white/10 px-4 py-2 rounded-full border border-white/10 w-fit">
                        {selectedFont.category}
                      </span>
                    </div>
                  </div>

                  {/* Preview Body */}
                  <div className="p-8 md:p-12 flex flex-col gap-10" style={{ fontFamily: `"${selectedFont.name}", sans-serif` }}>

                    {/* Why this font */}
                    <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100">
                      <p className="text-xs font-mono font-bold text-[#B8955D] uppercase tracking-widest mb-2" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Why this font?
                      </p>
                      <p className="text-[#666] text-sm leading-relaxed">{selectedFont.why}</p>
                    </div>

                    {/* Navigation Bar Mock */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Navigation Bar
                      </span>
                      <div className="bg-[#111111] rounded-2xl px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-lg tracking-wider">GWALIOR <span className="text-[#B8955D] font-light">STONE</span></span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                          {['Home', 'About', 'Projects', 'Products', 'Blog', 'Contact'].map((item) => (
                            <span key={item} className="text-sm text-white/70 hover:text-[#B8955D] cursor-pointer transition-colors font-medium">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hero Preview */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Hero Heading
                      </span>
                      <h2 className="text-5xl md:text-7xl font-black text-[#111] tracking-tight leading-[1.05]">
                        Premium Natural <span className="text-[#B8955D]">Stone</span>
                      </h2>
                    </div>

                    {/* Subheading + Body */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Section Heading + Body Text
                      </span>
                      <h3 className="text-3xl font-bold text-[#111] mb-3">
                        Crafted by Nature, Perfected by Expertise
                      </h3>
                      <p className="text-lg text-[#666] leading-relaxed max-w-3xl mb-4">
                        From the ancient quarries of Rajasthan and Madhya Pradesh, we source and supply over 200 varieties of premium natural stone to architects, designers, and builders across 50+ countries worldwide.
                      </p>
                      <p className="text-base text-[#444] leading-relaxed max-w-2xl">
                        Every block has a story, every vein is a signature of time. Our stones carry the history of the earth — marble from the hills of Tuscany, onyx from Persian quarries, and sandstone hand-cut in our own Gwalior facilities with CNC precision and artisan care.
                      </p>
                    </div>

                    {/* Testimonial Card Mock */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Testimonial Card
                      </span>
                      <div className="bg-[#FAFAF8] rounded-2xl p-8 border border-gray-100 max-w-xl">
                        <p className="text-xl italic text-[#333] leading-relaxed mb-6">
                          "The custom backlit emerald onyx wall is the undisputed centerpiece of our London corporate headquarters."
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#B8955D]/20 flex items-center justify-center text-[#B8955D] font-bold text-lg">MS</div>
                          <div>
                            <p className="font-bold text-[#111] text-sm">Sir Marcus Sterling</p>
                            <p className="text-xs text-[#888]">Managing Director · London, UK</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Buttons & Labels
                      </span>
                      <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-3.5 rounded-full bg-[#B8955D] text-white text-sm font-bold shadow-lg shadow-[#B8955D]/20 hover:bg-[#D2AF75] transition-colors">
                          Explore Collection
                        </button>
                        <button className="px-8 py-3.5 rounded-full bg-[#111] text-white text-sm font-bold hover:bg-[#FBC938] transition-colors">
                          Contact Us
                        </button>
                        <button className="px-8 py-3.5 rounded-full border-2 border-[#B8955D] text-[#B8955D] text-sm font-bold hover:bg-[#FBC938] hover:text-[#111] transition-all">
                          View Projects
                        </button>
                        <button className="px-8 py-3.5 rounded-full bg-[#F7F6F0] text-[#111] text-sm font-bold border border-[#E8E6DF] hover:border-[#B8955D] transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Dark Preview */}
                    <div className="bg-[#111111] rounded-2xl p-8 md:p-10">
                      <span className="text-[10px] font-mono font-bold text-[#DFBA73] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Dark Context Preview
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
                        Gwalior <span className="text-[#B8955D] italic font-light">Stone</span>
                      </h3>
                      <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-6">
                        Exporting the finest natural sandstone, marble, granite, and onyx to luxury architectural projects around the globe since 2003. Trusted by architects, designers, and builders in 50+ countries.
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                        <span className="text-[#B8955D]">20+ Years</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/60">50+ Countries</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/60">200+ Varieties</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/60">ISO 9001 Certified</span>
                      </div>
                    </div>

                    {/* Full Alphabet Specimen */}
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#888] uppercase tracking-widest block mb-4" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        Full Character Set
                      </span>
                      <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100">
                        <p className="text-2xl font-light text-[#333] leading-relaxed mb-2">
                          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                        </p>
                        <p className="text-2xl font-light text-[#333] leading-relaxed mb-2">
                          a b c d e f g h i j k l m n o p q r s t u v w x y z
                        </p>
                        <p className="text-2xl font-light text-[#888] leading-relaxed">
                          0 1 2 3 4 5 6 7 8 9  ! @ # $ % & * ( ) — + =
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center text-[#888] sticky top-8">
                  <p>Select a font from the list on the left to see the live preview.</p>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default DesignSystemPage;


