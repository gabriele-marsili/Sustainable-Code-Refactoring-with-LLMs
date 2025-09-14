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

export function decodedValue(colors: Color[]) {
  return ColorValues[colors[0]] * 10 + ColorValues[colors[1]];
}