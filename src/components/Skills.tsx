'use client'

import { useTransform, motion, MotionValue } from 'framer-motion'
import { Brain, Code2, Wrench, Globe } from 'lucide-react'
import { ContainerScroll } from './ui/container-scroll-animation'

const skillCategories = [
    {
        title: 'AI & Machine Learning Systems',
        icon: Brain,
        skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'SHAP', 'LSTM', 'CNN', 'RAG', 'Gemini API', 'Prompt Engineering', 'OpenCV'],
    },
    {
        title: 'Full-Stack & Real-Time Web',
        icon: Globe,
        skills: ['Next.js', 'React', 'FastAPI', 'Node.js', 'Express.js', 'Socket.io', 'REST APIs', 'WebSockets'],
    },
    {
        title: 'Infrastructure & Systems',
        icon: Wrench,
        skills: ['Docker', 'Git', 'Linux', 'GCP', 'AWS', 'Azure', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Distributed Systems', 'Async Concurrency', 'System Design'],
    },
    {
        title: 'Programming Languages',
        icon: Code2,
        skills: ['Python', 'C++', 'JavaScript', 'SQL', 'Bash'],
    },
]

const SEGMENT = 1 / skillCategories.length

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative">
            <div className="container-content">
                <ContainerScroll
                    titleComponent={
                        <>
                            <p className="section-label justify-center" style={{ justifyContent: 'center' }}>
                                My Skills
                            </p>
                            <h2 className="text-display font-display text-balance">
                                Key Competencies
                            </h2>
                        </>
                    }
                    sticky
                >
                    {(progress) => (
                        <div className="relative h-full w-full flex flex-col">
                            <div className="relative flex-1">
                                {skillCategories.map((category, index) => (
                                    <SkillPanel
                                        key={category.title}
                                        category={category}
                                        index={index}
                                        total={skillCategories.length}
                                        progress={progress}
                                    />
                                ))}
                            </div>
                            <ProgressDots total={skillCategories.length} progress={progress} />
                        </div>
                    )}
                </ContainerScroll>
            </div>
        </section>
    )
}

interface SkillPanelProps {
    category: (typeof skillCategories)[number]
    index: number
    total: number
    progress: MotionValue<number>
}

function SkillPanel({ category, index, total, progress }: SkillPanelProps) {
    const start = index * SEGMENT
    const end = start + SEGMENT
    const fadeMargin = SEGMENT * 0.25
    const isFirst = index === 0
    const isLast = index === total - 1

    const opacity = useTransform(
        progress,
        [start - fadeMargin, start, end - fadeMargin, end],
        [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
    )
    const y = useTransform(
        progress,
        [start - fadeMargin, start, end - fadeMargin, end],
        [isFirst ? 0 : 16, 0, 0, isLast ? 0 : -16]
    )

    const Icon = category.icon

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col justify-center p-6 md:p-10"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center border border-border shrink-0">
                    <Icon size={22} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {category.title}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                    <span key={skill} className="tech-pill">
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}

function ProgressDots({ total, progress }: { total: number; progress: MotionValue<number> }) {
    return (
        <div className="flex items-center justify-center gap-2 pb-6 md:pb-8">
            {Array.from({ length: total }).map((_, index) => (
                <Dot key={index} index={index} total={total} progress={progress} />
            ))}
        </div>
    )
}

function Dot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
    const segment = 1 / total
    const start = index * segment
    const end = start + segment
    const fadeMargin = segment * 0.25
    const isFirst = index === 0
    const isLast = index === total - 1

    const scale = useTransform(
        progress,
        [start - fadeMargin, start, end - fadeMargin, end],
        [isFirst ? 1 : 0.6, 1, 1, isLast ? 1 : 0.6]
    )
    const opacity = useTransform(
        progress,
        [start - fadeMargin, start, end - fadeMargin, end],
        [isFirst ? 1 : 0.3, 1, 1, isLast ? 1 : 0.3]
    )

    return (
        <motion.span
            style={{ scale, opacity }}
            className="w-2 h-2 rounded-full bg-accent"
        />
    )
}
