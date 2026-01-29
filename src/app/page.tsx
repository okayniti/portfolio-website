import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import NitiGPT from '@/components/NitiGPT'

export default function Home() {
    return (
        <>
            <Navigation />

            <main>
                <Hero />
                <Projects />
                <About />
                <Contact />
            </main>

            <NitiGPT />
        </>
    )
}
