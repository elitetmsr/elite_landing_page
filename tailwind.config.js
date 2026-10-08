/** @type {import('tailwindcss').Config} */

/** Maps a CSS custom property holding RGB channels to a Tailwind color with alpha support. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: token("primary"),
          dark: token("primary-dark"),
          deep: token("primary-deep"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          dark: token("secondary-dark"),
        },
        accent: token("accent"),
        surface: {
          DEFAULT: token("surface"),
          alt: token("surface-alt"),
          muted: token("surface-muted"),
          info: token("surface-info"),
        },
        body: token("body"),
        content: token("content"),
        edge: token("edge"),
        success: token("success"),
        warning: token("warning"),
        danger: token("danger"),
        whatsapp: {
          DEFAULT: token("whatsapp"),
          dark: token("whatsapp-dark"),
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-arabic)", "system-ui", "sans-serif"],
        ibm: ["var(--font-ibm-arabic)", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 3px rgb(var(--primary) / 0.06), 0 8px 24px -12px rgb(var(--primary) / 0.12)",
        lift: "0 28px 56px -24px rgb(var(--primary) / 0.32)",
        glow: "0 14px 32px -12px rgb(var(--secondary) / 0.6)",
        "glow-accent": "0 14px 32px -12px rgb(var(--accent) / 0.55)",
      },
      screens: {
        "3xl": "1920px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
