'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

export interface OrbitItem {
    icon: ReactNode
    label: string
}

interface OrbitLogosProps {
    centerIcon: ReactNode
    items: OrbitItem[]
    /** Max diameter of the arc — shrinks to fit narrower containers (mobile). */
    maxSize?: number
    className?: string
}

export function OrbitLogos({
    centerIcon,
    items,
    maxSize = 320,
    className = '',
}: OrbitLogosProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState(maxSize)

    useEffect(() => {
        const measure = () => {
            const available = wrapperRef.current?.parentElement?.clientWidth ?? maxSize
            setSize(Math.min(maxSize, available))
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [maxSize])

    const radius = size / 2
    const nodeSize = Math.max(36, Math.min(52, size / 6))
    const hubSize = nodeSize + 8
    const height = radius + nodeSize / 2 + 12

    return (
        <div
            ref={wrapperRef}
            className={`relative mx-auto shrink-0 ${className}`}
            style={{ width: size, height }}
        >
            {/* semicircle arc line */}
            <div
                className="absolute top-0 left-0 border border-dashed border-border-strong/50 border-b-0"
                style={{
                    width: size,
                    height: radius,
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                }}
            />

            {/* logo nodes arranged along the top arc */}
            {items.map((item, i) => {
                const angle =
                    items.length === 1 ? 90 : 180 - (180 / (items.length - 1)) * i
                const rad = (angle * Math.PI) / 180
                const x = radius + radius * Math.cos(rad) - nodeSize / 2
                const y = radius * (1 - Math.sin(rad)) - nodeSize / 2

                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="group absolute flex items-center justify-center rounded-full bg-card border border-border transition-colors duration-300 hover:border-accent/50 hover:-translate-y-0.5"
                        style={{ width: nodeSize, height: nodeSize, left: x, top: y }}
                    >
                        <span className="text-2xl leading-none" aria-hidden="true">
                            {item.icon}
                        </span>
                        <span className="sr-only">{item.label}</span>
                    </motion.div>
                )
            })}

            {/* center hub, sitting on the arc's baseline */}
            <div
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                    width: hubSize,
                    height: hubSize,
                    left: radius - hubSize / 2,
                    top: radius - hubSize / 2,
                }}
            >
                <div className="w-full h-full rounded-full bg-background border-2 border-accent/40 flex items-center justify-center text-accent shadow-lg">
                    {centerIcon}
                </div>
            </div>
        </div>
    )
}
