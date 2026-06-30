/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        playfair: ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        zentry: ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        general: ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        "circular-web": ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        "robert-medium": ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        "robert-regular": ['ui-rounded', '"SF Pro Rounded"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        luxury: {
          gold: "#B8955D",
          "gold-light": "#D2AF75",
          "gold-dark": "#947444",
          dark: "#111111",
          stone: "#1A1A1A",
          light: "#FFFFFF",
          text: "#1E1E1E",
          muted: "#8A8A8A",
          border: "rgba(184, 149, 93, 0.25)",
        },
        blue: {
          50: "#F7F6F0",
          75: "#EFECE3",
          100: "#F5F3EC",
          200: "#1A1A18",
          300: "#C5A880",
        },
        violet: {
          300: "#242422",
        },
        yellow: {
          100: "#B89C72",
          300: "#B8955D",
        },
      },
    },
  },
  plugins: [],
};
