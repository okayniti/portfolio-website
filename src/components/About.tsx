'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, ArrowUpRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import MagneticButton from './MagneticButton'

const stats = [
    { number: '900+', label: 'Problems Solved' },
    { number: '30+', label: 'Model UN Conferences' },
    { number: 'AWS', label: 'Certified Solutions Architect' },
    { number: 'Selected', label: 'Amazon ML Summer School' },
]

export default function About() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const stagger = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 },
        },
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    }

    return (
        <section ref={ref} id="about" className="section-padding relative">
            <div className="container-content">
                <SectionHeader
                    label="About Me"
                    heading={
                        <>
                            I blend{' '}
                            <span className="font-script text-accent text-[1.15em] font-normal -rotate-2 inline-block">
                                AI &amp; Machine Learning
                            </span>{' '}
                            with{' '}
                            <span className="font-script text-accent text-[1.15em] font-normal rotate-1 inline-block">
                                Full-Stack Development
                            </span>{' '}
                            to build systems that actually work
                        </>
                    }
                />

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left - Portrait */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="image-frame aspect-[4/5] overflow-hidden sticky top-32">
                            <img
                                src="/avatar.png"
                                alt="Niti Kanoongo"
                                className="w-full h-full object-cover object-center"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        className="space-y-10"
                        variants={stagger}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        {/* Bio paragraphs */}
                        <motion.div className="space-y-5" variants={fadeUp}>
                            <p className="text-body leading-relaxed text-foreground-muted">
                                I&apos;m a <strong className="text-foreground font-medium">B.Tech Computer Science</strong> student at VIT Bhopal,
                                specializing in <strong className="text-foreground font-medium">AI &amp; Machine Learning</strong> (CGPA: 8.66). I love working end-to-end—from
                                problem definition and system architecture to high-performance implementation and ML workflow optimization.
                            </p>
                            <p className="text-body leading-relaxed text-foreground-muted">
                                Recently, as an AI/ML Intern at <strong className="text-foreground font-medium">CovisionAI</strong>, I built benchmarking frameworks in Python evaluating frontier video generation models (Seedance, Kling, Runway) to directly inform production selection, and engineered high-throughput automated test harnesses that cut manual evaluation overhead by 40%.
                            </p>
                            <p className="text-body leading-relaxed text-foreground-muted">
                                I specialize in building distributed real-time systems (such as Socket.io telemetry dashboards handling Mahakumbh-scale events) and modular ML pipelines. I combine mathematical depth with robust full-stack engineering.
                            </p>
                        </motion.div>

                        {/* Stats grid */}
                        <motion.div
                            className="grid grid-cols-2 gap-6"
                            variants={fadeUp}
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="premium-card !p-6">
                                    <p className="text-heading font-display font-bold text-foreground mb-1">
                                        {stat.number}
                                    </p>
                                    <p className="text-caption text-foreground-muted">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Beyond Code */}
                        <motion.div variants={fadeUp}>
                            <h3 className="text-lg font-semibold mb-3 text-foreground">Beyond Code</h3>
                            <p className="text-body text-foreground-muted leading-relaxed">
                                I&apos;ve chaired <strong className="text-foreground font-medium">30+ Model UN conferences</strong>, led teams as
                                <strong className="text-foreground font-medium"> Secretary General of Cisco Community VITB</strong>, and love combining
                                technical depth with clear communication.
                            </p>
                        </motion.div>

                        {/* Education */}
                        <motion.div variants={fadeUp} className="premium-card !p-6">
                            <p className="text-label uppercase tracking-widest text-foreground-muted mb-2">Education</p>
                            <p className="font-semibold text-foreground">VIT Bhopal University</p>
                            <p className="text-body-sm text-foreground-muted">B.Tech Computer Science — AI &amp; ML Specialization</p>
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div className="flex flex-wrap gap-4" variants={fadeUp}>
                            <MagneticButton href="#contact" variant="primary">
                                <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                    Let&apos;s Connect <ArrowUpRight size={14} strokeWidth={2.5} />
                                </span>
                            </MagneticButton>
                            <MagneticButton href="#" variant="secondary">
                                <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                    <Download size={14} /> Download Resume
                                </span>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
