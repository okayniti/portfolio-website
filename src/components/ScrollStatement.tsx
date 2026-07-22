'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface DriftConfig {
    src: string
    alt: string
    size: string
    start: { x: string; y: string; scale: number; rotate: number }
    end: { x: string; y: string; scale: number; rotate: number }
}

const images: DriftConfig[] = [
    {
        src: '/aurora.png',
        alt: 'Aurora — AI Productivity Dashboard',
        size: 'w-[300px] lg:w-[360px]',
        start: { x: '-46vw', y: '-38vh', scale: 0.5, rotate: -12 },
        end: { x: '-30vw', y: '-24vh', scale: 1.05, rotate: -5 },
    },
    {
        src: '/vocasense.png',
        alt: 'VocaSense Kids — AI Vocal Emotion Analyzer',
        size: 'w-[260px] lg:w-[310px]',
        start: { x: '42vw', y: '-34vh', scale: 0.45, rotate: 10 },
        end: { x: '27vw', y: '-21vh', scale: 0.95, rotate: 4 },
    },
    {
        src: '/AspirantWebsite.png',
        alt: 'Aspirant India Initiative — Web Platform',
        size: 'w-[260px] lg:w-[320px]',
        start: { x: '-40vw', y: '40vh', scale: 0.5, rotate: 8 },
        end: { x: '-27vw', y: '24vh', scale: 0.95, rotate: -4 },
    },
    {
        src: '/samanvay.png',
        alt: 'Samanvay — Two-Way Sign Language Interpreter',
        size: 'w-[280px] lg:w-[340px]',
        start: { x: '44vw', y: '38vh', scale: 0.45, rotate: -8 },
        end: { x: '29vw', y: '23vh', scale: 1, rotate: 6 },
    },
    {
        src: '/snaplens.png',
        alt: 'SnapLens — AI Screenshot Intelligence',
        size: 'w-[240px] lg:w-[300px]',
        start: { x: '4vw', y: '-46vh', scale: 0.4, rotate: 6 },
        end: { x: '1vw', y: '-32vh', scale: 0.85, rotate: -3 },
    },
    {
        src: '/patent-express.png',
        alt: 'Patent Express — UX Redesign',
        size: 'w-[220px] lg:w-[280px]',
        start: { x: '-2vw', y: '46vh', scale: 0.4, rotate: -6 },
        end: { x: '2vw', y: '32vh', scale: 0.85, rotate: 4 },
    },
]

const statement = (
    <>
        I don&apos;t just prototype ideas — I ship systems that hold up under{' '}
        <span className="text-accent">real load, real data, real users.</span>
    </>
)

export default function ScrollStatement() {
    return (
        <>
            <DesktopScrollStatement />
            <MobileStatement />
        </>
    )
}

function DriftImage({
    config,
    scrollYProgress,
    opacity,
}: {
    config: DriftConfig
    scrollYProgress: MotionValue<number>
    opacity: MotionValue<number>
}) {
    const x = useTransform(scrollYProgress, [0, 1], [config.start.x, config.end.x])
    const y = useTransform(scrollYProgress, [0, 1], [config.start.y, config.end.y])
    const scale = useTransform(scrollYProgress, [0, 1], [config.start.scale, config.end.scale])
    const rotate = useTransform(scrollYProgress, [0, 1], [config.start.rotate, config.end.rotate])

    return (
        <motion.div
            style={{ x, y, scale, rotate, opacity }}
            className={`absolute z-20 ${config.size} aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card`}
        >
            <img src={config.src} alt={config.alt} className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
    )
}

function DesktopScrollStatement() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
    const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.55, 0.3])
    const imagesOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1])

    return (
        <section
            ref={containerRef}
            className="relative bg-transparent hidden md:block"
            style={{ height: '280vh' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Statement — sits behind the image stack (lower z-index) */}
                <motion.p
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="relative z-10 max-w-4xl px-10 text-center font-display font-semibold text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.15] text-foreground text-balance"
                >
                    {statement}
                </motion.p>

                {/* Project screenshots drift in over the statement as you scroll */}
                {images.map((config) => (
                    <DriftImage key={config.src} config={config} scrollYProgress={scrollYProgress} opacity={imagesOpacity} />
                ))}
            </div>
        </section>
    )
}

function MobileStatement() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} className="md:hidden section-padding relative">
            <div className="container-content text-center">
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-semibold text-[clamp(1.75rem,7vw,2.5rem)] leading-snug text-foreground text-balance mb-10"
                >
                    {statement}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory"
                >
                    {images.map((config) => (
                        <div
                            key={config.src}
                            className="shrink-0 w-56 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-card snap-center"
                        >
                            <img src={config.src} alt={config.alt} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
