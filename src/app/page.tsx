import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ScrollStatement from '@/components/ScrollStatement'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import SkillsMarquee from '@/components/SkillsMarquee'
import Experience from '@/components/Experience'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <>
            <Navigation />

            <main>
                <Hero />
                <ScrollStatement />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <SkillsMarquee />
                <Achievements />
                <Contact />
            </main>

            <Footer />
        </>
    )
}
