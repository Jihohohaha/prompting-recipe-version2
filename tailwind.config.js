// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        '11': '2.75rem',     // leading-11 (11 * 0.25rem = 2.75rem, 약 44px)
        '12': '4rem',        // leading-12 (12 * 0.25rem = 3rem, 48px)
        'huge': '5rem',      // leading-huge (사용자 정의 이름 및 값)
      },
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
        cafe24: ['"Cafe24ClassicType"', "sans-serif"],
        neunrimbo: ['"Neunrimbo Gothic"', 'sans-serif'],
        pretendardLight: ['"Pretendard-Light"', "sans-serif"],
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