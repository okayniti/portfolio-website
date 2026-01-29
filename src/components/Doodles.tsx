'use client'

// Animated hand-drawn wave decoration
export function DoodleWave({ className = '' }: { className?: string }) {
    return (
        <svg
            width="80"
            height="30"
            viewBox="0 0 80 30"
            fill="none"
            className={`text-foreground-muted ${className}`}
        >
            <path
                d="M5 15 Q 15 5, 25 15 T 45 15 T 65 15 T 75 15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="animate-draw"
                style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
            />
        </svg>
    )
}

// Animated arrow pointing down
export function DoodleArrowDown({ className = '' }: { className?: string }) {
    return (
        <svg
            width="30"
            height="50"
            viewBox="0 0 30 50"
            fill="none"
            className={`text-foreground-muted ${className}`}
        >
            <path
                d="M15 5 C 15 5, 14 20, 15 35 M8 28 Q 15 40, 22 28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// Animated curly arrow pointing right
export function DoodleArrowRight({ className = '' }: { className?: string }) {
    return (
        <svg
            width="60"
            height="30"
            viewBox="0 0 60 30"
            fill="none"
            className={`text-foreground-muted ${className}`}
        >
            <path
                d="M5 15 Q 20 5, 35 15 T 50 15 M45 8 L 55 15 L 45 22"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// Sparkle/star decoration
export function DoodleSparkle({ className = '' }: { className?: string }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`text-accent ${className}`}
        >
            <path
                d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12 M5 5 L8 8 M16 16 L19 19 M19 5 L16 8 M8 16 L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

// Cute doodle character/avatar (simple illustrated face)
export function DoodleAvatar({ className = '' }: { className?: string }) {
    return (
        <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            className={className}
        >
            {/* Hair spikes on top */}
            <path
                d="M40 35 Q 45 20, 50 30 M55 28 Q 60 15, 65 28 M70 30 Q 75 18, 80 35"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Head outline */}
            <ellipse
                cx="60"
                cy="70"
                rx="35"
                ry="40"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                fill="#FFFBF5"
            />

            {/* Left eye */}
            <circle cx="48" cy="65" r="4" fill="#1A1A1A" />
            <circle cx="49" cy="64" r="1.5" fill="white" />

            {/* Right eye */}
            <circle cx="72" cy="65" r="4" fill="#1A1A1A" />
            <circle cx="73" cy="64" r="1.5" fill="white" />

            {/* Eyebrows */}
            <path d="M42 56 Q 48 53, 54 56" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M66 56 Q 72 53, 78 56" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Smile */}
            <path
                d="M50 82 Q 60 92, 70 82"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Blush marks */}
            <ellipse cx="38" cy="75" rx="5" ry="3" fill="#FFB5B5" opacity="0.6" />
            <ellipse cx="82" cy="75" rx="5" ry="3" fill="#FFB5B5" opacity="0.6" />

            {/* Light bulb above head - idea moment */}
            <g className="animate-pulse">
                <circle cx="60" cy="15" r="8" stroke="#296374" strokeWidth="2" fill="#FFE4B5" />
                <path d="M57 20 L57 25 M60 20 L60 25 M63 20 L63 25" stroke="#296374" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M56 10 L58 12 M64 10 L62 12 M60 6 L60 9" stroke="#296374" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    )
}

// Smaller inline character (just face)
export function DoodleFace({ className = '' }: { className?: string }) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className={className}
        >
            {/* Head */}
            <circle cx="20" cy="20" r="16" stroke="#1A1A1A" strokeWidth="2" fill="#FFFBF5" />

            {/* Eyes */}
            <circle cx="14" cy="18" r="2" fill="#1A1A1A" />
            <circle cx="26" cy="18" r="2" fill="#1A1A1A" />

            {/* Smile */}
            <path d="M14 26 Q 20 32, 26 26" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    )
}

// Underline decoration with hand-drawn style
export function DoodleUnderline({ className = '' }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="12"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            fill="none"
            className={className}
        >
            <path
                d="M5 8 Q 50 3, 100 7 T 195 6"
                stroke="#296374"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
            />
        </svg>
    )
}

// Thought bubble
export function DoodleThoughtBubble({ className = '', children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={`relative ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 80"
                fill="none"
                className="absolute inset-0"
                preserveAspectRatio="none"
            >
                <path
                    d="M20 40 Q 20 10, 100 10 T 180 40 Q 180 70, 100 70 T 20 40"
                    stroke="#E8E0D8"
                    strokeWidth="2"
                    fill="white"
                />
                {/* Bubble dots */}
                <circle cx="30" cy="75" r="6" fill="white" stroke="#E8E0D8" strokeWidth="2" />
                <circle cx="18" cy="85" r="4" fill="white" stroke="#E8E0D8" strokeWidth="2" />
            </svg>
            <div className="relative z-10 p-4 text-sm italic text-foreground-muted">
                {children}
            </div>
        </div>
    )
}

// Animated waving hand
export function DoodleWavingHand({ className = '' }: { className?: string }) {
    return (
        <span className={`inline-block animate-wave origin-bottom-right ${className}`}>
            👋
        </span>
    )
}

// Curved path decoration
export function DoodlePath({ className = '' }: { className?: string }) {
    return (
        <svg
            width="300"
            height="100"
            viewBox="0 0 300 100"
            fill="none"
            className={`text-foreground ${className}`}
        >
            <path
                d="M10 80 Q 80 80, 100 50 T 200 30 Q 250 20, 290 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="5,5"
            />
            {/* Dots along path */}
            <circle cx="100" cy="50" r="6" fill="currentColor" />
            <circle cx="200" cy="30" r="6" fill="currentColor" />
            <circle cx="290" cy="40" r="6" fill="currentColor" />
        </svg>
    )
}
