import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // if you use src/
    ],
    theme: {
        extend: {
            colors: {
                bg: "var(--background) / <alpha-value>",
                fg: "var(--foreground) / <alpha-value>",
                primaryOrange: "var(--primaryOrange) / <alpha-value>",
                primaryBlue: "var(--primaryBlue) / <alpha-value>",
            },
        },
    },
    plugins: [],
} satisfies Config;

