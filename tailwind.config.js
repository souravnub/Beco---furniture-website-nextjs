/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: "Montserrat, sans-serif",
            cursive: "Unbounded, cursive ",
            mono: "Roboto Mono, monospace",
        },
        container: {
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
            },
        },
        extend: {},
    },
    plugins: [],
};
