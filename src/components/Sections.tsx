import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { profile, hud, moves, quests, inventory, trophies, origin, badges, bonus, resumes } from '../data'
import { Reveal } from './Effects'
import { Icon } from './Icons'
import { Pixel } from './Pixel'
import { avatar, trophy as trophyMap } from '../pixel'
import { TimelineShip } from './Space'
import { sfx } from '../sound'

function Head({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="section-head">
        <div className="tag">{tag}</div>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
    </Reveal>
  )
}

export function Hud() {
  return (
    <div className="container">
      <div className="hud-tiles">
        {hud.map((h, i) => (
          <Reveal key={h.label} delay={i * 0.08}>
            <div className="hud-tile">
              <div className="hud-label">{h.label}</div>
              <div className="hud-value">{h.value}</div>
              <div className="hud-bar"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'linear' }} /></div>
              <div className="hud-note">{h.note}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Profile() {
  return (
    <section className="section" id="profile">
      <div className="container">
        <Head tag="CHARACTER" title="PLAYER PROFILE" />
        <div className="profile-grid">
          <Reveal>
            <div className="char-card">
              <div className="char-frame"><Pixel map={avatar} scale={9} /></div>
              <div className="char-plate">
                <b>ADAN</b> <span>LV 09 · TEAM LEAD</span>
                <small>{profile.location}</small>
              </div>
            </div>
          </Reveal>
          <div className="profile-text">
            {profile.about.map((p, i) => <Reveal key={i} delay={0.05 + i * 0.06}><p>{p}</p></Reveal>)}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="tag" style={{ marginTop: '3rem' }}>SPECIAL MOVES</div>
        </Reveal>
        <div className="moves">
          {moves.map((m, i) => (
            <Reveal key={m.name} delay={0.1 + i * 0.06}>
              <div className="move" onMouseEnter={sfx.blip}>
                <Icon name={m.icon} scale={5} />
                <div><h4>{m.name}</h4><p>{m.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Quests() {
  const [open, setOpen] = useState<number | null>(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 55%', 'end 55%'] })
  return (
    <section className="section" id="quests">
      <div className="container">
        <Head tag="LOG" title="QUEST LOG" sub="Six stages so far. Storefronts first, then enterprise systems, then car sales at scale, and now healthcare, where every bug has a compliance officer." />
        <div className="quests" ref={ref}>
          <div className="quest-path" />
          <TimelineShip progress={scrollYProgress} />
          {quests.map((q, i) => {
            const isOpen = open === i
            const n = String(quests.length - i).padStart(2, '0')
            return (
              <Reveal key={q.company} delay={i * 0.05}>
                <div className="quest" style={{ '--qc': q.color } as React.CSSProperties}>
                  <div className={`quest-card ${isOpen ? 'open' : ''}`}>
                    <button className="quest-head" onClick={() => { setOpen(isOpen ? null : i); sfx.select() }} onMouseEnter={sfx.blip} aria-expanded={isOpen}>
                      <div className="quest-meta">
                        <span className={`stamp ${q.status === 'IN PROGRESS' ? 'live' : ''}`}>{q.status}</span>
                        <span className="quest-n">QUEST {n}</span>
                        <span className="quest-world">{q.world}</span>
                      </div>
                      <h3>{q.role}</h3>
                      <div className="quest-sub"><b>{q.company}</b> <span>{q.period}</span></div>
                      <span className="quest-toggle">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                          <div className="quest-body">
                            <div className="tag small">OBJECTIVES</div>
                            <ul>{q.objectives.map((o) => <li key={o}><span className="chk">{q.status === 'COMPLETE' ? '☑' : '◆'}</span>{o}</li>)}</ul>
                            <div className="tag small">LOOT</div>
                            <div className="loot">{q.loot.map((l) => <span key={l}>{l}</span>)}</div>
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

export function Inventory() {
  const [tab, setTab] = useState(0)
  const cur = inventory[tab]
  return (
    <section className="section" id="inventory">
      <div className="container">
        <Head tag="ITEMS" title="INVENTORY" sub="Backend-first, fluent across the frontend, and an early adopter of the AI tools that are now part of the daily loop." />
        <Reveal>
          <div className="inv">
            <div className="inv-tabs" role="tablist">
              {inventory.map((g, i) => (
                <button key={g.tab} role="tab" aria-selected={i === tab} className={i === tab ? 'active' : ''} onClick={() => { setTab(i); sfx.select() }} onMouseEnter={sfx.blip}>
                  <span className="cursor">▶</span><Icon name={g.icon} scale={2} /> {g.tab}
                </button>
              ))}
            </div>
            <div className="inv-panel">
              <div className="inv-title"><Icon name={cur.icon} scale={4} /><div><b>{cur.tab}</b><span>{cur.title}</span></div></div>
              <AnimatePresence mode="wait">
                <motion.div key={cur.tab} className="inv-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                  {cur.items.map((it, i) => (
                    <motion.div key={it} className="slot" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.15 }} onMouseEnter={sfx.blip}>
                      {it}
                    </motion.div>
                  ))}
                  {Array.from({ length: Math.max(0, 12 - cur.items.length) }).map((_, i) => <div key={`e${i}`} className="slot empty" />)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Trophies() {
  return (
    <section className="section" id="trophies">
      <div className="container">
        <Head tag="UNLOCKED" title="ACHIEVEMENTS" />
        <div className="trophy-grid">
          {trophies.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="trophy" onMouseEnter={sfx.blip}>
                <Pixel map={trophyMap} scale={5} />
                <div><div className="unlocked">UNLOCKED</div><h4>{t.name}</h4><p>{t.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="origin-grid">
          <Reveal delay={0.1}>
            <div className="origin">
              <div className="tag small">ORIGIN STORY</div>
              <h4>{origin.degree}</h4>
              <p>{origin.school}</p>
              <ul>{origin.honors.map((h) => <li key={h}>★ {h}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="badges">
              <div className="tag small">BADGES</div>
              {badges.map((b) => (
                <div className="badge" key={b.name}><Icon name="shield" scale={3} /><div><b>{b.name}</b><span>{b.issuer} · {b.date}</span></div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Bonus() {
  return (
    <section className="section" id="bonus">
      <div className="container">
        <Head tag="OFF THE CLOCK" title="BONUS STAGE" sub={bonus.intro} />
        <div className="bonus-grid">
          {bonus.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="bonus-card" onMouseEnter={sfx.blip}>
                <Icon name={b.icon} scale={5} />
                <h4>{b.title}</h4>
                <p>{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="rules">
            <div className="tag small">HOUSE RULES</div>
            <div className="rules-list">{bonus.rules.map((r) => <span key={r}>▶ {r}</span>)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Countdown() {
  const [n, setN] = useState(9)
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v === 0 ? 9 : v - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  return <div className={`countdown ${n <= 3 ? 'urgent' : ''}`}>{n}</div>
}

export function Continue() {
  return (
    <section className="section" id="continue">
      <div className="container">
        <Reveal>
          <div className="continue">
            <div className="continue-top">
              <div>
                <div className="tag">GAME OVER?</div>
                <h2 className="continue-title">CONTINUE?</h2>
              </div>
              <Countdown />
            </div>
            <div className="continue-grid">
              <div>
                <p className="continue-text">Hiring a team lead or a senior backend engineer? Need someone to own the integrations nobody else wants to touch? Insert coin. I reply fast.</p>
                <div className="continue-actions">
                  <a className="pbtn pbtn-primary" href={`mailto:${profile.email}`} onMouseEnter={sfx.blip} onClick={sfx.coin}>INSERT COIN · EMAIL ME</a>
                  {resumes.map((r) => <a key={r.file} className="pbtn" href={r.file} download onMouseEnter={sfx.blip} onClick={sfx.select}>{r.label}</a>)}
                </div>
              </div>
              <div className="contact-list">
                <a className="contact-row" href={`mailto:${profile.email}`} onMouseEnter={sfx.blip}><small>EMAIL</small><span>{profile.email}</span></a>
                <a className="contact-row" href={profile.linkedin} target="_blank" rel="noreferrer" onMouseEnter={sfx.blip}><small>LINKEDIN</small><span>linkedin.com/in/adan-france-cruz ↗</span></a>
                <a className="contact-row" href={profile.github} target="_blank" rel="noreferrer" onMouseEnter={sfx.blip}><small>GITHUB</small><span>github.com/francecruz017 ↗</span></a>
                <div className="contact-row"><small>LOCATION</small><span>{profile.location}</span></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
