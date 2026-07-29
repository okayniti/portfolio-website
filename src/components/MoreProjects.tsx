'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface MoreProject {
    title: string
    image: string
    link: string
}

const moreProjects: MoreProject[] = [
    {
        title: 'Aspirant India Initiative',
        image: '/AspirantWebsite.png',
        link: 'https://github.com/okayniti/Aspirant-India-Initiative',
    },
    {
        title: 'Samanvay — Sign Language Interpreter',
        image: '/samanvay.png',
        link: 'https://github.com/okayniti/Samanvay',
    },
    {
        title: 'SnapLens — AI Screenshot Intelligence',
        image: '/snaplens.png',
        link: 'https://github.com/okayniti/SnapLens',
    },
    {
        title: 'Patent Express — UX Redesign',
        image: '/patent-express.png',
        link: 'https://github.com/okayniti/patent-express-product-redesign',
    },
]

function ProjectTile({ project }: { project: MoreProject }) {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-64 md:w-72 aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card"
        >
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                loading="lazy"
                draggable={false}
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/80 transition-colors duration-300 flex items-end">
                <div className="p-5 w-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-body-sm font-medium text-foreground mb-1.5">
                        {project.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-caption font-mono text-accent">
                        View on GitHub <ArrowUpRight size={13} strokeWidth={2.5} />
                    </span>
                </div>
            </div>
        </a>
    )
}

export default function MoreProjects() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const loop = [...moreProjects, ...moreProjects]

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <p className="text-label uppercase tracking-widest text-foreground-muted mb-6">
                More on GitHub
            </p>

            <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
                <div className="flex w-max gap-5 animate-marquee-slow hover:[animation-play-state:paused]">
                    {loop.map((project, i) => (
                        <ProjectTile key={`${project.title}-${i}`} project={project} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
