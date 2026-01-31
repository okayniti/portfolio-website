'use client'

import { useState, useEffect } from 'react'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only show on desktop
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) return

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        // Track mouse position
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart)
            el.addEventListener('mouseleave', handleHoverEnd)
        })

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart)
                el.removeEventListener('mouseleave', handleHoverEnd)
            })
        }
    }, [])

    // Hide on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            {/* Main cursor dot */}
            <div
                className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
                    } ${isHovering ? 'scale-150' : 'scale-100'}`}
                style={{
                    left: position.x - 6,
                    top: position.y - 6,
                }}
            >
                <div className={`w-3 h-3 rounded-full ${isHovering ? 'bg-accent' : 'bg-navy'} transition-colors duration-200`} />
            </div>

            {/* Cursor ring */}
            <div
                className={`fixed pointer-events-none z-[9998] transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
                    } ${isHovering ? 'scale-150 opacity-50' : 'scale-100'}`}
                style={{
                    left: position.x - 20,
                    top: position.y - 20,
                }}
            >
                <div className={`w-10 h-10 rounded-full border-2 ${isHovering ? 'border-accent' : 'border-navy/30'} transition-colors duration-200`} />
            </div>

            {/* Hide default cursor */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
                @media (max-width: 768px), (hover: none) {
                    * {
                        cursor: auto !important;
                    }
                }
            `}</style>
        </>
    )
}
