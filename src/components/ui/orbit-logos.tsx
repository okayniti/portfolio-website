'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export interface OrbitItem {
    icon: ReactNode
    label: string
}

interface OrbitLogosProps {
    centerIcon: ReactNode
    items: OrbitItem[]
    size?: number
    duration?: number
    className?: string
}

export function OrbitLogos({
    centerIcon,
    items,
    size = 200,
    duration = 24,
    className = '',
}: OrbitLogosProps) {
    const radius = size / 2
    const nodeSize = 36

    return (
        <div
            className={`relative mx-auto shrink-0 ${className}`}
            style={{ width: size, height: size }}
        >
            {/* orbit ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-border-strong/50" />

            {/* rotating group of logo nodes */}
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
                {items.map((item, i) => {
                    const angle = (360 / items.length) * i - 90
                    const rad = (angle * Math.PI) / 180
                    const x = radius + radius * Math.cos(rad) - nodeSize / 2
                    const y = radius + radius * Math.sin(rad) - nodeSize / 2

                    return (
                        <motion.div
                            key={item.label}
                            className="group absolute flex items-center justify-center rounded-full bg-card border border-border text-foreground-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                            style={{ width: nodeSize, height: nodeSize, left: x, top: y }}
                            animate={{ rotate: -360 }}
                            transition={{ duration, repeat: Infinity, ease: 'linear' }}
                        >
                            <span className="text-base" aria-hidden="true">
                                {item.icon}
                            </span>
                            <span className="sr-only">{item.label}</span>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* center hub */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-accent/40 flex items-center justify-center text-accent shadow-lg">
                    {centerIcon}
                </div>
            </div>
        </div>
    )
}
