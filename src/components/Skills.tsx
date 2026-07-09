'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Code2, Wrench, Globe } from 'lucide-react'
import SectionHeader from './SectionHeader'

const skillCategories = [
    {
        title: 'AI & Machine Learning',
        icon: Brain,
        skills: ['LSTM', 'ResNet18', 'NLP', 'MONAI', 'Time-Series', 'TensorFlow', 'Scikit-learn'],
    },
    {
        title: 'Full-Stack Development',
        icon: Globe,
        skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'HTML/CSS', 'JavaScript'],
    },
    {
        title: 'Programming',
        icon: Code2,
        skills: ['Python', 'C++', 'JavaScript'],
    },
    {
        title: 'Tools & Platforms',
        icon: Wrench,
        skills: ['Git', 'Linux', 'AWS', 'GCP', 'MATLAB'],
    },
]

export default function Skills() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} id="skills" className="section-padding relative">
            <div className="container-content">
                <SectionHeader
                    label="My Skills"
                    heading="Key Competencies"
                    align="center"
                />

                <motion.div
                    className="grid sm:grid-cols-2 gap-6"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {skillCategories.map((category) => {
                        const Icon = category.icon
                        return (
                            <motion.div
                                key={category.title}
                                className="premium-card group"
                                variants={{
                                    hidden: { opacity: 0, y: 24 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                    },
                                }}
                            >
                                {/* Icon & Title */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-400">
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span key={skill} className="tech-pill">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
