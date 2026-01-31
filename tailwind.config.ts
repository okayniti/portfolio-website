import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Ocean Theme - ColorHunt Palette (Light Mode Only)
                // #0C2C55 (Deep Navy) | #296374 (Teal) | #629FAD (Light Teal) | #EDEDCE (Cream)
                background: '#FFFFFF',
                foreground: {
                    DEFAULT: '#0C2C55',  // Deep Navy
                    muted: '#296374',    // Teal
                },
                accent: {
                    DEFAULT: '#296374',  // Teal
                    light: '#629FAD',    // Light Teal
                    dark: '#0C2C55',     // Deep Navy
                },
                highlight: {
                    DEFAULT: '#629FAD',  // Light Teal
                    cream: '#EDEDCE',    // Cream
                    teal: '#296374',     // Teal
                },
                border: {
                    DEFAULT: '#629FAD',  // Light Teal
                    dark: '#296374',     // Teal
                },
                // Direct color access
                navy: '#0C2C55',
                teal: '#296374',
                'light-teal': '#629FAD',
                cream: '#EDEDCE',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.15', fontWeight: '700' }],
                'section': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
                'body': ['1.125rem', { lineHeight: '1.7' }],
                'caption': ['0.875rem', { lineHeight: '1.5' }],
            },
            spacing: {
                'section': 'clamp(4rem, 10vw, 7rem)',
            },
            maxWidth: {
                'content': '1100px',
            },
            borderRadius: {
                'pill': '9999px',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.33, 1, 0.68, 1)',
            },
            keyframes: {
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'wave': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(20deg)' },
                    '75%': { transform: 'rotate(-15deg)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                'draw': {
                    '0%': { strokeDashoffset: '200' },
                    '100%': { strokeDashoffset: '0' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '25%': { transform: 'translateY(-5px) rotate(2deg)' },
                    '75%': { transform: 'translateY(5px) rotate(-2deg)' },
                },
                'float-3d': {
                    '0%, 100%': { transform: 'translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)' },
                    '25%': { transform: 'translateY(-10px) translateZ(20px) rotateX(5deg) rotateY(-5deg)' },
                    '50%': { transform: 'translateY(-5px) translateZ(10px) rotateX(-3deg) rotateY(3deg)' },
                    '75%': { transform: 'translateY(-15px) translateZ(15px) rotateX(3deg) rotateY(-3deg)' },
                },
                'tilt': {
                    '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
                    '25%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' },
                    '75%': { transform: 'perspective(1000px) rotateX(-2deg) rotateY(2deg)' },
                },
                'spin-slow': {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(360deg)' },
                },
                'pulse-3d': {
                    '0%, 100%': { transform: 'scale3d(1, 1, 1)' },
                    '50%': { transform: 'scale3d(1.05, 1.05, 1.05)' },
                },
            },
            animation: {
                'fade-up': 'fade-up 0.6s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
                'wave': 'wave 1s ease-in-out infinite',
                'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
                'draw': 'draw 1.5s ease-out forwards',
                'float': 'float 4s ease-in-out infinite',
                'float-3d': 'float-3d 6s ease-in-out infinite',
                'tilt': 'tilt 8s ease-in-out infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
                'pulse-3d': 'pulse-3d 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}

export default config
