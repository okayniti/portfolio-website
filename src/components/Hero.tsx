'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import FloatingShapes from './FloatingShapes'

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-between relative pt-32 pb-12 overflow-hidden bg-background">
            <FloatingShapes variant="hero" />

            {/* Main Center Composition: Giant Name overlapped by Portrait */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6">
                
                {/* Background Giant Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                    <motion.h1
                        className="text-[22vw] md:text-[20vw] font-display font-bold leading-[0.8] text-white tracking-tighter text-center uppercase"
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

                {/* Overlaid Portrait Image */}
                <motion.div
                    className="relative z-10 w-60 sm:w-72 md:w-80 lg:w-[340px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl bg-white"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="/avatar.png"
                        alt="Niti Kanoongo Portrait"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />

                    {/* Faint overlay on portrait for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </motion.div>

                {/* Left Floating Badge: Hi, I am */}
                <motion.div 
                    className="absolute top-1/4 left-[8%] md:left-[12%] hidden sm:block z-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <p className="text-body-sm text-foreground-muted font-medium tracking-wide">
                        Hi, I am
                    </p>
                    <p className="text-sm font-display text-foreground font-semibold uppercase tracking-wider">
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
                    <p className="text-sm font-display text-foreground font-semibold uppercase tracking-wider text-right">
                        Pune, India 📍
                    </p>
                </motion.div>
            </div>

            {/* Bottom Content Grid */}
            <div className="w-full relative z-20 mt-auto border-t border-black/[0.04] pt-8">
                <div className="container-content grid md:grid-cols-3 gap-8 items-end">
                    
                    {/* Column 1: Short Tagline / Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-xs uppercase tracking-widest text-foreground-muted font-semibold mb-2">
                            Overview
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                            AI/ML &amp; Full-Stack Systems
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
                            B.Tech CSE @ VIT Bhopal. Building production systems across healthcare, fintech, and cybersecurity.
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
                            <ArrowDown size={14} className="text-foreground-muted" />
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
                            <span className="px-3 py-1 text-xs bg-white text-foreground-muted rounded-full border border-black/5 whitespace-nowrap shadow-sm">
                                900+ problems solved
                            </span>
                            <span className="px-3 py-1 text-xs bg-white text-foreground-muted rounded-full border border-black/5 whitespace-nowrap shadow-sm">
                                30+ MUNs
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <MagneticButton href="#work" variant="primary">
                                <span className="flex items-center gap-1.5 py-0.5 text-xs">
                                    View Work <ArrowUpRight size={14} strokeWidth={2.5} />
                                </span>
                            </MagneticButton>
                            <MagneticButton href="#contact" variant="secondary">
                                <span className="py-0.5 text-xs">Contact</span>
                            </MagneticButton>
                        </div>
                    </motion.div>

                </div>
            </div>

        </section>
    )
}
