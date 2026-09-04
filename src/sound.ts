import { useSyncExternalStore } from 'react'

let ctx: AudioContext | null = null
let enabled = false
const listeners = new Set<() => void>()

const get = () => {
  if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  return ctx
}

const tone = (freq: number, dur: number, type: OscillatorType = 'square', vol = 0.04, when = 0) => {
  if (!enabled) return
  const c = get()
  const o = c.createOscillator(), g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(vol, c.currentTime + when)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + when + dur)
  o.connect(g).connect(c.destination)
  o.start(c.currentTime + when)
  o.stop(c.currentTime + when + dur)
}

export const sfx = {
  blip: () => tone(880, 0.05),
  select: () => { tone(660, 0.06); tone(990, 0.08, 'square', 0.04, 0.06) },
  coin: () => { tone(988, 0.08); tone(1319, 0.25, 'square', 0.04, 0.08) },
  launch: () => { for (let i = 0; i < 8; i++) tone(200 + i * 90, 0.08, 'sawtooth', 0.03, i * 0.05) },
  powerup: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.12, 'square', 0.04, i * 0.09)) },
}

export const toggleSound = () => {
  enabled = !enabled
  if (enabled) { get().resume(); sfx.powerup() }
  listeners.forEach((l) => l())
}

export const useSound = () =>
  useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => enabled,
  )
