'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import rough from 'roughjs/bin/rough'
import type { Options, PathInfo } from 'roughjs/bin/core'

interface Highlight {
    role: string
    event: string
    when: string
}

interface Stop {
    id: string
    title: string
    tagRotate: number
    x: number
    y: number
    tagY: number
    titleAbove: boolean
    role: string
    company: string
    period: string
    description: string
    highlights?: Highlight[]
}

// Ordered latest-first. Title/arrow direction per stop: down, up, up, down.
const stops: Stop[] = [
    {
        id: 'covisionai',
        title: 'AI/ML Intern',
        tagRotate: 5,
        x: 110,
        y: 300,
        tagY: 388,
        titleAbove: false,
        role: 'AI/ML Intern',
        company: 'CovisionAI — Pune, India',
        period: 'May 2026 – Aug 2026',
        description:
            'Designed and built a Python-based benchmarking framework to evaluate 3 frontier video generation models (Seedance, Kling, Runway) across quality, latency, temporal consistency, and prompt-adherence; findings directly informed production model selection. Engineered robust API integration layers and automated test harnesses across 100+ generation configurations, reducing manual evaluation overhead by 40%.',
    },
    {
        id: 'mun',
        title: 'MUN Chair',
        tagRotate: -6,
        x: 400,
        y: 140,
        tagY: 44,
        titleAbove: true,
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
        id: 'aspirant',
        title: 'Full-Stack Dev',
        tagRotate: 6,
        x: 690,
        y: 140,
        tagY: 44,
        titleAbove: true,
        role: 'Website Developer & Reporting Manager',
        company: 'Aspirant India Initiative — Remote',
        period: 'Mar 2025 – Jul 2025',
        description:
            'Architected and deployed a production web platform serving 40,000+ students across 500+ institutions. Owned the full system lifecycle from design through post-launch, leading a 3-developer team via sprint planning and code reviews. Shipped features for 9 national SDG summit events across 5 months with zero production incidents.',
    },
    {
        id: 'hcltechbee',
        title: 'HCL TechBee',
        tagRotate: -5,
        x: 980,
        y: 300,
        tagY: 388,
        titleAbove: false,
        role: 'Selected Candidate, HCL TechBee',
        company: 'HCLTech',
        period: 'Dec 2022 – Jan 2023',
        description:
            "Selected for HCLTech's exclusive post-Class XII tech career program — a structured track pairing 12 months of training with a path to full-time placement, alongside the option to pursue a degree from BITS Pilani.",
    },
]

const CANVAS_W = 1180
const CANVAS_H = 460
const ROAD_COLOR = 'rgba(255,255,255,0.28)'
const ACCENT = '#ED7A36'
const ACCENT_DEEP = '#DD4D06'
const ARROW_COLOR = 'rgba(255,255,255,0.55)'

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

// Scribble-filled circle marker per stop, plus a decorative arrow running
// FROM the node OUT to its title.
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

    const dir = stop.titleAbove ? -1 : 1 // travel direction: -1 = upward, +1 = downward
    const tailY = stop.y + dir * 34
    const headY = stop.tagY - dir * 24
    const midX = stop.x + (i % 2 === 0 ? -14 : 14)
    const midY = (tailY + headY) / 2

    const arrowLine = generator.curve(
        [
            [stop.x, tailY],
            [midX, midY],
            [stop.x, headY],
        ],
        { stroke: ARROW_COLOR, strokeWidth: 2, roughness: 1.6, seed: 200 + i } satisfies Options
    )
    const backY = headY - dir * 9
    const arrowHeadA = generator.line(stop.x, headY, stop.x - 7, backY, {
        stroke: ARROW_COLOR,
        strokeWidth: 2,
        roughness: 1.6,
        seed: 300 + i,
    } satisfies Options)
    const arrowHeadB = generator.line(stop.x, headY, stop.x + 7, backY, {
        stroke: ARROW_COLOR,
        strokeWidth: 2,
        roughness: 1.6,
        seed: 400 + i,
    } satisfies Options)

    arrowPaths[stop.id] = [...toSvgPaths(arrowLine), ...toSvgPaths(arrowHeadA), ...toSvgPaths(arrowHeadB)]
})

