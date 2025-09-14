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

const KILO_THRESHOLD = 1000;
const POWERS_OF_TEN = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const baseValue = ResistorColorValues[firstBand] * 10 + ResistorColorValues[secondBand];
  const multiplierIndex = ResistorColorValues[thirdBand];
  const totalValue = baseValue * POWERS_OF_TEN[multiplierIndex];
  
  if (totalValue >= KILO_THRESHOLD && totalValue % KILO_THRESHOLD === 0) {
    return `${totalValue / KILO_THRESHOLD} kilo ohms`;
  }
  
  return `${totalValue} ohms`;
}