const colorValues = {
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
} as const;

type ResistorColor = keyof typeof colorValues;

export function decodedValue([firstBand, secondBand]: ResistorColor[]): number {
  return colorValues[firstBand] * 10 + colorValues[secondBand];
}