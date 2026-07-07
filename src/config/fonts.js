/* ══════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH — Global Font Configuration
   
   To change the font across the ENTIRE website, update:
     1. FONT_NAME  → the font name (must match Google Fonts)
     2. FONT_FAMILY → the full CSS font-family string
     3. GOOGLE_FONTS_URL → the Google Fonts import URL
     4. Update the <link> tag in index.html to match GOOGLE_FONTS_URL
   ══════════════════════════════════════════════════════════════ */

// The font name (used for canvas rendering, e.g. VaporizeText)
export const FONT_NAME = "Libre Baskerville";

// The full CSS font-family value (used for inline styles)
export const FONT_FAMILY = `"${FONT_NAME}", serif`;

// Google Fonts import URL
export const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";
