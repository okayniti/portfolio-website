'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeaderProps {
    label: string
    heading: React.ReactNode
    description?: string
    align?: 'left' | 'center'
    className?: string
}

export default function SectionHeader({
    label,
    heading,
    description,
    align = 'left',
    className = '',
}: SectionHeaderProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <div
            ref={ref}
            className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : ''} ${className}`}
        >
            <motion.p
                className="section-label"
                style={align === 'center' ? { justifyContent: 'center' } : {}}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {label}
            </motion.p>

            <motion.h2
                className="text-display font-display text-balance"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                {heading}
            </motion.h2>

            {description && (
                <motion.p
                    className={`text-body text-foreground-muted mt-4 ${align === 'center' ? 'max-w-prose mx-auto' : 'max-w-prose'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}
