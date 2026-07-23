'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import rough from 'roughjs/bin/rough'
import type { Options, PathInfo } from 'roughjs/bin/core'

interface Highlight {
    role: string
    event: string
    when: string
}

interface Stop {
    id: string
    tag: string
    tagRotate: number
    x: number
    y: number
    tagY: number
    role: string
    company: string
    period: string
    description: string
    highlights?: Highlight[]
}

const stops: Stop[] = [
    {
        id: 'mun',
        tag: 'led',
        tagRotate: -6,
        x: 150,
        y: 300,
        tagY: 388,
        role: 'Executive Board Member — Chairperson / Vice Chair',
        company: 'Model United Nations circuit',
        period: '2021 – 2025',
        description:
            'Chaired and vice-chaired 30+ MUN conferences nationally and internationally, moderating committees from UNHRC to UNSC and UNGA, building relationships across MUN teams along the way.',
        highlights: [
            { role: 'Chairperson', event: 'IIT Bombay E-Summit MUN', when: 'Dec 2025' },
            { role: 'Chairperson, UNGA ILC', event: 'DPS Gold MUN 2.0', when: 'Oct 2024' },
            { role: 'Chairperson, UNHRC', event: 'VITBMUN 2024', when: 'May 2024' },
            { role: 'Vice Chairperson, ECOSOC', event: 'HLCCMUN 2023', when: 'Aug 2023' },
            { role: 'Chairperson, UNEP', event: 'Metanoia International', when: 'Jun 2023' },
            { role: 'Chairperson, UNSC', event: 'Melange MUN 2023, Christ University', when: 'Apr 2023' },
            { role: 'President, UNGA', event: 'India IMUN', when: 'Apr 2023' },
            { role: 'Head Chair, UNICEF', event: 'Diplomatic Youth International MUN', when: 'Jan 2023' },
        ],
    },
    {
        id: 'hcltechbee',
        tag: 'started coding',
        tagRotate: 5,
        x: 553,
        y: 130,
        tagY: 44,
        role: 'Selected Candidate, HCL TechBee',
        company: 'HCLTech',
        period: 'Dec 2022 – Jan 2023',
        description:
            "Selected for HCLTech's exclusive post-Class XII tech career program — a structured track pairing 12 months of training with a path to full-time placement, alongside the option to pursue a degree from BITS Pilani.",
    },
    {
        id: 'aspirant',
        tag: 'shipped it',
        tagRotate: -5,
        x: 967,
        y: 300,
        tagY: 388,
        role: 'Website Developer & Reporting Manager',
        company: 'Aspirant India Initiative — Remote',
        period: 'Mar 2025 – Jul 2025',
        description:
            'Architected and deployed a production web platform serving 40,000+ students across 500+ institutions. Owned the full system lifecycle from design through post-launch, leading a 3-developer team via sprint planning and code reviews. Shipped features for 9 national SDG summit events across 5 months with zero production incidents.',
    },
    {
        id: 'covisionai',
        tag: 'going deeper',
        tagRotate: 6,
        x: 1380,
        y: 150,
        tagY: 58,
        role: 'AI/ML Intern',
        company: 'CovisionAI — Pune, India',
        period: 'May 2026 – Aug 2026',
        description:
            'Designed and built a Python-based benchmarking framework to evaluate 3 frontier video generation models (Seedance, Kling, Runway) across quality, latency, temporal consistency, and prompt-adherence; findings directly informed production model selection. Engineered robust API integration layers and automated test harnesses across 100+ generation configurations, reducing manual evaluation overhead by 40%.',
    },
]

const CANVAS_W = 1560
const CANVAS_H = 460
const ROAD_COLOR = 'rgba(255,255,255,0.28)'
const ACCENT = '#ED7A36'
const ACCENT_DEEP = '#DD4D06'

const generator = rough.generator()

function toSvgPaths(drawable: ReturnType<typeof generator.curve>): PathInfo[] {
    return generator.toPaths(drawable)
}

// Wavy connecting road through every stop, plus a small trailing flourish.
const roadDrawable = generator.curve(
    [
        [-40, stops[0].y + 40],
        ...stops.map((s) => [s.x, s.y] as [number, number]),
        [CANVAS_W - 60, stops[3].y - 60],
        [CANVAS_W + 30, stops[3].y - 130],
    ],
    { stroke: ROAD_COLOR, strokeWidth: 3, roughness: 1.4, seed: 7 } satisfies Options
)
const roadPaths = toSvgPaths(roadDrawable)

// Scribble-filled circle marker + small arrow (with hand-drawn arrowhead) per stop.
const nodePaths: Record<string, PathInfo[]> = {}
const arrowPaths: Record<string, PathInfo[]> = {}

stops.forEach((stop, i) => {
    nodePaths[stop.id] = toSvgPaths(
        generator.circle(stop.x, stop.y, 46, {
            fill: ACCENT,
            fillStyle: 'scribble',
            fillWeight: 2,
            hachureGap: 4,
            stroke: ACCENT_DEEP,
            strokeWidth: 2.5,
            roughness: 2.1,
            seed: 100 + i,
        })
    )

    const pointsUp = stop.tagY < stop.y // arrow travels downward into the node
    const midX = stop.x + (pointsUp ? -14 : 14)
    const midY = (stop.tagY + stop.y) / 2
    const tailY = pointsUp ? stop.tagY + 26 : stop.tagY - 26
    const headY = pointsUp ? stop.y - 34 : stop.y + 34

    const arrowLine = generator.curve(
        [
            [stop.x + (pointsUp ? -30 : 30), tailY],
            [midX, midY],
            [stop.x, headY],
        ],
        { stroke: 'rgba(255,255,255,0.55)', strokeWidth: 2, roughness: 1.6, seed: 200 + i } satisfies Options
    )
    const headDir = pointsUp ? 1 : -1
    const arrowHeadA = generator.line(
        stop.x,
        headY,
        stop.x - 7,
        headY - 9 * headDir,
        { stroke: 'rgba(255,255,255,0.55)', strokeWidth: 2, roughness: 1.6, seed: 300 + i } satisfies Options
    )
    const arrowHeadB = generator.line(
        stop.x,
        headY,
        stop.x + 7,
        headY - 9 * headDir,
        { stroke: 'rgba(255,255,255,0.55)', strokeWidth: 2, roughness: 1.6, seed: 400 + i } satisfies Options
    )

    arrowPaths[stop.id] = [...toSvgPaths(arrowLine), ...toSvgPaths(arrowHeadA), ...toSvgPaths(arrowHeadB)]
})

