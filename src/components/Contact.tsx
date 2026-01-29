'use client'

import { useEffect, useRef } from 'react'
import { DoodleSparkle } from './Doodles'

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/nitikanoongo' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nitikanoongo' },
    { label: 'Codolio', href: 'https://codolio.com/profile/nitikanoongo' },
]

export default function Contact() {
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
            id="contact"
            className="section-padding relative"
        >
            {/* Floating doodle decorations */}
            <div className="absolute top-16 left-16 opacity-30 animate-pulse hidden lg:block">
                <DoodleSparkle className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute top-1/4 right-20 opacity-25 animate-float hidden lg:block">
                <DoodleSparkle className="w-5 h-5 text-accent" />
            </div>
            <div className="absolute bottom-1/3 left-12 opacity-20 animate-bounce-slow hidden lg:block">
                <DoodleSparkle className="w-4 h-4 text-accent" />
            </div>
            <div className="absolute bottom-20 right-1/4 opacity-30 animate-pulse hidden lg:block">
                <DoodleSparkle className="w-7 h-7 text-accent" />
            </div>

            <div className="container-content">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Section header */}
                    <div className="mb-8 reveal">
                        <DoodleSparkle className="w-8 h-8 mx-auto mb-4" />
                        <h2 className="text-section">
                            Let&apos;s{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10">build something</span>
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
                            {' '}together
                        </h2>
                    </div>

                    <p className="text-body text-foreground-muted mb-8 reveal">
                        I&apos;m always open to interesting conversations about AI, web development,
                        competitive programming, or anything tech. Feel free to reach out!
                    </p>

                    {/* Email */}
                    <div className="mb-8 reveal">
                        <a
                            href="mailto:niti.kanoongo3@gmail.com"
                            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold group"
                        >
                            <span className="relative">
                                niti.kanoongo3@gmail.com
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </span>
                            <svg
                                className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 17L17 7M17 7H7M17 7v10"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Location */}
                    <p className="text-foreground-muted mb-8 reveal">
                        📍 Pune, Maharashtra, India
                    </p>

                    {/* Social links */}
                    <div className="flex justify-center gap-4 reveal">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all pop-3d"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Buy me a coffee */}
                    <div className="mt-12 pt-8 border-t border-border/30 reveal">
                        <p className="text-foreground-muted mb-4 text-sm">
                            If you like my work, consider supporting me ☕
                        </p>
                        <a
                            href="https://buymeacoffee.com/nitikanoongo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FFDD00] text-[#0C2C55] px-6 py-3 rounded-full font-semibold hover:bg-[#FFE44D] transition-colors pop-3d shadow-md"
                        >
                            <span className="text-xl">☕</span>
                            Buy me a coffee
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="container-content mt-section pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-caption text-foreground-muted">
                    <p>© {new Date().getFullYear()} Niti Kanoongo. All rights reserved.</p>
                    <p>Designed & built with intention ✨</p>
                </div>
            </footer>
        </section>
    )
}
