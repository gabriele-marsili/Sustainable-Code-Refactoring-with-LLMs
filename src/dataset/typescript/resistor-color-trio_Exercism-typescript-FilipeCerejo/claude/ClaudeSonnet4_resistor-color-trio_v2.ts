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
  const multiplier = 10 ** CV[colors[2]];
  const rawResistorValue = (CV[colors[0]] * 10 + CV[colors[1]]) * multiplier;
  
  if (rawResistorValue >= 1000000) {
    return `${rawResistorValue / 1000000} megaohms`;
  } else if (rawResistorValue >= 1000) {
    return `${rawResistorValue / 1000} kiloohms`;
  } else {
    return `${rawResistorValue} ohms`;
  }
}