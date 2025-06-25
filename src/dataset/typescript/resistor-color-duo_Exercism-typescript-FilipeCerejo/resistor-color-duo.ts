
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
}

type Color = keyof typeof ColorValues;

export function decodedValue(colors: Color[]) {
  return Number(`${ColorValues[colors[0]]}${ColorValues[colors[1]]}`)
}
