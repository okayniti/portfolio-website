'use client'

import { useState, useEffect } from 'react'
import { nitiGptContent } from '@/lib/nitigpt-content'
import { projects } from '@/lib/projects'

export default function NitiGPT() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentSection, setCurrentSection] = useState('hero')
    const [content, setContent] = useState(nitiGptContent.hero)

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'work', 'about', 'contact']

            for (const sectionId of sections.reverse()) {
                const el = document.getElementById(sectionId)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= window.innerHeight / 2) {
                        if (currentSection !== sectionId) {
                            setCurrentSection(sectionId)
                            if (nitiGptContent[sectionId]) {
                                setContent(nitiGptContent[sectionId])
                            }
                        }
                        break
                    }
                }
            }

            if (window.scrollY < 200 && currentSection !== 'hero') {
                setCurrentSection('hero')
                setContent(nitiGptContent.hero)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [currentSection])

    useEffect(() => {
        if (currentSection === 'work') {
            const projectElements = document.querySelectorAll('#work article')

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const index = Array.from(projectElements).indexOf(entry.target as Element)
                            if (index >= 0 && projects[index]) {
                                setContent(projects[index].nitiGptContext)
                            }
                        }
                    })
                },
                { threshold: 0.5 }
            )

            projectElements.forEach((el) => observer.observe(el))
            return () => observer.disconnect()
        }
    }, [currentSection])

    return (
        <>
            {/* Toggle Button - terracotta accent */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ease-smooth ${isOpen
                        ? 'bg-foreground text-background'
                        : 'bg-accent text-white hover:bg-accent-dark'
                    }`}
                aria-label={isOpen ? 'Close NitiGPT' : 'Open NitiGPT'}
            >
                {isOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <>
                        <span className="text-lg">✨</span>
                        <span className="text-sm font-medium hidden sm:inline">NitiGPT</span>
                    </>
                )}
            </button>

            {/* Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[360px] bg-background border-l border-border shadow-2xl z-40 transform transition-transform duration-300 ease-smooth ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <h2 className="font-bold">NitiGPT</h2>
                        </div>
                        <span className="text-caption text-foreground-muted capitalize px-2 py-1 bg-border/50 rounded-full">
                            {currentSection === 'work' ? 'Projects' : currentSection}
                        </span>
                    </div>

                    {/* Panel Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-4">
                            <p className="font-mono text-sm leading-relaxed whitespace-pre-line text-foreground-muted">
                                {content}
                            </p>
                        </div>
                    </div>

                    {/* Panel Footer */}
                    <div className="p-6 border-t border-border">
                        <p className="text-caption text-foreground-muted text-center italic">
                            Scroll the page — I&apos;ll update with context
                        </p>
                    </div>
                </div>
            </div>

            {/* Backdrop on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-foreground/10 z-30 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
