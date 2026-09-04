import { motion } from 'framer-motion'
import { profile } from '../data'
import { useTypewriter } from '../hooks/useTypewriter'
import { Pixel, Sprite } from './Pixel'
import { rocketFrames, ringedPlanet, moon, bluePlanet } from '../pixel'
import { useTerminal } from '../terminalContext'
import { sfx } from '../sound'

export function Hero() {
  const role = useTypewriter(profile.roles, 60, 1600)
  const openTerminal = useTerminal()
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hud">
          <span><b>1UP</b> {profile.handle}</span>
          <span className="hud-hp">HP <i /><i /><i /><i /><i /><i /><i /><i /></span>
          <span><b>LV</b> 09</span>
          <span className="hud-class"><b>CLASS</b> TEAM LEAD</span>
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <motion.div className="player-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>PLAYER 1</motion.div>
            <h1 className="hero-title">
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.3 }}>ADAN</motion.span>
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.3 }}>FRANCE</motion.span>
              <motion.span className="accent" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65, duration: 0.3 }}>CRUZ</motion.span>
            </h1>
            <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              &gt; {role}<span className="caret">█</span>
            </motion.div>
            <motion.p className="hero-text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.3 }}>
              {profile.intro}
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.3 }}>
              <a className="pbtn pbtn-primary" href="#quests" onMouseEnter={sfx.blip} onClick={sfx.select}><span className="blink-slow">▶</span> PRESS START</a>
              <a className="pbtn" href="#continue" onMouseEnter={sfx.blip} onClick={sfx.coin}>INSERT COIN</a>
            </motion.div>
            <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <a className="sq" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" onMouseEnter={sfx.blip}>in</a>
              <a className="sq" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" onMouseEnter={sfx.blip}>gh</a>
              <a className="sq" href={`mailto:${profile.email}`} aria-label="Email" onMouseEnter={sfx.blip}>@</a>
              <button className="term-trigger" onClick={() => { openTerminal(); sfx.select() }} onMouseEnter={sfx.blip}>
                &gt; OPEN TERMINAL<span className="blink">_</span> <kbd>`</kbd>
              </button>
            </motion.div>
          </div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4 }}>
            <div className="art-planet art-ringed"><Pixel map={ringedPlanet} scale={9} /></div>
            <div className="art-planet art-moon"><Pixel map={moon} scale={6} /></div>
            <div className="art-planet art-blue"><Pixel map={bluePlanet} scale={5} /></div>
            <div className="art-rocket"><Sprite frames={rocketFrames} fps={10} scale={11} /></div>
            <div className="art-label">ROCKET.SPR · 11×21</div>
          </motion.div>
        </div>
      </div>
      <div className="scroll-hint blink-slow">▼ SCROLL ▼</div>
    </section>
  )
}
