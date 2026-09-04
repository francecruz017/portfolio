import { Pixel } from './Pixel'
import * as px from '../pixel'

const maps: Record<string, string[]> = {
  sword: px.sword, coin: px.coin, users: px.users, chip: px.chip, potion: px.potion, key: px.key, shield: px.shield, book: px.book,
  heart: px.heart, guitar: px.guitar, note: px.note, star: px.star, controller: px.controller, house: px.house, trophy: px.trophy, invader: px.invader,
}

export function Icon({ name, scale = 4, className }: { name: string; scale?: number; className?: string }) {
  return <Pixel map={maps[name] ?? px.star} scale={scale} className={className} />
}
