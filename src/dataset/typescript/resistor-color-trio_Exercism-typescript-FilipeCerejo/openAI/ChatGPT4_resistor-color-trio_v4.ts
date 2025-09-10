const CV = {
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

type Color = keyof typeof CV;

export function decodedResistorValue(colors: Color[]): string {
  const [first, second, third] = colors;
  const rawResistorValue = (CV[first] * 10 + CV[second]) * 10 ** CV[third];

  if (rawResistorValue >= 1_000_000) {
    return `${rawResistorValue / 1_000_000} megaohms`;
  } else if (rawResistorValue >= 1_000) {
    return `${rawResistorValue / 1_000} kiloohms`;
  } else {
    return `${rawResistorValue} ohms`;
  }
}