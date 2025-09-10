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

const ResistanceMultipliers = [
  1,
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  100000000,
  1000000000
];

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const firstDigit = ResistorColorValues[firstBand];
  const secondDigit = ResistorColorValues[secondBand];
  const multiplier = ResistanceMultipliers[ResistorColorValues[thirdBand]];
  let resistance = (firstDigit * 10 + secondDigit) * multiplier;

  if (resistance >= 1000) {
    resistance /= 1000;
    return `${resistance} kiloohms`;
  } else {
    return `${resistance} ohms`;
  }
}