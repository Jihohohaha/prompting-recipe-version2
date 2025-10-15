// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Noto Sans KR', 'Roboto', 'Helvetica Neue', 'Arial'],
        stretch: ['"StretchPro"', "sans-serif"],
        desira: ['"DesiraDEMO"', "sans-serif"],
        pretendard: ['"Pretendard"', "sans-serif"],
        michroma: ['"Michroma"', "monospace"],
        neodgm: ['"Neodgm"', "monospace"],
        bromawo: ['"Bromawo"', "sans-serif"],
        koolegant: ['Koolegant', 'sans-serif'],
        watermelon: ['116Watermelon', 'sans-serif'],
        sacramento: ['"Sacramento"', 'cursive'],
        mortend: ["Mortend", "sans-serif"],
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
      ringWidth: {
        20: '20px',
        28: '28px',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
      }
    },
  },
  plugins: [],
}