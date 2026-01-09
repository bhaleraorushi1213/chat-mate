import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				border: "border 4s linear infinite",
			},
			fontFamily: {
        vietnam: ["'Be Vietnam Pro'", "sans-serif"],
      },
			keyframes: {
				border: {
					to: { "--border-angle": "360deg" },
				},
			},
		},
	},
	plugins: [require("daisyui")],
};
