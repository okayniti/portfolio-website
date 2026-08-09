'use client'

import { GradientWave } from './ui/gradient-wave'

// All-black wave palette — subtle shade variation only, no color.
const BLACK_PALETTE = [
    '#000000',
    '#0a0a0a',
    '#151515',
    '#202020',
]

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-background">
            <GradientWave
                colors={BLACK_PALETTE}
                noiseSpeed={0.000008}
            />
        </div>
    )
}
