'use client'

import { Github, Linkedin, ExternalLink } from 'lucide-react'

const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

const contactInfo = [
    { label: 'niti.kanoongo3@gmail.com', href: 'mailto:niti.kanoongo3@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/okayniti' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/niti-kanoongo/' },
]

export default function Footer() {
    return (
        <footer className="relative overflow-hidden pb-8 pt-section">
            <div className="container-content">
                {/* Top section */}
                <div className="grid sm:grid-cols-3 gap-12 mb-20">
                    {/* Tagline */}
                    <div>
                        <p className="text-subheading font-display text-foreground mb-2">
                            Not just a portfolio,
                        </p>
                        <p className="text-subheading font-display text-foreground">
                            real results.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="text-label uppercase tracking-widest text-foreground-muted mb-4">
                            Quick Links
                        </p>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-body-sm text-foreground-muted hover:text-foreground transition-colors link-underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-label uppercase tracking-widest text-foreground-muted mb-4">
                            Get in Touch
                        </p>
                        <ul className="space-y-2">
                            {contactInfo.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-body-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                                    >
                                        {item.label}
                                        {item.href.startsWith('http') && <ExternalLink size={12} />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Large display name */}
                <div className="mb-10">
                    <p className="text-[clamp(3.5rem,11vw,9.5rem)] font-display font-bold leading-none tracking-wider text-gradient-fade select-none uppercase">
                        NITI KANOONGO
                    </p>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
                    <p className="text-caption text-foreground-muted">
                        © {new Date().getFullYear()} Niti Kanoongo. All rights reserved.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/okayniti"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/niti-kanoongo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href="https://codolio.com/profile/okayniti"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                            aria-label="Codolio"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
