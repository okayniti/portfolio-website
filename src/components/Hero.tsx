'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import FloatingShapes from './FloatingShapes'

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-between relative pt-32 pb-12 overflow-hidden bg-transparent">
            <FloatingShapes variant="hero" />

            {/* Radiant Ambient Orange Glow behind the Portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/15 blur-[100px] pointer-events-none z-0" />

            {/* Main Center Composition: Giant Name overlapped by Portrait */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6 z-10">
                
                {/* Overlaid Portrait Image with Orange Ring Border */}
                <motion.div
                    className="relative z-10 w-60 sm:w-72 md:w-80 lg:w-[320px] aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-card"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="/avatar-sketch.png"
                        alt="Niti Kanoongo Portrait"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />

                    {/* Gradient overlay for premium depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Background Giant Text - Low opacity white watermark */}
                <div 
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20"
                >
                    <motion.h1
                        className="text-[15vw] md:text-[13vw] font-display font-bold leading-[0.8] text-accent/20 tracking-wider text-center uppercase"
                        style={{ fontFamily: 'var(--font-general-sans)' }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        NITI
                        <br />
                        KANOONGO
                    </motion.h1>
                </div>

                {/* Left Floating Badge: Greeting */}
                <motion.div 
                    className="absolute top-1/4 left-[8%] md:left-[12%] hidden sm:block z-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <p className="text-body-sm text-foreground-muted font-medium tracking-wide">
                        Hi, I am
                    </p>
                    <p className="text-sm font-display text-accent font-semibold uppercase tracking-wider">
                        ✦ AI/ML Developer
                    </p>
                </motion.div>

                {/* Right Floating Badge: Location */}
                <motion.div 
                    className="absolute bottom-1/4 right-[8%] md:right-[12%] hidden sm:block z-20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="text-body-sm text-foreground-muted font-medium tracking-wide text-right">
                        Based in
                    </p>
                    <p className="text-sm font-display text-accent font-semibold uppercase tracking-wider text-right">
                        Pune, India 📍
                    </p>
                </motion.div>
            </div>

            {/* Bottom Content Grid */}
            <div className="w-full relative z-20 mt-auto border-t border-white/5 pt-8">
                <div className="container-content grid md:grid-cols-3 gap-8 items-end">
                    
                    {/* Column 1: Short Tagline / Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                            Overview
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                            AI/ML &amp; Systems Engineer
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
                            AI/ML Intern @ CovisionAI. Engineering high-throughput video pipelines, RAG systems, and robust full-stack interfaces.
                        </p>
                    </motion.div>

                    {/* Column 2: Scroll Cue (Centered) */}
                    <motion.div 
                        className="flex flex-col items-center justify-center py-4 md:py-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <p className="text-[10px] text-foreground-muted mb-2 tracking-widest uppercase">
                            Scroll to explore
                        </p>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowDown size={14} className="text-accent" />
                        </motion.div>
                    </motion.div>

                    {/* Column 3: CTAs & Quick Stats (Right Aligned) */}
                    <motion.div
                        className="flex flex-col items-start md:items-end gap-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-wrap gap-3 justify-start md:justify-end">
                            <span className="px-3 py-1 text-xs bg-card text-foreground-muted rounded-full border border-white/5 whitespace-nowrap shadow-sm">
                                AWS Certified Solutions Architect
                            </span>
                            <span className="px-3 py-1 text-xs bg-card text-foreground-muted rounded-full border border-white/5 whitespace-nowrap shadow-sm">
                                900+ CP Solved
                            </span>
                            <span className="px-3 py-1 text-xs bg-card text-foreground-muted rounded-full border border-white/5 whitespace-nowrap shadow-sm">
                                30+ MUNs
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <MagneticButton href="#work" variant="primary">
                                <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                    View Work <ArrowUpRight size={14} strokeWidth={2.5} />
                                </span>
                            </MagneticButton>
                            <MagneticButton href="#contact" variant="secondary">
                                <span className="py-0.5 text-xs font-semibold">Contact</span>
                            </MagneticButton>
                        </div>
                    </motion.div>

                </div>
            </div>

        </section>
    )
}
