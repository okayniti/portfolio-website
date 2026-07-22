import type { Metadata } from 'next'
import { Inter_Tight, Caveat } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

// Fallback for the -apple-system stack on non-Apple devices — true SF Pro
// can't be self-hosted on a public site (Apple's license restricts it to
// apps built for Apple platforms), so Inter Tight stands in everywhere the
// real San Francisco font isn't available on-device.
const interTight = Inter_Tight({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-inter-tight',
    display: 'swap',
})

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-caveat',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Niti Kanoongo — AI/ML Developer & Designer',
    description: 'B.Tech CSE student at VIT Bhopal specializing in AI & Machine Learning. Building production systems across healthcare, fintech, and cybersecurity.',
    keywords: ['portfolio', 'AI', 'machine learning', 'full-stack developer', 'VIT Bhopal', 'Niti Kanoongo'],
    authors: [{ name: 'Niti Kanoongo' }],
    openGraph: {
        title: 'Niti Kanoongo — AI/ML Developer & Designer',
        description: 'Building systems that actually work. AI/ML • Full-Stack • Competitive Programming',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={`${interTight.variable} ${caveat.variable} ${GeistMono.variable}`}
        >
            <body className="min-h-screen bg-background text-foreground antialiased">
                {children}
            </body>
        </html>
    )
}
