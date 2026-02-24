import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {

        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors : {
                transparent: 'transparent',
                current: 'currentColor',
                'white': '#ffffff',
                'maroon': {
            50: '#f2e5e5',
            100: '#e5cccc',
            200: '#d8b2b2',
            300: '#cc9999',
            400: '#bf7f7f',
            500: '#b26666',
            600: '#a64c4c',
            700: '#993232',
            800: '#8c1919',
            900: '#800000',
            },
            },
        },
    },

    plugins: [forms],
};
