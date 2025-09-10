enum ResistorColorValues {
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9
}

type ResistorColor = keyof typeof ResistorColorValues;

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const baseValue = (ResistorColorValues[firstBand] * 10 + ResistorColorValues[secondBand]) * 10 ** ResistorColorValues[thirdBand];
  return baseValue >= 1000 
    ? `${baseValue / 1000} kiloohms` 
    : `${baseValue} ohms`;
}