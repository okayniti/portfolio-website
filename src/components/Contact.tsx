'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Coffee } from 'lucide-react'
import MagneticButton from './MagneticButton'

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/okayniti' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/niti-kanoongo/' },
    { label: 'Codolio', href: 'https://codolio.com/profile/okayniti' },
]

export default function Contact() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} id="contact" className="section-padding relative">
            <div className="container-content">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Portrait circle */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border mx-auto">
                            <img
                                src="/avatar.png"
                                alt="Niti Kanoongo"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        className="text-display font-display mb-6 text-balance"
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Have a project in mind?
                    </motion.h2>

                    <motion.p
                        className="text-body text-foreground-muted mb-10 max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        I&apos;m always open to interesting conversations about AI, web development,
                        competitive programming, or anything tech. Feel free to reach out!
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <MagneticButton href="mailto:niti.kanoongo3@gmail.com" variant="primary">
                            <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                <Mail size={14} /> Send a Message <ArrowUpRight size={12} strokeWidth={2.5} />
                            </span>
                        </MagneticButton>
                        <MagneticButton href="mailto:niti.kanoongo3@gmail.com" variant="secondary">
                            <span className="py-0.5 text-xs font-semibold">niti.kanoongo3@gmail.com</span>
                        </MagneticButton>
                    </motion.div>

                    {/* Location */}
                    <motion.p
                        className="flex items-center justify-center gap-2 text-body-sm text-foreground-muted mb-10"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <MapPin size={14} />
                        Pune, Maharashtra, India
                    </motion.p>

                    {/* Social links */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.45 }}
                    >
                        {socialLinks.map((link) => (
                            <MagneticButton
                                key={link.label}
                                href={link.href}
                                variant="secondary"
                            >
                                <span className="flex items-center gap-1.5 py-0.5 text-xs font-semibold">
                                    {link.label} <ArrowUpRight size={12} />
                                </span>
                            </MagneticButton>
                        ))}
                    </motion.div>

                    {/* Buy me a coffee */}
                    <motion.div
                        className="pt-8 border-t border-border"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.55 }}
                    >
                        <p className="text-caption text-foreground-muted mb-4 font-medium uppercase tracking-wider">
                            If you like my work, consider supporting me
                        </p>
                        <MagneticButton
                            href="https://buymeacoffee.com/nitikanoongo"
                            variant="primary"
                        >
                            <span className="flex items-center gap-2 py-0.5 text-xs font-semibold">
                                <Coffee size={14} /> Buy me a coffee
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
