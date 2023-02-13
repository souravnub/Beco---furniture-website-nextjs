/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./sections/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "4rem",
                    xl: "5rem",
                },
            },
            fontFamily: {
                sans: "Syne, sans-serif",
                serif: "Cormorant, serif",
                mayfest: "MAYFEST, serif",
                bonelest: "BONELEST, serif",
            },
            backgroundImage: {
                texture: 'url("/bg-img.png")',
            },
            colors: {
                dark: {
                    DEFAULT: "#1F2122",
                    fade: "#373a3b",
                },
                brand: {
                    DEFAULT: "#facc15",
                    500: "#eab308",
                },
            },
        },
    },
    plugins: [],
};
