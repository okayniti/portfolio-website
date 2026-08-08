'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LetterSwapPingPong } from './ui/letter-swap'

const READY_DELAY_MS = 2200

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const timer = setTimeout(() => setReady(true), READY_DELAY_MS)
        return () => clearTimeout(timer)
    }, [])

    const handleLaunch = () => {
        setVisible(false)
        document.body.style.overflow = ''
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-10 px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-3"
                    >
                        <p className="text-label uppercase tracking-[0.3em] text-accent/70 font-mono">
                            Portfolio
                        </p>
                        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-bold text-accent tracking-wide leading-none text-center">
                            NITI KANOONGO
                        </h1>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {!ready ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-1.5"
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-2 h-2 rounded-full bg-accent"
                                        animate={{ opacity: [0.25, 1, 0.25] }}
                                        transition={{
                                            duration: 1.1,
                                            repeat: Infinity,
                                            delay: i * 0.18,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.button
                                key="launch"
                                onClick={handleLaunch}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="px-8 py-3.5 rounded-full border border-accent/40 text-accent font-semibold text-sm tracking-widest uppercase hover:bg-accent hover:text-black transition-colors duration-400"
                            >
                                <LetterSwapPingPong label="Launch" staggerFrom="center" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
