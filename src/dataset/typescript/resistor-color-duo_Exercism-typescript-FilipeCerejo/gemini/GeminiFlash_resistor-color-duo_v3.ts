const ColorValues = {
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

type Color = keyof typeof ColorValues;

const colorValueLookup = new Map<Color, number>(Object.entries(ColorValues) as [Color, number][]);

export function decodedValue(colors: Color[]): number {
  const [firstColor, secondColor] = colors;
  const firstValue = colorValueLookup.get(firstColor)!;
  const secondValue = colorValueLookup.get(secondColor)!;
  return firstValue * 10 + secondValue;
}