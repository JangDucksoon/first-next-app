/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.{js,ts,jsx,tsx}'],
    safelist: [],
    theme: {
        extend: {}
    },
    plugins: [require('flowbite/plugin')]
};
