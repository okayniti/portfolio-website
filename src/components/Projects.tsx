'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/projects'
import SectionHeader from './SectionHeader'
import MagneticButton from './MagneticButton'

export default function Projects() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    const projectEmojis = ['🩻', '🏗️', '🛡️', '🌐']

    return (
        <section ref={ref} id="work" className="section-padding relative">
            <div className="container-content">
                <SectionHeader
                    label="Some Recent Projects"
                    heading="Selected Work That Delivers Results"
                />

                {/* Projects */}
                <div className="space-y-12 md:space-y-16">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            emoji={projectEmojis[index] || '📦'}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface ProjectCardProps {
    project: typeof projects[0]
    index: number
    emoji: string
    isInView: boolean
}

function ProjectCard({ project, index, emoji, isInView }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const cardInView = useInView(cardRef, { once: true, margin: '-80px' })

    const isReversed = index % 2 === 1

    return (
        <motion.article
            ref={cardRef}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="premium-card !p-0 overflow-hidden">
                <div className={`grid md:grid-cols-2 ${isReversed ? 'md:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isReversed ? 'md:col-start-2' : ''}`}>
                        <div className="aspect-[4/3] bg-background flex items-center justify-center overflow-hidden">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-foreground-muted">
                                    <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                                        {emoji}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isReversed ? 'md:col-start-1 md:row-start-1' : ''}`}>
                        {/* Year & category */}
                        <p className="text-label uppercase tracking-widest text-foreground-muted mb-4">
                            {project.year} · {project.tags.slice(0, 2).join(' · ')}
                        </p>

                        {/* Title */}
                        <h3 className="text-heading font-display mb-3 group-hover:opacity-70 transition-opacity duration-300">
                            {project.title}
                        </h3>

                        {/* Problem */}
                        <p className="text-body-sm text-foreground-muted italic mb-4">
                            {project.problem}
                        </p>

                        {/* Description */}
                        <p className="text-body text-foreground-muted mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((tag) => (
                                <span key={tag} className="tech-pill">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* View link */}
                        <div className="mt-2">
                            <MagneticButton href={project.link || '#'} variant="secondary">
                                <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                    View Project <ArrowUpRight size={14} strokeWidth={2.5} />
                                </span>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
