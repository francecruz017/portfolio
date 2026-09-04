import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { Pixel } from './Pixel'
import { ringedPlanet, bluePlanet, moon, redPlanet, rocketFrames, flipY } from '../pixel'

export function PixelStarfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, frame = 0, last = 0, acc = 0
    const unit = 2 * devicePixelRatio
    type Star = { x: number; y: number; s: number; level: number; rate: number; t: number; c: string }
    type Shot = { x: number; y: number; life: number }
    let stars: Star[] = []
    let shots: Shot[] = []
    const colors = ['#ffffff', '#ffffff', '#ffffff', '#c9d6ff', '#ffd23f', '#2de2e6']

    const resize = () => {
      w = canvas.width = Math.floor(window.innerWidth * devicePixelRatio)
      h = canvas.height = Math.floor(window.innerHeight * devicePixelRatio)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.floor((window.innerWidth * window.innerHeight) / 4200)
      stars = Array.from({ length: count }, () => ({
        x: Math.floor(Math.random() * (w / unit)) * unit, y: Math.floor(Math.random() * (h / unit)) * unit,
        s: Math.random() < 0.85 ? 1 : 2, level: Math.floor(Math.random() * 3), rate: 0.3 + Math.random() * 0.9, t: Math.random(),
        c: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      acc += dt
      if (acc >= 1 / 12) {
        acc = 0
        ctx.clearRect(0, 0, w, h)
        for (const s of stars) {
          s.t += s.rate / 12
          if (s.t >= 1) { s.t = 0; s.level = (s.level + 1) % 3 }
          ctx.globalAlpha = [0.25, 0.6, 1][s.level]
          ctx.fillStyle = s.c
          ctx.fillRect(s.x, s.y, unit * s.s, unit * s.s)
        }
        ctx.globalAlpha = 1
        if (Math.random() < 0.04 && shots.length < 2) shots.push({ x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, life: 14 })
        shots = shots.filter((s) => s.life > 0)
        for (const s of shots) {
          s.x += unit * 7; s.y += unit * 5; s.life -= 1
          for (let i = 0; i < 6; i++) {
            ctx.globalAlpha = (1 - i / 6) * Math.min(1, s.life / 6)
            ctx.fillStyle = i === 0 ? '#ffffff' : '#2de2e6'
            ctx.fillRect(s.x - i * unit * 3, s.y - i * unit * 2, unit * 2, unit * 2)
          }
        }
        ctx.globalAlpha = 1
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

function Drift({ children, className, parallax, top, left, right }: { children: React.ReactNode; className?: string; parallax: number; top: number; left?: string; right?: string }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 4000], [0, -4000 * parallax])
  return <motion.div className={`planet ${className ?? ''}`} style={{ y, top, left, right }} aria-hidden>{children}</motion.div>
}

export function PixelPlanets() {
  return (
    <div className="planets-layer" aria-hidden>
      <Drift parallax={0.1} top={1500} right="-3%"><Pixel map={ringedPlanet} scale={11} /></Drift>
      <Drift parallax={0.25} top={1250} left="5%"><Pixel map={moon} scale={7} /></Drift>
      <Drift parallax={0.15} top={3100} left="-2%"><Pixel map={bluePlanet} scale={12} /></Drift>
      <Drift parallax={0.3} top={3900} right="10%"><Pixel map={redPlanet} scale={6} /></Drift>
      <Drift parallax={0.08} top={5200} right="-2%"><Pixel map={ringedPlanet} scale={8} colors={{ P: '#ff2e88', L: '#ffb3d1', D: '#a3125a', Y: '#2de2e6' }} /></Drift>
      <Drift parallax={0.35} top={6400} left="8%"><Pixel map={moon} scale={5} colors={{ M: '#38ff8e', D: '#12a34f' }} /></Drift>
    </div>
  )
}

export function TimelineShip({ progress }: { progress: MotionValue<number> }) {
  const top = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <motion.div className="quest-ship" style={{ top }} aria-hidden>
      <Pixel map={flipY(rocketFrames[0])} scale={3} />
    </motion.div>
  )
}
