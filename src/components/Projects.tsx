'use client'

import { useEffect, useRef } from 'react'
import { projects } from '@/lib/projects'
import { DoodleSparkle, DoodleArrowRight, DoodleUnderline } from './Doodles'

export default function Projects() {
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
                            }, index * 150)
                        })
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const projectEmojis = ['🩻', '🏗️', '🛡️', '🌐']

    return (
        <section
            ref={sectionRef}
            id="work"
            className="section-padding relative"
        >
            {/* Floating doodle decorations */}
            <div className="absolute top-10 left-10 opacity-30 animate-float hidden lg:block">
                <DoodleSparkle className="w-8 h-8 text-accent" />
            </div>
            <div className="absolute top-1/3 right-8 opacity-20 animate-pulse hidden lg:block">
                <DoodleSparkle className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute bottom-20 left-1/4 opacity-25 animate-bounce-slow hidden lg:block">
                <DoodleSparkle className="w-5 h-5 text-accent" />
            </div>

            <div className="container-content">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-section reveal inline-flex items-center gap-4">
                        Here&apos;s{' '}
                        <span className="relative">
                            <span className="relative z-10">how</span>
                            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path
                                    d="M5 8 Q 25 3, 50 7 T 95 6"
                                    stroke="#296374"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                    opacity="0.5"
                                />
                            </svg>
                        </span>
                        <DoodleSparkle className="w-6 h-6 animate-pulse" />
                    </h2>
                </div>

                {/* Projects */}
                <div className="space-y-24">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className="reveal group"
                        >
                            <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''
                                }`}>
                                {/* Project image placeholder */}
                                <div className={`relative ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                                    <div className="absolute -top-4 -left-4 animate-float opacity-60">
                                        <DoodleSparkle className="w-6 h-6" />
                                    </div>

                                    <div className="aspect-[4/3] bg-gradient-to-br from-border/30 to-border/10 rounded-2xl overflow-hidden border-2 border-dashed border-border/50 flex items-center justify-center tilt-hover">
                                        <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">
                                            {projectEmojis[index] || '📦'}
                                        </span>
                                    </div>
                                </div>

                                {/* Project info */}
                                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                                    <span className="text-caption text-accent font-medium">
                                        {project.year} | {project.tags.slice(0, 2).join(', ')}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-1 group-hover:text-accent transition-colors">
                                        <span className="relative inline-block">
                                            {project.title}
                                            <DoodleUnderline className="absolute -bottom-1 left-0 w-full" />
                                        </span>
                                    </h3>

                                    {/* Problem solved */}
                                    <div className="flex items-start gap-2 mt-4 mb-3">
                                        <span className="text-accent mt-0.5">✦</span>
                                        <p className="text-sm text-accent font-medium italic">
                                            {project.problem}
                                        </p>
                                    </div>

                                    <p className="text-body text-foreground-muted mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-caption bg-accent/10 text-accent rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View link */}
                                    <a
                                        href={project.link || '#'}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent group/link"
                                    >
                                        View Project
                                        <span className="transition-transform group-hover/link:translate-x-1">
                                            <DoodleArrowRight className="w-8 h-4" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Experimenting badge */}
                <div className="mt-24 flex justify-center reveal">
                    <div className="relative">
                        <div className="bg-accent text-white px-8 py-4 rounded-full transform -rotate-3 font-bold text-lg">
                            I ✨ Experiment a lot
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
