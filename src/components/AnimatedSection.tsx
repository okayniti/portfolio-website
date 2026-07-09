'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    delay?: number
    id?: string
}

export default function AnimatedSection({ children, className = '', delay = 0, id }: AnimatedSectionProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            ref={ref}
            id={id}
            className={className}
        >
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                    duration: 0.7,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </section>
    )
}

// Stagger container + child for list animations
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.08,
}: {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}
