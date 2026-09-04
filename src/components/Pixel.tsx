import { useEffect, useState } from 'react'
import { palette } from '../pixel'

type Props = { map: string[]; scale?: number; className?: string; style?: React.CSSProperties; colors?: Record<string, string> }

export function Pixel({ map, scale = 4, className, style, colors }: Props) {
  const h = map.length
  const w = Math.max(...map.map((r) => r.length))
  const pal = colors ? { ...palette, ...colors } : palette
  return (
    <svg className={className} style={style} width={w * scale} height={h * scale} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" aria-hidden>
      {map.flatMap((row, y) =>
        [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={pal[c] ?? c} />)),
      )}
    </svg>
  )
}

export function Sprite({ frames, fps = 8, ...rest }: Omit<Props, 'map'> & { frames: string[][]; fps?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % frames.length), 1000 / fps)
    return () => clearInterval(t)
  }, [frames.length, fps])
  return <Pixel map={frames[i]} {...rest} />
}
