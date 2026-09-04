import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { resumes } from '../data'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) observer.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      <motion.header className={`nav ${scrolled ? 'scrolled' : ''}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="container nav-inner">
          <a href="#top" className="logo">
            <span className="logo-mark">AFC</span>
            <span>Adan France Cruz</span>
          </a>
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
                {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                {l.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary btn-sm nav-cta" href={resumes[0].file} download>
            <Download size={16} /> Resume
          </a>
          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href={resumes[0].file} download onClick={() => setOpen(false)}>Download Resume</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
