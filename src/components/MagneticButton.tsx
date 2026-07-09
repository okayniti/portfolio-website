'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    ariaLabel?: string
}

export default function MagneticButton({
    children,
    className = '',
    href,
    onClick,
    variant = 'primary',
    ariaLabel,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.15
        const deltaY = (e.clientY - centerY) * 0.15
        setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

    const content = (
        <motion.div
            ref={ref}
            className="inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
        >
            {href ? (
                <a
                    href={href}
                    className={`${baseClass} ${className}`}
                    aria-label={ariaLabel}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                    {children}
                </a>
            ) : (
                <button
                    onClick={onClick}
                    className={`${baseClass} ${className}`}
                    aria-label={ariaLabel}
                >
                    {children}
                </button>
            )}
        </motion.div>
    )

    return content
}
