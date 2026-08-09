'use client'

import { useTransform, motion, MotionValue } from 'framer-motion'
import { Brain, Code2, Wrench, Globe } from 'lucide-react'
import {
    SiPytorch,
    SiTensorflow,
    SiScikitlearn,
    SiOpencv,
    SiGooglegemini,
    SiNextdotjs,
    SiReact,
    SiFastapi,
    SiNodedotjs,
    SiSocketdotio,
    SiDocker,
    SiGooglecloud,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiPython,
    SiCplusplus,
    SiJavascript,
    SiGnubash,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { ContainerScroll } from './ui/container-scroll-animation'
import { OrbitLogos, type OrbitItem } from './ui/orbit-logos'

const skillCategories = [
    {
        title: 'AI & Machine Learning Systems',
        icon: Brain,
        skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'SHAP', 'LSTM', 'CNN', 'RAG', 'Gemini API', 'Prompt Engineering', 'OpenCV'],
        orbit: [
            { icon: <SiPytorch color="#EE4C2C" />, label: 'PyTorch' },
            { icon: <SiTensorflow color="#FF6F00" />, label: 'TensorFlow' },
            { icon: <SiScikitlearn color="#F7931E" />, label: 'Scikit-learn' },
            { icon: <SiOpencv color="#5C3EE8" />, label: 'OpenCV' },
            { icon: <SiGooglegemini color="#8E75B2" />, label: 'Gemini API' },
        ] satisfies OrbitItem[],
    },
    {
        title: 'Full-Stack & Real-Time Web',
        icon: Globe,
        skills: ['Next.js', 'React', 'FastAPI', 'Node.js', 'Express.js', 'Socket.io', 'REST APIs', 'WebSockets'],
        orbit: [
            { icon: <SiNextdotjs color="#FFFFFF" />, label: 'Next.js' },
            { icon: <SiReact color="#61DAFB" />, label: 'React' },
            { icon: <SiFastapi color="#009688" />, label: 'FastAPI' },
            { icon: <SiNodedotjs color="#339933" />, label: 'Node.js' },
            { icon: <SiSocketdotio color="#FFFFFF" />, label: 'Socket.io' },
        ] satisfies OrbitItem[],
    },
    {
        title: 'Infrastructure & Systems',
        icon: Wrench,
        skills: ['Docker', 'Git', 'Linux', 'GCP', 'AWS', 'Azure', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Distributed Systems', 'Async Concurrency', 'System Design'],
        orbit: [
            { icon: <SiDocker color="#2496ED" />, label: 'Docker' },
            { icon: <FaAws color="#FF9900" />, label: 'AWS' },
            { icon: <SiGooglecloud color="#4285F4" />, label: 'GCP' },
            { icon: <SiPostgresql color="#4169E1" />, label: 'PostgreSQL' },
            { icon: <SiMongodb color="#47A248" />, label: 'MongoDB' },
            { icon: <SiRedis color="#DC382D" />, label: 'Redis' },
        ] satisfies OrbitItem[],
    },
    {
        title: 'Programming Languages',
        icon: Code2,
        skills: ['Python', 'C++', 'JavaScript', 'SQL', 'Bash'],
        orbit: [
            { icon: <SiPython color="#3776AB" />, label: 'Python' },
            { icon: <SiCplusplus color="#00599C" />, label: 'C++' },
            { icon: <SiJavascript color="#F7DF1E" />, label: 'JavaScript' },
            { icon: <SiGnubash color="#4EAA25" />, label: 'Bash' },
        ] satisfies OrbitItem[],
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
            className="absolute inset-0 flex flex-col justify-start overflow-hidden p-6 md:p-10"
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

            <OrbitLogos
                centerIcon={<Icon size={20} strokeWidth={1.5} />}
                items={category.orbit}
                maxSize={320}
                className="mt-4 md:mt-6"
            />
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
