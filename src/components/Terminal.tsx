import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, experience, skills, achievements, education, certifications, resumes, personal } from '../data'

type Line = { kind: 'in' | 'out' | 'err' | 'sys'; text: string }

const banner = `
   ▄▀█ █▀▀ █▀▀   ░ █▀ █░█ █▀▀ █░░ █░░
   █▀█ █▀░ █▄▄   ▄ ▄█ █▀█ ██▄ █▄▄ █▄▄

   ${profile.name} · Software Engineer / Team Lead
   Type "help" to see available commands.`

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
       ~~~~     Launching career-defining products since 2017.`

const pad = (s: string, n: number) => s + ' '.repeat(Math.max(0, n - s.length))
type Commands = Record<string, { desc: string; run: (args: string[]) => Line[] | void }>

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([{ kind: 'sys', text: banner }])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const commands: Commands = useMemo(() => ({
    help: {
      desc: 'List available commands',
      run: (): Line[] => [{ kind: 'out', text: Object.entries(commands).filter(([, v]) => v.desc).map(([k, v]) => `  ${pad(k, 12)} ${v.desc}`).join('\n') + '\n\n  Tip: ↑/↓ for history, Tab to autocomplete, Esc to close. There are hidden commands too.' }],
    },
    whoami: {
      desc: 'Who is this?',
      run: () => [{ kind: 'out', text: `${profile.name}\n${profile.roles.join(' · ')}\n${profile.location}\n\n${profile.summary[0]}` }],
    },
    about: { desc: 'Professional summary', run: () => [{ kind: 'out', text: profile.summary.join('\n\n') }] },
    experience: {
      desc: 'Work history (try: experience ironsail)',
      run: (args) => {
        const q = args.join(' ').toLowerCase()
        const list = q ? experience.filter((e) => e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)) : experience
        if (!list.length) return [{ kind: 'err', text: `No role matching "${q}".` }]
        return list.map((e) => ({
          kind: 'out' as const,
          text: `${e.role} @ ${e.company}  [${e.period}]\n${q ? e.highlights.map((h) => '  • ' + h).join('\n') : '  ' + e.highlights[0]}\n  stack: ${e.stack.join(', ')}`,
        }))
      },
    },
    skills: {
      desc: 'Technical skills by category',
      run: () => [{ kind: 'out', text: skills.map((g) => `${g.title}\n  ${g.items.join(' · ')}`).join('\n\n') }],
    },
    achievements: { desc: 'Key achievements', run: () => [{ kind: 'out', text: achievements.map((a) => `  ✦ ${a.title}: ${a.text}`).join('\n') }] },
    education: {
      desc: 'Education & certifications',
      run: () => [{ kind: 'out', text: `${education.degree}\n${education.school}\n${education.honors.map((h) => '  • ' + h).join('\n')}\n\nCertifications\n${certifications.map((c) => `  • ${c.name} — ${c.issuer} (${c.date})`).join('\n')}` }],
    },
    hobbies: { desc: 'Life outside the terminal', run: () => [{ kind: 'out', text: personal.items.map((i) => `  ${pad(i.title, 24)} ${i.text}`).join('\n') + '\n\nHow I work\n' + personal.howIWork.map((h) => '  ✦ ' + h).join('\n') }] },
    contact: { desc: 'How to reach me', run: () => [{ kind: 'out', text: `email     ${profile.email}\nlinkedin  ${profile.linkedin}\nlocation  ${profile.location}` }] },
    resume: {
      desc: 'Download resume (resume ai for the AI-focused one)',
      run: (args) => {
        const r = args[0] === 'ai' ? resumes[1] : resumes[0]
        window.open(r.file, '_blank')
        return [{ kind: 'out', text: `Opening ${r.label}...` }]
      },
    },
    hire: {
      desc: 'Start a conversation',
      run: () => {
        window.location.href = `mailto:${profile.email}?subject=Let's work together`
        return [{ kind: 'out', text: 'Great choice. Opening your mail client...' }]
      },
    },
    linkedin: { desc: 'Open LinkedIn profile', run: () => { window.open(profile.linkedin, '_blank'); return [{ kind: 'out', text: 'Opening LinkedIn...' }] } },
    clear: { desc: 'Clear the screen', run: () => { setLines([]); } },
    exit: { desc: 'Close the terminal', run: () => { onClose() } },
    ls: { desc: '', run: () => [{ kind: 'out', text: 'about.md  experience/  skills.json  resume.pdf  contact.txt  .secrets' }] },
    cat: {
      desc: '',
      run: (args) => {
        const f = args[0] ?? ''
        if (f.startsWith('about')) return commands.about.run([]) as Line[]
        if (f.startsWith('contact')) return commands.contact.run([]) as Line[]
        if (f.startsWith('skills')) return commands.skills.run([]) as Line[]
        if (f === '.secrets') return [{ kind: 'out', text: 'Coffee first. Then code. Always ship. Nerf gun within reach at all times.' }]
        return [{ kind: 'err', text: `cat: ${f || 'file'}: No such file or directory` }]
      },
    },
    pwd: { desc: '', run: () => [{ kind: 'out', text: '/home/adan/portfolio' }] },
    sudo: { desc: '', run: () => [{ kind: 'err', text: 'Nice try. This user is not in the sudoers file. This incident will be reported to HR (kidding).' }] },
    rm: { desc: '', run: () => [{ kind: 'err', text: 'rm: refusing to delete a perfectly good portfolio.' }] },
    vim: { desc: '', run: () => [{ kind: 'out', text: 'You are now trapped in vim. Type "exit" to escape (it works here, unlike real vim).' }] },
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

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="term-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="term"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => { e.stopPropagation(); inputRef.current?.focus() }}
          >
            <div className="code-bar">
              <span style={{ background: '#ff5f57', cursor: 'pointer' }} onClick={onClose} /><span style={{ background: '#febc2e' }} /><span style={{ background: '#28c840' }} />
              <span className="name">adan@portfolio: ~</span>
            </div>
            <div className="term-body" ref={bodyRef}>
              {lines.map((l, i) => (
                <div key={i} className={`term-line ${l.kind}`}>
                  {l.kind === 'in' && <span className="term-prompt">❯ </span>}
                  {l.text}
                </div>
              ))}
              <div className="term-input">
                <span className="term-prompt">❯ </span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} spellCheck={false} autoComplete="off" aria-label="Terminal input" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
