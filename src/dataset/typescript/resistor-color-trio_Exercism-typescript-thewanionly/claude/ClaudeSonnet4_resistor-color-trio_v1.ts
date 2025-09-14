const RESISTOR_COLOR_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const COLOR_MAP = {
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

type ResistorColor = keyof typeof COLOR_MAP;

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const value = (COLOR_MAP[firstBand] * 10 + COLOR_MAP[secondBand]) * (10 ** COLOR_MAP[thirdBand]);
  return value >= 1000 && value % 1000 === 0 
    ? `${value / 1000} kilohms`
    : `${value} ohms`;
}