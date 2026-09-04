import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Award, BadgeCheck, Bot, ChevronDown, Cpu, CreditCard, GraduationCap, Layers, MapPin, Mail, Linkedin, Download, ArrowUpRight, Heart, Guitar, Music, Sparkles, Gamepad2, Target, Quote, type LucideIcon } from 'lucide-react'
import { profile, stats, experience, skills, achievements, education, certifications, services, resumes, personal } from '../data'
import { useCountUp } from '../hooks/useCountUp'
import { Reveal, TiltCard, Magnetic } from './Effects'
import { Rocket, TimelineRocket } from './Space'

function Stat({ value, suffix, label, i }: { value: number | string; suffix: string; label: string; i: number }) {
  const { ref, value: v } = useCountUp(typeof value === 'number' ? value : 0)
  return (
    <Reveal delay={i * 0.08}>
      <div className="stat">
        <div className="stat-value gradient-text"><span ref={ref}>{typeof value === 'number' ? v : value}</span>{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
    </Reveal>
  )
}

export function Stats() {
  return (
    <div className="container">
      <div className="stats">
        {stats.map((s, i) => <Stat key={s.label} {...s} i={i} />)}
      </div>
    </div>
  )
}

const serviceIcons = [Layers, CreditCard, Cpu, Bot]

export function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">About</span>
              <h2 className="section-title">Engineering leader with a <span className="gradient-text">builder's</span> mindset.</h2>
            </div>
          </Reveal>
          <div className="about-text">
            {profile.summary.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}><p>{p}</p></Reveal>
            ))}
            <Reveal delay={0.35}>
              <p>Currently leading technical direction at <strong>IronSail</strong> on Impetus One, a healthcare platform where <strong>e-prescribing, payments, and compliance</strong> all have to work flawlessly together.</p>
            </Reveal>
          </div>
        </div>
        <div className="services">
          {services.map((s, i) => {
            const Icon = serviceIcons[i]
            return (
              <Reveal key={s.title} delay={0.15 + i * 0.1}>
                <div className="service">
                  <div className="service-icon"><Icon size={22} /></div>
                  <div><h4>{s.title}</h4><p>{s.text}</p></div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  const [open, setOpen] = useState<number | null>(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 60%', 'end 60%'] })
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Experience</span>
            <h2 className="section-title">Nine years of <span className="gradient-text">shipping</span>.</h2>
            <p className="section-sub">From e-commerce storefronts to compliance-sensitive healthcare platforms, each role added depth in architecture, integrations, and leadership.</p>
          </div>
        </Reveal>
        <div className="timeline" ref={timelineRef}>
          <motion.div className="timeline-line" style={{ scaleY: scrollYProgress }} />
          <TimelineRocket progress={scrollYProgress} />
          {experience.map((e, i) => {
            const isOpen = open === i
            return (
              <Reveal key={e.company} delay={i * 0.06}>
                <div className="exp" style={{ '--dot': e.color } as React.CSSProperties}>
                  <div className="exp-dot" />
                  <div className={`exp-card ${isOpen ? 'open' : ''}`}>
                    <div className="exp-head" onClick={() => setOpen(isOpen ? null : i)} role="button" aria-expanded={isOpen}>
                      <div>
                        <h3>{e.role}</h3>
                        <div className="exp-meta">
                          <span className="exp-company">{e.company}</span>
                          <span className="exp-domain">{e.domain}</span>
                          <span className="exp-period">{e.period}</span>
                        </div>
                      </div>
                      <div className="exp-toggle"><ChevronDown size={18} /></div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                          <div className="exp-body">
                            <ul>{e.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                            <div className="tags">{e.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Skills</span>
            <h2 className="section-title">A <span className="gradient-text">full-stack</span> toolkit, backend-first.</h2>
            <p className="section-sub">Deep in PHP and its ecosystem, fluent across modern frontend, and an early adopter of agentic AI development.</p>
          </div>
        </Reveal>
        <div className="skills-grid">
          {skills.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07}>
              <TiltCard className="skill-card" style={{ '--accent': g.accent } as React.CSSProperties}>
                <h3><i />{g.title}</h3>
                <div className="tags">
                  {g.items.map((s) => <span className="skill-chip" key={s}>{s}</span>)}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Highlights() {
  return (
    <section className="section" id="highlights">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Highlights</span>
            <h2 className="section-title">Results, credentials, and <span className="gradient-text">recognition</span>.</h2>
          </div>
        </Reveal>
        <div className="highlights">
          <div className="ach-grid">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="ach">
                  <div className="ach-glow" />
                  <div className="ach-num">0{i + 1}</div>
                  <h4>{a.title}</h4>
                  <p>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="edu-col">
            <Reveal delay={0.1}>
              <div className="edu">
                <span className="eyebrow" style={{ color: 'var(--primary)' }}><GraduationCap size={14} /> Education</span>
                <h4>{education.degree}</h4>
                <p className="school">{education.school}</p>
                <ul>{education.honors.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            </Reveal>
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={0.2 + i * 0.08}>
                <div className="cert">
                  <div className="cert-icon">{i === 0 ? <BadgeCheck size={20} /> : <Award size={20} />}</div>
                  <div><b>{c.name}</b><span>{c.issuer} · {c.date}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="contact-wrap">
            <div className="orbit-deco" style={{ width: 420, height: 420, right: -120, top: -160 }} />
            <div className="contact-rocket"><Rocket size={72} /></div>
            <div className="contact-grid">
              <div>
                <span className="eyebrow">Contact</span>
                <h2>Let's build something <span className="gradient-text">worth shipping</span>.</h2>
                <p>Hiring for a senior backend engineer or team lead? Need a partner who can own architecture, integrations, and delivery? Reach out and let's talk.</p>
                <div className="resume-links">
                  <Magnetic><a className="btn btn-primary" href={`mailto:${profile.email}`}><Mail size={17} /> Email me</a></Magnetic>
                  {resumes.map((r) => (
                    <Magnetic key={r.file}><a className="btn" href={r.file} download><Download size={17} /> {r.label}</a></Magnetic>
                  ))}
                </div>
              </div>
              <div className="contact-list">
                <a className="contact-item" href={`mailto:${profile.email}`}>
                  <div className="ci"><Mail size={19} /></div>
                  <div><small>Email</small><span>{profile.email}</span></div>
                </a>
                <a className="contact-item" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <div className="ci"><Linkedin size={19} /></div>
                  <div><small>LinkedIn</small><span>linkedin.com/in/adan-france-cruz <ArrowUpRight size={14} style={{ verticalAlign: '-2px' }} /></span></div>
                </a>
                <div className="contact-item">
                  <div className="ci"><MapPin size={19} /></div>
                  <div><small>Location</small><span>{profile.location}</span></div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const personalIcons: Record<string, LucideIcon> = { family: Heart, guitar: Guitar, music: Music, marvel: Sparkles, games: Gamepad2, focus: Target }

export function Personal() {
  return (
    <section className="section" id="life">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Beyond the code</span>
            <h2 className="section-title">Dad, guitarist, <span className="gradient-text">player one</span>.</h2>
            <p className="section-sub">{personal.intro}</p>
          </div>
        </Reveal>
        <div className="life-grid">
          {personal.items.map((it, i) => {
            const Icon = personalIcons[it.icon]
            return (
              <Reveal key={it.title} delay={i * 0.07}>
                <TiltCard className="life-card" style={{ '--accent': ['#f472b6', '#fbbf24', '#22d3ee', '#ef4444', '#34d399', '#7c5cff'][i] } as React.CSSProperties}>
                  <div className="life-icon"><Icon size={22} /></div>
                  <h4>{it.title}</h4>
                  <p>{it.text}</p>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.2}>
          <div className="how-i-work">
            <Quote size={20} />
            <div>
              <span className="eyebrow" style={{ color: 'var(--primary)' }}>How I work</span>
              <div className="how-list">
                {personal.howIWork.map((h) => <span key={h}>{h}</span>)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
