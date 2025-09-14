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

const POWERS_OF_TEN = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const baseValue = ResistorColorValues[firstBand] * 10 + ResistorColorValues[secondBand];
  const multiplier = POWERS_OF_TEN[ResistorColorValues[thirdBand]];
  const totalValue = baseValue * multiplier;
  
  return totalValue >= 1000 && totalValue % 1000 === 0
    ? `${totalValue / 1000} kilohms`
    : `${totalValue} ohms`;
}