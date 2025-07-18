/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(139 92 246)",
        secondary: "#45474B",
        register: "#45474B",
      },
      // fontFamily:{

      // }
    },
  },
  plugins: [],
};