export default function Experience() {
    const headerRef = useRef<HTMLDivElement>(null)
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInView = useInView(mapRef, { once: true, margin: '-80px' })

    const [activeId, setActiveId] = useState<string | null>(null)
    const closeTimer = useRef<ReturnType<typeof setTimeout>>()

    function open(id: string) {
        clearTimeout(closeTimer.current)
        setActiveId(id)
    }
    function scheduleClose() {
        closeTimer.current = setTimeout(() => setActiveId(null), 200)
    }
    function toggle(id: string) {
        clearTimeout(closeTimer.current)
        setActiveId((v) => (v === id ? null : id))
    }

    const activeStop = stops.find((s) => s.id === activeId) ?? null

    return (
        <section id="experience" className="section-padding relative">
            <div className="container-content">
                {/* Header */}
                <div ref={headerRef} className="mb-12 md:mb-16">
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Experience
                    </motion.p>

                    <motion.h2
                        className="text-display font-display text-balance flex items-baseline gap-3 flex-wrap"
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        My Journey
                        <span className="font-script text-accent text-[1.15em] font-normal -rotate-3 inline-block">
                            so far
                        </span>
                    </motion.h2>
                </div>

                {/* Hand-drawn map — hover (or tap) a stop to see its story */}
                <motion.div
                    ref={mapRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={mapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative -mx-6 md:-mx-10 lg:-mx-16 overflow-x-auto pb-4"
                >
                    <div className="px-6 md:px-10 lg:px-16" style={{ width: 'max-content' }}>
                        <svg
                            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                            width={CANVAS_W}
                            height={CANVAS_H}
                            className="block select-none"
                        >
                            {roadPaths.map((p, i) => (
                                <path key={`road-${i}`} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" />
                            ))}
                            {stops.map((stop) => (
                                <g key={stop.id}>
                                    {arrowPaths[stop.id].map((p, i) => (
                                        <path key={`arrow-${stop.id}-${i}`} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" />
                                    ))}
                                    {nodePaths[stop.id].map((p, i) => (
                                        <path key={`node-${stop.id}-${i}`} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill || 'none'} />
                                    ))}
                                    {/* Invisible hit target — larger than the marker, drives hover/tap */}
                                    <circle
                                        cx={stop.x}
                                        cy={stop.y}
                                        r={56}
                                        fill="transparent"
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => open(stop.id)}
                                        onMouseLeave={scheduleClose}
                                        onClick={() => toggle(stop.id)}
                                    />
                                </g>
                            ))}
                        </svg>

                        {/* Tag labels, absolutely positioned over the map */}
                        <div className="relative -mt-[460px] pointer-events-none" style={{ height: CANVAS_H }}>
                            {stops.map((stop) => (
                                <span
                                    key={stop.id}
                                    style={{
                                        left: stop.x,
                                        top: stop.tagY,
                                        transform: `translate(-50%, -50%) rotate(${stop.tagRotate}deg)`,
                                    }}
                                    className={`absolute font-script text-2xl whitespace-nowrap transition-colors ${activeId === stop.id ? 'text-white' : 'text-accent'
                                        }`}
                                >
                                    {stop.tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <p className="text-caption text-foreground-muted mt-2 mb-6 md:hidden">← swipe the map, tap a stop for its story →</p>
                <p className="text-caption text-foreground-muted mt-2 mb-6 hidden md:block">Hover a stop on the map to see its story</p>

                {/* Detail panel — drops down under the map for whichever stop is active */}
                <div
                    className="min-h-[190px]"
                    onMouseEnter={() => activeId && open(activeId)}
                    onMouseLeave={scheduleClose}
                >
                    <AnimatePresence mode="wait">
                        {activeStop && (
                            <motion.div
                                key={activeStop.id}
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="premium-card !p-6 md:!p-8 max-w-2xl"
                            >
                                <span className="text-caption font-mono text-foreground-muted bg-background px-3 py-1 rounded-full border border-border whitespace-nowrap w-fit inline-block mb-3">
                                    {activeStop.period}
                                </span>
                                <h3 className="text-lg font-semibold text-foreground leading-snug">{activeStop.role}</h3>
                                <p className="text-body-sm text-foreground-muted font-medium mb-3">{activeStop.company}</p>
                                <p className="text-body-sm text-foreground-muted leading-relaxed">{activeStop.description}</p>

                                {activeStop.highlights && (
                                    <ul className="mt-4 pt-4 border-t border-border space-y-2 max-h-40 overflow-y-auto pr-1">
                                        {activeStop.highlights.map((h) => (
                                            <li key={`${h.event}-${h.when}`} className="text-caption leading-snug">
                                                <span className="text-foreground font-medium">{h.role}</span>
                                                <span className="text-foreground-muted"> — {h.event}</span>
                                                <span className="text-foreground-muted font-mono"> · {h.when}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
