'use client'

import { GradientWave } from './ui/gradient-wave'

// Black-to-pastel-orange palette matching the site's Behance dark theme —
// first entry is the dominant wash (u_baseColor) and stays near-black so it
// reads as a dark background with muted orange accents, not a solid orange
// field. Fewer, darker layers keep the base showing through more.
const PASTEL_PALETTE = [
    '#140700',
    '#3a1608',
    '#8a3c16',
    '#ED7A36',
]

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-background">
            <GradientWave
                colors={PASTEL_PALETTE}
                noiseSpeed={0.000008}
            />
        </div>
    )
}
