'use client'

import { motion } from 'framer-motion'

interface FloatingShapesProps {
    variant?: 'hero' | 'section'
    className?: string
}

export default function FloatingShapes({ variant = 'section', className = '' }: FloatingShapesProps) {
    if (variant === 'hero') {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Large soft circle - top right */}
                <motion.div
                    className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-foreground/[0.02]"
                    animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Small dot cluster - left */}
                <motion.div
                    className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-foreground/10"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/3 left-20 mt-4 w-1.5 h-1.5 rounded-full bg-foreground/[0.06]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Ring - bottom left */}
                <motion.div
                    className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full border border-foreground/[0.05]"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Dot - bottom right */}
                <motion.div
                    className="absolute bottom-40 right-1/3 w-3 h-3 rounded-full bg-foreground/[0.04]"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* Medium circle - mid right */}
                <motion.div
                    className="absolute top-1/2 right-16 w-24 h-24 rounded-full border border-foreground/[0.03]"
                    animate={{
                        y: [0, -8, 0],
                        x: [0, 4, 0],
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
        )
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <motion.div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-foreground/[0.015]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-2 h-2 rounded-full bg-foreground/[0.06]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
        </div>
    )
}
