import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
            keyframes: {
                animateTop: {
                    '0%': { top: '-150px' },
                    '100%': { top: '100%' },
                },
            },
            animation: {
                'translate-top-14': 'animateTop 14s linear infinite',
                'translate-top-16': 'animateTop 16s linear infinite',
                'translate-top-18': 'animateTop 18s linear infinite',
                'translate-top-20': 'animateTop 20s linear infinite',
                'translate-top-22': 'animateTop 22s linear infinite',
                'translate-top-24': 'animateTop 24s linear infinite',
            },
            colors: {
                'yellow-text': '#95d95d',
                'purple-dark': '#3a2254',
                'purple-soft': '#644f7a',
            },
        },
    },
    plugins: [],
} satisfies Config
