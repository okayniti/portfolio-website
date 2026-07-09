'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeader from './SectionHeader'

const experiences = [
    {
        role: 'Website Developer & Reporting Manager',
        company: 'Aspirant India Initiative',
        period: '2025',
        description: 'Owned end-to-end development and deployment of a production website for an education initiative. Led a small development team, improving UI/UX and performance.',
    },
    {
        role: 'TechBee Program Trainee',
        company: 'HCL Tech',
        period: '2022 – 2023',
        description: 'Industry training program covering software engineering fundamentals, cloud technologies, and professional development in a corporate tech environment.',
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
