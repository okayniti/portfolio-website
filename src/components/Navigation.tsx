'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            const sections = ['about', 'work', 'skills', 'experience', 'contact']
            for (const section of sections) {
                const el = document.getElementById(section)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isMobileOpen])

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
                    isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
                }`}
            >
                <nav className="container-content flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <a
                        href="#"
                        className="text-2xl md:text-3xl font-bold tracking-wide text-foreground hover:opacity-70 transition-opacity"
                    >
                        Niti K.
                    </a>

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex items-center gap-1 bg-[#111111] rounded-full p-1.5 border border-white/10 shadow-lg">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                        activeSection === item.href.slice(1)
                                            ? 'text-[#111111]'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.href.slice(1) && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute inset-0 bg-white rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-button transition-all duration-300 hover:scale-[1.02]"
                        >
                            Get in Touch
                            <ArrowUpRight size={14} strokeWidth={2.5} />
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background transition-all"
                            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="text-3xl font-display font-semibold text-foreground hover:opacity-60 transition-opacity"
                                    onClick={() => setIsMobileOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                className="btn-primary mt-4"
                                onClick={() => setIsMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
                            >
                                Get in Touch
                                <ArrowUpRight size={16} />
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
