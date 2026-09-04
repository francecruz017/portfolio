import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CursorGlow, ScrollProgress } from './components/Effects'
import { SpaceBackdrop } from './components/Backdrop'
import { Rocket } from './components/Space'
import { Terminal } from './components/Terminal'
import { TerminalContext } from './terminalContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About, Contact, Experience, Highlights, Personal, Skills, Stats } from './components/Sections'
import { profile } from './data'

export default function App() {
  const [showTop, setShowTop] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [term, setTerm] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      if (e.key === '`' && !typing) { e.preventDefault(); setTerm((t) => !t) }
      if (e.key === 'Escape') setTerm(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const launch = () => {
    setLaunching(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setLaunching(false), 1000)
  }
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <TerminalContext.Provider value={() => setTerm(true)}>
      <SpaceBackdrop />
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Highlights />
        <Personal />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="logo"><span className="logo-mark">AFC</span>{profile.name}</a>
          <span><a href={profile.repo} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'underline', textUnderlineOffset: 3 }}>View source on GitHub</a> · © {new Date().getFullYear()} · Press <kbd style={{ fontFamily: 'var(--font-mono)', border: '1px solid var(--border-strong)', borderRadius: 5, padding: '0 6px' }}>`</kbd> for a surprise.</span>
        </div>
      </footer>
      <AnimatePresence>
        {showTop && (
          <motion.button className={`to-top ${launching ? 'launch' : ''}`} aria-label="Back to top" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} onClick={launch}>
            <Rocket size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <Terminal open={term} onClose={() => setTerm(false)} />
    </TerminalContext.Provider>
  )
}
