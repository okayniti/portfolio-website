'use client'

import { useState } from 'react'

// Info bubble data - derived from NitiGPT content
const bubbles = [
    {
        id: 'hero-1',
        section: 'hero',
        position: { top: '15%', right: '8%' },
        icon: '✨',
        title: 'Welcome!',
        content: "Hey there! I'm your friendly guide to this portfolio. Scroll around to discover Niti's work!",
    },
    {
        id: 'hero-2',
        section: 'hero',
        position: { top: '60%', left: '5%' },
        icon: '🎓',
        title: 'Currently',
        content: "B.Tech student at VIT Bhopal, deep into AI/ML and building things that matter.",
    },
    {
        id: 'about-1',
        section: 'about',
        position: { top: '10%', left: '3%' },
        icon: '🎤',
        title: 'Fun Fact',
        content: "Niti has competed in 30+ Model United Nations conferences and served as Chairperson!",
    },
    {
        id: 'about-2',
        section: 'about',
        position: { top: '40%', right: '5%' },
        icon: '💻',
        title: 'Problem Solver',
        content: "900+ problems solved on LeetCode and CodeChef. Yeah, she likes puzzles.",
    },
    {
        id: 'work-1',
        section: 'work',
        position: { top: '5%', right: '10%' },
        icon: '🚀',
        title: 'Real Impact',
        content: "Each project here solved a real problem—not just a tutorial exercise. Click around to see the full stories!",
    },
    {
        id: 'contact-1',
        section: 'contact',
        position: { bottom: '30%', right: '8%' },
        icon: '💬',
        title: 'Say Hi!',
        content: "Inbox always open! Whether it's AI, web dev, or just saying hi—she'll respond within 24 hours.",
    },
]

interface BubbleProps {
    bubble: typeof bubbles[0]
}

function Bubble({ bubble }: BubbleProps) {
    const [isHovered, setIsHovered] = useState(false)

    const positionStyle: React.CSSProperties = {
        ...bubble.position as React.CSSProperties,
    }

    return (
        <div
            className="fixed z-40 hidden md:block"
            style={positionStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The bubble */}
            <div
                className={`
                    relative w-12 h-12 rounded-full cursor-pointer
                    bg-white/40 backdrop-blur-md border border-white/30
                    shadow-lg shadow-accent/10
                    flex items-center justify-center
                    transition-all duration-300 ease-out
                    hover:scale-110 hover:bg-white/60 hover:shadow-xl
                    animate-float
                `}
                style={{
                    animationDelay: `${Math.random() * 2}s`,
                }}
            >
                <span className="text-xl">{bubble.icon}</span>

                {/* Subtle pulse ring */}
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-30" />
            </div>

            {/* Tooltip on hover */}
            <div
                className={`
                    absolute top-full left-1/2 -translate-x-1/2 mt-3
                    w-64 p-4 rounded-2xl
                    bg-white/90 backdrop-blur-lg border border-white/50
                    shadow-2xl shadow-foreground/10
                    transition-all duration-300 ease-out
                    ${isHovered
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }
                `}
            >
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 border-l border-t border-white/50 rotate-45" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{bubble.icon}</span>
                        <h4 className="font-bold text-foreground">{bubble.title}</h4>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                        {bubble.content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function InfoBubbles() {
    return (
        <>
            {bubbles.map((bubble) => (
                <Bubble key={bubble.id} bubble={bubble} />
            ))}

            {/* Add the floating animation keyframes via style tag */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}
