const RESISTOR_COLOR_VALUES = {
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

type ResistorColor = keyof typeof RESISTOR_COLOR_VALUES

export function decodedValue([firstBand, secondBand]: ResistorColor[]): number {
  return RESISTOR_COLOR_VALUES[firstBand] * 10 + RESISTOR_COLOR_VALUES[secondBand]
}