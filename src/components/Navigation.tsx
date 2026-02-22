'use client'

import { useState, useEffect } from 'react'

const navItems = [
    { label: 'My Work', href: '#work' },
    { label: 'About Me', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            const sections = ['work', 'about', 'contact']
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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth bg-navy ${isScrolled
                ? 'shadow-lg'
                : ''
                }`}
        >
            <nav className="container-content flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <a
                    href="#"
                    className="text-xl font-bold tracking-tight text-white hover:text-light-teal transition-colors"
                >
                    Niti K.
                </a>

                {/* Nav Links */}
                <ul className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${activeSection === item.href.slice(1)
                                    ? 'bg-white text-navy border-white'
                                    : 'bg-transparent text-white border-light-teal/50 hover:border-white'
                                    }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
