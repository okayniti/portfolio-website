import type { Metadata } from 'next'
import './globals.css'

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
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://api.fontshare.com" />
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@300,400,500,600,700&display=swap"
                />
            </head>
            <body className="min-h-screen bg-background text-foreground antialiased">
                {children}
            </body>
        </html>
    )
}
