'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LetterSwapForward } from './ui/letter-swap'

const CASCADE_STEP_MS = 200
const NAME_COUNT = 5
const DISMISS_DELAY_MS = 2900

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const timer = setTimeout(() => {
            setVisible(false)
            document.body.style.overflow = ''
        }, DISMISS_DELAY_MS)
        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-6 px-6"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-label uppercase tracking-[0.3em] text-accent/70 font-mono"
                    >
                        Portfolio
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center gap-1 md:gap-2 overflow-hidden max-w-full"
                    >
                        {Array.from({ length: NAME_COUNT }).map((_, i) => (
                            <span
                                key={i}
                                className="text-[clamp(1.4rem,5vw,3rem)] font-display font-bold text-accent tracking-wide whitespace-nowrap leading-tight"
                            >
                                <LetterSwapForward
                                    label="NITI KANOONGO"
                                    staggerFrom="center"
                                    reverse={false}
                                    auto
                                    autoDelay={i * CASCADE_STEP_MS}
                                />
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
