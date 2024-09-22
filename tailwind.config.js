/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/bg/hero.svg')",
        "buzz-pattern": "url('/bg/buzz-bg.svg')",
        "buzz-describe": "url('/describe.svg')",
        // "hero-pattern": "url('/bg/bg-1.svg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
