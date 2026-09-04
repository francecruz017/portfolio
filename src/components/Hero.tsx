import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, ShieldCheck, Zap, Users } from 'lucide-react'
import { profile, resumes, marquee } from '../data'
import { useTypewriter } from '../hooks/useTypewriter'
import { Magnetic, ParticleField } from './Effects'
import { Planet, Rocket } from './Space'
import { useTerminal } from '../terminalContext'

const ease = [0.22, 1, 0.36, 1] as const
const line = { hidden: { y: '110%' }, show: (i: number) => ({ y: 0, transition: { duration: 0.9, delay: 0.25 + i * 0.12, ease } }) }

export function Hero() {
  const role = useTypewriter(profile.roles)
  const openTerminal = useTerminal()
  return (
    <>
      <section className="hero" id="top">
        <ParticleField />
        <Planet size={520} colors={['#8b5cf6', '#1e1b4b']} ring="#c4b5fd" glow="rgba(139,92,246,0.35)" className="hero-planet big" />
        <Planet size={110} colors={['#e2e8f0', '#64748b']} craters glow="rgba(226,232,240,0.3)" className="hero-planet moon" />
        <motion.div
          className="hero-rocket"
          initial={{ x: '-20vw', y: '70vh', rotate: 45 }}
          animate={{ x: ['-20vw', '120vw'], y: ['70vh', '-30vh'] }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatDelay: 6, delay: 2 }}
        >
          <Rocket size={56} style={{ transform: 'rotate(45deg)' }} />
        </motion.div>
        <div className="container hero-inner">
          <div>
            <motion.div className="hero-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="pulse" /> Available for leadership & senior backend roles
            </motion.div>
            <h1 className="hero-title">
              <span className="line"><motion.span style={{ display: 'block' }} variants={line} custom={0} initial="hidden" animate="show">Building systems</motion.span></span>
              <span className="line"><motion.span style={{ display: 'block' }} variants={line} custom={1} initial="hidden" animate="show">that <span className="gradient-text">scale</span> and</motion.span></span>
              <span className="line"><motion.span style={{ display: 'block' }} variants={line} custom={2} initial="hidden" animate="show">teams that <span className="gradient-text">ship.</span></motion.span></span>
            </h1>
            <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <span style={{ color: 'var(--dim)' }}>&gt; </span>{role}<span className="caret" />
            </motion.div>
            <motion.p className="hero-text" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease }}>
              {profile.name}. {profile.tagline} Nearly a decade across healthcare, automotive, and e-commerce.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1, ease }}>
              <Magnetic><a className="btn btn-primary" href="#experience">View my work <ArrowRight size={17} /></a></Magnetic>
              <Magnetic><a className="btn" href={resumes[0].file} download><Download size={17} /> Download resume</a></Magnetic>
            </motion.div>
            <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
              <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
              <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19} /></a>
              <button className="term-trigger" onClick={openTerminal} aria-label="Open terminal">
                <span className="term-prompt">❯</span> open terminal<span className="blink">_</span> <kbd>`</kbd>
              </button>
            </motion.div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92, rotateY: -12 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.1, delay: 0.5, ease }}>
            <motion.div className="code-card" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="code-bar">
                <span style={{ background: '#ff5f57' }} /><span style={{ background: '#febc2e' }} /><span style={{ background: '#28c840' }} />
                <span className="name">engineer.php</span>
              </div>
              <pre className="code-body">
{`<?php

`}<span className="k">final class</span> <span className="p">AdanFranceCruz</span> <span className="k">extends</span> <span className="p">Engineer</span>{`
{
    `}<span className="k">public function</span> <span className="p">__construct</span>{`()
    {
        $this->years   = `}<span className="n">9</span>{`;
        $this->role    = `}<span className="s">'Team Lead'</span>{`;
        $this->stack   = [`}<span className="s">'PHP'</span>, <span className="s">'Laravel'</span>,
                          <span className="s">'Symfony'</span>, <span className="s">'GraphQL'</span>{`];
        $this->focus   = `}<span className="s">'AI-augmented dev'</span>{`;
        $this->ships   = `}<span className="k">true</span>{`;
    }

    `}<span className="k">public function</span> <span className="p">lead</span>{`(Team $team): Product
    {
        `}<span className="k">return</span>{` $team->align()
                    ->build()
                    ->deliver(`}<span className="s">'on time'</span>{`);
    }
}`}
              </pre>
            </motion.div>
            <div className="float-chip chip-1"><ShieldCheck size={16} /> Healthcare-grade compliance</div>
            <div className="float-chip chip-2"><Zap size={16} /> High-performance APIs</div>
            <div className="float-chip chip-3"><Users size={16} /> Mentor & team lead</div>
          </motion.div>
        </div>
        <div className="scroll-hint"><div className="mouse" />scroll</div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    </>
  )
}
