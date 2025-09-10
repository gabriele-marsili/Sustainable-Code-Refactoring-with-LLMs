const colorCodes = {
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
};

export const decodedValue = colorInputs => {
  const [firstColor, secondColor] = colorInputs;
  const firstValue = colorCodes[firstColor.toLowerCase()];
  const secondValue = colorCodes[secondColor.toLowerCase()];

  return firstValue * 10 + secondValue;
};