'use client'

import { useEffect, useRef, useState } from 'react'
import { DoodlePath, DoodleSparkle } from './Doodles'

const skills = {
    'AI & Machine Learning': ['LSTM', 'ResNet18', 'NLP', 'MONAI', 'Time-Series', 'TensorFlow', 'Scikit-learn'],
    'Full-Stack Development': ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'HTML/CSS', 'JavaScript'],
    'Programming': ['Python', 'C++', 'JavaScript'],
    'Tools & Platforms': ['Git', 'Linux', 'AWS', 'GCP', 'MATLAB'],
}

const highlights = [
    { emoji: '💻', text: 'LeetCode: 1415 | CodeChef: 1040' },
    { emoji: '🏆', text: 'Dynamic Hackathon i4c Finalist (Top 400 nationwide)' },
    { emoji: '🌐', text: 'GSSoC 2024 & Hacktoberfest 2025 Contributor' },
    { emoji: '🎤', text: 'Best Delegate & High Commendation MUN Awards' },
    { emoji: '📜', text: 'Oracle Cloud, Azure AI, ML certifications' },
]

function HighlightFlashcard() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const goNext = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % highlights.length)
            setIsAnimating(false)
        }, 200)
    }

    const goPrev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
            setIsAnimating(false)
        }, 200)
    }

    return (
        <div className="relative bg-gradient-to-br from-accent/10 to-highlight/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-accent/30 shadow-lg glass-3d">
            {/* Doodle decorations */}
            <div className="absolute -top-3 -right-3">
                <DoodleSparkle className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute -bottom-2 -left-2 opacity-50">
                <DoodleSparkle className="w-4 h-4 text-accent" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-accent">✦</span> Highlights
                </h3>
                <span className="text-caption text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">
                    {currentIndex + 1} / {highlights.length}
                </span>
            </div>

            {/* Flashcard */}
            <div className="relative min-h-[100px] flex items-center justify-center py-4">
                <div
                    className={`text-center transition-all duration-200 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                >
                    <span className="text-5xl mb-4 block drop-shadow-sm">{highlights[currentIndex].emoji}</span>
                    <p className="text-body text-foreground font-medium">{highlights[currentIndex].text}</p>
                </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all"
                    aria-label="Previous highlight"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Dots indicator */}
                <div className="flex gap-2">
                    {highlights.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-accent w-4' : 'bg-border'
                                }`}
                            aria-label={`Go to highlight ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goNext}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all"
                    aria-label="Next highlight"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.reveal')
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible')
                            }, index * 100)
                        })
                    }
                })
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="about"
            className="section-padding relative"
        >
            {/* Background decoration */}
            <div className="absolute top-20 right-10 opacity-20 hidden lg:block">
                <DoodlePath className="w-64 h-24" />
            </div>

            <div className="container-content">
                {/* Section header */}
                <div className="mb-16 reveal">
                    <h2 className="text-section inline-flex items-center gap-3">
                        I think in{' '}
                        <span className="relative">
                            <span className="relative z-10">systems</span>
                            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
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
                        , not just screens
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left column - About */}
                    <div className="space-y-8">
                        <div className="reveal">
                            <p className="text-body text-balance leading-relaxed">
                                I&apos;m a <strong>B.Tech Computer Science</strong> student at VIT Bhopal,
                                specializing in <strong>AI & Machine Learning</strong>. I love working end-to-end—from
                                problem definition and system design to implementation and debugging.
                            </p>
                        </div>

                        <div className="reveal bg-highlight/30 rounded-2xl p-6 border-l-4 border-accent">
                            <p className="text-body text-foreground-muted italic">
                                &quot;I&apos;ve built production systems across healthcare AI, predictive maintenance,
                                and cybersecurity—always adapting quickly to new tech stacks and constraints.&quot;
                            </p>
                        </div>

                        <div className="reveal">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <DoodleSparkle className="w-5 h-5" />
                                Beyond Code
                            </h3>
                            <p className="text-body text-foreground-muted">
                                I&apos;ve chaired <strong>30+ Model UN conferences</strong>, led teams as
                                <strong> Secretary General of Cisco Community VITB</strong>, and love combining
                                technical depth with clear communication.
                            </p>
                        </div>
                    </div>

                    {/* Right column - Flashcard & CTA */}
                    <div className="space-y-8">

                        {/* Highlights Flashcard */}
                        <div className="reveal">
                            <HighlightFlashcard />
                        </div>

                        {/* CTA */}
                        <div className="reveal">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:bg-accent transition-colors"
                            >
                                Let&apos;s connect!
                                <span className="text-xl">💬</span>
                            </a>
                        </div>

                        {/* Experience */}
                        <div className="reveal space-y-4">
                            <h3 className="text-lg font-bold">Experience</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Aspirant India Initiative</p>
                                        <p className="text-sm text-foreground-muted">Website Developer & Reporting Manager</p>
                                    </div>
                                    <span className="text-caption text-accent">2025</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">HCL Tech</p>
                                        <p className="text-sm text-foreground-muted">TechBee Program Trainee</p>
                                    </div>
                                    <span className="text-caption text-foreground-muted">2022-23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Competencies - Hover Based Section */}
                <div className="mt-20 reveal">
                    <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                        <DoodleSparkle className="w-6 h-6" />
                        Key Competencies
                        <DoodleSparkle className="w-6 h-6" />
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(skills).map(([category, items]) => (
                            <div
                                key={category}
                                className="group relative"
                            >
                                {/* Category Card */}
                                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-border hover:border-accent hover:shadow-lg transition-all cursor-pointer h-full pop-3d">
                                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors text-center">
                                        {category}
                                    </p>
                                    <p className="text-xs text-foreground-muted text-center mt-1">
                                        Hover to see skills
                                    </p>
                                </div>

                                {/* Skills Tooltip - Shows on Hover */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64">
                                    <div className="bg-foreground text-background rounded-xl p-4 shadow-xl">
                                        {/* Arrow */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-foreground rotate-45" />

                                        <p className="font-semibold text-sm mb-3 text-center relative z-10">{category}</p>
                                        <div className="flex flex-wrap gap-2 justify-center relative z-10">
                                            {items.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 text-xs bg-accent/20 text-accent-light rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
