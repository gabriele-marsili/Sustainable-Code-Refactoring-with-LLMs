const RESISTOR_COLOR_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const COLOR_TO_INDEX: Record<string, number> = {
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
};

enum ResistorColorValues {
  black,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white
}

type ResistorColor = keyof typeof ResistorColorValues

export function decodedValue([firstBand, secondBand]: ResistorColor[]): number {
  return COLOR_TO_INDEX[firstBand] * 10 + COLOR_TO_INDEX[secondBand];
}