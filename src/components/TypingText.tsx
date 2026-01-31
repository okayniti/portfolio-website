'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
    text: string
    speed?: number
    delay?: number
    className?: string
}

export default function TypingText({ text, speed = 50, delay = 500, className = '' }: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        // Initial delay before typing starts
        const startTimeout = setTimeout(() => {
            setIsTyping(true)
        }, delay)

        return () => clearTimeout(startTimeout)
    }, [delay])

    useEffect(() => {
        if (!isTyping) return

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1))
            }, speed)
            return () => clearTimeout(timeout)
        }
    }, [displayedText, isTyping, text, speed])

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className={className}>
            {displayedText}
            <span
                className={`inline-block w-[3px] h-[1em] ml-1 bg-accent align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </span>
    )
}
