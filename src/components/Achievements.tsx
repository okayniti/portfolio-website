'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Code2, GitBranch, Award, BadgeCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'
import TiltCard from './TiltCard'
import { GlowingShadow } from './ui/glowing-shadow'

const achievements = [
    {
        icon: Code2,
        stat: '900+',
        label: 'CP Problems Solved',
        sublabel: 'LeetCode 1415 | CodeChef 1060 | TCS CodeVita Rank 8700',
        category: 'Competitive Programming',
    },
    {
        icon: Award,
        stat: 'Amazon',
        label: 'ML Summer School 2026',
        sublabel: 'Selected for intensive DL, NLP, Bandits & RL curriculum',
        category: 'ML Academy Selection',
    },
    {
        icon: Trophy,
        stat: 'Top 400',
        label: 'i4c Hackathon Finalist',
        sublabel: 'National Finalist | Shell.ai | Redrob AI | Cyber Police',
        category: 'Hackathons',
    },
    {
        icon: BadgeCheck,
        stat: 'AWS',
        label: 'Solutions Architect',
        sublabel: 'Associate Certification | Oracle Cloud AI | Michigan ML',
        category: 'Credentials',
    },
    {
        icon: GitBranch,
        stat: '30+',
        label: 'Model UN Conferences',
        sublabel: 'Sec. General Cisco Community | MLSA | Chairperson & EB',
        category: 'Leadership & MUNs',
    },
    {
        icon: Trophy,
        stat: 'AIR 2',
        label: 'Dell Champs Finalist',
        sublabel: 'GirlScript SoC & Hacktoberfest contributor | SilverZone Olympiad',
        category: 'National Honors',
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
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                    },
                                }}
                            >
                                <TiltCard className="h-full">
                                    <GlowingShadow className="text-center group h-full p-8 md:p-10 flex flex-col items-center justify-center">
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
                                    </GlowingShadow>
                                </TiltCard>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
