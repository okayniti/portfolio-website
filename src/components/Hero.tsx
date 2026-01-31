'use client'

import { useEffect, useRef } from 'react'
import { DoodleWave, DoodleArrowDown, DoodleSparkle, DoodleWavingHand } from './Doodles'
import TypingText from './TypingText'

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.reveal-hero')
        elements?.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('opacity-100', 'translate-y-0')
                el.classList.remove('opacity-0', 'translate-y-4')
            }, index * 200)
        })
    }, [])

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col justify-center relative py-20 overflow-hidden">
            {/* Floating sparkles decoration */}
            <div className="absolute top-20 right-20 opacity-50 animate-pulse hidden md:block">
                <DoodleSparkle className="w-8 h-8" />
            </div>
            <div className="absolute top-40 right-40 opacity-30 animate-pulse delay-300 hidden md:block">
                <DoodleSparkle className="w-6 h-6" />
            </div>

            <div className="container-content">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left content */}
                    <div className="lg:col-span-7">
                        {/* Hand-drawn wave decoration */}
                        <div className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 mb-4">
                            <DoodleWave />
                        </div>

                        {/* Greeting with waving hand */}
                        <p className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 text-lg text-foreground-muted font-medium mb-6">
                            <span className="italic">Hi, I&apos;m Niti Kanoongo</span> <DoodleWavingHand className="text-2xl" />
                        </p>

                        {/* Main headline */}
                        <h1 className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 text-hero max-w-2xl mb-8">
                            I blend{' '}
                            <span className="text-foreground">AI & Machine Learning</span>
                            {' '}with{' '}
                            <span className="text-foreground">Full-Stack Development</span>
                            {' '}to build systems that{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10">
                                    <TypingText text="actually work" speed={80} delay={1500} />
                                </span>
                                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                                    <path
                                        d="M5 8 Q 50 3, 100 7 T 195 6"
                                        stroke="#296374"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        opacity="0.5"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 text-lg text-foreground-muted max-w-xl mb-8">
                            B.Tech CSE @ VIT Bhopal • AI/ML Specialization
                            <br />
                            <span className="italic">Building production systems across healthcare, fintech, and cybersecurity.</span>
                        </p>

                        {/* Quick stats */}
                        <div className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 flex flex-wrap gap-4 text-sm">
                            <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium">
                                900+ problems solved
                            </span>
                            <span className="px-3 py-1.5 bg-border rounded-full">
                                30+ MUNs
                            </span>
                            <span className="px-3 py-1.5 bg-border rounded-full">
                                GSSoC &apos;24 Contributor
                            </span>
                        </div>
                    </div>

                    {/* Right side - Custom illustration */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 delay-500 relative group">
                            <img
                                src="/avatar.png"
                                alt="Niti illustration"
                                className="w-64 md:w-80 lg:w-96 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Hover sparkles */}
                            <div className="absolute -top-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <DoodleSparkle className="w-6 h-6 text-accent animate-pulse" />
                            </div>
                            <div className="absolute top-1/4 -right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <DoodleSparkle className="w-5 h-5 text-accent animate-pulse" />
                            </div>
                            <div className="absolute -bottom-2 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                <DoodleSparkle className="w-4 h-4 text-accent animate-pulse" />
                            </div>
                            <div className="absolute bottom-1/3 -left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                <DoodleSparkle className="w-5 h-5 text-accent animate-pulse" />
                            </div>

                            {/* Thought bubble */}
                            <div className="absolute -top-4 -right-8 md:-right-16 bg-white backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-border animate-bounce-slow hidden md:block">
                                <p className="text-sm italic text-foreground-muted">Let&apos;s build something!</p>
                                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-l border-b border-border rotate-[-45deg]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="reveal-hero opacity-0 translate-y-4 transition-all duration-700 mt-16 flex flex-col items-center">
                    <p className="text-sm text-foreground-muted italic mb-2">scroll to explore</p>
                    <div className="animate-bounce">
                        <DoodleArrowDown />
                    </div>
                </div>
            </div>
        </section>
    )
}
