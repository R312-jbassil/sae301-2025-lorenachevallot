/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#d4af37",
                    "primary-content": "#000000",
                    "secondary": "#f3cc30",
                    "secondary-content": "#000000",
                    "accent": "#37cdbe",
                    "accent-content": "#000000",
                    "neutral": "#3d4451",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#eff1f5",
                    "base-content": "#1f2937",
                    "info": "#3abff8",
                    "info-content": "#000000",
                    "success": "#36d399",
                    "success-content": "#000000",
                    "warning": "#fbbd23",
                    "warning-content": "#000000",
                    "error": "#f87272",
                    "error-content": "#000000",
                },
                dark: {
                    "primary": "#d4af37",
                    "primary-content": "#000000",
                    "secondary": "#f3cc30",
                    "secondary-content": "#000000",
                    "accent": "#37cdbe",
                    "accent-content": "#000000",
                    "neutral": "#2a2e37",
                    "neutral-content": "#ffffff",
                    "base-100": "#1d232a",
                    "base-200": "#16212e",
                    "base-300": "#131a24",
                    "base-content": "#f3f4f6",
                    "info": "#3abff8",
                    "info-content": "#000000",
                    "success": "#36d399",
                    "success-content": "#000000",
                    "warning": "#fbbd23",
                    "warning-content": "#000000",
                    "error": "#f87272",
                    "error-content": "#000000",
                },
            },
        ],
    },
}
