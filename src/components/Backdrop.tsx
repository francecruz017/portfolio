import { Planet, Starfield } from './Space'

export function SpaceBackdrop() {
  return (
    <>
      <div className="backdrop">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <Starfield />
      <div className="planets-layer" aria-hidden>
        <Planet size={220} colors={['#ffb86b', '#b3491d']} ring="#ffd9a8" glow="rgba(255,170,90,0.35)" parallax={0.12} className="pl-a" />
        <Planet size={90} colors={['#cbd5ff', '#4d5680']} craters glow="rgba(200,210,255,0.3)" parallax={0.3} className="pl-b" />
        <Planet size={150} colors={['#7ee8fa', '#1f4fa3']} glow="rgba(80,180,255,0.35)" parallax={0.18} className="pl-c" />
        <Planet size={60} colors={['#f9a8d4', '#9d174d']} craters parallax={0.4} className="pl-d" />
        <Planet size={180} colors={['#c4b5fd', '#4c1d95']} ring="#e9d5ff" glow="rgba(160,120,255,0.35)" parallax={0.1} className="pl-e" />
        <Planet size={70} colors={['#bbf7d0', '#166534']} craters parallax={0.35} className="pl-f" />
      </div>
      <div className="noise" />
    </>
  )
}
