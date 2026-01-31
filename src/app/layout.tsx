import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

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
            <body className="min-h-screen bg-white">
                <CustomCursor />
                <ScrollProgress />
                {children}
            </body>
        </html>
    )
}

