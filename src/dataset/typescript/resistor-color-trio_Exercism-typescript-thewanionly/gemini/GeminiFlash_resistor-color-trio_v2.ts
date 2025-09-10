enum ResistorColorValues {
  black,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white
}

type ResistorColor = keyof typeof ResistorColorValues

const colorValues: { [key in ResistorColor]: number } = {
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


export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const value = (colorValues[firstBand] * 10 + colorValues[secondBand]) * (10 ** colorValues[thirdBand]);
  if (value >= 1000) {
    return `${value / 1000} kiloohms`;
  }
  return `${value} ohms`;
}