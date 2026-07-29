'use client'

const rowA = [
    'Python', 'PyTorch', 'TensorFlow', 'Next.js', 'React', 'FastAPI', 'Docker', 'AWS', 'C++', 'RAG', 'PostgreSQL', 'System Design',
]

const rowB = [
    'Scikit-learn', 'Node.js', 'GCP', 'MongoDB', 'JavaScript', 'Git', 'Redis', 'Azure', 'OpenCV', 'SQL', 'Linux', 'WebSockets',
]

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
    const loop = [...items, ...items]

    return (
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div
                className={`flex w-max gap-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
            >
                {loop.map((skill, i) => (
                    <span key={`${skill}-${i}`} className="tech-pill shrink-0">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default function SkillsMarquee() {
    return (
        <section className="py-16 md:py-20 relative">
            <div className="container-content">
                <div className="flex flex-col gap-4">
                    <MarqueeRow items={rowA} />
                    <MarqueeRow items={rowB} reverse />
                </div>
            </div>
        </section>
    )
}
