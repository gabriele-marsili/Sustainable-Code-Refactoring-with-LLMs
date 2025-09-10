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
} as const;

type ResistorColor = keyof typeof ResistorColorValues;

export function decodedValue([firstBand, secondBand]: ResistorColor[]): number {
  return (ResistorColorValues[firstBand] * 10) + ResistorColorValues[secondBand];
}