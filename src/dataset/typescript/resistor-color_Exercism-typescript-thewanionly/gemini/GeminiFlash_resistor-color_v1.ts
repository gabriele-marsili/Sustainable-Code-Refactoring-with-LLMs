const ResistorColorValues = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
} as const

type Color = keyof typeof ResistorColorValues

export const colorCode = (color: Color): typeof ResistorColorValues[Color] => {
  return ResistorColorValues[color]
}

export const COLORS = Object.freeze(Object.keys(ResistorColorValues))