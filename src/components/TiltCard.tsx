'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface TiltCardProps {
    children: ReactNode
    className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    // Motion values representing cursor position offset relative to center (-0.5 to 0.5)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Physics configuration for super smooth spring back
    const springConfig = { damping: 22, stiffness: 200, mass: 0.6 }
    
    // Map coords to rotation degrees (-10deg to 10deg)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const relativeX = (e.clientX - rect.left) / width - 0.5
        const relativeY = (e.clientY - rect.top) / height - 0.5

        x.set(relativeX)
        y.set(relativeY)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <div style={{ perspective: 1000 }}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className={`w-full h-full transition-shadow duration-300 ${className}`}
            >
                {children}
            </motion.div>
        </div>
    )
}
