/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
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
            },
            backgroundImage: {
                texture: 'url("/bg-img.png")',
            },
            backgroundColor: {
                dark: {
                    DEFAULT: "#1F2122",
                },
            },
            borderColor: {
                dark: {
                    DEFAULT: "#5b5f62",
                },
            },
        },
    },
    plugins: [],
};
