const ResistorColorValues = Object.freeze({
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
} as const);

type Color = keyof typeof ResistorColorValues;

type Values<T> = T[keyof T];

export const colorCode = (color: Color): Values<typeof ResistorColorValues> => ResistorColorValues[color];

export const COLORS = Object.freeze(<Color[]>Object.keys(ResistorColorValues));