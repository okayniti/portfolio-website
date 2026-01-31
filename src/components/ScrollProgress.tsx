'use client'

import { useState, useEffect } from 'react'

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed bottom-6 left-6 z-50 hidden md:flex flex-col items-center gap-2">
            {/* Progress bar container */}
            <div className="w-1 h-24 bg-border/30 rounded-full overflow-hidden">
                <div
                    className="w-full bg-accent transition-all duration-150 ease-out rounded-full"
                    style={{ height: `${scrollProgress}%` }}
                />
            </div>

            {/* Percentage text */}
            <span className="text-xs font-mono text-foreground-muted">
                {Math.round(scrollProgress)}%
            </span>
        </div>
    )
}
