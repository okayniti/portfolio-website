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

// Scribble-filled circle marker per stop, plus an arrow running FROM the
// node OUT to its title (tail at the node, arrowhead at the title).
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

const POPOVER_W = 290

// Keeps the popover inside the canvas horizontally (edge nodes anchor to
// their inner side instead of centering), and flips it above/below the
// node depending on which side its title left vacant.
function popoverStyle(stop: Stop): React.CSSProperties {
    const halfW = POPOVER_W / 2
    let translateX = '-50%'
    let left = stop.x
    if (stop.x - halfW < 10) {
        translateX = '0%'
        left = stop.x - 24
    } else if (stop.x + halfW > CANVAS_W - 10) {
        translateX = '-100%'
        left = stop.x + 24
    }

    if (stop.titleAbove) {
        return { left, top: stop.y + 60, transform: `translateX(${translateX})` }
    }
    return { left, top: stop.y - 60, transform: `translateX(${translateX}) translateY(-100%)` }
}

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

                {/* Hand-drawn map — hover (or tap) a title to see its story */}
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
                                    {/* Invisible hit target on the node — bonus hover area alongside the title */}
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

                        {/* Title labels + hover popovers, absolutely positioned over the map */}
                        <div className="relative -mt-[460px]" style={{ height: CANVAS_H }}>
                            {stops.map((stop) => (
                                <span
                                    key={stop.id}
                                    style={{
                                        left: stop.x,
                                        top: stop.tagY,
                                        transform: `translate(-50%, -50%) rotate(${stop.tagRotate}deg)`,
                                    }}
                                    onMouseEnter={() => open(stop.id)}
                                    onMouseLeave={scheduleClose}
                                    onClick={() => toggle(stop.id)}
                                    className={`absolute font-script text-2xl whitespace-nowrap cursor-pointer transition-colors ${activeId === stop.id ? 'text-white' : 'text-accent hover:text-white'
                                        }`}
                                >
                                    {stop.title}
                                </span>
                            ))}

                            {/* Detail popover — appears right next to the node, on whichever side
                                (above/below) isn't already taken by the title, so it's always in
                                view with zero page scroll needed. */}
                            <AnimatePresence>
                                {activeStop && (
                                    <motion.div
                                        key={activeStop.id}
                                        onMouseEnter={() => open(activeStop.id)}
                                        onMouseLeave={scheduleClose}
                                        initial={{ opacity: 0, y: activeStop.titleAbove ? -10 : 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: activeStop.titleAbove ? -10 : 10 }}
                                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                        style={popoverStyle(activeStop)}
                                        className="absolute z-30 w-[290px] premium-card !p-5"
                                    >
                                        <span className="text-caption font-mono text-foreground-muted bg-background px-3 py-1 rounded-full border border-border whitespace-nowrap w-fit inline-block mb-2.5">
                                            {activeStop.period}
                                        </span>
                                        <h3 className="text-base font-semibold text-foreground leading-snug">{activeStop.role}</h3>
                                        <p className="text-caption text-foreground-muted font-medium mb-2.5">{activeStop.company}</p>
                                        <p className="text-caption text-foreground-muted leading-relaxed">{activeStop.description}</p>

                                        {activeStop.highlights && (
                                            <ul className="mt-3 pt-3 border-t border-border space-y-1.5 max-h-32 overflow-y-auto pr-1">
                                                {activeStop.highlights.map((h) => (
                                                    <li key={`${h.event}-${h.when}`} className="text-[11px] leading-snug">
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
                </motion.div>

                <p className="text-caption text-foreground-muted mt-2 md:hidden">← swipe the map, tap a title for its story →</p>
                <p className="text-caption text-foreground-muted mt-2 hidden md:block">Hover a title on the map to see its story</p>
            </div>
        </section>
    )
}
