'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeader from './SectionHeader'

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
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} id="experience" className="section-padding relative">
            <div className="container-content">
                <SectionHeader
                    label="Experience"
                    heading="Where I've Worked"
                />

                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="relative pl-10 pb-12 last:pb-0"
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                },
                            }}
                        >
                            {/* Timeline line */}
                            {index < experiences.length - 1 && (
                                <div className="absolute left-[13px] top-6 w-px h-full bg-border" />
                            )}

                            {/* Timeline dot */}
                            <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center">
                                <Briefcase size={12} className="text-foreground-muted" />
                            </div>

                            {/* Content */}
                            <div className="premium-card !p-6 md:!p-8">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {exp.role}
                                        </h3>
                                        <p className="text-body-sm text-foreground-muted font-medium">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <span className="text-caption text-foreground-muted bg-background px-3 py-1 rounded-full border border-border whitespace-nowrap w-fit">
                                        {exp.period}
                                    </span>
                                </div>
                                <p className="text-body-sm text-foreground-muted leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
