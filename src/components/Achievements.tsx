'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Code2, GitBranch, Award, BadgeCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'

const achievements = [
    {
        icon: Code2,
        stat: '1415',
        label: 'LeetCode Rating',
        sublabel: 'CodeChef: 1040',
        category: 'Competitive Programming',
    },
    {
        icon: Trophy,
        stat: 'Top 400',
        label: 'i4c Finalist',
        sublabel: 'Dynamic Hackathon — Nationwide',
        category: 'Hackathon',
    },
    {
        icon: GitBranch,
        stat: '2x',
        label: 'Open Source',
        sublabel: 'GSSoC 2024 & Hacktoberfest 2025',
        category: 'Contributions',
    },
    {
        icon: Award,
        stat: 'Best',
        label: 'Delegate Award',
        sublabel: 'High Commendation MUN Awards',
        category: 'Leadership',
    },
    {
        icon: BadgeCheck,
        stat: '3+',
        label: 'Certifications',
        sublabel: 'Oracle Cloud · Azure AI · ML',
        category: 'Credentials',
    },
]

export default function Achievements() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} id="achievements" className="section-padding relative">
            <div className="container-content">
                <SectionHeader
                    label="Achievements"
                    heading="Milestones & Recognition"
                    align="center"
                />

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {achievements.map((item) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.label}
                                className="premium-card text-center group"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                    },
                                }}
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto mb-5 group-hover:bg-foreground group-hover:text-background transition-all duration-400">
                                    <Icon size={20} strokeWidth={1.5} />
                                </div>

                                {/* Category */}
                                <p className="text-label uppercase tracking-widest text-foreground-muted mb-3">
                                    {item.category}
                                </p>

                                {/* Stat */}
                                <p className="text-5xl md:text-6xl font-display font-bold text-foreground mb-1 leading-none">
                                    {item.stat}
                                </p>

                                {/* Label */}
                                <p className="text-body-sm font-medium text-foreground mb-1">
                                    {item.label}
                                </p>

                                {/* Sublabel */}
                                <p className="text-caption text-foreground-muted">
                                    {item.sublabel}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
