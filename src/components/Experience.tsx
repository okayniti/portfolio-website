'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import TiltCard from './TiltCard'

const experiences = [
    {
        role: 'AI/ML Intern',
        company: 'CovisionAI — Pune, India',
        period: 'May 2026 – Aug 2026',
        description: 'Designed and built a Python-based benchmarking framework to evaluate 3 frontier video generation models (Seedance, Kling, Runway) across quality, latency, temporal consistency, and prompt-adherence; findings directly informed production model selection. Engineered robust API integration layers and automated test harnesses across 100+ generation configurations, reducing manual evaluation overhead by 40%. Maintained version-controlled experiment logs and reproducible ML pipelines, enforcing data integrity and strict confidentiality.',
    },
    {
        role: 'Website Developer & Reporting Manager',
        company: 'Aspirant India Initiative — Remote',
        period: 'Mar 2025 – Jul 2025',
        description: 'Architected and deployed a production web platform serving 40,000+ students across 500+ institutions. Owned the full system lifecycle from design through post-launch, leading a 3-developer team via sprint planning and code reviews. Shipped features for 9 national SDG summit events across 5 months with zero production incidents, coordinating cross-functional requirements across PR, curriculum, and operations.',
    },
]

export default function Experience() {
    const headerRef = useRef<HTMLDivElement>(null)
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

    const timelineRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 80%', 'end 60%'],
    })

    return (
        <section id="experience" className="section-padding relative">
            <div className="container-content">
                {/* Header */}
                <div ref={headerRef} className="mb-16 md:mb-20">
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Experience
                    </motion.p>

                    <motion.h2
                        className="text-display font-display text-balance flex items-baseline gap-3 flex-wrap"
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        My Journey
                        <span className="font-script text-accent text-[1.15em] font-normal -rotate-3 inline-block">
                            so far
                        </span>
                    </motion.h2>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative max-w-3xl">
                    {/* Base track */}
                    <div className="absolute left-[13px] top-1 bottom-1 w-px bg-border" />

                    {/* Accent line that draws downward as you scroll */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-[13px] top-1 bottom-1 w-px bg-accent origin-top"
                    />

                    {experiences.map((exp, index) => (
                        <JourneyItem
                            key={exp.company}
                            exp={exp}
                            index={index}
                            total={experiences.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function JourneyItem({
    exp,
    index,
    total,
    scrollYProgress,
}: {
    exp: (typeof experiences)[number]
    index: number
    total: number
    scrollYProgress: MotionValue<number>
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    // Roughly where this stop sits along the timeline's scroll progress
    const threshold = total > 1 ? index / (total - 1) : 0
    const dotProgress = useTransform(scrollYProgress, [Math.max(threshold - 0.12, 0), threshold], [0, 1])
    const dotBorderColor = useTransform(dotProgress, [0, 1], ['rgba(255,255,255,0.15)', '#ED7A36'])
    const dotBg = useTransform(dotProgress, [0, 1], ['#1C0D02', '#ED7A36'])
    const iconColor = useTransform(dotProgress, [0, 1], ['rgba(255,255,255,0.65)', '#120800'])

    return (
        <motion.div
            ref={ref}
            className="relative pl-10 pb-12 last:pb-0"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Timeline dot — lights up as the accent line reaches it */}
            <motion.div
                style={{ borderColor: dotBorderColor, backgroundColor: dotBg }}
                className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10"
            >
                <motion.div style={{ color: iconColor }}>
                    <Briefcase size={12} />
                </motion.div>
            </motion.div>

            {/* Content */}
            <TiltCard className="premium-card !p-6 md:!p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {exp.role}
                        </h3>
                        <p className="text-body-sm text-foreground-muted font-medium">
                            {exp.company}
                        </p>
                    </div>
                    <span className="text-caption font-mono text-foreground-muted bg-background px-3 py-1 rounded-full border border-border whitespace-nowrap w-fit">
                        {exp.period}
                    </span>
                </div>
                <p className="text-body-sm text-foreground-muted leading-relaxed">
                    {exp.description}
                </p>
            </TiltCard>
        </motion.div>
    )
}