export default function Experience() {
    const headerRef = useRef<HTMLDivElement>(null)
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInView = useInView(mapRef, { once: true, margin: '-80px' })

    const listRef = useRef<HTMLDivElement>(null)
    const listInView = useInView(listRef, { once: true, margin: '-60px' })

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

                {/* Hand-drawn map — purely illustrative, latest stop first */}
                <motion.div
                    ref={mapRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={mapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative -mx-6 md:-mx-10 lg:-mx-16 overflow-x-auto scrollbar-hide pb-4"
                >
                    <div className="px-6 md:px-10 lg:px-16" style={{ width: 'max-content' }}>
                        <svg
                            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                            width={CANVAS_W}
                            height={CANVAS_H}
                            className="block select-none"
                            aria-hidden="true"
                        >
                            {roadPaths.map((p, i) => (
                                <path key={`road-${i}`} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" />
                            ))}
                            {stops.map((stop, i) => (
                                <g key={stop.id}>
                                    {arrowPaths[stop.id].map((p, j) => (
                                        <motion.path
                                            key={`arrow-${stop.id}-${j}`}
                                            d={p.d}
                                            stroke={p.stroke}
                                            strokeWidth={p.strokeWidth}
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={mapInView ? { pathLength: 1 } : { pathLength: 0 }}
                                            transition={{
                                                duration: j === 0 ? 0.6 : 0.25,
                                                delay: i * 0.18 + (j === 0 ? 0.3 : 0.9),
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                    {nodePaths[stop.id].map((p, j) => (
                                        <path key={`node-${stop.id}-${j}`} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill || 'none'} />
                                    ))}
                                </g>
                            ))}
                        </svg>

                        {/* Title labels, absolutely positioned over the map */}
                        <div className="relative -mt-[460px] pointer-events-none" style={{ height: CANVAS_H }}>
                            {stops.map((stop) => (
                                <span
                                    key={stop.id}
                                    style={{
                                        left: stop.x,
                                        top: stop.tagY,
                                        transform: `translate(-50%, -50%) rotate(${stop.tagRotate}deg)`,
                                    }}
                                    className="absolute font-script text-2xl whitespace-nowrap text-white"
                                >
                                    {stop.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <p className="text-caption text-foreground-muted mt-2 mb-10 md:hidden">← swipe to see the full map →</p>

                {/* Details — same order as the map, latest first: 2 up, 2 down */}
                <motion.div
                    ref={listRef}
                    className="grid sm:grid-cols-2 gap-5 md:gap-6 items-start"
                    initial="hidden"
                    animate={listInView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                >
                    {stops.map((stop) => (
                        <ExperienceCard key={stop.id} stop={stop} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function ExperienceCard({ stop }: { stop: Stop }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="premium-card !p-6 md:!p-8 !border-white/[0.14] h-full flex flex-col"
        >
            <div className="flex items-start justify-between gap-2 mb-4">
                <span className="text-caption font-mono text-foreground-muted bg-background px-3 py-1 rounded-full border border-white/10 whitespace-nowrap w-fit">
                    {stop.period}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1.5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-snug">{stop.role}</h3>
            <p className="text-body-sm text-foreground-muted font-medium mb-3">{stop.company}</p>
            <p className="text-body-sm text-foreground-muted leading-relaxed">{stop.description}</p>

            {stop.highlights && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="flex items-center gap-1.5 text-caption font-mono text-accent hover:text-white transition-colors"
                    >
                        {expanded ? 'Hide conferences' : 'View recent conferences'}
                        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown size={13} />
                        </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <ul className="mt-3 space-y-2.5 pr-1">
                                    {stop.highlights.map((h) => (
                                        <li key={`${h.event}-${h.when}`} className="text-caption leading-snug">
                                            <span className="text-foreground font-medium">{h.role}</span>
                                            <span className="text-foreground-muted"> — {h.event}</span>
                                            <span className="text-foreground-muted font-mono"> · {h.when}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    )
}
