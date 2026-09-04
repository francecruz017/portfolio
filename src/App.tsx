import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollProgress } from './components/Effects'
import { PixelPlanets, PixelStarfield } from './components/Space'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Bonus, Continue, Hud, Inventory, Profile, Quests, Trophies } from './components/Sections'
import { Terminal } from './components/Terminal'
import { TerminalContext } from './terminalContext'
import { Pixel } from './components/Pixel'
import { rocketFrames } from './pixel'
import { profile } from './data'
import { sfx } from './sound'

export default function App() {
  const [showTop, setShowTop] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [term, setTerm] = useState(false)

  const launch = () => {
    setLaunching(true)
    sfx.launch()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setLaunching(false), 1000)
  }

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    const onKey = (e: KeyboardEvent) => {
      const typing = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      if (e.key === '`' && !typing) { e.preventDefault(); setTerm((t) => !t) }
      if (e.key === 'Escape') setTerm(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <TerminalContext.Provider value={() => setTerm(true)}>
      <PixelStarfield />
      <PixelPlanets />
      <div className="scanlines" />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Hud />
        <Profile />
        <Quests />
        <Inventory />
        <Trophies />
        <Bonus />
        <Continue />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {profile.name.toUpperCase()} · NO CONTINUES USED</span>
          <span><a href={profile.repo} target="_blank" rel="noreferrer">VIEW SOURCE</a> · PRESS <kbd>`</kbd> FOR TERMINAL</span>
        </div>
      </footer>
      <AnimatePresence>
        {showTop && (
          <motion.button className={`to-top ${launching ? 'launch' : ''}`} aria-label="Back to top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={launch} onMouseEnter={sfx.blip}>
            <Pixel map={rocketFrames[0]} scale={2} />
          </motion.button>
        )}
      </AnimatePresence>
      <Terminal open={term} onClose={() => setTerm(false)} />
    </TerminalContext.Provider>
  )
}
