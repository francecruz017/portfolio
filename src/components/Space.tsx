import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, frame = 0, last = 0
    type Star = { x: number; y: number; r: number; a: number; s: number; hue: number }
    type Shot = { x: number; y: number; vx: number; vy: number; life: number; len: number }
    let stars: Star[] = []
    let shots: Shot[] = []

    const resize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio
      h = canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.floor((window.innerWidth * window.innerHeight) / 3200)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() < 0.9 ? Math.random() * 0.9 + 0.3 : Math.random() * 1.6 + 1.2) * devicePixelRatio,
        a: Math.random() * Math.PI * 2, s: Math.random() * 1.5 + 0.4,
        hue: [0, 0, 0, 200, 260, 40][Math.floor(Math.random() * 6)],
      }))
    }

    const draw = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.a += dt * s.s
        const tw = 0.55 + Math.sin(s.a) * 0.45
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.hue ? `hsla(${s.hue}, 80%, 85%, ${tw})` : `rgba(255,255,255,${tw})`
        ctx.fill()
        if (s.r > 1.4 * devicePixelRatio) {
          ctx.strokeStyle = `rgba(255,255,255,${tw * 0.35})`
          ctx.lineWidth = devicePixelRatio * 0.6
          const g = s.r * 3.2
          ctx.beginPath(); ctx.moveTo(s.x - g, s.y); ctx.lineTo(s.x + g, s.y); ctx.moveTo(s.x, s.y - g); ctx.lineTo(s.x, s.y + g); ctx.stroke()
        }
      }
      if (Math.random() < dt * 0.35 && shots.length < 3) {
        const speed = (900 + Math.random() * 500) * devicePixelRatio
        const ang = Math.PI / 4 + (Math.random() - 0.5) * 0.4
        shots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, life: 1, len: (140 + Math.random() * 120) * devicePixelRatio })
      }
      shots = shots.filter((s) => s.life > 0)
      for (const s of shots) {
        s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 1.4
        const n = Math.hypot(s.vx, s.vy)
        const tx = s.x - (s.vx / n) * s.len, ty = s.y - (s.vy / n) * s.len
        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty)
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`)
        grad.addColorStop(0.3, `rgba(160,200,255,${s.life * 0.5})`)
        grad.addColorStop(1, 'rgba(160,200,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2 * devicePixelRatio
        ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke()
      }
      frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="starfield" />
}

type PlanetProps = {
  size: number
  colors: [string, string]
  ring?: string
  craters?: boolean
  glow?: string
  className?: string
  style?: React.CSSProperties
  parallax?: number
}

export function Planet({ size, colors, ring, craters, glow, className, style, parallax = 0 }: PlanetProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 3000], [0, -3000 * parallax])
  const id = useRef(`p${Math.random().toString(36).slice(2, 8)}`).current
  return (
    <motion.div className={`planet ${className ?? ''}`} style={{ width: size, height: size, y, ...style }} aria-hidden>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: 'visible', filter: glow ? `drop-shadow(0 0 ${size / 6}px ${glow})` : undefined }}>
        <defs>
          <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor={colors[0]} />
            <stop offset="1" stopColor={colors[1]} />
          </radialGradient>
          <radialGradient id={`${id}-s`} cx="70%" cy="75%" r="70%">
            <stop offset="0.4" stopColor="rgba(0,0,0,0)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>
          <clipPath id={`${id}-c`}><circle cx="100" cy="100" r="80" /></clipPath>
        </defs>
        {ring && <ellipse cx="100" cy="100" rx="150" ry="34" fill="none" stroke={ring} strokeWidth="14" strokeOpacity="0.35" transform="rotate(-18 100 100)" style={{ clipPath: 'inset(0 0 50% 0)' }} />}
        <circle cx="100" cy="100" r="80" fill={`url(#${id}-b)`} />
        {craters && (
          <g clipPath={`url(#${id}-c)`} fill="rgba(0,0,0,0.18)">
            <circle cx="70" cy="80" r="14" /><circle cx="125" cy="120" r="20" /><circle cx="110" cy="60" r="8" /><circle cx="60" cy="130" r="9" />
          </g>
        )}
        {!craters && (
          <g clipPath={`url(#${id}-c)`} fill="rgba(255,255,255,0.12)">
            <ellipse cx="100" cy="70" rx="110" ry="9" /><ellipse cx="100" cy="112" rx="110" ry="6" /><ellipse cx="100" cy="140" rx="110" ry="10" />
          </g>
        )}
        <circle cx="100" cy="100" r="80" fill={`url(#${id}-s)`} />
        {ring && <ellipse cx="100" cy="100" rx="150" ry="34" fill="none" stroke={ring} strokeWidth="14" strokeOpacity="0.55" transform="rotate(-18 100 100)" style={{ clipPath: 'inset(50% 0 0 0)' }} />}
      </svg>
    </motion.div>
  )
}

export function Rocket({ size = 64, className, style, flame = true }: { size?: number; className?: string; style?: React.CSSProperties; flame?: boolean }) {
  return (
    <svg className={className} style={style} width={size} height={size * 1.6} viewBox="0 0 80 128" aria-hidden>
      <defs>
        <linearGradient id="rk-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f5f7ff" /><stop offset="0.5" stopColor="#dfe3f4" /><stop offset="1" stopColor="#9aa2c0" />
        </linearGradient>
        <linearGradient id="rk-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b70ff" /><stop offset="1" stopColor="#5b3fd6" />
        </linearGradient>
        <radialGradient id="rk-win" cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#9ff0ff" /><stop offset="1" stopColor="#0d8fb0" />
        </radialGradient>
        <linearGradient id="rk-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6c2" /><stop offset="0.35" stopColor="#ffb84d" /><stop offset="1" stopColor="#ff4d6d" stopOpacity="0" />
        </linearGradient>
      </defs>
      {flame && (
        <g className="rk-flame">
          <path d="M28 96 Q40 130 52 96 Z" fill="url(#rk-flame)" />
          <path d="M33 96 Q40 118 47 96 Z" fill="#fff8d6" opacity="0.9" />
        </g>
      )}
      <path d="M12 92 L26 70 L26 96 Z" fill="url(#rk-fin)" />
      <path d="M68 92 L54 70 L54 96 Z" fill="url(#rk-fin)" />
      <path d="M40 4 C60 24 60 60 54 96 L26 96 C20 60 20 24 40 4 Z" fill="url(#rk-body)" />
      <path d="M40 4 C30 16 25 30 24 46 L27 46 C28 32 32 18 40 6 Z" fill="#fff" opacity="0.6" />
      <path d="M40 4 C52 18 58 40 56 60 L58 60 C60 40 54 18 40 4 Z" fill="#6f7899" opacity="0.5" />
      <circle cx="40" cy="44" r="10" fill="#2a2f4a" />
      <circle cx="40" cy="44" r="7.5" fill="url(#rk-win)" />
      <circle cx="37" cy="41" r="2" fill="#fff" opacity="0.8" />
      <rect x="27" y="86" width="26" height="6" rx="2" fill="#5b3fd6" />
      <path d="M32 96 L48 96 L46 102 L34 102 Z" fill="#3b3f5c" />
    </svg>
  )
}

export function TimelineRocket({ progress }: { progress: MotionValue<number> }) {
  const smooth = useSpring(progress, { stiffness: 80, damping: 22, mass: 0.4 })
  const top = useTransform(smooth, [0, 1], ['0%', '100%'])
  return (
    <motion.div className="timeline-rocket" style={{ top }} aria-hidden>
      <Rocket size={30} style={{ transform: 'rotate(180deg)' }} />
    </motion.div>
  )
}
