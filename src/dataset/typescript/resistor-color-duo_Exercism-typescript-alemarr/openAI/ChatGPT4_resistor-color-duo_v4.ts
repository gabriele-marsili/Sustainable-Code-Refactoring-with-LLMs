const colorsMap = Object.freeze({
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
});

export const decodedValue = ([color1, color2]: [keyof typeof colorsMap, keyof typeof colorsMap]): number =>
  colorsMap[color1] * 10 + colorsMap[color2];