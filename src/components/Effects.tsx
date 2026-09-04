import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function Backdrop() {
  return (
    <>
      <div className="backdrop">
        <div className="grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="noise" />
    </>
  )
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, frame = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x - 260}px, ${y - 260}px)`
      frame = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    frame = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} className="cursor-glow" style={{ transform: 'translate(-50%, -50%)' }} />
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return <motion.div className="progress-bar" style={{ scaleX }} />
}

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, frame = 0
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number }
    let points: P[] = []

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = canvas.width = rect.width * devicePixelRatio
      h = canvas.height = rect.height * devicePixelRatio
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      const count = Math.min(140, Math.floor((rect.width * rect.height) / 11000))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35 * devicePixelRatio, vy: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
        r: (Math.random() * 1.4 + 0.6) * devicePixelRatio, hue: Math.random() > 0.5 ? 255 : 190,
      }))
    }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * devicePixelRatio
      mouse.y = (e.clientY - rect.top) * devicePixelRatio
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const link = 130 * devicePixelRatio
      for (const p of points) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy)
        if (d < 180 * devicePixelRatio) { p.x -= dx * 0.008; p.y -= dy * 0.008 }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, 0.9)`
        ctx.fill()
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < link) {
            ctx.strokeStyle = `rgba(140, 130, 255, ${(1 - d / link) * 0.28})`
            ctx.lineWidth = devicePixelRatio * 0.8
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const a = points[i]
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < link * 1.6) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dm / (link * 1.6)) * 0.5})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

export function Reveal({ children, delay = 0, y = 28, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-2px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.35s', ...style }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}

export function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
      {children}
    </div>
  )
}
