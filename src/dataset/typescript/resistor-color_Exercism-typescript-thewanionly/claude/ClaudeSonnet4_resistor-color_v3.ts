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

type Values<T> = T[keyof T]

export const colorCode = (color: Color): Values<typeof ResistorColorValues> => {
  return ResistorColorValues[color]
}

export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'] as const