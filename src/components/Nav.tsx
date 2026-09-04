import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resumes } from '../data'
import { Pixel } from './Pixel'
import { rocketFrames } from '../pixel'
import { sfx, toggleSound, useSound } from '../sound'

const links = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'quests', label: 'QUESTS' },
  { id: 'inventory', label: 'INVENTORY' },
  { id: 'trophies', label: 'TROPHIES' },
  { id: 'bonus', label: 'BONUS' },
  { id: 'continue', label: 'CONTINUE' },
]

export function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const sound = useSound()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo" onMouseEnter={sfx.blip}>
            <Pixel map={rocketFrames[0]} scale={2} />
            <span>ADAN.EXE</span>
          </a>
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''} onMouseEnter={sfx.blip} onClick={sfx.select}>
                <span className="cursor">▶</span>{l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <button className="sound-btn" onClick={toggleSound} aria-pressed={sound} title="Toggle sound">
              SFX {sound ? 'ON' : 'OFF'}
            </button>
            <a className="pbtn pbtn-sm nav-cta" href={resumes[0].file} download onMouseEnter={sfx.blip}>RESUME</a>
            <button className="menu-btn" aria-label="Toggle menu" onClick={() => { setOpen((o) => !o); sfx.select() }}>{open ? 'X' : '≡'}</button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {links.map((l) => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>▶ {l.label}</a>)}
            <a href={resumes[0].file} download onClick={() => setOpen(false)}>▶ DOWNLOAD RESUME</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
