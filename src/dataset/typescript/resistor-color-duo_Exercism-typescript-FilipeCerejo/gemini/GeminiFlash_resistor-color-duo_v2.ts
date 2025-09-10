const ColorValues: Record<string, number> = {
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

type Color = keyof typeof ColorValues;

export function decodedValue(colors: Color[]): number {
  const [color1, color2] = colors;
  return ColorValues[color1] * 10 + ColorValues[color2];
}