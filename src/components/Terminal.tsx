import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, quests, inventory, trophies, origin, badges, resumes, bonus } from '../data'

type Line = { kind: 'in' | 'out' | 'err' | 'sys'; text: string }
type Commands = Record<string, { desc: string; run: (args: string[]) => Line[] | void }>

const banner = `
 █████╗ ██████╗  █████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗████╗  ██║
███████║██║  ██║███████║██╔██╗ ██║
██╔══██║██║  ██║██╔══██║██║╚██╗██║
██║  ██║██████╔╝██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
 ADAN.EXE v9.0 · ${profile.name}
 Type "help" to list commands. Insert coin to continue.`

const rocket = `
        /\\
       /  \\
      |    |
      | AF |
      |    |
     /|    |\\
    / |    | \\
   /__|____|__\\
      |    |
      (~~~~)
       ~~~~     Shipping since 2017.`

const pad = (s: string, n: number) => s + ' '.repeat(Math.max(0, n - s.length))

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([{ kind: 'sys', text: banner }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const commands: Commands = useMemo(() => ({
    help: { desc: 'List commands', run: (): Line[] => [{ kind: 'out', text: Object.entries(commands).filter(([, v]) => v.desc).map(([k, v]) => `  ${pad(k, 12)} ${v.desc}`).join('\n') + '\n\n  ↑/↓ history · Tab autocomplete · Esc close · hidden commands exist.' }] },
    whoami: { desc: 'Player 1', run: () => [{ kind: 'out', text: `${profile.name}\n${profile.roles.join(' · ')}\n${profile.location}\n\n${profile.about[0]}` }] },
    about: { desc: 'The longer version', run: () => [{ kind: 'out', text: profile.about.join('\n\n') }] },
    quests: {
      desc: 'Work history (try: quests ironsail)',
      run: (args) => {
        const q = args.join(' ').toLowerCase()
        const list = q ? quests.filter((e) => e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)) : quests
        if (!list.length) return [{ kind: 'err', text: `No quest matching "${q}".` }]
        return list.map((e) => ({ kind: 'out' as const, text: `[${e.status}] ${e.role} @ ${e.company}  (${e.period})\n${q ? e.objectives.map((h) => '  • ' + h).join('\n') : '  ' + e.objectives[0]}\n  loot: ${e.loot.join(', ')}` }))
      },
    },
    inventory: { desc: 'Skills by category', run: () => [{ kind: 'out', text: inventory.map((g) => `${g.tab} · ${g.title}\n  ${g.items.join(' · ')}`).join('\n\n') }] },
    trophies: { desc: 'Achievements', run: () => [{ kind: 'out', text: trophies.map((t) => `  🏆 ${t.name}: ${t.text}`).join('\n') }] },
    origin: { desc: 'Education & badges', run: () => [{ kind: 'out', text: `${origin.degree}\n${origin.school}\n${origin.honors.map((h) => '  • ' + h).join('\n')}\n\nBadges\n${badges.map((c) => `  • ${c.name} — ${c.issuer} (${c.date})`).join('\n')}` }] },
    bonus: { desc: 'Life outside the terminal', run: () => [{ kind: 'out', text: bonus.items.map((i) => `  ${pad(i.title, 24)} ${i.text}`).join('\n') + '\n\nHouse rules\n' + bonus.rules.map((h) => '  ▶ ' + h).join('\n') }] },
    contact: { desc: 'How to reach me', run: () => [{ kind: 'out', text: `email     ${profile.email}\nlinkedin  ${profile.linkedin}\ngithub    ${profile.github}\nlocation  ${profile.location}` }] },
    resume: { desc: 'Download resume (resume ai for the AI one)', run: (args) => { const r = args[0] === 'ai' ? resumes[1] : resumes[0]; window.open(r.file, '_blank'); return [{ kind: 'out', text: `Loading ${r.label}...` }] } },
    hire: { desc: 'Insert coin', run: () => { window.location.href = `mailto:${profile.email}?subject=Let's work together`; return [{ kind: 'out', text: 'COIN ACCEPTED. Opening your mail client...' }] } },
    clear: { desc: 'Clear the screen', run: () => { setLines([]) } },
    exit: { desc: 'Close the terminal', run: () => { onClose() } },
    ls: { desc: '', run: () => [{ kind: 'out', text: 'about.md  quests/  inventory.json  resume.pdf  contact.txt  .secrets  save1.sav  save2.sav' }] },
    cat: {
      desc: '',
      run: (args) => {
        const f = args[0] ?? ''
        if (f.startsWith('about')) return commands.about.run([]) as Line[]
        if (f.startsWith('contact')) return commands.contact.run([]) as Line[]
        if (f.startsWith('inventory')) return commands.inventory.run([]) as Line[]
        if (f === '.secrets') return [{ kind: 'out', text: 'Coffee first. Then code. Always ship. Nerf blaster within reach at all times.' }]
        if (f.endsWith('.sav')) return [{ kind: 'out', text: 'SAVE FILE: Adan · LV 09 · Team Lead · Play time: 9 years · Continues used: 0' }]
        return [{ kind: 'err', text: `cat: ${f || 'file'}: No such file or directory` }]
      },
    },
    pwd: { desc: '', run: () => [{ kind: 'out', text: '/home/adan/arcade' }] },
    sudo: { desc: '', run: () => [{ kind: 'err', text: 'Nice try. This user is not in the sudoers file. This incident will be reported to HR (kidding).' }] },
    rm: { desc: '', run: () => [{ kind: 'err', text: 'rm: refusing to delete a perfectly good portfolio.' }] },
    vim: { desc: '', run: () => [{ kind: 'out', text: 'You are now trapped in vim. Type "exit" to escape (it works here, unlike real vim).' }] },
    konami: { desc: '', run: () => [{ kind: 'sys', text: '↑ ↑ ↓ ↓ ← → ← → B A\n30 lives granted. Use them to ship something.' }] },
    rocket: { desc: '', run: () => [{ kind: 'sys', text: rocket }] },
    coffee: { desc: '', run: () => [{ kind: 'out', text: '☕ Brewing... done. Productivity +100%.' }] },
  }), [onClose])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    const [name, ...args] = cmd.split(/\s+/)
    const entry = commands[name.toLowerCase()]
    const out: Line[] = entry ? (entry.run(args) ?? []) : [{ kind: 'err', text: `command not found: ${name}. Type "help".` }]
    if (name.toLowerCase() !== 'clear') setLines((l) => [...l, { kind: 'in', text: cmd }, ...out])
    setHistory((h) => [cmd, ...h].slice(0, 50))
    setCursor(-1)
    setInput('')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(input)
    else if (e.key === 'ArrowUp') { e.preventDefault(); const c = Math.min(cursor + 1, history.length - 1); setCursor(c); setInput(history[c] ?? '') }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const c = Math.max(cursor - 1, -1); setCursor(c); setInput(c === -1 ? '' : history[c]) }
    else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(commands).filter((k) => k.startsWith(input.toLowerCase()) && commands[k].desc)
      if (match.length === 1) setInput(match[0] + ' ')
      else if (match.length > 1) setLines((l) => [...l, { kind: 'out', text: match.join('  ') }])
    }
  }

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }) }, [lines, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="term-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={onClose}>
          <motion.div className="term crt" initial={{ scaleY: 0.02, opacity: 0.6 }} animate={{ scaleY: 1, opacity: 1 }} exit={{ scaleY: 0.02, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} onClick={(e) => { e.stopPropagation(); inputRef.current?.focus() }}>
            <div className="term-bar">
              <span>ADAN.EXE — TERMINAL</span>
              <button onClick={onClose} aria-label="Close">[X]</button>
            </div>
            <div className="term-body" ref={bodyRef}>
              {lines.map((l, i) => (
                <div key={i} className={`term-line ${l.kind}`}>{l.kind === 'in' && <span className="term-prompt">&gt; </span>}{l.text}</div>
              ))}
              <div className="term-input">
                <span className="term-prompt">&gt; </span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} spellCheck={false} autoComplete="off" aria-label="Terminal input" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
