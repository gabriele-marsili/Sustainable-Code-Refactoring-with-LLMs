type Color = 'black' | 'brown' |  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'grey' | 'white'

const COLOR_MAP: Record<Color, number> = {
  'black': 0,
  'brown': 1,
  'red': 2,
  'orange': 3,
  'yellow': 4,
  'green': 5,
  'blue': 6,
  'violet': 7,
  'grey': 8,
  'white': 9,
} as const

export const colorCode = (color: Color): number => {
  return COLOR_MAP[color]
}

export const COLORS: ReadonlyArray<Color> = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
] as const