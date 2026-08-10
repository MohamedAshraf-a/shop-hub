/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // إضافة كلاس جديد للتوسيط
      minHeight: {
        'screen-minus-nav': 'calc(100vh - 80px)', // اعدل 80px حسب ارتفاع الناف بار
      },
    },
  },
  plugins: [],
}