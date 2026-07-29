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
                // Premium Dark Orange/Brown Palette (Behance style)
                background: '#120800',
                card: '#1C0D02',
                foreground: {
                    DEFAULT: '#FFFFFF',
                    muted: 'rgba(255, 255, 255, 0.65)',
                },
                accent: {
                    DEFAULT: '#ED7A36',
                    deep: '#DD4D06',
                },
                border: {
                    DEFAULT: 'rgba(255, 255, 255, 0.08)',
                    strong: 'rgba(255, 255, 255, 0.15)',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-general-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
                script: ['var(--font-script)', 'cursive'],
                mono: ['ui-monospace', '-apple-system', 'SFMono-Regular', 'var(--font-geist-mono)', 'Menlo', 'Consolas', 'monospace'],
            },
            fontSize: {
                'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.0', fontWeight: '700', letterSpacing: '0.02em' }],
                'display': ['clamp(2.1rem, 4.2vw, 3.6rem)', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '0.015em' }],
                'heading': ['clamp(1.5rem, 2.8vw, 2.2rem)', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.01em' }],
                'subheading': ['clamp(1.1rem, 1.6vw, 1.3rem)', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.01em' }],
                'body': ['1.0625rem', { lineHeight: '1.75' }],
                'body-sm': ['0.9375rem', { lineHeight: '1.7' }],
                'caption': ['0.8125rem', { lineHeight: '1.5' }],
                'label': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.08em' }],
            },
            spacing: {
                'section': 'clamp(5rem, 12vw, 9rem)',
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            maxWidth: {
                'content': '1300px',
                'prose': '680px',
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
                'elevated': '0 8px 30px rgba(0,0,0,0.06)',
                'button': '0 2px 8px rgba(0,0,0,0.08)',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.33, 1, 0.68, 1)',
                'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
            },
            keyframes: {
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-8px) rotate(2deg)' },
                    '66%': { transform: 'translateY(4px) rotate(-1deg)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            animation: {
                'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 5s ease-in-out infinite',
                'float-slow': 'float-slow 7s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
                'marquee-reverse': 'marquee-reverse 30s linear infinite',
            },
        },
    },
    plugins: [],
}

export default config
