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

export function decodedResistorValue(colors: Color[]) {
  const [color1, color2, color3] = colors;
  const digit1 = CV[color1];
  const digit2 = CV[color2];
  const multiplier = 10 ** CV[color3];
  const rawResistorValue = (digit1 * 10 + digit2) * multiplier;

  if (rawResistorValue >= 1000000) {
    return `${rawResistorValue / 1000000} megaohms`;
  } else if (rawResistorValue >= 1000) {
    return `${rawResistorValue / 1000} kiloohms`;
  } else {
    return `${rawResistorValue} ohms`;
  }
}